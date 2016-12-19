#!/usr/bin/env node

var truncate = require('./index.js')
var args = require('minimist')(process.argv.slice(2))

truncate(args._, args, function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
