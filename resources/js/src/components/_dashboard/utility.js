// function to check valid pan number
export function checkPanNumber(panNumber) {
    var regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regex.test(panNumber)) {
        return true;
    }
    return false;
}

// function to validate 10 digit mobile number
export function checkMobileNumber(mobileNumber) {
    var regex = /^[6-9]\d{9}$/;
    if (regex.test(mobileNumber)) {
        return true;
    }
    return false;
}

export function checkAgeGreaterThan18(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age >= 18) {
        return true;
    }
    return false;
}
