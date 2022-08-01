"use strict";


let inputLength = {
    min: 3,
    max: 60
}

document.addEventListener('click', event => {
    if (event.target.className == 'submit-button') {
        event.preventDefault();
        const userForm = document.querySelector("#userform");
        const correctSubmissionFlag = userFormValidation(userForm);

        if (correctSubmissionFlag) {
            userForm.submit();
        }
    }
});

function userFormValidation(userForm) {

    //Error Flags for User Form Validation...
    let nameErrorFlag, paddressErrorFlag, bloodgroupErrorFlag, taddressErrorFlag, dobErrorFlag, citizenshipErrorFlag, genderErrorFlag,
        mobileErrorFlag, citizenshipIssuedDistrictErrorFlag, citizenshiptypeErrorFlag, citizenshipissueddateErrorFlag,
        grandfatherErrorFlag, fatherErrorFlag, motherErrorFlag, spouseErrorFlag,
        licenseissueddateErrorFlag, licenseexpirydateErrorFlag, licensecategoryErrorFlag, licensenumberErrorFlag, licenseissueddistrictErrorFlag;

    //User Form Value Acquisition...
    let fullName = userForm.querySelector("#fullname");
    let dob = userForm.querySelector("#dob");
    let mobile = userForm.querySelector("#mobile");
    let paddress = userForm.querySelector("#paddress");
    let taddress = userForm.querySelector("#taddress");
    let gender = document.getElementsByName("gender");
    let bloodgroup = document.querySelector("#bloodgroup");

    let citizenship = userForm.querySelector("#citizenship");
    let citizenshipIssuedDistrict = document.querySelector("#citizenshipissueddistrict");
    let citizenshiptype = document.querySelector("#citizenshiptype");
    let citizenshipissueddate = document.querySelector("#citizenshipissueddate");

    let grandfather = document.querySelector("#grandfather");
    let father = document.querySelector("#father");
    let mother = document.querySelector("#mother");
    let spouse = document.querySelector("#spouse");

    let licenseissueddate = document.querySelector("#licenseissueddate");
    let licenseexpirydate = document.querySelector("#licenseexpirydate");
    let licensecategory = document.querySelector("#licensecategory");
    let licensenumber = document.querySelector("#licensenumber");
    let licenseissueddistrict = document.querySelector("#licenseissueddistrict");

    // User Information
    let fullNameValue = fullName.value.trim();
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

    // License Information...
    let licensecategoryValue = licensecategory.value.trim();
    let licensenumberValue = licensenumber.value.trim();
    let licenseissueddateValue = licenseissueddate.value.trim();
    let licenseexpirydateValue = licenseexpirydate.value.trim();
    let licenseissueddistrictrValue = licenseissueddistrict.value.trim();
    licensenumberValue = licensenumberValue.replace(/[^\w ]/g, ''); // Removing Special Character '-'
    licensenumber.value = licensenumberValue;

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
        }
    } else {
        taddressErrorFlag = false;
        setSuccessFor(taddress);
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

    //Validation for GrandFather...
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

    //Validation for Father...
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
    //Validation for Mother...
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

    //Validation for Spause...
    if (spouseValue) {
        if (valueLength(spouseValue) < inputLength.min || valueLength(spouseValue) > inputLength.max) {
            spouseErrorFlag = true;
            setErrorFor(spouse, '* Invalid Value Length!');
        }
    } else {
        spouseErrorFlag = false;
        setSuccessFor(spouse);
    }

    //Validation for LicenseIssuedDate...
    if (licenseissueddateValue === '') {
        licenseissueddateErrorFlag = true;
        setErrorFor(licenseissueddate, '* Date Required!');
    } else if (!validAge(new Date(dobValue).getFullYear(), new Date(licenseissueddateValue).getFullYear()) || inValidDate(new Date(licenseissueddateValue))) {
        licenseissueddateErrorFlag = true;
        setErrorFor(licenseissueddate, '* Date Restricted!');
    } else {
        licenseissueddateErrorFlag = false;
        setSuccessFor(licenseissueddate);
    }

    //Validation for licenseExpiryDate...
    if (licenseexpirydateValue === '') {
        licenseexpirydateErrorFlag = true;
        setErrorFor(licenseexpirydate, '* Date Required!');
    } else if (licenseissueddateValue === '') {
        licenseexpirydateErrorFlag = true;
        setErrorFor(licenseexpirydate, '* LicenseNotIssued!');
    } else if (!validExpiry(new Date(dobValue).getFullYear(), new Date(licenseexpirydateValue).getFullYear()) || invalidExpiry()) {
        licenseexpirydateErrorFlag = true;
        setErrorFor(licenseexpirydate, '* Date Restricted!');
    } else {
        licenseexpirydateErrorFlag = false;
        setSuccessFor(licenseexpirydate);
    }

    //Validation for LicenseCategory...
    if (licensecategoryValue < 0 || licensecategoryValue > 6 || licensecategoryValue == "License Category") {
        licensecategoryErrorFlag = true;
        setErrorFor(licensecategory, '* Category Required!');
    } else {
        licensecategoryErrorFlag = false;
        setSuccessFor(licensecategory);
    }

    //Validation for LicenseNumber...
    if (licensenumberValue === '' || licensenumberValue === 'License Number') {
        licensenumberErrorFlag = true;
        setErrorFor(licensenumber, '* License Number Required!');
    } else {
        licensenumberErrorFlag = false;
        setSuccessFor(licensenumber);
    }

    //Validation for LicenseIssuedDistrict...
    if (licenseissueddistrictrValue === '') {
        licenseissueddistrictErrorFlag = true;
        setErrorFor(licenseissueddistrict, '* District Required!');
    } else if (valueLength(licenseissueddistrictrValue) < inputLength.min || valueLength(licenseissueddistrictrValue) > inputLength.max) {
        licenseissueddistrictErrorFlag = true;
        setErrorFor(licenseissueddistrict, '* Invalid Value Length!');
    } else {
        licenseissueddistrictErrorFlag = false;
        setSuccessFor(licenseissueddistrict);
    }


    function setErrorFor(input, message) {
        const formControl = userForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setErrorByName(name, message) {
        const formControl = userForm.querySelector("#labelcontainer" + name);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = userForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

    function setSuccessByName(name) {
        const formControl = userForm.querySelector("#labelcontainer" + name);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
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

    function inValidDate(citizenshipdate) {
        const today = new Date();
        return (citizenshipdate > today)
    }

    function validAge(dateOfbirth, licenseissued) {
        if ((licenseissued - dateOfbirth) >= 16) {
            return true;
        }
    }

    function validExpiry(dateOfbirth, licenseExpiry) {
        if ((licenseExpiry - dateOfbirth) >= 23) {
            return true;
        }
    }

    function invalidExpiry() {
        const issueyear = new Date(licenseissueddateValue).getFullYear();
        const issuemonth = new Date(licenseissueddateValue).getMonth();
        const issueday = new Date(licenseissueddateValue).getDate();
        const expiryear = new Date(licenseexpirydateValue).getFullYear();
        const expirymonth = new Date(licenseexpirydateValue).getMonth();
        const expiryday = new Date(licenseexpirydateValue).getDate();

        if (expiryear != issueyear + 5 || expirymonth != issuemonth || expiryday != issueday) {
            return true;
        }
    }

    function valueLength(value) {
        return value.toString().length;
    }

    // User Info Error Flags Check...
    if (nameErrorFlag == false && paddressErrorFlag == false && taddressErrorFlag == false && dobErrorFlag == false && citizenshipErrorFlag == false &&
        genderErrorFlag == false && bloodgroupErrorFlag == false && mobileErrorFlag == false && citizenshipIssuedDistrictErrorFlag == false && citizenshiptypeErrorFlag == false &&
        citizenshipissueddateErrorFlag == false && grandfatherErrorFlag == false && fatherErrorFlag == false && motherErrorFlag == false && spouseErrorFlag == false && licenseissueddateErrorFlag == false &&
        licenseexpirydateErrorFlag == false && licensecategoryErrorFlag == false && licensenumber == false && licensenumberErrorFlag && licenseissueddistrictErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}