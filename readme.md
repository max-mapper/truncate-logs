# truncate-logs

CLI/JS module for truncating the beginning of a set of files easily. specify how many lines at the end of the file to keep, all files at the beginning will be truncated. implementation copies last N lines to a tmp file then replaces the original file, so it effectively in-place truncates the files.

# usage

### cli

```
npm i truncate-logs run-every -g
run-every 86400 truncate-logs --lines=5000 *.log
# default --lines value is 100000
```

### js

```js
var truncate = require('truncate-logs')
var opts = {lines: 500} // keep last 500 lines, default is 100000

// you can specify an array of filenames
truncate(['foo.txt', 'bar.txt'], opts, function (err) {

})

// or you can pass a string and it will be globbed
truncate('*.log', opts, function (err) {

})
```
