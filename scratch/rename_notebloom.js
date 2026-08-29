const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

let changedFiles = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.toLowerCase().includes('notebloom')) {
    let newContent = content.replace(/Notebloom/g, 'Carefirst Pharmacy');
    newContent = newContent.replace(/NOTEBLOOM/g, 'CAREFIRST PHARMACY');
    newContent = newContent.replace(/notebloom/g, 'carefirst');
    
    fs.writeFileSync(file, newContent, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Done! Updated ${changedFiles} files.`);
