const express = require('express')
const axios = require('axios')
const TaskManager = require('./task-manager.js')

const app = express()
const port = 3000

var TaskM = new TaskManager();

var numberAsync = 0
var numberSync = 0
app.get('/async', async (req, res) => {
  let string = "Async request "
  let message = string + numberAsync;
  await new Promise(resolve => setTimeout(resolve, interval*10));
  TaskM.enqueue({message: message})
  requests+=1;

  axios.get('https://catfact.ninja/fact')
    .then(response => {
        res.send({
          'statusCode': 200,
          'body': JSON.stringify({
                        result: response.data,
                      })
        })
    })
    .catch(err => {
        // Handle errors
        res.send({
          "statusCode": 502,
          "body": JSON.stringify({
            error: err,
          })
        })
        console.error(err);
    });
})

app.get('/sync', async (req, res) => {
  let string = "Sync request "
  let message = string + numberSync;
  await new Promise(resolve => setTimeout(resolve, interval*10));
  TaskM.enqueue({message: message})
  requests+=1;

  axios.get('https://catfact.ninja/fact')
    .then(response => {
        res.send({
          'statusCode': 200,
          'body': JSON.stringify({
                        result: response.data,
                      })
        })
    })
    .catch(err => {
        // Handle errors
        res.send({
          "statusCode": 502,
          "body": JSON.stringify({
            error: err,
          })
        })
        console.error(err);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})