var expect   = require('expect.js');
var splitter = require('../');







describe("A scenario with buffer size expansion", function(){

  var separator = new Buffer([0,0,0,1]);

  var foo = new splitter(separator, {bufferSize : 2} );

  var lb  = null, tick = 0; //last buffer
  foo.on("data", function(foo){
    lb = foo; tick ++;
  });


  it("should parse as requested", function(){
//    foo.write(separator);
    expect(tick).to.be(0);

    foo.write("ok");
    foo.write(separator);

    expect(tick).to.be(1);
    expect("" + lb).to.be("ok");
    
    foo.write("ok");
    expect(tick).to.be(1);
    foo.write(separator);
    expect(tick).to.be(2);
    foo.write("ok");
    foo.write("ok");

    foo.write(separator);
    expect(tick).to.be(3);
    expect("" + lb).to.be("okok");

  });

})






describe("A basic split scenario", function(){
  var separator = new Buffer([0,0,0,1]);
  var foo = new splitter(separator, {
    bufferSize : 10,
  });
  var lb  = null, tick = 0; //last buffer
  foo.on("data", function(foo){
    lb = foo; tick ++;
  });


  it("should parse as requested", function(){
    foo.write(separator);
    expect(tick).to.be(0);

    foo.write("ok");
    foo.write(separator);

    expect(tick).to.be(1);
    expect("" + lb).to.be("ok");
    
    foo.write("ok");
    expect(tick).to.be(1);
    foo.write(separator);
    expect(tick).to.be(2);
    foo.write("ok");
    foo.write("ok");

    foo.write(separator);
    expect(tick).to.be(3);
    expect("" + lb).to.be("okok");

  });

})



describe("A basic split scenario with big buffer", function(){

  var separator = new Buffer([0,0,0,1]);

  var foo = new splitter(separator);
  var lb  = null, tick = 0; //last buffer
  foo.on("data", function(foo){
    lb = foo; tick ++;
  });


  it("should parse as requested", function(){
//    foo.write(separator);
    expect(tick).to.be(0);

    foo.write("ok");
    foo.write(separator);

    expect(tick).to.be(1);
    expect("" + lb).to.be("ok");
    
    foo.write("ok");
    expect(tick).to.be(1);
    foo.write(separator);
    expect(tick).to.be(2);
    foo.write("ok");
    foo.write("ok");

    foo.write(separator);
    expect(tick).to.be(3);
    expect("" + lb).to.be("okok");


    var data = new Buffer("foo");

    var bigdata = Buffer.concat([data, separator, data, data, separator]);
    foo.write(bigdata);
    //foo.write(new Buffer(0));
    expect(tick).to.be(5);
    expect("" + lb).to.be("" + data + data);


  });

})
//var foo = StreamSplitter(separator);





