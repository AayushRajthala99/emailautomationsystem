"use strict";

let inputLength = {
    min: 3,
    max: 60
}

document.addEventListener('click', event => {
    if (event.target.matches('input') || event.target.matches('select')) {
        let formControl = document.querySelector("#labelcontainer" + event.target.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = '';
    }

    if (event.target.className == 'submit-button') {
        event.preventDefault();
        const applicationForm = document.querySelector("#applicationform");
        const correctSubmissionFlag = applicationFormValidation(applicationForm);

        if (correctSubmissionFlag) {
            if (confirm("Are You Sure You Want To Submit?")) {
                applicationForm.submit();
            }
        }
    }
});

function applicationFormValidation(applicationForm) {

    //Error Flags for Application Form Validation...
    let {
        nameErrorFlag,
        licensecategoryErrorFlag,
    } = false;

    //User Form Value Acquisition...
    let fullName = applicationForm.querySelector("#fullname");
    let licensecategory = document.querySelector("#licensecategory");

    // User Information Values...
    let fullNameValue = fullName.value.trim();
    let licensecategoryValue = licensecategory.value.trim();

    /*.................................... 
            Validation Operations 
    ......................................*/

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

    //Validation for License Category...
    if (licensecategoryValue < 0 || licensecategoryValue > 6 || licensecategoryValue == "License Category") {
        licensecategoryErrorFlag = true;
        setErrorFor(licensecategory, '* Category Required!');
    } else {
        licensecategoryErrorFlag = false;
        setSuccessFor(licensecategory);
    }

    //Validation Error Message Handlers...
    function setErrorFor(input, message) {
        const formControl = applicationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    //Validation Success Message Handlers...
    function setSuccessFor(input) {
        const formControl = applicationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

    //Input Field Format Regex Check Functions...

    function valueLength(value) {
        return value.toString().length;
    }

    // User Info Error Flags Check...
    if (nameErrorFlag == false && licensecategoryErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}