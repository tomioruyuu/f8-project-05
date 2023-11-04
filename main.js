let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

//OPEN AND CLOSE TWO MODALS
{
  // hien modal
  let loginBtn = $(".accounts");
  let loginModal = $("#modal-in");
  let signupModal = $("#modal-up");
  let signupBtn = $(".nav-accounts__btn--sign-up");

  //open modal
  loginBtn.onclick = function () {
    loginModal.classList.add("add");
  };

  signupBtn.onclick = function () {
    signupModal.classList.add("add");
  };

  // close modal
  function remove() {
    loginModal.classList.remove("add");
    signupModal.classList.remove("add");
  }

  let closeBtn = $$(".close-form__icon");
  for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", remove);
  }

  loginModal.onclick = function () {
    this.addEventListener("click", remove);
  };

  signupModal.onclick = function () {
    this.addEventListener("click", remove);
  };

  let modalConent = $$(".modal-content");
  for (let i = 0; i < modalConent.length; i++) {
    modalConent[i].onclick = function (e) {
      e.stopPropagation();
    };
  }

  // change
  let toSignUp = $(".toSignUpform");
  let toLogin = $(".to-login");

  toSignUp.onclick = function () {
    loginModal.classList.remove("add");
    signupModal.classList.add("add");
  };

  toLogin.onclick = function () {
    loginModal.classList.add("add");
    signupModal.classList.remove("add");
  };
}

// CHANGE NAVIGATION AFTER CLICK THE CONTENT
function changeNavigation(navListItem, underline) {
  let navChange = $$(navListItem);
  let line = $(underline);

  // set width and posotion for first element
  {
    line.style.width = navChange[0].offsetWidth - 48 + "px";
    line.style.left = 24 + "px";
  }

  for (let i = 0; i < navChange.length; i++) {
    navChange[i].onclick = function () {
      for (let j = 0; j < navChange.length; j++) {
        if (navChange[j].classList.contains("bold")) {
          navChange[j].classList.remove("bold");
        }
      }
      this.classList.add("bold");

      // change width and position
      {
        line.style.left = navChange[i].offsetLeft + 24 + "px";
        line.style.width = navChange[i].offsetWidth - 48 + "px";
      }
    };
  }
}

changeNavigation(".nav-list li", ".underline")