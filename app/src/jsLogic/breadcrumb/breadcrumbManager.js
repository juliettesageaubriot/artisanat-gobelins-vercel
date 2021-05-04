export default class BreadcrumbManager {
  constructor(show, atelierName) {
    this.show = show;
    this.atelierName = atelierName
  }

  breadcrumbToggle() {
    this.show = !this.show;
    console.log(this.show);

    return this.show
  }

  changeNameAtelier(name) {
    const breadcrumbTitle = document.querySelector(".breadcrumb-title")
    breadcrumbTitle.innerHTML = name
  }
}