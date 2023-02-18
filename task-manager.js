const TaskQueue = require('./task-queue.js')
const axios = require('axios');
let url = '';

class TaskManager {
    constructor() {
        this.asyncQueue = new TaskQueue();
        this.syncQueue = new TaskQueue();
        this.rps = 3000;
        this.init();
    }

    pushAsyncTask(request) {
        this.asyncQueue.enqueue(request);
    }
    pushSyncTask(request) {
        this.syncQueue.enqueue(request);
    }
    init() {
        setInterval(this.processTask.bind(this), this.rps);
    }
    processTask() {
        if (!this.syncQueue.isEmpty()) {
            // let currTask = this.syncQueue.dequeue();
            // //console.log(currTask);
            // currTask.res.send({
            //     "statusCode": 200,
            //     "message": "Response to Sync Request!"
            // })
            let handler = this.handleSync.bind(this);
            handler();
            return
        } if (!this.asyncQueue.isEmpty()) {

        }
        console.log("Both queues are Empty");
    }

    async handleSync() {
        let currTask = this.syncQueue.dequeue();
        let inTime = true;
        const promise1 = postMockResponse();
        const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
                resolve( {
                    "statusCode": 429,
                    "body": "{}"
                })
            }, 5000);
            reject();
        })
        let process = await Promise.race([promise1, promise2]);
        console.log(process);
        currTask.res.send(process)

        // axios.get('https://catfact.ninja/fact', {timeout: 25000})
        //     .then(response => {
        //         //console.log(currTask.body);
        //         currTask.res.send(response.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         //Handle errors
        //         res.send(err);
        //         console.error(err);
        //     });
    }
    async handleAsync() {
        let currTask = this.asyncQueue.dequeue();
        axios.post(
            url,
            { "body": currTask.body },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(currTask.message);
        return;
    }
}

function postMockResponse() {
    return new Promise((resolve, reject) => {
        setTimeout(11000);
        resolve({
            statusCode: 200,
            body: "Success response mock"
        })
    }) 

}

module.exports = TaskManager