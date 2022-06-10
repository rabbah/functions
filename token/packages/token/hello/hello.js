function hasBearerToken(headers) {
  const authHeader = (headers || {}).authorization
  if (authHeader && typeof authHeader === 'string') {
    if (authHeader.startsWith('bearer ') || authHeader.startsWith('Bearer ')) {
      return {
        bearer: true,
        valid: true,
        token: authHeader.substr(7)
      }
    } else {
      return {
        bearer: true,
        valid: false
      }
    }
  } else {
    return {
      bearer: false
    }
  }
}

function main(args) {
    const header = hasBearerToken(args.__ow_headers)
    if (header.bearer && header.valid && header.token == process.env.SECRET) {
        return {
            body: 'Authorized'
        }
    } else {
        return {
            statusCode: 401,
            body: 'Not Authorized'
        }
    }
}
