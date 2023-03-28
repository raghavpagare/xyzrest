const express = require("express");

const app = express();

app.use(express.static("./public"));

// mqtt code


const mqtt = require('mqtt');
let options = {
    host: 'b828e0a3533442e38f99d1d73736d077.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'xyzrest',
    password: 'Golu@123'
}

// initialize the MQTT client
let client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('tableNumber');

// publish message 'Hello' to topic 'my/test/topic'
app.get("/placeOrder/:tableNumber", (req, res) => {
    let tableNumber = req.params.tableNumber;
    
    client.publish('tableNumber', `${tableNumber}`);
    res.json({message: "Ordered Successfully"});
})


app.listen(8080);