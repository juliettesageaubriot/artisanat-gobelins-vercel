//vendors
import localforage from "localforage";

export default class StepManager {
  constructor(subStep, globalStep) {
    this.subStep = subStep;
    this.globalStep = globalStep;
  }

  addSubStep() {
    this.subStep = this.subStep + 1;
    localforage.setItem("globalStep", this.subStep);
    return this.subStep;
  }

  addGlobalStep() {
    this.globalStep = this.globalStep + 1;
    localforage.setItem("globalStep", this.globalStep);
    return this.globalStep;
  }
}