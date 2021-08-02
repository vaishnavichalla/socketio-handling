const server = require('http').createServer();

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

io.on('connection', (client) => {
  
    console.log("A client connected!")
    client.on("args", (arg1, arg2, arg3) => {
      //console.log(arg1 + " "+ arg2 + " "+ arg3)
      if(typeof(arg1)!== "undefined" && typeof(arg2)!== "undefined" && typeof(arg3)!== "undefined")
      {if(arg1=== "" || arg2=== "" || arg3=== ""){
        client.emit("args","Some/all of the arguments sent are empty, please try again!")
      }
      else{var temp = getRandomNumber(8)
        client.emit("args","The args you have sent are : \n"+ arg1 + ",\n" + arg2 + ",\n" +arg3 + ".\n" + "Event successfully handled by sending 3 arguments\n" + "Your code for this task is "+ temp + " 🎉🎉🎉🎉");

      }
        
      }
      
      else{
        client.emit("args","Arguments not sent properly, please try again!")
      }
      
    });
    
    // or with acknowledgement
    client.on("ack", (data, callback) => {
      if(data ==="postman"){
        var temp = getRandomNumber(8)
        callback("Event successfully handled with acknowledgement!! Your code for this task is "+ temp + " 🎉🎉🎉🎉");
      }
      else{
        callback("The data sent is not 'postman', please try again")
      }
      
    });

});
const port = process.env.PORT || 5000;
server.listen(port);
console.log("Server started on Port : " + port)

function getRandomNumber(digit) {
  return Math.random().toFixed(digit).split('.')[1];
}