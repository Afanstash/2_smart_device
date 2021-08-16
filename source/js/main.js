'use strict';
var body = document.querySelector('body');
var callLink = document.querySelector('.header__contacts-call-link');
var modalForm = document.querySelector('.modal-form');
var buttonClose = modalForm.querySelector('.modal-form__button-close');
var consultationForm = modalForm.querySelector('.form');
var inputUserName = consultationForm.querySelector('#user-name-order-call');
var inputUserPhone = consultationForm.querySelector('#user-phone-order-call');
var textareaUserQuestion = consultationForm.querySelector('#user-text-order-call');
var isStorageSupport = true;
var accordions = document.querySelectorAll('.accordion-item');
var anchors = document.querySelectorAll('a[href*="#"]');

(function () {
  callLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalForm.classList.remove('modal-form--hidden');
    modalForm.classList.add('modal-form--show');
    body.classList.add('lock');
    inputUserName.focus();
  });
})();

(function () {
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (modalForm.classList.contains('modal-form--show')) {
        evt.preventDefault();
        modalForm.classList.add('modal-form--hidden');
        modalForm.classList.remove('modal-form--show');
        body.classList.remove('lock');
      }
    }
  });
})();

(function () {
  modalForm.addEventListener('click', function (evt) {
    if (evt.target === modalForm) {
      modalForm.classList.add('modal-form--hidden');
      modalForm.classList.remove('modal-form--show');
      body.classList.remove('lock');
    }
  });
})();

(function () {
  buttonClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalForm.classList.remove('modal-form--show');
    modalForm.classList.add('modal-form--hidden');
    body.classList.remove('lock');
  });
})();

(function () {
  inputUserPhone.addEventListener('input', function () {
    inputUserPhone.setCustomValidity('');
  });

  inputUserPhone.addEventListener('invalid', function () {
    if (inputUserPhone.validity.valueMissing) {
      inputUserPhone.setCustomValidity('Обязательное поле');
      return;
    }
    if (inputUserPhone.validity.patternMismatch) {
      inputUserPhone.setCustomValidity('Введите номер телефона в следующем формате: +7(XXXXXXXXXX)');
      return;
    }
    inputUserPhone.setCustomValidity('');
  });
})();

(function () {
  var resetForm = function () {
    inputUserName.value = '';
    inputUserPhone.value = '';
    textareaUserQuestion.value = '';
  };

  consultationForm.addEventListener('submit', function (evt) {
    if (!inputUserName.value || !inputUserPhone.value) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      modalForm.classList.remove('modal-form--show');
      modalForm.classList.add('modal-form--hidden');
      body.classList.remove('lock');
      if (isStorageSupport) {
        localStorage.setItem('inputUserName', inputUserName.value);
        localStorage.setItem('inputUserPhone', inputUserPhone.value);
        localStorage.setItem('textareaUserQuestion', textareaUserQuestion.value);
      }
    }

    var formData = new FormData(evt.target);

    fetchData('https://echo.htmlacademy.ru/',
        {
          method: 'POST',
          body: formData,
        }, function () {
          resetForm();
        });
  });

  var fetchData = function (url, options, onSuccess) {
    fetch(url, options)
        .then(function (response) {
          response.json();
        })
        .then(function (response) {
          onSuccess(response);
        });
  };
})();

(function () {
  var closeAccordions = function () {
    accordions.forEach(function (i) {
      i.classList.remove('accordion-item--active');
    });
  };

  accordions.forEach(function (item) {
    item.classList.add('accordion-item--js');
    item.addEventListener('click', function () {
      if (item.classList.contains('accordion-item--active')) {
        item.classList.remove('accordion-item--active');
        return;
      }
      closeAccordions();
      item.classList.add('accordion-item--active');
    });
  });
})();

(function () {
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (evt) {
      evt.preventDefault();

      var blockId = anchor.getAttribute('href');
      document.querySelector('' + blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
})();

/* eslint-disable */
(function () {
var phoneMask = IMask(inputUserPhone, {
    mask: '+{7}(0000000000)'
  });
})();

// var Inputmask = require('inputmask');
// var im = new Inputmask('{+7}(9999999999)');
// im.mask(inputUserPhone);
