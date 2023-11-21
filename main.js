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

// change position of line when scroll
function scrollToChange(navListItem, underline) {
  let line = $(underline);
  let navList = $$(navListItem);

  // set default value for underline
  {
    line.style.width = navList[0].offsetWidth - 48 + "px";
    line.style.left = 24 + "px";
  }

  let mainItem = $$(".main-item");
  let options = {
    root: null,
    rootMargin: "150px",
    threshold: 1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio === 1) {
        navList.forEach((item) => {
          let li = item.parentNode;
          li.classList.remove("bold");
          let href = item.getAttribute("href");
          if (href === "#" + entry.target.id) {
            li.classList.add("bold");
            line.style.left = li.offsetLeft + 24 + "px";
            line.style.width = item.offsetWidth - 48 + "px";
          }
        });
      }
    });
  }, options);

  mainItem.forEach((item) => {
    observer.observe(item);
  });
}

// RULES FOR VALIDATION FORM
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
      return password == value
        ? undefined
        : "The information you just entered does not match";
    },
  };
}

// VALIDATION
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
        inputParent.classList.remove("invalid");
        inputParent.querySelector(".err-message").innerText = "";
      };
    });

    let submitForm = $(info.submitElement);
    submitForm.onclick = function (e) {
      e.preventDefault();
      let checkForm = true;
      let data = [];
      Array.from(inputElements).forEach((inputElement) => {
        let inputParent = getParents(inputElement);
        let isForm = validation(inputElement, inputParent, info.rules);
        data.push(inputElement.value);
        if (isForm) {
          checkForm = false;
        }
      });
      if (!checkForm) {
        e.preventDefault();
      } else {
        info.callBack(data);
        $(info.form).classList.remove("add");
        Array.from(inputElements).forEach((inputElement) => {
          inputElement.value = "";
        });
      }
    };
  }
}

function start() {
  scrollToChange(".nav-list li a", ".underline");
  Validation({
    form: "#modal-up",
    rules: [
      isRequired("#name"),
      isRequired("#email-up"),
      isEmail("#email-up"),
      isRequired("#password-up"),
      isPassword("#password-up"),
      isRequired("#confirm-pass"),
      isConfirmPass("#confirm-pass "),
    ],
    callBack(data) {
      console.log(data);
    },
    submitElement: ".signUp-btn",
  });
  Validation({
    form: "#modal-in",
    rules: [
      isRequired("#email-in"),
      isEmail("#email-in"),
      isRequired("#password-login"),
      isPassword("#password-login"),
    ],
    callBack(data) {
      console.log(data);
    },
    submitElement: ".form-btn",
  });
}

start();

