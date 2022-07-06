function main(args) {
    return {
        body: {
            args,
            env: process.env
        }
    }
}

