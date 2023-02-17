const TaskQueue = require('./task-queue.js')

class TaskManager {
    constructor() {
        this.asyncQueue = new TaskQueue();
        this.syncQueue= new TaskQueue();
        this.rps = 5000;
        this.init();
    }

    pushAsyncTask(request) {
        this.asyncQueue.enqueue(request);
    }
    pushSyncTask() {
        this.syncQueue.enqueue(request);
    }
    init() {
        setInterval(this.processTask.bind(this),this.rps);
    }
    processTask() {
        if (!this.syncQueue.isEmpty()) {
            let currTask = this.syncQueue.dequeue();
            console.log(currTask.message);
            return
        } if (!this.asyncQueue.isEmpty()) {
            currTask = this.ayncQueue.dequeue();
            console.log(currTask.message);
            return;
        }
        console.log("Both queues are Empty");
    }
}

module.exports = TaskManager