const fs = require('node:fs');
const decodePolyline = require('decode-google-map-polyline');

const data = fs.readFileSync('./polylines3.json', 'utf8');
const json = JSON.parse(data);

const output = [];

for (const line of json) {
  const parsed = decodePolyline(line);
  output.push(...parsed);
}

let formatted = '';
for (const line of output) {
  formatted += `${line["lat"]},${line["lng"]}\n`;
}

fs.writeFileSync('output3.txt', formatted);
