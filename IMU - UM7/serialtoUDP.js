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


var port = new SerialPort('COM5', {
  baudrate: 115200,
  parser: parsers.readline('\r\n')
});

port.on('open', function() {
  console.log('Port open');
});

port.on('data', function(data) {
  count++;
  if(count>50){
    count=0;
    console.log(data);
  }
  server.send(data,PORT,HOST,function(err, bytes) {
    if (err) throw err;
  });
});
