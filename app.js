const express = require('express')
const axios = require('axios')
const bp = require('body-parser')
const TaskManager = require('./task-manager.js')
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = 3000

var TaskM = new TaskManager();

app.post('/async', async (req, res) => {
  console.log("Async request received")
  let headers = JSON.stringify(req.headers);
  let task = {
      id: uuidv4(),
    // add unique id for dead tasks reference
      headers: headers,
      body: req.body,
      res: res      
  } 
  console.log("body: " + req.body);
  console.log("Headers from Request: " + task.headers);
  TaskM.pushAsyncTask(task)
  res.send({
    'statusCode': 200,
    'body': {}
  })
})

app.post('/sync', async (req, res) => {
  console.log("Sync request received")
  let headers = JSON.stringify(req.headers);
  let task = {
      id: uuidv4(),
    // add unique id for dead tasks reference
      headers: headers,
      body: req.body,
      res: res      
  } 
  console.log("body: " + req.body);
  console.log("Headers from Request: " + task.headers);
  TaskM.pushSyncTask(task)

  let seconds = 0;
  setInterval(() => {
    if (seconds < 24) {
      seconds++;
      return;
    }
    TaskM.expireTaskById(task.id);
  }, 1000)

  console.log("Sync request pushed to SyncQueue");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})