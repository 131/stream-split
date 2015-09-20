# Split stream

A very efficient stream splitter (using buffer delimiters)

Generate a duplex stream (transform) that split your stream into controlled chunks

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
var Split = require('stream-split');
var splitter = new Split(new Buffer("\r\n"));


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



