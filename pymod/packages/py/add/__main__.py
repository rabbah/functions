from mymod import myadd

def main(args):
      x = int(args["x"])
      y = int(args["y"])
      result = myadd(x, y)
      return {"body": result}

if __name__ == "__main__":
      print(main({"x": 3, "y": 5}))
