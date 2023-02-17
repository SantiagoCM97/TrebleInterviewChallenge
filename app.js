const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

app.get('/', (req, res) => {
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