window.onload = function () {
  var allNavAnchor = document.querySelectorAll('nav a');

  getActiveClass(allNavAnchor);
  getElement('.hamburger').addEventListener('click',hamburgerToggle);
}

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