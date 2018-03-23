'use strict';

var PORT = 5001;
var HOST = '127.0.0.1';
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var parsers = serialport.parsers;
var time=0;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var count=0;


var port = new SerialPort('COM6', {
  baudrate: 115200,
 // parser: parsers.readline('\r\n')
});

port.on('open', function() {
	var data = new Buffer("FAFF1000F1", "hex")
	port.write(data, (err) => {
  if (err) { return console.log('Error: ', err.message) }
  console.log('message written');
  });

  console.log('Port open');
});

port.on('data', function(data) {
  
  
  //console.log(data.length);
  
  if(data.length==43){
	  var i =0;
	  var  result = [0.0,0.0,0.0,0.0];
	for(var i = 0; i < 4; i++) {
		var data2=data.slice(19+(i*4),23+(i*4)) 
		var buf = new ArrayBuffer(4);
		var view = new DataView(buf);
		//console.log(data2.length+"data2length");
		data2.forEach(function (b, i) {
			view.setUint8(i, b);
		});
	result[i] = view.getFloat32(0);
	}
count++;
  if(count>50){
    count=0;
    console.log(result);
  }
	server.send(result.join(),PORT,HOST,function(err, bytes) {
		if (err) throw err;
	});
  }
});
