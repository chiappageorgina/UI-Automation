const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function createCSVWriter(path) {
  return createCsvWriter({
    path,
    header: [
      { id: 'name', title: 'Name' },
      { id: 'price', title: 'Price' },
      { id: 'fullLink', title: 'Link' }
    ]
  });
}

async function saveProductsToCSV(products, path) {
  const writer = createCSVWriter(path);
  await writer.writeRecords(products);
}

module.exports = { saveProductsToCSV };
