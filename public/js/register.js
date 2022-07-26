"use strict";
let inputLength = {
    min: 3,
    max: 60
}

const registrationForm = document.querySelector("#registrationform");

registrationForm.addEventListener('submit', event => {
    event.preventDefault();
    const correctSubmissionFlag = registrationFormValidation();

    if (correctSubmissionFlag) {
        registrationForm.submit();
    }
})

function registrationFormValidation() {

    let nameErrorFlag, emailErrorFlag, passwordErrorFlag;

    //Registration Form Value Acquisition...
    let fullName = registrationForm.querySelector("#fullname");
    let email = registrationForm.querySelector("#email");
    let password = registrationForm.querySelector("#password");
    let confirmpassword = registrationForm.querySelector("#confirmpassword");

    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let confirmpasswordValue = confirmpassword.value.trim();

    //Validation for FullName...
    if (fullNameValue === '') {
        nameErrorFlag = true;
        setErrorFor(fullName, '* Name Required!');
    } else if (valueLength(fullNameValue) < inputLength.min || valueLength(fullNameValue) > inputLength.max) {
        nameErrorFlag = true;
        setErrorFor(fullName, '* Invalid Value Length!');
    } else {
        nameErrorFlag = false;
        setSuccessFor(fullName);
    }

    //Validation for Email...
    if (emailValue === '') {
        emailErrorFlag = true;
        setErrorFor(email, '* Email Required!');
    } else if (!isEmail(emailValue)) {
        emailErrorFlag = true;
        setErrorFor(email, '* Invalid Format!');
    } else if (valueLength(emailValue) < inputLength.min || valueLength(emailValue) > inputLength.max) {
        emailErrorFlag = true;
        setErrorFor(email, '* Invalid Value Length!');
    } else {
        emailErrorFlag = false;
        setSuccessFor(email);
    }

    //Validation for Password...
    if (passwordValue === '') {
        passwordErrorFlag = true;
        setErrorFor(password, '* Password Required!');
    } else if (valueLength(passwordValue) < inputLength.min || valueLength(passwordValue) > inputLength.max) {
        passwordErrorFlag = true;
        setErrorFor(password, '* Invalid Value Length!');
    } else {
        setSuccessFor(password);
    }

    //Validation for Confirm Password...
    if (confirmpasswordValue === '') {
        passwordErrorFlag = true;
        if (passwordValue) {
            setErrorFor(confirmpassword, '* Password Mismatch!');
        } else {
            setErrorFor(confirmpassword, '* Password Required!');
        }
    } else if (!passwordCheck(passwordValue, confirmpasswordValue)) {
        passwordErrorFlag = true;
        setErrorFor(confirmpassword, '* Password Mismatch!!');
    } else if (valueLength(confirmpasswordValue) < inputLength.min || valueLength(confirmpasswordValue) > inputLength.max) {
        passwordErrorFlag = true;
        setErrorFor(confirmpassword, '* Invalid Value Length!');
    } else {
        passwordErrorFlag = false;
        setSuccessFor(confirmpassword);
    }

    function setErrorFor(input, message) {
        const formControl = registrationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = registrationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

    function isEmail(email) {
        return /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/.test(email);
    }

    function passwordCheck(password1, password2) {
        if (password1 === password2) {
            return true;
        } else {
            return false;
        }
    }

    function valueLength(value) {
        return value.toString().length;
    }

    if (nameErrorFlag == false && emailErrorFlag == false && passwordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}