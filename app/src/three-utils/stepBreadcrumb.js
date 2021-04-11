//Class stepBreadcrum add +1 to the breadcrumb
export default class StepBreadcrumb {
  constructor(stepBreadcrumbNumber) {
    this.stepBreadcrumbNumber = stepBreadcrumbNumber;
  }

  static AddStep(number) {
    this.stepBreadcrumbNumber = number
    return this.stepBreadcrumbNumber
  }
}