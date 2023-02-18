const TaskQueue = require('./task-queue.js')
const axios = require('axios');
let url = 'http://18.116.162.29:3300/';

class TaskManager {
    constructor() {
        this.asyncQueue = new TaskQueue();
        this.syncQueue = new TaskQueue();
        this.expiredReqs = {}
        this.rps = 250;
        this.init();
    }

    pushAsyncTask(request) {
        this.asyncQueue.enqueue(request);
    }
    pushSyncTask(request) {
        this.syncQueue.enqueue(request);
    }
    expireTaskById(id) {
        this.expiredReqs[id] = true;
    }
    init() {
        setInterval(this.processTask.bind(this), this.rps);
    }
    processTask() {
        if (!this.syncQueue.isEmpty()) {
            let handler = this.handleSync.bind(this);
            handler();
            return
        } if (!this.asyncQueue.isEmpty()) {
            let handler = this.handleAsync.bind(this);
            handler();
            return
        }
        console.log("Both queues are Empty");
    }

    async handleSync() {
        let currTask = this.syncQueue.dequeue();
        if (this.expiredReqs[currTask.id]) {
            currTask.res.send({
                "statusCode": 429,
                "body": "{}"
            })
            delete this.expiredReqs[currTask.id];
            return;
        }
        axios.post(url, { "body": currTask.body }, { headers: currTask.headers })
            .then(response => {
                //console.log(currTask.body);
                currTask.res.send(response.data);
            })
            .catch(err => {
                console.log(err);
                //Handle errors
                currTask.res.send(err);
                console.error(err);
            });
    }
    async handleAsync() {
        let currTask = this.asyncQueue.dequeue();
        axios.post(url,{ "body": currTask.body },{headers: currTask.headers});
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