export default class BreadcrumbManager {
  constructor(show, atelierName) {
    this.show = show;
    this.atelierName = atelierName
  }

  breadcrumbToggle() {
    this.show = !this.show;
    // console.log(this.show);

    return this.show
  }

  breadcrumbStep(number) {
    const breadcrumbElm = document.querySelector('.breadcrumb_container')
    let breadcrumbUl = document.querySelector('.list-breadcrumb')
    let li = breadcrumbUl.childNodes[number]
    breadcrumbElm.setAttribute('data-step', number)

    // Si jamais les designs veulent changer la couleurs quand ça a été actif
    // if(this.addStepManager.globalStep > ateliersNumber) return
    // li.classList.add('actived')

  }

  changeNameAtelier(name) {
    const breadcrumbTitle = document.querySelector(".breadcrumb-title")
    breadcrumbTitle.innerHTML = name
  }
}