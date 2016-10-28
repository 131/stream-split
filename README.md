# Split stream

A very efficient stream splitter (using buffer delimiters)

Generate a duplex stream (transform) that split your stream into controlled chunks

[![Build Status](https://travis-ci.org/131/stream-split.svg?branch=master)](https://travis-ci.org/131/stream-split)
[![Coverage Status](https://coveralls.io/repos/github/131/stream-split/badge.svg?branch=master)](https://coveralls.io/github/131/stream-split?branch=master)
[![Version](https://img.shields.io/npm/v/stream-split.svg)](https://www.npmjs.com/package/stream-split)


# Api
```
var Split    = require('stream-split');
var splitter = new Split(buffer_separator[, options]);


  //target will receive "buffer_separator" separated chunks
somestream.pipe(splitter).pipe(target);


var options = {
  //bufferSize  : internal buffer size (default to 1 Mb)
};

```


## Options
* bufferSize 
`stream-split` use efficiant buffer copy policy (instead of merging/concat temporary chunk).
This value is an indication on what the working page size might be.
If needed, this value WILL change according to data.


# Example
```
const Split = require('stream-split');
const splitter = new Split(new Buffer("\r\n"));


splitter.on("data", function(){
  //got chunk
});


splitter.write("ok");
splitter.write("\r\n"); //got chunk
splitter.write("ok");
```


# Tests
```
npm test
```

Run tests for mocha result & istanbul (100%) coverage



