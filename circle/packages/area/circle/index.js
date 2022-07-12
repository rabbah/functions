const circle = import('./circle.mjs')

async function main(args) {
    const { area, circumference } = await circle

    const r = args.r || 3
    const msg = `Circle with radius ${r} has area: ${area(r)} circunference: ${circumference(r)}`

    return {
        body: msg
    }
}

exports.main = main
