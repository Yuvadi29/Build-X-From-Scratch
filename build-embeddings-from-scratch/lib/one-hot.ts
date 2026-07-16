export interface OneHotEncodingResult {
    vocabulary: string[];
    vectors: Record<string, number[]>;
}

// Build vocabulary from a given text
export function buildVocabulary(text: string): string[]{
    return [...new Set(
        text.toLowerCase().split(/\s+/).filter(Boolean)
    )];
}

// Create on hot vector for each word
export function oneHotEncode(text: string): OneHotEncodingResult {
    const vocabulary = buildVocabulary(text);

    const vectors: Record<string, number[]> = {};

    vocabulary.forEach((word, index) => {
        const vector = new Array(vocabulary.length).fill(0);
        vector[index] = 1;
        vectors[word] = vector;
    });

    return {vocabulary, vectors};
}

const result = oneHotEncode("The cat drinks milk and the dog drinks water");
console.log(result);
