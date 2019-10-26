const counter = {
    count: 0,
    add() {
        this.count++;
    }
};


const clock = {
    ticktock() {
        setInterval(() => {
            this.add.call(counter);
        }, 1000);
    }
};

Object.setPrototypeOf(clock, counter);

// clock.ticktock();

counter.count = 3600;

// setInterval(() => {
//     console.log(counter.count);
// }, 1000);

