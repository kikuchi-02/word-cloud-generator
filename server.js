const express = require('express');
const { join } = require('path');
app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.listen(port, () => {
  console.log(`running on ${port}`);
});
