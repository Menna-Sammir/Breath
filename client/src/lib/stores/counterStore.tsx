import { makeAutoObservable } from "mobx";

export default class CounterStore {
  title = "Counter Store";
  count = 0;
  events: string[] = [`Initialized counter with count ${this.count} `];
  constructor() {
    makeAutoObservable(this);
  }

  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`Incremented counter by ${this.count}`);
  };

  decrement = (amount = 1) => {
    this.count -= amount;
    this.events.push(`Decremented counter by ${this.count}`);
  };

  get eventCount() {
    return this.events.length;
  }
}
