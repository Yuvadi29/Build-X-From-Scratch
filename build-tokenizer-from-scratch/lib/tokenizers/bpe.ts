export interface MergeRule {
    left: string;
    right: string;
}

export interface BPEResult {
    vocabulary: string[];
    mergeRules: MergeRule[];
    tokens: string[];
}

function splitCorpus(
    corpus: string
): string[][] {

    return corpus
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => [...word, "</w>"]);
}

function countPairs(
    words: string[][]
): Map<string, number> {

    const frequencies = new Map<string, number>();

    for (const word of words) {

        for (let i = 0; i < word.length - 1; i++) {

            const pair = `${word[i]} ${word[i + 1]}`;

            frequencies.set(
                pair,
                (frequencies.get(pair) ?? 0) + 1
            );
        }

    }

    return frequencies;
}

function findMostFrequentPair(
    frequencies: Map<string, number>
): string | null {

    let bestPair: string | null = null;
    let highest = 0;

    for (const [pair, frequency] of frequencies) {

        if (frequency > highest) {
            highest = frequency;
            bestPair = pair;
        }

    }

    return bestPair;
}

function mergeWords(
    words: string[][],
    left: string,
    right: string
): string[][] {

    const mergedToken = left + right;

    return words.map((word) => {

        const merged: string[] = [];

        let i = 0;

        while (i < word.length) {

            if (
                i < word.length - 1 &&
                word[i] === left &&
                word[i + 1] === right
            ) {

                merged.push(mergedToken);

                i += 2;

            } else {

                merged.push(word[i]);

                i++;

            }

        }

        return merged;

    });

}

function buildVocabulary(
    words: string[][]
): string[] {

    return [...new Set(words.flat())]
        .sort();

}

export function trainBPE(
    corpus: string,
    iterations = 10
): BPEResult {

    let words = splitCorpus(corpus);

    const mergeRules: MergeRule[] = [];

    for (let i = 0; i < iterations; i++) {

        const pairFrequency =
            countPairs(words);

        const bestPair =
            findMostFrequentPair(pairFrequency);

        if (!bestPair)
            break;

        const [left, right] =
            bestPair.split(" ");

        mergeRules.push({
            left,
            right,
        });

        words = mergeWords(
            words,
            left,
            right
        );

    }

    return {

        vocabulary:
            buildVocabulary(words),

        mergeRules,

        tokens:
            words.flat(),

    };

}

export function tokenizeBPE(
  text: string,
  mergeRules: MergeRule[]
): string[] {

  if (!text.trim()) {
    return [];
  }

  let tokens = [...text];

  for (const rule of mergeRules) {

    const merged: string[] = [];

    for (let i = 0; i < tokens.length; ) {

      const current = tokens[i];
      const next = tokens[i + 1];

      if (
        next &&
        current === rule.left &&
        next === rule.right
      ) {
        merged.push(current + next);
        i += 2;
      } else {
        merged.push(current);
        i++;
      }
    }

    tokens = merged;
  }

  return tokens;
}