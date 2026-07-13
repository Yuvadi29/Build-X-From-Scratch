"use client";

import { useMemo, useState } from "react";

import {
  bufferTokenizer,
  trainBPE,
  tokenizeBPE,
} from "@/lib/tokenizers";

export default function Home() {
  const [corpus, setCorpus] = useState(`low
lower
lowest
low
lower`);

  const [input, setInput] = useState("");

  const [iterations, setIterations] = useState(10);

  const buffer = useMemo(() => {
    return bufferTokenizer(input);
  }, [input]);

  const model = useMemo(() => {
    return trainBPE(corpus, iterations);
  }, [corpus, iterations]);

  const tokens = useMemo(() => {
    return tokenizeBPE(
      input,
      model.mergeRules
    );
  }, [input, model]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            🚀 Build Tokenizer From Scratch
          </h1>

          <p className="mt-4 text-zinc-400">
            Learn how Byte Pair Encoding (BPE)
            works by training your own tokenizer.
          </p>

        </div>

        {/* Corpus */}

        <section className="mb-10">

          <h2 className="mb-3 text-2xl font-semibold">
            Training Corpus
          </h2>

          <textarea
            value={corpus}
            onChange={(e) =>
              setCorpus(e.target.value)
            }
            rows={8}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 outline-none"
          />

        </section>

        {/* Iterations */}

        <section className="mb-10">

          <h2 className="mb-3 text-2xl font-semibold">
            Training Iterations
          </h2>

          <input
            type="range"
            min={1}
            max={25}
            value={iterations}
            onChange={(e) =>
              setIterations(
                Number(e.target.value)
              )
            }
            className="w-full"
          />

          <p className="mt-2 text-orange-400">
            {iterations} Merge Iterations
          </p>

        </section>

        {/* Input */}

        <section className="mb-10">

          <h2 className="mb-3 text-2xl font-semibold">
            Tokenize Text
          </h2>

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 outline-none"
          />

        </section>

        {/* Buffer */}

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-2xl font-semibold">
            Buffer Representation
          </h2>

          <div className="mb-5">

            <h3 className="mb-2 font-medium">
              Bytes
            </h3>

            <div className="flex flex-wrap gap-2">

              {buffer.bytes.map(
                (byte, index) => (
                  <div
                    key={index}
                    className="rounded bg-blue-600 px-3 py-2"
                  >
                    {byte}
                  </div>
                )
              )}

            </div>

          </div>

          <div>

            <h3 className="mb-2 font-medium">
              Binary
            </h3>

            <div className="flex flex-wrap gap-2">

              {buffer.binary.map(
                (binary, index) => (
                  <div
                    key={index}
                    className="rounded bg-zinc-800 px-3 py-2 font-mono text-xs"
                  >
                    {binary}
                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* Vocabulary */}

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-2xl font-semibold">
            Vocabulary
          </h2>

          <div className="flex flex-wrap gap-2">

            {model.vocabulary.map(
              (token) => (
                <div
                  key={token}
                  className="rounded bg-green-600 px-3 py-2"
                >
                  {token}
                </div>
              )
            )}

          </div>

        </section>

        {/* Merge Rules */}

        <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-2xl font-semibold">
            Learned Merge Rules
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-700">

                <th className="py-2 text-left">
                  Left
                </th>

                <th className="py-2 text-left">
                  Right
                </th>

                <th className="py-2 text-left">
                  Result
                </th>

              </tr>

            </thead>

            <tbody>

              {model.mergeRules.map(
                (rule, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800"
                  >
                    <td className="py-2">
                      {rule.left}
                    </td>

                    <td className="py-2">
                      {rule.right}
                    </td>

                    <td className="py-2 text-orange-400">
                      {rule.left + rule.right}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </section>

        {/* Final Tokens */}

        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-2xl font-semibold">
            Tokenized Output
          </h2>

          <div className="flex flex-wrap gap-3">

            {tokens.map(
              (token, index) => (
                <div
                  key={index}
                  className="rounded bg-orange-500 px-4 py-2 font-semibold"
                >
                  {token}
                </div>
              )
            )}

          </div>

          <p className="mt-6 text-zinc-400">
            Token Count:{" "}
            <span className="font-bold text-white">
              {tokens.length}
            </span>
          </p>

        </section>

      </div>
    </main>
  );
}