const express = require('express')
const axios = require('axios')
const taskManager = require('./task-manager.js')

const app = express()
const port = 3000
const tqm = new taskManager();

function consume(task_manager) {
  if (task_manager.isEmpty()) {
      console.log("EMPTY QUEUE");
      return;
  }
  let currentReq = task_manager.peek();
  console.log("current peek: " + currentReq.request);
  task_manager.dequeue();
}

setInterval(consume, 5000, tqm);

var requests = 0;
var interval = 1000;

app.get('/', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, interval*10));
  tqm.enqueue({request: requests});
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