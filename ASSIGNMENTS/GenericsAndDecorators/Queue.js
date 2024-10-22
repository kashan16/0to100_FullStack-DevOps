var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
        this.head = 0;
        this.tail = 0;
    }
    Queue.prototype.push = function (val) {
        this.items[this.head] = val;
        this.head += 1;
    };
    Queue.prototype.pop = function () {
        if (this.tail === this.head) {
            return undefined;
        }
        var item = this.items[this.tail];
        this.tail += 1;
        if (this.tail === this.head) {
            this.items = [];
            this.head = 0;
            this.tail = 0;
        }
        return item;
    };
    return Queue;
}());
var queue = new Queue();
queue.push(1);
queue.push(2);
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
