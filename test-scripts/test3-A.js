let axios = require('axios');

var d = Date(Date.now());
a = d.toString()
console.log("The current date is: " + a);
for (let i = 0; i <= 250; i++) {
    axios.post('https://7vhyyuu9sa.execute-api.us-east-2.amazonaws.com/Prod/async', {
        "body": {
            "message": "Async Request #" + i,
        }
    });
    console.log("Async Request #" + i);
};
var finaltime = Date(Date.now());
b = finaltime.toString()
console.log("Test 3-A - The End date is: " + b);