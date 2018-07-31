const cors = require('cors')

const express = require('express');
const app = express();
const fs = require('fs');
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/info', (req, res) => {
    const json = fs.readFileSync('./mock-data.json', {encoding: 'utf8'});
    const convertedJson=JSON.parse(json)
	// console.log(convertedJson)
    res.send(convertedJson);
});
app.get('/**', (req, res) => {
    res.send(fs.readFileSync('./index.html', {encoding: 'utf8'}));
});
app.listen(8800, () => console.log('Example app listening on port 8800!'));
