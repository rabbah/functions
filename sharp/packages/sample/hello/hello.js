const sharp = require('sharp')
const axios = require('axios')

async function main(args) {
    let input = await axios({ url: args.url, responseType: 'arraybuffer' })
    input = Buffer.from(input.data, "utf-8")
    const output = await sharp(input).resize({ width: 100 }).png().toBuffer()
    return {
        headers: { 'Content-Type': 'image/png' },
        statusCode: 200,
        body: output.toString('base64')
    }
}

module.exports.main = main

if (process.env.TEST) {
    main({
        url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        //url: 'https://images.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg'
    }).then(console.log).catch(console.log)
}
