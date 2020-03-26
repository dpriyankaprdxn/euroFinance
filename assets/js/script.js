window.onload = function () {
  var allNavAnchor = document.querySelectorAll('nav a');

  getActiveClass(allNavAnchor);
  getElement('.hamburger').addEventListener('click',hamburgerToggle);
  getElement('.back-to-top').addEventListener('click',scrolltoTop);

  if (getElement('main').classList.contains('home')) {

    getElement('.subscribe').addEventListener('click',validateForm);

    // function for when submit form then validate it. its empty or return value is valid or not
    function validateForm(e) {
      e.preventDefault();
      var firstName = getElement('.first-name').value;
      var lastName = getElement('.last-name').value;
      var email = getElement('.email').value;
      var password = getElement('.password').value;
      var confirmPassword = getElement('.confirm-password').value;
      var phone = getElement('.mobile').value;
      var fnameError = lnameError = emailError = passwordError = phoneError = true;
      
      clearSingleError();
      fnameError = regExp(firstName,'first name',/^[a-zA-Z]*$/,'.first-name-error');
      lnameError = regExp(lastName,'last name',/^[a-zA-Z]*$/,'.last-name-error');
      emailError = regExp(email,'email',/^\S+@\S+\.\S+$/,'.email-error'); 
      phoneError = regExp(phone,'Phone number',/^[0-9]\d{9}$/,'.mobile-error'); 
      checkPassword(password,confirmPassword);

      if((fnameError || lnameError ||  passwordError ) == true) {
        fnameError = lnameError  = passwordError  = true;
        return false;
      }
      else {
        printError('.newsletter .success', "Successfully submitted your details");
        getElement('.success').classList.remove('hide');
        getElement('.success').classList.add('show');
        resetform('.newsletter form');
        clearSuccesMsg('.success');
      }
    }
  }

  if (getElement('main').classList.contains('conferences')) {
    var allImage = document.querySelectorAll('.all-conferences a');
    var modal = getElement('.lightbox');
    var close = getElement('.close');

    modal.addEventListener('click',closeModal);
    close.addEventListener('click',closeModalPopup);
    allImage.forEach(function(allImagea) {
      allImagea.addEventListener('click',function(e) {
        e.preventDefault();
        var imageInformation = this.parentElement.nextElementSibling;
        var imageHeading = imageInformation.firstElementChild.innerHTML;
        var imageDescibe = imageInformation.lastElementChild.innerHTML;
        var imageSrc = this.firstElementChild.src;
        showImg(imageSrc,imageHeading,imageDescibe,modal);
      });
    });
  }
}

window.onscroll = function() {
  scrollFunction();
};

// document ready then function run
document.addEventListener('DOMContentLoaded', function() {
  if (getElement('main').classList.contains('home')) {
    clearError(0);
    getElement('.success').innerHTML="";
    getElement('.mobile').maxLength = 10;
  }
});

// function for get single element by name class id element name
function getElement(elementby) {
  return document.querySelector(elementby);
}

// function for to hamburger close and open
function hamburgerToggle() {
  document.querySelector('nav').classList.toggle('navHeight');
  document.querySelector('.hamburger').classList.toggle('open');
  document.querySelector('html').classList.toggle('overflow');
}

// function for active class 
function getActiveClass(dataForActiveElement) {
  for (var i = 0; i < dataForActiveElement.length; i++) {
    dataForActiveElement[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace("active", "");
      this.className += " active";
    });
  }
}

// function for after 100px scroll element show 
function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    getElement('.back-to-top').classList.add('show');
  } else {
    getElement('.back-to-top').classList.remove('show');
  }
}

// function for scroll to top
function scrolltoTop(e) {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// function for to show differnce errors
function printError(element, hintMsg) {
  document.querySelector(element).innerHTML = hintMsg;
}

// function for regular expression to validate data
function regExp(element,msg,regexString,Errorspan) {
  if(element == "") {
    printError(Errorspan, "Please enter your "+ msg);
    Errorspan = true;
    clearError(10000);
    return Errorspan;
  } 
  else {
    var regex = regexString;
    if(regex.test(element) === false) {
        printError(Errorspan, "Please enter a valid "+ msg);
        Errorspan = true;
        return Errorspan;
    } else {
        printError(Errorspan, "");
        Errorspan = false;
        return Errorspan;
    }
  }
}

// function for check password according to condition
function checkPassword(password,confirmPassword) {
  
  if(password == "") {
    printError('.password-error', "Please enter your password");
  } 
  else {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if(regex.test(password) === false) {
      printError('.password-error', "Please enter valid password. password atleaset having 6 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
    } 
    else {
      if( confirmPassword == "" ) {
        printError('.confirm-password-error',"Please re-enter password");
      }
      else {
        if( password != confirmPassword ) {
          printError('.confirm-password-error',"Password not match");
        }
        else {
          printError('.password-error',"");
          printError('.confirm-password-error',"");
          passwordError = false;
        }
      } 
    }
  }
}

// function for clear single error when use press the key
function clearSingleError() {
  var allInputs = document.querySelectorAll('.form-group input');
  allInputs.forEach(function(inputValue) {
      inputValue.addEventListener('focus',function() {
      this.nextElementSibling.innerHTML = '';
    });
  });
}

// function for reset form
function resetform(formName) {
  document.querySelector(formName).reset();
  clearError(0);
}

// function for clear succes msg of form
function clearSuccesMsg(succes) {
  var successMsg = document.querySelectorAll(succes);
  setTimeout(function() {
  successMsg.forEach(function(item) { 
    item.innerHTML= "";
    item.classList.add('hide');
    item.classList.remove('show');
  }); 
  },10000);
}

// function for clear errors
function clearError(clearTime) {
  var errors = document.querySelectorAll('.error');
  setTimeout(function() {
    errors.forEach(function(item) { 
      item.innerHTML= "";
    }); 
  },clearTime);
}

// function for close modal on modal click
function closeModalPopup(e) {
  e.preventDefault();
  var modal = this.parentElement.parentElement;
  modal.classList.remove('show');
  getElement('html').classList.remove('overflow');
}

// function for close modal on close click
function closeModal(e) {
  e.preventDefault();
  var modal = this;
  if (e.target == modal) {
    modal.classList.remove('show');
    getElement('html').classList.remove('overflow');
  }
}

// function for show selected modal image
function showImg(Changesrc,imageHeading,imageDescibe,modal) {    
  var modalImage = getElement('.lightbox-container img');
  var modalHeading = getElement('.lightbox-container h4');
  var modalDescibe = getElement('.contain');
  modalImage.src= Changesrc;
  modalHeading.innerHTML = imageHeading;
  modalDescibe.innerHTML = imageDescibe;
  modal.classList.add('show');
  getElement('html').classList.add('overflow');
}