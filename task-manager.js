const TaskQueue = require('./task-queue.js')

class TaskManager {
    constructor() {
        this.asyncQueue = new TaskQueue();
        this.syncQueue= new TaskQueue();
        this.rps = 260;
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
    processTask(task_manager) {
        if (task_manager.isEmpty()) {
            console.log("EMPTY QUEUE");
            return;
        }
        let currentReq = task_manager.peek();
        console.log("current peek: " + currentReq.request);
        task_manager.dequeue();
    }
}

module.exports = TaskManager