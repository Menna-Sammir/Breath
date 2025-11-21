import { makeAutoObservable } from "mobx";

export class UiStore {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // mark UI as busy (show loader)
  isBusy() {
    this.isLoading = true;
  }

  // mark UI as idle (hide loader)
  isIdle() {
    this.isLoading = false;
  }
}
