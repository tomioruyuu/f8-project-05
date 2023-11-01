let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

{
  // hien modal
  let loginBtn = $(".accounts")
  let loginModal = $(".modal-in")
  loginBtn.onclick = function() {
    loginModal.classList.add("add")
  }

  // xoa modal
  function remove() {
    loginModal.classList.remove("add")
  }

  let closeBtn = $(".close-form__icon")
  closeBtn.addEventListener("click", remove)

  loginModal.onclick = function() {
    this.addEventListener("click", remove)
  }

  $(".modal-in__content").onclick = function(e) {
    e.stopPropagation()
  }
}