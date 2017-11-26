const config = require('../package.json')
let version = config.version.split('.')

if (process.env.TRAVIS_BUILD_NUMBER) {
  version[version.length - 1] = process.env.TRAVIS_BUILD_NUMBER
}

process.stdout.write(`v${version.join('.')}`)
