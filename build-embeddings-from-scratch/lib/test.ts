import { oneHotEncode } from "./one-hot";
import { bagOfWords } from "./bag-of-words";
import { tfidf } from "./tf-idf";
import { cosineSimilarity } from "./cosine";
import { buildCoOccurrenceMatrix } from "./co-occurence";
import { buildEmbeddings } from "./embeddings";

const documents = [
  "the cat drinks milk",
  "the dog drinks milk",
  "the cat eats fish",
  "the dog eats meat",
];

console.log("=================================");
console.log("ONE HOT");
console.log("=================================");

console.log(
  oneHotEncode(documents.join(" "))
);

console.log("\n");

console.log("=================================");
console.log("BAG OF WORDS");
console.log("=================================");

console.table(
  bagOfWords(documents)
);

console.log("\n");

console.log("=================================");
console.log("TF-IDF");
console.log("=================================");

console.table(
  tfidf(documents)
);

console.log("\n");

console.log("=================================");
console.log("CO OCCURRENCE");
console.log("=================================");

const matrix =
  buildCoOccurrenceMatrix(
    documents,
    1
  );

console.table(matrix.matrix);

console.log(matrix.vocabulary);

console.log("\n");

console.log("=================================");
console.log("EMBEDDINGS");
console.log("=================================");

const embeddings =
  buildEmbeddings(
    matrix,
    8
  );

console.log(
  embeddings.embeddings
);

console.log("\n");

console.log("=================================");
console.log("SIMILARITY");
console.log("=================================");

const cat =
  embeddings.embeddings["cat"];

const dog =
  embeddings.embeddings["dog"];

const fish =
  embeddings.embeddings["fish"];

console.log(

  "cat vs dog",

  cosineSimilarity(
    cat,
    dog
  )

);

console.log(

  "cat vs fish",

  cosineSimilarity(
    cat,
    fish
  )

);