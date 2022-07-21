"use strict";
let inputLength = {
    low: 3,
    high: 60
}

const loginForm = document.querySelector("#loginform");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const correctSubmissionFlag = loginFormValidation();

    if (correctSubmissionFlag) {
        loginForm.submit();
    }
});

function loginFormValidation() {
    let emailErrorFlag, passwordErrorFlag;

    //Login Form Value Acquisition...
    let email = loginForm.querySelector("#email");
    let password = loginForm.querySelector("#password");

    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    //Validation for Email...
    if (emailValue === "") {
        emailErrorFlag = true;
        setErrorFor(email, "* EMAIL REQUIRED!");
    } else if (!isEmail(emailValue)) {
        emailErrorFlag = true;
        setErrorFor(email, "* INVALID FORMAT!");
    } else if (valueLength(emailValue) < inputLength.low || valueLength(emailValue) > inputLength.high) {
        emailErrorFlag = true;
        setErrorFor(password, '* INVALID VALUE LENGTH!');
    } else {
        emailErrorFlag = false;
        setSuccessFor(email);
    }

    //Validation for Password...
    if (passwordValue === "") {
        passwordErrorFlag = true;
        setErrorFor(password, "* PASSWORD REQUIRED!");
    } else if (valueLength(passwordValue) < inputLength.low || valueLength(passwordValue) > inputLength.high) {
        passwordErrorFlag = true;
        setErrorFor(password, '* INVALID VALUE LENGTH!');
    } else {
        passwordErrorFlag = false;
        setSuccessFor(password);
    }

    function setErrorFor(input, message) {
        const formControl = loginForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector(".form-error");
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = loginForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector(".form-error");
        errordiv.innerText = "";
    }

    function isEmail(email) {
        return /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/.test(
            email
        );
    }

    function valueLength(value) {
        return value.toString().length;
    }

    if (emailErrorFlag == false && passwordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}