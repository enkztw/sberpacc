class Counter {
    count = 0;

    add() {
        this.count++;
    }
}

class Clock extends Counter {
    ticktock() {
        setInterval(() => {
            this.add();
            console.log(this.count);
        }, 1000);
    }
}


const counter = new Counter();
const clock = new Clock();
clock.ticktock();