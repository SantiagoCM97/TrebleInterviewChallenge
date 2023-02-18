let axios = require('axios');

var d = Date(Date.now());
a = d.toString()
console.log("Test 2-A - The current date is: " + a);

async function test2() {
    for (let i = 0; i <= 250; i++) {
        await axios.post('https://7vhyyuu9sa.execute-api.us-east-2.amazonaws.com/Prod/sync', {
            "body": {
                "message": "Sync Request #" + i,
            }
        }).then(res => console.log("Request-A #" + i + " /n " + JSON.stringify(res.data.body)))
        .catch(error => console.log("Request-A #" + i + " /n " + JSON.stringify(error.request))) 
    };
}
// This works
(async () => {
    try {
        await test2()
    } catch(err) {
        console.error('something happened');
    }
    var finaltime = Date(Date.now());
    b = finaltime.toString()
    console.log("Test 2-A - The End date is: " + b);
})()