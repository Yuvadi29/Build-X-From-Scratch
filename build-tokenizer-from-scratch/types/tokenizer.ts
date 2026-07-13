export interface VocabularyEntry {
    token: string;
    frequency: number;
}

export interface PairFrequency {
    pair: [string, string];
    frequency: number;
}

export interface MergeRule {
    left: string;
    right: string;
    merged: string;
}

export interface TrainingStep {
    iteration: number;
    pair: PairFrequency;
    vocabulary: VocabularyEntry[];
}

export interface TokenizationResult {
    tokens: string[];
    tokenCount: number;
    characterCount: number;
}