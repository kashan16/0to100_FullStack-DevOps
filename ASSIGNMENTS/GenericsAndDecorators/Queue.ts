//Generic class template to implement a Queue

class Queue<T> {
    private items : T[] = [];
    private head : number = 0;
    private tail : number = 0;

    push(val : T) {
        this.items[this.head] = val;
        this.head += 1;
    }

    pop() : T | undefined {
        if(this.tail === this.head) {
            return undefined;
        } 
        const item = this.items[this.tail];
        this.tail += 1;

        if(this.tail === this.head) {
            this.items = [];
            this.head = 0;
            this.tail = 0;
        }

        return item;
    }
}

const queue = new Queue<number>();
queue.push(1);
queue.push(2);
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());