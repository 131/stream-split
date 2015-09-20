"use strict";

var Class = require('uclass');
var Transform = require('stream').Transform;
var indexOf = require('nyks/buffer/indexOf');


var Splitter = new Class({
  Extends : Transform,
  initialize : function(separator, options) {
    Transform.call(this);
    if(!options)
      options = {};

    this.offset      = 0;
    this.bodyOffset  = 0;

    this.bufferSize  = options.bufferSize  || 1024 * 1024 * 1  ; //1Mb
    this.bufferFlush = options.bufferFlush || Math.floor(this.bufferSize * 0.1); //10% buffer size

    this.buffer      = new Buffer(this.bufferSize); this.buffer.fill(0);
    this.separator   = separator;
  },

  _transform : function(chunk, encoding, next){

    if (this.offset + chunk.length > this.bufferSize - this.bufferFlush) {
        var minimalLength = this.bufferSize - this.bodyOffset + chunk.length;
        if(this.bufferSize < minimalLength) {
          //console.warn("Increasing buffer size to ", minimalLength);
          this.bufferSize = minimalLength;
        }
          
        var tmp = new Buffer(this.bufferSize);
        this.buffer.copy(tmp, 0, this.bodyOffset);
        this.buffer = tmp;
        this.offset = this.offset - this.bodyOffset;
        this.bodyOffset = 0;
    }

    chunk.copy(this.buffer, this.offset);
    var start = Math.max(this.bodyOffset ? this.bodyOffset : 0, this.offset - this.separator.length),
        stop = this.offset + chunk.length;
    var i = indexOf(this.buffer, this.separator, start, stop);


    if (i == -1) {
      this.offset += chunk.length;
    } else {
      var img = this.buffer.slice(this.bodyOffset, i);
      this.push(img);
      this.bodyOffset = i + this.separator.length;
      this.offset += chunk.length;
    }

    next();
  },

});



module.exports = Splitter;