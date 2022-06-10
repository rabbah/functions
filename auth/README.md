An example function that is secured with a special header via the directive `webSecure` in `project.yml`.
The special header `x-require-whisk-auth` must be present with a value specific to a preconfigured secret.
If the secret does not match the expected value, the function is not executed.

```bash
export SECRET=letmein
doctl sls deploy .
curl -H"x-require-whisk-auth: $SECRET" `doctl sls fn get auth/hello --url`
```
