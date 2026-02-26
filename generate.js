const fs = require("fs");

const data = JSON.parse(fs.readFileSync("bounty.json"));
const today = new Date();

function daysBetween(d1, d2) {
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

let entries = [];

for (const [name, info] of Object.entries(data)) {
  const startDate = new Date(info.date);
  const days = daysBetween(startDate, today);
  const current = info.start + (days * 100);
  entries.push({ name, current });
}

// sort by highest bounty
entries.sort((a, b) => b.current - a.current);

let y = 60;
let rows = "";

for (const entry of entries) {
  rows += `
  <text x="40" y="${y}" font-size="18" fill="#ffffff">${entry.name}</text>
  <text x="420" y="${y}" font-size="18" fill="#FFD700" text-anchor="end">${entry.current} Gold</text>
  `;
  y += 35;
}

const height = y + 30;

const svg = `
<svg width="500" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/>
  <text x="40" y="35" font-size="22" fill="#ffffff">Most Wanted</text>
  ${rows}
</svg>
`;

fs.writeFileSync("bounty.svg", svg);
