'use strict'

const request = require('needle')
const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs')

// resize images
function main(args) {
  let url     = args.url
  let w       = parseInt(args.w || 128)
  let h       = parseInt(args.h || 128)
  let fileSrc = '/tmp/image-src.dat'
  let fileDst = '/tmp/image-dst.dat'

  if (url == undefined) {
      return {
        body: 'You did not provide a URL.'
      }
  }

  return request('get', url)
  .then(response => {
    fs.writeFileSync(fileSrc, response.body)
  })
  .then(_ => {
    return resize(fileSrc, fileDst, w, h)
  })
  .then(_ => {
    let data = fs.readFileSync(fileDst)
    return {
      headers: { 'content-type': 'image/jpeg' },
      body: data.toString('base64')
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

function resize(fileSrc, fileDst, w, h) {
  return new Promise(function(resolve, reject) {
    gm(fileSrc).resize(w, h).write(fileDst, function(err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

if (process.env.TEST) {
  let url = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
  main({url: i, w: 128, h: 128}).then(console.log)
}
