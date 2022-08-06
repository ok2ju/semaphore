class Semaphore {
  constructor(capacity = 1) {
    this.capacity = capacity;
    this.active = 0;
    this.queue = [];
  }

  take(func) {
    this.queue.push(func);
    this.try();
  }

  try() {
    if (this.active === this.capacity || !this.queue.length) {
      return;
    }

    const func = this.queue.shift();
    this.active++;

    if (func) {
      func(this.done.bind(this));
    }
  }

  done() {
    this.active--;
    this.try();
  }
}

// Test
const semaphore = new Semaphore(3);

for (let i = 0; i < 10; i++) {
  semaphore.take((done) => {
    console.log(`Starting task #${i + 1}`);

    setTimeout(done, 5000);
  });
}