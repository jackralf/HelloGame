
var WebSocket = require('ws');
var ws = new WebSocket("ws://127.0.0.1:8080/");     
    
ws.onopen = function() {    
   ws.send("I'm client");    
};    
    
ws.onmessage = function (evt) {     
    console.log(evt.data);    
};    
    
ws.onclose = function() {    
   console.log("Closed");    
};    
    
ws.onerror = function(err) {    
   console.log("Error: " + err);    
};
