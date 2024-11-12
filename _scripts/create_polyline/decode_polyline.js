const fs = require('node:fs');
const decodePolyline = require('decode-google-map-polyline');

const data = fs.readFileSync('./polylines.json', 'utf8');
const json = JSON.parse(data);

const output = [];

for (const line of json) {
  const parsed = decodePolyline(line);
  output.push(...parsed);
}

const formatted = [];
for (const line of output) {
  formatted.push([line["lat"], line["lng"]]);
}

fs.writeFileSync('output.json', JSON.stringify(formatted));
