export interface CoOccurrenceResult {
    vocabulary: string[];
    matrix: number[][];
}

function buildVocabulary(
    documents: string[]
): string[] {
    const vocabulary = new Set<string>();
    for (const document of documents) {
        document
            .toLowerCase()
            .split(/\s+/)
            .forEach(word =>
                vocabulary.add(word)
            );
    }
    return [...vocabulary];
}

export function buildCoOccurrenceMatrix(
    documents: string[],
    windowSize = 1
): CoOccurrenceResult {
    const vocabulary =
        buildVocabulary(documents);
    const wordIndex =
        new Map(
            vocabulary.map(
                (word, index) =>
                    [word, index]
            )
        );

    const matrix =
        Array.from(
            {
                length:
                    vocabulary.length
            },
            () =>
                Array(
                    vocabulary.length
                ).fill(0)
        );

    for (
        const document
        of documents
    ) {
        const words =
            document
                .toLowerCase()
                .split(/\s+/);

        for (
            let i = 0;
            i < words.length;
            i++
        ) {
            const target =
                wordIndex.get(
                    words[i]
                )!;

            for (
                let j =
                    Math.max(
                        0,
                        i - windowSize
                    );
                j <=
                Math.min(
                    words.length - 1,
                    i + windowSize
                );
                j++
            ) {
                if (i === j)
                    continue;

                const context =
                    wordIndex.get(
                        words[j]
                    )!;
                matrix[target][context]++;
            }
        }
    }

    return {
        vocabulary,
        matrix
    };
}

const result =

buildCoOccurrenceMatrix(

[

"The cat drinks milk",

"The dog drinks milk",

"The cat eats fish",

"The dog eats meat"

]

);
console.log(result);