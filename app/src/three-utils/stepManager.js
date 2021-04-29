//vendors
import localforage from "localforage";

export default class StepManager {
  constructor(subStep, globalStep) {
    this._subStep = subStep;
    this._globalStep = globalStep;
  }

  addSubStep() {
    this._subStep = this._subStep + 1;
    localforage.setItem("globalStep", this._subStep);
    return this._subStep;
  }

  addGlobalStep() {
    this._globalStep = this._globalStep + 1;
    localforage.setItem("globalStep", this._globalStep);
    return this._globalStep;
  }
}