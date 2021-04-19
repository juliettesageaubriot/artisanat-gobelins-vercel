export default class BreadcrumbManager {
  constructor(show, step) {
    this.show = show;
    this.step = step;
  }

   breadcrumbToggle() {
    this.show = !this.show;
    console.log(this.show);

    return this.show
  }

  addStepBreadcrumb() {
    this.step = this.step + 1
    return this.step
  }
}