const fs = require('fs');
const dbPath="C:\\Users\\Marouane\\Desktop\\EMI 2éme A1P\\promises"

function myDescFilesDataFetcher(id) {
  const mydescriptionregex=new RegExp(`desc_${id}_.*\.json`)
  return fs.readdirSync(dbPath)
  .filter(x=>mydescriptionregex.test(x))
  // .map(x=>JSON.parse(fs.readFileSync(dbPath+"\\"+x,'utf8')))

}

console.log("Here is what we found man");
console.log(myDescFilesDataFetcher("someID"));