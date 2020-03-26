window.onload = function () {
  var allNavAnchor = document.querySelectorAll('nav a');

  getActiveClass(allNavAnchor);
  getElement('.hamburger').addEventListener('click',hamburgerToggle);
  getElement('.back-to-top').addEventListener('click',scrolltoTop);
  
}

window.onscroll = function() {
  scrollFunction();
};

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
