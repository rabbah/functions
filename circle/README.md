An example function using dynamic module import. It uses a `circle` module
to compute the area and circumference of a circle.


```bash
doctl sls deploy .
doctl sls fn invoke area/circle -p r:10
```
