export default class BreadcrumbManager {
  constructor(show, step, atelierName) {
    this.show = show;
    this.step = step;
    this.atelierName = atelierName
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

  changeNameAtelier(name) {
    const breadcrumbTitle = document.querySelector(".breadcrumb-title")
    breadcrumbTitle.innerHTML = name
  }
}