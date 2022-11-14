const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

function getModuleList(cwd) {
  return new Promise((resolve, reject) => {
    exec('npm list --parseable --depth 1000', { cwd }, (err, stdout, stderr) => {
      resolve(stdout.split('\n'))
    })
  })
}

async function scanModules(root) {
  const modules = await getModuleList(root)
  return modules
    .filter(dir => dir != '' && fs.existsSync(path.join(dir, 'package.json')))
    .map(dir => {
      const pkgjsonPath = path.join(dir, 'package.json')
      const { name, version, homepage } = require(pkgjsonPath)
      return { name, version, homepage }
    })
}

const natives = Object
  .keys(process.binding("natives"))
  .filter(_ => _[0] !== '_')
  .map(name => ({ version: 'native', name }))

let installed // cache list

async function main() {
  if (installed === undefined) {
    installed = await scanModules('/')
    installed = natives.concat(installed)
  }

  const result = {
    body: {
      node_version: process.version,
      modules: installed
    }
  }

  return result
}
