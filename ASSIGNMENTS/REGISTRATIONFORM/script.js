let Name = document.getElementById('user_name');
let Email = document.getElementById('user_email');
let Password = document.getElementById('user_password');
let Male = document.getElementById('male');
let Female = document.getElementById('female');

function getGender() {
    if(Male.checked) {
        return 'male';
    } else if(Female.checked) {
        return 'female';
    } else {
        return null;
    }
}

function validateForm() {
    if(!Name.value) {
        alert('Name is required');
        return false;
    } 
    if(!Email.value) {
        alert('Email is required');
        return false;
    }
    if(!Password.value) {
        alert('Password is required');
        return false;
    }

    let selectedGender = getGender();
    if(!selectedGender) {
        alert('Please select a gender');
        return false;
    }

    alert('Form is valid');
    return true;
}

document.querySelector('form').addEventListener('submit' , function(e) {
    e.preventDefault();
    if(validateForm()) {
        this.submit();
    }
});