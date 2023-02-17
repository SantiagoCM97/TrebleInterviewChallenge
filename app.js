const express = require('express')
const axios = require('axios')
const taskManager = require('./task-manager.js')

const app = express()
const port = 3000
let interval = 1000
const tqm = new taskManager();
tqm.init();

app.get('/', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, interval*5));
  tqm.enqueue(req.ip);
  axios.get('https://catfact.ninja/fact')
    .then(response => {
        res.send({
          'statusCode': 200,
          'body': JSON.stringify({
                        result: response.data,
                      })
        })
        console.log(res);
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