class TaskManager {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
        return item + ' inserted'
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }
    get printQueue() {
        return this.items;
    }
    init() { 
        const interval = setInterval(function() {
            if (Object.keys(this.items).length === 0) {
                console.log("EMPTY QUEUE");
            }
            let currentReq = this.peek();
            
            console.log(currentReq);
            this.dequeue();
          }, 5000);
    }
    consume() {
        
    }
}
module.exports = TaskManager
