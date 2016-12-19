var fs = require('fs')
var os = require('os')
var path = require('path')
var glob = require("glob")
var pump = require('pump')
var sf = require('slice-file')
var series = require('run-series')

var tmpdir = os.tmpdir()

module.exports = function (files, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (!opts) opts = {}
  
  if (files[0].indexOf('*') > -1) {
    glob(files[0], function (err, globbed) {
      if (err) return cb(err)
      if (!globbed.length) return cb()
      truncateAll(globbed, cb)
    })
  } else {
    truncateAll(files, cb)
  }

  function truncateAll (files, cb) {
    var items = files.map(function (f) {
      return function (cb) {
        truncate(f, cb)
      }
    })

    series(items, cb)
  }
  
  function truncate (file, cb) {
    var xs = sf(file)
    var tmp = path.join(tmpdir, path.basename(file) + '.tmp')
    var lines = -100000
    if (opts.lines) lines = -opts.lines
    var read = xs.slice(lines)
    var write = fs.createWriteStream(tmp)
    pump(read, write, function (err) {
      if (err) return cb(err)
      fs.rename(tmp, file, cb)
    })
  }
}