"use strict";

let inputLength = {
    min: 3,
    max: 60
}

document.addEventListener('click', event => {
    if (event.target.matches('input') || event.target.matches('select')) {
        if (event.target.id == "male" || event.target.id == "female" || event.target.id == "other") {
            let formControl = document.querySelector("#labelcontainergender");
            const errordiv = formControl.querySelector('.form-error');
            errordiv.innerText = '';
        } else {
            let formControl = document.querySelector("#labelcontainer" + event.target.id);
            const errordiv = formControl.querySelector('.form-error');
            errordiv.innerText = '';
        }
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
        emailErrorFlag,
        paddressErrorFlag,
        bloodgroupErrorFlag,
        taddressErrorFlag,
        dobErrorFlag,
        citizenshipErrorFlag,
        genderErrorFlag,
        mobileErrorFlag,
        citizenshipIssuedDistrictErrorFlag,
        citizenshiptypeErrorFlag,
        citizenshipissueddateErrorFlag,
        grandfatherErrorFlag,
        fatherErrorFlag,
        motherErrorFlag,
        spouseErrorFlag,
        licensecategoryErrorFlag,
    } = false;

    //User Form Value Acquisition...
    let fullName = applicationForm.querySelector("#fullname");
    let email = applicationForm.querySelector("#email");
    let dob = applicationForm.querySelector("#dob");
    let mobile = applicationForm.querySelector("#mobile");
    let paddress = applicationForm.querySelector("#paddress");
    let taddress = applicationForm.querySelector("#taddress");
    let gender = document.getElementsByName("gender");
    let bloodgroup = document.querySelector("#bloodgroup");

    let citizenship = applicationForm.querySelector("#citizenship");
    let citizenshipIssuedDistrict = document.querySelector("#citizenshipissueddistrict");
    let citizenshiptype = document.querySelector("#citizenshiptype");
    let citizenshipissueddate = document.querySelector("#citizenshipissueddate");

    let grandfather = applicationForm.querySelector("#grandfather");
    let father = applicationForm.querySelector("#father");
    let mother = applicationForm.querySelector("#mother");
    let spouse = applicationForm.querySelector("#spouse");

    let licensecategory = document.querySelector("#licensecategory");

    // User Information
    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let dobValue = dob.value.trim();
    let mobileValue = mobile.value.trim();
    let paddressValue = paddress.value.trim();
    let taddressValue = taddress.value.trim();
    let bloodgroupValue = bloodgroup.value.trim();

    // Citizenship Information
    let citizenshipValue = citizenship.value.trim();
    let citizenshipIssuedDistrictValue = citizenshipIssuedDistrict.value.trim();
    let citizenshiptypeValue = citizenshiptype.value.trim();
    let citizenshipissueddateValue = citizenshipissueddate.value.trim();
    citizenshipValue = citizenshipValue.replace(/[^\w ]/g, ''); // Removing Special Character '-'
    citizenship.value = citizenshipValue;

    // Family Information...
    let grandfatherValue = grandfather.value.trim();
    let fatherValue = father.value.trim();
    let motherValue = mother.value.trim();
    let spouseValue = spouse.value.trim();

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

    //Validation for Email...
    if (emailValue === "") {
        emailErrorFlag = true;
        setErrorFor(email, "* Email Required!");
    } else if (!isEmail(emailValue)) {
        emailErrorFlag = true;
        setErrorFor(email, "* Invalid Format!");
    } else if (valueLength(emailValue) < inputLength.low || valueLength(emailValue) > inputLength.high) {
        emailErrorFlag = true;
        setErrorFor(password, '* Invalid Value Length!');
    } else {
        emailErrorFlag = false;
        setSuccessFor(email);
    }

    //Validation for DOB...
    if (dobValue === '') {
        dobErrorFlag = true;
        setErrorFor(dob, '* DOB Required!');
    } else if (!isOver18(new Date(dobValue))) {
        dobErrorFlag = true;
        setErrorFor(dob, '* Age Restricted!');
    } else {
        dobErrorFlag = false;
        setSuccessFor(dob);
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

    //Validation for Permanent Address...
    if (paddressValue === '') {
        paddressErrorFlag = true;
        setErrorFor(paddress, '* Permanent Address Required!');
    } else if (valueLength(paddressValue) < inputLength.min || valueLength(paddressValue) > inputLength.max) {
        paddressErrorFlag = true;
        setErrorFor(paddress, '* Invalid Value Length!');
    } else {
        paddressErrorFlag = false;
        setSuccessFor(paddress);
    }

    //Validation for Temporary Address...
    if (taddressValue) {
        if (valueLength(taddressValue) < inputLength.min || valueLength(taddressValue) > inputLength.max) {
            taddressErrorFlag = true;
            setErrorFor(taddress, '* Invalid Value Length!');
        } else {
            taddressErrorFlag = false;
            setSuccessFor(taddress);
        }
    } else {
        taddressErrorFlag = false;
        setSuccessFor(taddress);
    }

    //Validation for Gender...
    if (!(gender[0].checked || gender[1].checked || gender[2].checked)) {
        genderErrorFlag = true;
        setErrorByName('gender', '* Gender Required!');
    } else {
        genderErrorFlag = false;
        setSuccessByName('gender');
    }

    //Validation for Blood Group...
    if (bloodgroupValue < 0 || bloodgroupValue > 7 || bloodgroupValue == "Blood Group") {
        bloodgroupErrorFlag = true;
        setErrorFor(bloodgroup, '* Blood Group Required!');
    } else {
        bloodgroupErrorFlag = false;
        setSuccessFor(bloodgroup);
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

    //Validation for CitizenshipIssuedDistrict...
    if (citizenshipIssuedDistrictValue === '') {
        citizenshipIssuedDistrictErrorFlag = true;
        setErrorFor(citizenshipIssuedDistrict, '* District Required!');
    } else if (valueLength(citizenshipIssuedDistrictValue) < inputLength.min || valueLength(citizenshipIssuedDistrictValue) > inputLength.max) {
        citizenshipIssuedDistrictErrorFlag = true;
        setErrorFor(citizenshipIssuedDistrict, '* Invalid Value Length!');
    } else {
        citizenshipIssuedDistrictErrorFlag = false;
        setSuccessFor(citizenshipIssuedDistrict);
    }

    //Validation for CitizenshipType...
    if (citizenshiptypeValue < 0 || citizenshiptypeValue > 4 || citizenshiptypeValue == "Citizenship Type") {
        citizenshiptypeErrorFlag = true;
        setErrorFor(citizenshiptype, '* Citizenship Type Required!');
    } else {
        citizenshiptypeErrorFlag = false;
        setSuccessFor(citizenshiptype);
    }

    //Validation for CitizenshipIssuedDate...
    if (citizenshipissueddateValue === '') {
        citizenshipissueddateErrorFlag = true;
        setErrorFor(citizenshipissueddate, '* Date Required!');
    } else if (!validAge(new Date(dobValue).getFullYear(), new Date(citizenshipissueddateValue).getFullYear()) || inValidDate(new Date(citizenshipissueddateValue))) {
        citizenshipissueddateErrorFlag = true;
        setErrorFor(citizenshipissueddate, '* Date Restricted!');
    } else {
        citizenshipissueddateErrorFlag = false;
        setSuccessFor(citizenshipissueddate);
    }

    //Validation for GrandFather's Name...
    if (grandfatherValue === '') {
        grandfatherErrorFlag = true;
        setErrorFor(grandfather, '* Name Required!');
    } else if (valueLength(grandfatherValue) < inputLength.min || valueLength(grandfatherValue) > inputLength.max) {
        grandfatherErrorFlag = true;
        setErrorFor(grandfather, '* Invalid Value Length!');
    } else {
        grandfatherErrorFlag = false;
        setSuccessFor(grandfather);
    }

    //Validation for Father's Name...
    if (fatherValue === '') {
        fatherErrorFlag = true;
        setErrorFor(father, '* Name Required!');
    } else if (valueLength(fatherValue) < inputLength.min || valueLength(fatherValue) > inputLength.max) {
        fatherErrorFlag = true;
        setErrorFor(father, '* Invalid Value Length!');
    } else {
        fatherErrorFlag = false;
        setSuccessFor(father);
    }
    //Validation for Mother's Name...
    if (motherValue === '') {
        motherErrorFlag = true;
        setErrorFor(mother, '* Name Required!');
    } else if (valueLength(motherValue) < inputLength.min || valueLength(motherValue) > inputLength.max) {
        motherErrorFlag = true;
        setErrorFor(mother, '* Invalid Value Length!');
    } else {
        motherErrorFlag = false;
        setSuccessFor(mother);
    }

    //Validation for Spause's Name...
    if (spouseValue) {
        if (valueLength(spouseValue) < inputLength.min || valueLength(spouseValue) > inputLength.max) {
            spouseErrorFlag = true;
            setErrorFor(spouse, '* Invalid Value Length!');
        } else {
            spouseErrorFlag = false;
            setSuccessFor(spouse);
        }
    } else {
        spouseErrorFlag = false;
        setSuccessFor(spouse);
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

    function setErrorByName(name, message) {
        const formControl = applicationForm.querySelector("#labelcontainer" + name);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    //Validation Success Message Handlers...
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

    //Input Field Format Regex Check Functions...

    function isEmail(email) {
        return /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/.test(
            email
        );
    }

    function isMobile(number) {
        return /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/.test(number);
    }

    function isCitizenship(number) {
        return /^[0-9]{4,11}$/.test(number);
    }

    function isOver18(dateOfBirth) {
        let date18YrsAgo = new Date();
        date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
        return dateOfBirth <= date18YrsAgo;
    }

    function inValidDate(citizenshipdate) {
        const today = new Date();
        return (citizenshipdate > today)
    }

    function validAge(dateOfbirth, licenseissued) {
        if ((licenseissued - dateOfbirth) >= 16) {
            return true;
        }
    }

    function valueLength(value) {
        return value.toString().length;
    }

    // User Info Error Flags Check...
    if (nameErrorFlag == false && emailErrorFlag == false && paddressErrorFlag == false && taddressErrorFlag == false && dobErrorFlag == false && citizenshipErrorFlag == false &&
        genderErrorFlag == false && bloodgroupErrorFlag == false && mobileErrorFlag == false && citizenshipIssuedDistrictErrorFlag == false && citizenshiptypeErrorFlag == false &&
        citizenshipissueddateErrorFlag == false && grandfatherErrorFlag == false && fatherErrorFlag == false && motherErrorFlag == false && spouseErrorFlag == false && licensecategoryErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}