const express = require('express')
const axios = require('axios')
const bp = require('body-parser')
const TaskManager = require('./task-manager.js')

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = 3000

var TaskM = new TaskManager();

var numberAsync = 0
var numberSync = 0

app.post('/async', async (req, res) => {
  let string = "Async request "
  let message = string + numberAsync;
  TaskM.pushAsyncTask({message: req.headers})
  numberAsync+=1;
  res.send({
    'statusCode': 200,
    'body': JSON.stringify({
                  result: response.data,
                })
  })
})

app.post('/sync', async (req, res) => {
  console.log("Sync request received")
  //console.log(req.body);
  let task = {
      headers: req.headers,
      body: req.body,
      res: res      
  } 
  console.log("body: " + req.body);
  console.log("Headers from Request: " + task.headers);
  TaskM.pushSyncTask(task)
  console.log("Sync request pushed to SyncQueue");
  // axios.get('https://catfact.ninja/fact')
  //   .then(response => {
  //       res.send({
  //         'statusCode': 200,
  //         'body': JSON.stringify({
  //                       result: response.data,
  //                     })
  //       })
  //   })
  //   .catch(err => {
  //       // Handle errors
  //       res.send({
  //         "statusCode": 502,
  //         "body": JSON.stringify({
  //           error: err,
  //         })
  //       })
  //       console.error(err);
  //   });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})