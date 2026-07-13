export interface BufferTokenizationResult {
  bytes: number[];
  binary: string[];
}

export function bufferTokenizer(
  text: string
): BufferTokenizationResult {

  const buffer = Buffer.from(text, "utf8");

  return {
    bytes: [...buffer],

    binary: [...buffer].map((byte) =>
      byte.toString(2).padStart(8, "0")
    ),
  };
}