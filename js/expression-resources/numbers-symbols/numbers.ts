let tempNumbersCollection = [];

// generate integers
for (let i = -1000; i <= 1000; i++) {
  tempNumbersCollection.push(i.toFixed(0));
}

// generate floats
for (let i = 0; i < 2000; i++) {
  tempNumbersCollection.push(
    Math.random().toFixed(Math.round(1 + (Math.random() * 4)))
  );
}

export const numbersCollection = tempNumbersCollection;