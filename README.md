### Collection of useful OpenWhisk functions

#### Resize an image

[resize-url.js](resize-url.js) is a function to resize an image, using [gm](https://www.npmjs.com/package/gm).

The function expects the following parameters:
 * `img` the image as base64 encoded string
 * `w` the width for the resized image
 * `h` the height for the resized image

The result is a base 64 encoded string that represents the resized image in JPEG format.

Create an OpenWhisk function using the `wsk` CLI:
```bash
  wsk action create resize resize.js
```
