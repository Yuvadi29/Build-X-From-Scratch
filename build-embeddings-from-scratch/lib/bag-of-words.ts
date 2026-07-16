export interface BagOfWordsResult {
    vocabulary: string[];
    vectors: number[][];
}

// Build vocabulary from all sentence
export function buildVocabulary(sentences: string[]): string[]{
    const words = new Set<string>();

    for (const sentence of sentences) {
        sentence.toLowerCase().split(/\s+/).forEach(word => {
            words.add(word);
        });
    }
    return [...words];
}

// Convert evry sentence to bag of words
export function bagOfWords(sentences: string[]): BagOfWordsResult{
    const vocabulary = buildVocabulary(sentences);

    const vectors = sentences.map(sentence => {
        const vector = new Array(vocabulary.length).fill(0);
        const words = sentence.toLowerCase().split(/\s+/);

        for (const word of words) {
            const index = vocabulary.indexOf(word);
            vector[index]++;
        }
        return vector;
    });

    return {
        vocabulary,
        vectors
    };
}

const result = bagOfWords([
    "the cat drinks milk",
    "the dog drinks milk",
    "the cat eats fish"
]);

console.log(result);