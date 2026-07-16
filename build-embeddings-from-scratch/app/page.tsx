"use client";

import { useMemo, useState } from "react";

import { oneHotEncode } from "@/lib/one-hot";
import { bagOfWords } from "@/lib/bag-of-words";
import { tfidf } from "@/lib/tf-idf";
import { cosineSimilarity } from "@/lib/cosine";
import { buildCoOccurrenceMatrix } from "@/lib/co-occurence";
import { buildEmbeddings } from "@/lib/embeddings";

export default function Home() {
  const [documents, setDocuments] = useState(`The cat drinks milk
The dog drinks milk
The cat eats fish
The dog eats meat
The lion hunts deer
The tiger hunts deer
The car drives fast
The automobile drives fast`);

  const docs = useMemo(() => {
    return documents
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);
  }, [documents]);

  const oneHot = useMemo(() => {
    return oneHotEncode(documents);
  }, [documents]);

  const bow = useMemo(() => {
    return bagOfWords(docs);
  }, [docs]);

  const tfidfResult = useMemo(() => {
    return tfidf(docs);
  }, [docs]);

  const coOccurrence = useMemo(() => {
    return buildCoOccurrenceMatrix(
      docs,
      1
    );
  }, [docs]);

  const embeddingResult = useMemo(() => {
    return buildEmbeddings(
      coOccurrence,
      8
    );
  }, [coOccurrence]);

  const words =
    embeddingResult.vocabulary;

  const [selectedWord, setSelectedWord] =
    useState("cat");

  const similarities = useMemo(() => {
    const current =
      embeddingResult.embeddings[
      selectedWord
      ];

    if (!current) return [];

    return Object.entries(
      embeddingResult.embeddings
    )
      .map(([word, vector]) => ({
        word,
        similarity:
          cosineSimilarity(
            current,
            vector
          ),
      }))
      .sort(
        (a, b) =>
          b.similarity -
          a.similarity
      );
  }, [selectedWord, embeddingResult]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            🚀 Build Embeddings From Scratch
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Understand how Large Language Models
            convert words into vectors by building
            every step yourself.
          </p>
        </div>

        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Training Documents
          </h2>

          <textarea
            value={documents}
            onChange={(e) =>
              setDocuments(e.target.value)
            }
            rows={10}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 font-mono outline-none"
          />
        </section>

        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="mb-6 text-3xl font-bold">

            Step 1 — One Hot Encoding

          </h2>

          <p className="mb-8 text-zinc-400">

            Every word gets its own unique vector.

          </p>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-zinc-700">

                  <th className="py-3 text-left">

                    Word

                  </th>

                  <th className="py-3 text-left">

                    Vector

                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.entries(
                  oneHot.vectors
                ).map(([word, vector]) => (

                  <tr
                    key={word}
                    className="border-b border-zinc-800"
                  >

                    <td className="py-3 font-semibold">

                      {word}

                    </td>

                    <td className="py-3">

                      {JSON.stringify(
                        vector
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-6 text-3xl font-bold">
            Step 2 — Bag Of Words
          </h2>
          <p className="mb-8 text-zinc-400">
            Count how many times each word
            appears inside every sentence.
          </p>

          <div className="overflow-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border border-zinc-700 p-2">
                    Document
                  </th>
                  {bow.vocabulary.map((word) => (
                    <th
                      key={word}
                      className="border border-zinc-700 p-2"
                    >
                      {word}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>

                {bow.vectors.map(
                  (vector, index) => (
                    <tr key={index}>
                      <td className="border border-zinc-700 p-2">
                        {index + 1}
                      </td>
                      {vector.map(
                        (value, i) => (
                          <td
                            key={i}
                            className="border border-zinc-700 p-2 text-center"
                          >
                            {value}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="mb-6 text-3xl font-bold">

            Step 3 — TF-IDF

          </h2>

          <p className="mb-8 text-zinc-400">

            Common words become less important while
            unique words receive higher weights.

          </p>

          <div className="overflow-auto">

            <table className="min-w-full">

              <thead>

                <tr>

                  <th className="border border-zinc-700 p-2">

                    Document

                  </th>

                  {tfidfResult.vocabulary.map((word) => (

                    <th
                      key={word}
                      className="border border-zinc-700 p-2"
                    >

                      {word}

                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {tfidfResult.matrix.map(
                  (vector, index) => (

                    <tr key={index}>

                      <td className="border border-zinc-700 p-2">

                        {index + 1}

                      </td>

                      {vector.map((value, i) => (

                        <td
                          key={i}
                          className="border border-zinc-700 p-2 text-center"
                        >

                          {value}

                        </td>

                      ))}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="mb-6 text-3xl font-bold">

            Step 4 — Co-occurrence Matrix

          </h2>

          <p className="mb-8 text-zinc-400">

            Instead of counting words, we now count
            which words appear together.

          </p>

          <div className="overflow-auto">

            <table className="min-w-full">

              <thead>

                <tr>

                  <th className="border border-zinc-700 p-2">

                    Word

                  </th>

                  {coOccurrence.vocabulary.map(word => (

                    <th
                      key={word}
                      className="border border-zinc-700 p-2"
                    >

                      {word}

                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {coOccurrence.matrix.map(
                  (row, rowIndex) => (

                    <tr key={rowIndex}>

                      <td className="border border-zinc-700 bg-zinc-900 p-2 font-semibold">

                        {
                          coOccurrence.vocabulary[
                          rowIndex
                          ]
                        }

                      </td>

                      {row.map((value, colIndex) => (

                        <td
                          key={colIndex}
                          className="border border-zinc-700 p-2 text-center"
                        >

                          {value}

                        </td>

                      ))}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>


        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="mb-6 text-3xl font-bold">

            Step 5 — Embedding Space

          </h2>

          <p className="mb-8 text-zinc-400">

            Every word is represented as a point in a
            high-dimensional space.
            <br />
            For visualization, we're displaying only the
            first two dimensions.

          </p>

          <div className="flex justify-center">

            <svg
              width={700}
              height={500}
              className="rounded-xl border border-zinc-800 bg-zinc-900"
            >

              {/* X Axis */}

              <line
                x1={350}
                y1={0}
                x2={350}
                y2={500}
                stroke="#444"
              />

              {/* Y Axis */}

              <line
                x1={0}
                y1={250}
                x2={700}
                y2={250}
                stroke="#444"
              />

              {Object.entries(
                embeddingResult.embeddings
              ).map(([word, vector]) => {

                const x =
                  350 +
                  vector[0] * 40;

                const y =
                  250 -
                  vector[1] * 40;

                return (

                  <g key={word}>

                    <circle

                      cx={x}

                      cy={y}

                      r={7}

                      fill={
                        word === selectedWord
                          ? "#3b82f6"
                          : "#22c55e"
                      }

                    />

                    <text

                      x={x + 10}

                      y={y + 5}

                      fill="white"

                      fontSize="14"

                    >

                      {word}

                    </text>

                  </g>

                );

              })}

            </svg>

          </div>

        </section>

        <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-zinc-500">

              Vocabulary Size

            </p>

            <h3 className="mt-2 text-4xl font-bold">

              {embeddingResult.vocabulary.length}

            </h3>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-zinc-500">

              Documents

            </p>

            <h3 className="mt-2 text-4xl font-bold">

              {docs.length}

            </h3>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-zinc-500">

              Embedding Dimension

            </p>

            <h3 className="mt-2 text-4xl font-bold">

              {
                Object.values(
                  embeddingResult.embeddings
                )[0]?.length
              }

            </h3>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-zinc-500">

              Similarity Metric

            </p>

            <h3 className="mt-2 text-2xl font-bold">

              Cosine

            </h3>

          </div>

        </section>

        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="mb-6 text-3xl font-bold">

            Step 6 — Cosine Similarity

          </h2>

          <p className="mb-8 text-zinc-400">

            Compare two words by measuring the angle
            between their embedding vectors.

          </p>

          <div className="mb-8">

            <label className="mb-3 block text-lg font-semibold">

              Select a Word

            </label>

            <select

              value={selectedWord}

              onChange={(e) =>
                setSelectedWord(
                  e.target.value
                )
              }

              className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"

            >

              {words.map(word => (

                <option
                  key={word}
                  value={word}
                >

                  {word}

                </option>

              ))}

            </select>

          </div>

          <div className="overflow-auto">

            <table className="min-w-full">

              <thead>

                <tr>

                  <th className="border border-zinc-700 p-3">

                    Word

                  </th>

                  <th className="border border-zinc-700 p-3">

                    Cosine Similarity

                  </th>

                </tr>

              </thead>

              <tbody>

                {similarities.map(

                  ({ word, similarity }) => (

                    <tr key={word}>

                      <td className="border border-zinc-700 p-3 font-semibold">

                        {word}

                      </td>

                      <td className="border border-zinc-700 p-3">

                        <div className="flex items-center gap-4">

                          <div

                            className="h-3 rounded bg-green-500"

                            style={{
                              width: `${similarity * 300}px`
                            }}

                          />

                          <span>

                            {similarity.toFixed(3)}

                          </span>

                        </div>

                      </td>

                    </tr>

                  )

                )}

              </tbody>

            </table>

          </div>

        </section>


        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="mb-6 text-3xl font-bold">

            Most Similar Words

          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {similarities

              .filter(item => item.word !== selectedWord)

              .slice(0, 5)

              .map(item => (

                <div

                  key={item.word}

                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"

                >

                  <h3 className="text-xl font-bold">

                    {item.word}

                  </h3>

                  <p className="mt-2 text-zinc-400">

                    Similarity Score

                  </p>

                  <div className="mt-3 h-3 w-full rounded bg-zinc-800">

                    <div

                      className="h-3 rounded bg-blue-500"

                      style={{

                        width: `${item.similarity * 100}%`

                      }}

                    />

                  </div>

                  <p className="mt-3 text-lg font-semibold text-green-400">

                    {item.similarity.toFixed(3)}

                  </p>

                </div>

              ))}

          </div>

        </section>

      </div>

    </main>

  );

}