/**
 * 并发调度器，限制同时执行的任务数量
 */
class TaskScheduler {

    constructor(max = 2) {
        this.queue = [];
        this.wait = [];
        this.max = max
    }

    add(task) {
        // const t = Promise.resolve(task)
        if (this.queue.length === this.max) {
            this.wait.push(task)
        } else {
            this.runTask(task);
        }
    }

    runTask(task) {
        this.queue.push(task);
        task().finally(() => {
            const index = this.queue.findIndex(item => item === task);
            this.queue.splice(index, 1);
            if (this.wait.length > 0) {
                this.runTask(this.wait.splice(0,1)[0]);
            }
        });
    }
}


export default TaskScheduler

const scheduler = new TaskScheduler();
scheduler.add(() => new Promise((resolve, reject) => setTimeout(() => { console.log('1');resolve(); }, 1000)))
scheduler.add(() => new Promise((resolve, reject) => setTimeout(() => { console.log('2');resolve(); }, 2000)))
scheduler.add(() => new Promise((resolve, reject) => setTimeout(() => { console.log('3');resolve(); }, 3000)))
scheduler.add(() => new Promise((resolve, reject) => setTimeout(() => { console.log('4');resolve(); }, 5000)))
