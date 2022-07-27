"use strict";
let inputLength = {
    min: 3,
    max: 60
}

const applicationForm = document.querySelector("#applicationform");

applicationForm.addEventListener('submit', event => {
    event.preventDefault();
    const correctSubmissionFlag = applicationFormValidation();

    if (correctSubmissionFlag) {
        applicationForm.submit();
    }
})

function applicationFormValidation() {

    let nameErrorFlag, emailErrorFlag, addressErrorFlag, dobErrorFlag, citizenshipErrorFlag, genderErrorFlag, mobileErrorFlag;

    //application Form Value Acquisition...
    let fullName = applicationForm.querySelector("#fullname");
    let email = applicationForm.querySelector("#email");
    let dob = applicationForm.querySelector("#dob");
    let mobile = applicationForm.querySelector("#mobile");
    let address = applicationForm.querySelector("#address");
    let citizenship = applicationForm.querySelector("#citizenship");
    let gender = document.getElementsByName("gender");

    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let dobValue = dob.value.trim();
    let mobileValue = mobile.value.trim();
    let addressValue = address.value.trim();
    let citizenshipValue = citizenship.value.trim();
    citizenshipValue = citizenshipValue.replace(/[^\w ]/g, ''); // Removing Special Character '-'
    citizenship.value = citizenshipValue;

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

    //Validation for DOB...
    if (dobValue === '') {
        dobErrorFlag = true;
        setErrorFor(dob, '* DOB Required!');
    } else if (!isOver18(dobValue)) {
        dobErrorFlag = true;
        setErrorFor(dob, '* Age Restricted!');
    } else {
        dobErrorFlag = false;
        setSuccessFor(dob);
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

    //Validation for Mobile...
    if (mobileValue === '') {
        mobileErrorFlag = true;
        setErrorFor(mobile, '* Mobile Required!');
    } else if (!isMobile(mobileValue)) {
        mobileErrorFlag = true;
        setErrorFor(mobile, '* Invalid Format!');
    } else if (valueLength(mobileValue) < 6 || valueLength(mobileValue) > 10) {
        mobileErrorFlag = true;
        setErrorFor(mobile, '* Invalid Value Length!');
    } else {
        mobileErrorFlag = false;
        setSuccessFor(mobile);
    }

    //Validation for Address...
    if (addressValue === '') {
        addressErrorFlag = true;
        setErrorFor(address, '* Address Required!');
    } else if (valueLength(addressValue) < inputLength.min || valueLength(addressValue) > inputLength.max) {
        addressErrorFlag = true;
        setErrorFor(address, '* Invalid Value Length!');
    } else {
        addressErrorFlag = false;
        setSuccessFor(address);
    }

    //Validation for Citizenship...
    if (citizenshipValue === '') {
        citizenshipErrorFlag = true;
        setErrorFor(citizenship, '* Citizenship Required!');
    } else if (!isCitizenship(citizenshipValue)) {
        citizenshipErrorFlag = true;
        setErrorFor(citizenship, '* Invalid Format!');
    } else {
        citizenshipErrorFlag = false;
        setSuccessFor(citizenship);
    }

    //Validation for Gender...
    if (!(gender[0].checked || gender[1].checked || gender[2].checked)) {
        genderErrorFlag = true;
        setErrorByName('gender', '* Gender Required!');
        return false;
    } else {
        genderErrorFlag = false;
        setSuccessByName('gender');
    }

    function setErrorFor(input, message) {
        const formControl = applicationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setErrorByName(name, message) {
        const formControl = applicationForm.querySelector("#labelcontainer" + name);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = applicationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

    function setSuccessByName(name) {
        const formControl = applicationForm.querySelector("#labelcontainer" + name);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

    function isEmail(email) {
        return /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/.test(email);
    }

    function isMobile(number) {
        return /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/.test(number);
    }

    function isCitizenship(number) {
        return /^[0-9]{8,11}$/.test(number);
    }

    function isOver18(dateOfBirth) {
        let date18YrsAgo = new Date();
        date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
        return dateOfBirth <= date18YrsAgo;
    }

    function valueLength(value) {
        return value.toString().length;
    }

    if (nameErrorFlag == false && emailErrorFlag == false && addressErrorFlag == false && dobErrorFlag == false && citizenshipErrorFlag == false && genderErrorFlag == false && mobileErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}