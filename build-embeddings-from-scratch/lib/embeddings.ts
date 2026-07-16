import { buildCoOccurrenceMatrix, CoOccurrenceResult } from "./co-occurence";

export interface EmbeddingResult {
    vocabulary: string[],
    embeddings: Record<string, number[]>;
}

// Generate random projection matrix
function randomMatrix(rows: number, columns: number): number[][] {
    return Array.from({
        length: rows
    }, () => Array.from({
        length: columns
    }, () => Math.random() * 2 - 1));
}

// Matrix Multiplication
function multiply(vector: number[], matrix: number[][]): number[] {
    const output: number[] = [];
    const dimensions = matrix[0].length;

    for (let col = 0; col < dimensions; col++) {
        let sum = 0;
        for (
            let row = 0;
            row < vector.length;
            row++
        ) {
            sum +=
                vector[row] *
                matrix[row][col];
        }
        output.push(
            Number(sum.toFixed(3))
        );
    }
    return output;
}

// Compress co-occurence vectors into dense embeddings
export function buildEmbeddings(coOccurrence: CoOccurrenceResult, dimensions = 8): EmbeddingResult {
    const projection =
        randomMatrix(
            coOccurrence.vocabulary.length,
            dimensions
        );

    const embeddings:
        Record<string, number[]> = {};

    coOccurrence.vocabulary.forEach(
        (word, index) => {
            embeddings[word] =
                multiply(
                    coOccurrence.matrix[index],
                    projection
                );
        }
    );

    return {
        vocabulary: coOccurrence.vocabulary,
        embeddings

    };
}