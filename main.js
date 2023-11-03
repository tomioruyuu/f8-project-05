let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

//OPEN AND CLOSE TWO MODALS
{
  // hien modal
  let loginBtn = $(".accounts")
  let loginModal = $("#modal-in")
  let signupModal = $("#modal-up")
  let signupBtn = $(".nav-accounts__btn--sign-up")


  //open modal 
  loginBtn.onclick = function() {
    loginModal.classList.add("add")
  }

  signupBtn.onclick = function() {
    signupModal.classList.add("add")
  }

  // close modal
  function remove() {
    loginModal.classList.remove("add")
    signupModal.classList.remove("add")
  }

  let closeBtn = $$(".close-form__icon")
  for(let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", remove)
  }

  loginModal.onclick = function() {
    this.addEventListener("click", remove)
  }

  signupModal.onclick = function() {
    this.addEventListener("click", remove)
  }

  let modalConent = $$(".modal-content")
  for(let i = 0; i < modalConent.length; i++) {
     modalConent[i].onclick = function(e) {
        e.stopPropagation()
      }
  }
  
  // change
  let toSignUp = $(".toSignUpform")
  let toLogin = $(".to-login")

  toSignUp.onclick = function() {
    loginModal.classList.remove("add")
    signupModal.classList.add("add")
  }

  toLogin.onclick = function() {
    loginModal.classList.add("add")
    signupModal.classList.remove("add")
  }
}