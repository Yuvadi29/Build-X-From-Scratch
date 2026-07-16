export interface TFIDFResult {
    vocabulary: string[];
    matrix: number[][];
};

// Build vocabulary from all sentence
export function buildVocabulary(documents: string[]): string[] {
    const vocabulary = new Set<string>();

    for (const doc of documents) {
        doc.toLowerCase().split(/\s+/).forEach(word => {
            vocabulary.add(word);
        });
    }
    return [...vocabulary];
};

// TF
function termFrequency(word: string, document: string): number {
    const words = document.toLowerCase().split(/\s+/);
    let count = 0;

    for (const token of words) {
        if (token === word) count++;
    }
    return count / words.length;
}

// IDF
function inverseDocumentFrequency(word: string, documents: string[]): number {
    let documentCount = 0;
    for (const document of documents) {
        if (document.toLowerCase().split(/\s+/).includes(word)) {
            documentCount++;
        }
    }

    return Math.log(documents.length / (1 + documentCount));
}

//TDIF
export function tfidf(documents: string[]): TFIDFResult {
    const vocabulary = buildVocabulary(documents);
    const matrix =
        documents.map(document => {

            return vocabulary.map(word => {

                const tf =
                    termFrequency(
                        word,
                        document
                    );

                const idf =
                    inverseDocumentFrequency(
                        word,
                        documents
                    );

                return Number(
                    (tf * idf)
                        .toFixed(3)
                );

            });

        });

    return {

        vocabulary,

        matrix

    };
}

const result = tfidf([

"The cat drinks milk",

"The dog drinks milk",

"The dog eats meat",

"The cat eats fish"

]);
console.log(result);