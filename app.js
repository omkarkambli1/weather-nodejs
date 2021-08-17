const express = require('express');
var mqtt = require('mqtt')
const app = express();
const fetch=require('node-fetch')


var client  = mqtt.connect('mqtt://test.mosquitto.org')

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// Import Route
const weatherRoute = require('./routes/weather');


client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (!err) {
        client.publish('presence', 'Hello mqtt');
        client.publish('hero','hello hero')

// Use View Engine
app.set('view engine', 'ejs');


// Middleware route
app.use('/', weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server starting at port ${PORT}`)
  });


var cur=new Date();
var dd= cur.getDate();
var mm=cur.getMonth()+1;
var yyyy=cur.getFullYear();


var pre=new Date();
pre.setDate(cur.getDate()-3);
var ddr=pre.getDate();
var mmr=pre.getMonth()+1;
var yyyyr=pre.getFullYear();
if(dd<10) 
    {
    dd='0'+dd;
    } 

if(mm<10) 
    {
    mm='0'+mm;
    } 

if(ddr<10) 
    {
    dd2='0'+ddr;
    } 

if(mmr<10) 
    {
    mmr='0'+mmr;
    } 
cur= yyyy+'-'+mm +'-'+dd;
pre= yyyyr+'-'+mmr+'-'+ddr;
console.log(cur)
console.log(pre)


app.get('/mumbaidata',async(req,response)=>{
  const url1=`https://api.weatherbit.io/v2.0/history/daily?city=Mumbai&start_date=${pre}&end_date=${cur}&key=51cd5c19ccda4d9ea773b6aeafa657f8`;  
  const fetch_response1=await fetch(url1);
  const json1 =await fetch_response1.json();
  response.json(json1);
})

app.get('/delhidata',async(req,response)=>{
  const url2=`https://api.weatherbit.io/v2.0/history/daily?city=Delhi&start_date=${pre}&end_date=${cur}&key=51cd5c19ccda4d9ea773b6aeafa657f8`;
  const fetch_response= await fetch(url2);
  const json = await fetch_response.json();
  response.json(json);
})

app.get('/indoredata',async(req,response)=>{
  const url3=`https://api.weatherbit.io/v2.0/history/daily?city=Indore&start_date=${pre}&end_date=${cur}&key=51cd5c19ccda4d9ea773b6aeafa657f8`;
  const fetch_response= await fetch(url3);
  const json = await fetch_response.json();
  response.json(json);
})

app.get('/graph',(req,res)=>{
  res.sendFile(__dirname +'/views/graph.html');

})

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found" 
    })
});

    }
  })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    //client.end()
  })
  