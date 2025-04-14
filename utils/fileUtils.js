const fs = require('fs');

function deleteFileIfExists(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    // console.log(`File ${path} deleted.`);
  }
}

function readCSV(path) {
  const contenido = fs.readFileSync(path, 'utf-8');
  return contenido.trim().split('\n');
}

module.exports = { deleteFileIfExists, readCSV };
