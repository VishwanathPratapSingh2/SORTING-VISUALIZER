import React, { useState } from "react";
import bubbleSort from "../algorithms/bubbleSort";
import selectionSort from "../algorithms/selectionSort";
import mergeSort from "../algorithms/mergeSort";

const ALGORITHMS = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Merge Sort": mergeSort,
};

const ARRAY_SIZE = 30;

function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 20);
}

const SortingVisualizer = () => {
  const [array, setArray] = useState(randomArray(ARRAY_SIZE));
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [sorting, setSorting] = useState(false);

  const resetArray = () => setArray(randomArray(ARRAY_SIZE));

  const handleSort = async () => {
    setSorting(true);
    const steps = ALGORITHMS[algorithm](array.slice());
    for (let step of steps) {
      setArray(step.slice());
      await new Promise((r) => setTimeout(r, 50));
    }
    setSorting(false);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={resetArray} disabled={sorting}>Generate New Array</button>
        <select onChange={e => setAlgorithm(e.target.value)} value={algorithm} disabled={sorting}>
          {Object.keys(ALGORITHMS).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <button onClick={handleSort} disabled={sorting}>Sort</button>
      </div>
      <div style={{ height: 350, margin: "auto", width: "90%" }}>
        {array.map((val, idx) => (
          <div
            className="bar"
            key={idx}
            style={{
              height: `${val}px`,
              width: "15px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;