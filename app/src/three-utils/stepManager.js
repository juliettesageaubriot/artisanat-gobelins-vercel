export default class StepManager {
  constructor(subStep, globalStep) {
    this.subStep = subStep;
    this.globalStep = globalStep;
  }

  addSubStep() {
    this.subStep = this.subStep + 1;
    return this.subStep;
  }

  addGlobalStep() {
    this.globalStep = this.globalStep + 1;
    return this.globalStep;
  }
}