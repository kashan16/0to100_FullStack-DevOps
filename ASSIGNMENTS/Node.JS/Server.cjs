// Change to .mjs
import TODO from './TODO';

const express = require('express');
const app = express();
const port = 5000;

app.use('/tasks', TODO);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
