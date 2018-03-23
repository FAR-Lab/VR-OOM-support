
var PORT = 5000;
var HOST = '127.0.0.1';

var time=0;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var count=0;

var OBDReader = require('serial-obd');
var options = {};
options.baudrate = 115200;
var serialOBDReader = new OBDReader("COM7", options);
var dataReceivedMarker = {};
var pollingRate = 50; //polling rate in ms

serialOBDReader.on('dataReceived', function (data) {

    dataReceivedMarker = data;

    count++;
    if(count>50){
      count=0;
      console.log(data.pid+"pid & speed"+data.value);

    }

    if(data.name == 'vss'){
  //  console.log("speed"+data.value);
    server.send(''+data.value,PORT,HOST,function(err, bytes) {
      if (err) throw err;
    });
  }
});

serialOBDReader.on('connected', function (data) {
    this.addPoller("vss"); //vehicles speed
    //this.addPoller("rpm"); //engine RPM
    //this.addPoller("throttlepos"); //Absolute throttle position [1 - 100]
    // this.addPoller("temp");
    // this.addPoller("load_pct");
    // this.addPoller("map");
    // this.addPoller("frp");

    this.startPolling(pollingRate); //Polls all added pollers at given rate.
});


serialOBDReader.connect();
