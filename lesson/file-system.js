const path = require('path');
const fs = require('fs');

console.log('START')

// fs.mkdir(path.resolve(__dirname, 'src'), (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('directory maked')
// });

// fs.rmdir(path.resolve(__dirname, 'src'), (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('dir removed')
// })

// fs.appendFile(path.resolve(__dirname, 'text.txt'), '\nl world', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('file write')
// })

const writeFileAsync = async ( path, data ) => {
  return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
    if (err) {
      return reject(err.message)
    }
    resolve()
  }))
}

const appendFileAsync = async ( path, data ) => {
  return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
    if (err) {
      return reject(err.message)
    }
    resolve()
  }))
}

const readFileAsync = async ( path ) => {
  return new Promise((resolve, reject) => fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      return reject(err.message)
    }
    resolve(data)
  }))
}

const removeFileAsync = async ( path ) => {
  return new Promise((resolve, reject) => fs.rm(path, (err) => {
    if (err) {
      return reject(err.message)
    }
    resolve()
  }))
}


// writeFileAsync(wayPath, 'helloooo')
//   .then(() => appendFileAsync(wayPath, '\nhello hello'))
//   .then(() => appendFileAsync(wayPath, '\nhello wORLd!!'))
//   .then(() => readFileAsync(wayPath))
//   .then(data => console.log(data))
//   .then(() => removeFileAsync(wayPath))
//   .catch(err => console.log('err', err))

const text = process.env.TEXT || '';
const wayPath = path.resolve(__dirname, 'text.txt')

writeFileAsync(wayPath, text)
  .then(() => readFileAsync(path.resolve(__dirname, 'text.txt')))
  .then(data => data.split(' ').length)
  .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Кол-во слов: ${count}.`))
  .then(() => console.log('end'))
  .then(() => removeFileAsync(wayPath))
  .catch(err => console.error(err))