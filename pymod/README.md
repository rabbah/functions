An example function a helper function `myadd` from a Python module called `mymod.py` is imported by the
main Functions handler in `__main__.py`. The handler receives two arguments `x` and `y` and returns their
sum.

The code may be tested locally by running `__main__.py`. The [hardcoded test addds `3` and `5`](https://github.com/rabbah/functions/blob/a245451c90a813a288a21959e80089af51153b82/pymod/packages/py/add/__main__.py#L9-L10)
and this code will not run as part of the Function handler.
```bash
python packages/py/add/__main__.py 
{'body': 8}
```

To deploy and run the project as a Function use the `doctl` CLI.

```bash
doctl sls deploy .
doctl sls functions invoke py/add -p x:3 -p y:4
```
