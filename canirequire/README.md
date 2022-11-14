This project provides an API to retrieve the list of installed Node.js packages
available in the default Node.js runtime image.

## Web component

The front-end is deployed under a web folder `/canirequire`. It is adapted
from [this app](https://github.com/tehsis/webtaskio-canirequire). The front-end
is optional for on-prem deployments.

## API definition

#### Get list of packages

```
GET /api/default/canirequire
```

##### Response Fields

This is an synchronous API with status code equal to one of the following.

- `200`: OK
- `502`: internal error

##### Response Fields for status code 200

- `node_version`: string

  The Node.js version.

- `modules`: array of packages available

  Each entry in the array has the following schema:
  ```
  {
    name: string,
    version: string,
    homepage?: string
  }
  ```
  - The `name` is the name of the package.
  - The `version` is the semantic version determined from `package.json` for the package.
  - The `homepage` is the URL for the package, if present in `package.json` for the package.

##### Response Fields for all other status codes

- `error`: a description of the error
