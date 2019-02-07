/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const gm = require('gm')
const fs = require('fs')

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

/**
 * Resizes an image using imagemagick.
 *
 * @param img the image as base64 encoded string
 * @param w the width for the resized image
 * @param h the height for the resized image
 * @return { body: <base64 encoded image resized accordingly in JPEG format.> }
 */
function main({img, w, h}) {
  let data    = new Buffer(img, 'base64')
  let fileSrc = '/tmp/image-src.dat'
  let fileDst = '/tmp/image-dst.dat'

  fs.writeFileSync(fileSrc, data)

  return resize(fileSrc, fileDst, w, h)
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