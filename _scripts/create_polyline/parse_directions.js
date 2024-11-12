const fs = require('node:fs');

const data = fs.readFileSync('./nordkapp-lindesnes-directions.json', 'utf8');
const json = JSON.parse(data);
console.log(json["routes"].length);

let output = [];

for (const leg of json["routes"][0]["legs"]) {
  for (const step of leg["steps"]) {
    output.push(step["polyline"]["points"]);
  }
}

fs.writeFileSync('polylines.json', JSON.stringify(output));
