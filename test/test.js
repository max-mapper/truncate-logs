var fs = require('fs')
var path = require('path')
var test = require('tape')
var truncate = require('../')

var log = `a
b
c
d
e
f
g
h`
var logA = path.join(__dirname, 'logs', 'a.txt')
var logB = path.join(__dirname, 'logs', 'b.txt')
try {
  fs.unlinkSync(logA)
  fs.unlinkSync(logB)  
} catch (e) {}
fs.writeFileSync(logA, log)
fs.writeFileSync(logB, log)

test('truncates logs', function (t) {
  truncate([logA, logB], {lines: 3}, function (err) {
    t.ifErr(err, 'no error')
    var expected = 'f\ng\nh'
    var A = fs.readFileSync(logA).toString()
    var B = fs.readFileSync(logB).toString()
    t.equal(A.split('\n').length, 3, 'log a = 3 lines')
    t.equal(B.split('\n').length, 3, 'log b = 3 lines')
    t.equal(A, expected)
    t.equal(B, expected)
    t.end()
  })
})