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

// change position of line when scroll
function scrollToChange(navListItem, underline) {
  let line = $(underline);
  let navChange = $$(navListItem);

  window.onscroll = function () {
    let position = window.scrollY;
    let y = Math.floor(position);
    if (y < 764) {
      line.style.left = 24 + "px";
      line.style.width = navChange[0].offsetWidth - 48 + "px";
    } else if (y < 1472) {
      line.style.left = navChange[1].offsetLeft + 24 + "px";
      line.style.width = navChange[1].offsetWidth - 48 + "px";
    } else if (y < 3856) {
      line.style.left = navChange[2].offsetLeft + 24 + "px";
      line.style.width = navChange[2].offsetWidth - 48 + "px";
    } else {
      line.style.left = navChange[3].offsetLeft + 24 + "px";
      line.style.width = navChange[3].offsetWidth - 48 + "px";
    }
  };
}

function isRequired(selector) {
  return {
    selector,
    test(value) {
      return value.trim() ? undefined : "Please enter this information";
    },
  };
}

function isEmail(selector) {
  return {
    selector,
    test(value) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
        ? undefined
        : "Please enter exactly your email";
    },
  };
}

function isPassword(selector) {
  return {
    selector,
    test(value) {
      let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
      return regex.test(value.trim())
        ? undefined
        : "Minimum eight characters, at least one character and one number";
    },
  };
}

function isConfirmPass(selector) {
  return {
    selector,
    test(value) {
      let password = document.querySelector("#password-up").value;
      console.log(password);
      return password == value
        ? undefined
        : "The information you just entered does not match";
    },
  };
}

function Validation(info) {
  // get form element
  let formElement = $(info.form);

  // another function
  function getParents(inputElement) {
    while (inputElement.parentNode) {
      if (inputElement.parentNode.matches(".form-item")) {
        return inputElement.parentNode;
      }
      inputElement = inputParent.parentNode;
    }
  }

  function validation(inputElement, inputParent, rules) {
    let inputValue = inputElement.value;

    let errMessage;

    for (let i = 0; i < rules.length; i++) {
      if (inputElement == document.querySelector(rules[i].selector)) {
        errMessage = rules[i].test(inputValue);
        if (errMessage) break;
      }
    }

    if (errMessage) {
      console.log(errMessage);
      inputParent.classList.add("invalid");
      inputParent.querySelector(".err-message").innerText = errMessage;
    } else {
      inputParent.classList.remove("invalid");
      inputParent.querySelector(".err-message").innerText = "";
    }
    return errMessage;
  }

  if (formElement) {
    let inputElements = formElement.querySelectorAll("input");
    Array.from(inputElements).forEach((inputElement) => {
      inputElement.onblur = function () {
        let inputParent = getParents(this);
        validation(this, inputParent, info.rules);
      };
      inputElement.oninput = function () {
        let inputParent = getParents(this);
        console.log("thanh");
        inputParent.classList.remove("invalid");
        inputParent.querySelector(".err-message").innerText = "";

      };
    });
    let submitForm = $(".signUp-btn")
    submitForm.onclick = function () {
      Array.from(inputElements).forEach((inputElement) => {
        let inputParent = getParents(inputElement);
        
      })
    }
    
  }
}

function start() {
  changeNavigation(".nav-list li", ".underline");
  scrollToChange(".nav-list li", ".underline");
  Validation({
    form: "#modal-up",
    rules: [
      isRequired("#name"),
      isRequired("#email-up"),
      isEmail("#email-up"),
      isRequired("#password-up"),
      isPassword("#password-up"),
      isRequired("#confirm-pass"),
      isConfirmPass("#confirm-pass ")
    ],
  });
}

start();
