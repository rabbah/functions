An example function that is secured with a bearer token. The token may be an OAuth bearer token or JWT.
In this example the bearer token secret value is configured as an environment variable called `SECRET` specified at deploy time.

```bash
export SECRET=letmein
doctl sls deploy .

# will return 200 OK with the message 'Authorized'
curl -H"Authorization: Bearer $SECRET" `doctl sls fn get token/hello --url`

# will return 401 Not Authorized
curl -v -H"Authorization: Bearer nope" `doctl sls fn get token/hello --url`
```
