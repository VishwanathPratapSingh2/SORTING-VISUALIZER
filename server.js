const express = require('express');
const cors = require('cors');
const app = express();
const { sortArray } = require('./algorithms/sorting');

app.use(cors());
app.use(express.json());

app.post('/api/sort', (req, res) => {
  const { array, algorithm } = req.body;
  const result = sortArray([...array], algorithm);
  res.json({ sortedArray: result });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
