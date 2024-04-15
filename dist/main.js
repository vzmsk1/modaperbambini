/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/dev/markusDM.js":
/*!********************************!*\
  !*** ./src/js/dev/markusDM.js ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/vzmsk1.js":
/*!******************************!*\
  !*** ./src/js/dev/vzmsk1.js ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/lib/dd.js":
/*!**************************!*\
  !*** ./src/js/lib/dd.js ***!
  \**************************/
/***/ (() => {

"use strict";


function DynamicAdapt(type) {
  this.type = type;
}
DynamicAdapt.prototype.init = function () {
  const _this = this;
  this.оbjects = [];
  this.daClassname = '_dynamic_adapt_';
  this.nodes = document.querySelectorAll('[data-da]');
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(',');
    const оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
    оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }
  this.arraySort(this.оbjects);
  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
    return '(' + this.type + '-width: ' + item.breakpoint + 'px),' + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  });
  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];
    const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    this.mediaHandler(matchMedia, оbjectsFilter);
  }
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    //for (let i = 0; i < оbjects.length; i++) {
    for (let i = оbjects.length - 1; i >= 0; i--) {
      const оbject = оbjects[i];
      if (оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(оbject.parent, оbject.element, оbject.index);
      }
    }
  }
};
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
};
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
};
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === 'min') {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === 'first' || b.place === 'last') {
          return -1;
        }
        if (a.place === 'last' || b.place === 'first') {
          return 1;
        }
        return a.place - b.place;
      }
      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === 'first' || b.place === 'last') {
          return 1;
        }
        if (a.place === 'last' || b.place === 'first') {
          return -1;
        }
        return b.place - a.place;
      }
      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};
const da = new DynamicAdapt('max');
da.init();

/***/ }),

/***/ "./src/js/modules.js":
/*!***************************!*\
  !*** ./src/js/modules.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modules: () => (/* binding */ modules)
/* harmony export */ });
const modules = {};

/***/ }),

/***/ "./src/js/utils/forms.js":
/*!*******************************!*\
  !*** ./src/js/utils/forms.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules.js */ "./src/js/modules.js");


// --------------------------------------------------------------------------

class Validation {
  constructor() {
    this.attrs = {
      REQUIRED: 'data-required',
      IGNORE_VALIDATION: 'data-ignore-validation',
      AJAX: 'data-ajax',
      DEV: 'data-dev',
      IGNORE_FOCUS: 'data-ignore-focus',
      SHOW_PLACEHOLDER: 'data-show-placeholder',
      VALIDATE: 'data-validate'
    };
    this.classes = {
      HAS_ERROR: '_has-error',
      HAS_FOCUS: '_has-focus',
      IS_FILLED: '_is-filled',
      IS_REVEALED: '_is-revealed'
    };
  }
  getErrors(form) {
    let err = 0;
    let requiredFields = form.querySelectorAll(`*[${this.attrs.REQUIRED}]`);
    if (requiredFields.length) {
      requiredFields.forEach(requiredField => {
        if ((requiredField.offsetParent !== null || requiredField.tagName === 'SELECT') && !requiredField.disabled) {
          err += this.validateField(requiredField);
        }
      });
    }
    return err;
  }
  addError(requiredField) {
    requiredField.classList.add(this.classes.HAS_ERROR);
    requiredField.parentElement.classList.remove(this.classes.IS_FILLED);
    requiredField.parentElement.classList.add(this.classes.HAS_ERROR);
  }
  removeError(requiredField) {
    requiredField.classList.remove(this.classes.HAS_ERROR);
    requiredField.parentElement.classList.remove(this.classes.HAS_ERROR);
  }
  validateField(requiredField) {
    let err = 0;
    if (requiredField.dataset.required === 'email') {
      requiredField.value = requiredField.value.replace(' ', '');
      if (this.testEmail(requiredField)) {
        this.addError(requiredField);
        err++;
      } else {
        this.removeError(requiredField);
      }
    } else if (requiredField.type === 'checkbox' && !requiredField.checked) {
      this.addError(requiredField);
      err++;
    } else {
      if (!requiredField.value.trim()) {
        this.addError(requiredField);
        err++;
      } else {
        this.removeError(requiredField);
      }
    }
    return err;
  }
  clearFields(form) {
    form.reset();
    setTimeout(() => {
      const inputs = form.querySelectorAll('input,textarea');
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      if (inputs.length) {
        for (let index = 0; index < inputs.length; index++) {
          const input = inputs[index];
          input.parentElement.classList.remove(this.classes.HAS_FOCUS);
          input.classList.remove(this.classes.HAS_FOCUS);
          this.removeError(input);
        }
      }
      if (checkboxes.length) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
    }, 0);
  }
  testEmail(requiredField) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(requiredField.value);
  }
}
class FormSubmition extends Validation {
  constructor(shouldValidate) {
    super();
    this.shouldValidate = shouldValidate ? shouldValidate : true;
    this.forms = document.querySelectorAll('form');
    this.init();
  }
  sendForm(form) {
    let responseResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ``;
    document.dispatchEvent(new CustomEvent('sendForm', {
      detail: {
        form: form
      }
    }));

    // show modal, if popup module is connected
    setTimeout(() => {
      if (_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.popup) {
        const modal = form.dataset.modalMessage;
        modal ? _modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal.open(modal) : null;
      }
    }, 0);
    this.clearFields(form);
    console.log('is sent');
  }
  async handleSubmition(form, e) {
    const err = !form.hasAttribute(this.attrs.IGNORE_VALIDATION) ? this.getErrors(form) : 0;
    if (err === 0) {
      const ajax = form.hasAttribute(this.attrs.AJAX);
      if (ajax) {
        e.preventDefault();
        const action = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const method = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const data = new FormData(form);
        form.classList.add('_is-sending');
        const response = await fetch(action, {
          method: method,
          body: data
        });
        if (response.ok) {
          const result = await response.json();
          form.classList.remove('_is-sending');
          this.sendForm(form, result);
        } else {
          alert('error');
          form.classList.remove('_is-sending');
        }
      } else if (form.hasAttribute(this.attrs.DEV)) {
        // in development mode
        e.preventDefault();
        this.sendForm(form);
      }
    } else {
      e.preventDefault();
    }
  }
  init() {
    const _this = this;
    const passwordFields = document.querySelectorAll('[data-required="pass"]');
    if (this.forms.length) {
      this.forms.forEach(form => {
        form.addEventListener('submit', function (e) {
          _this.handleSubmition(e.target, e);
        });
        form.addEventListener('reset', function (e) {
          _this.clearFields(e.target);
        });
      });
    }
    if (passwordFields.length) {
      passwordFields.forEach(field => {
        const btn = field.nextElementSibling;
        if (btn) {
          btn.addEventListener('click', function () {
            const type = field.parentElement.classList.contains(_this.classes.IS_REVEALED) ? 'password' : 'text';
            field.setAttribute('type', type);
            field.parentElement.classList.toggle(_this.classes.IS_REVEALED);
          });
        }
      });
    }
  }
}
class FormFields extends Validation {
  constructor() {
    super();
    this.fields = document.querySelectorAll('input,textarea');
    this.init();
  }
  savePlaceholder() {
    if (this.fields.length) {
      this.fields.forEach(field => {
        if (!field.hasAttribute(this.attrs.SHOW_PLACEHOLDER)) {
          field.dataset.placeholder = field.placeholder;
        }
      });
    }
  }
  handleFocusin(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (target.dataset.placeholder) target.placeholder = '';
      if (!target.hasAttribute(this.attrs.IGNORE_FOCUS)) {
        target.classList.add(this.classes.HAS_FOCUS);
        target.parentElement.classList.add(this.classes.HAS_FOCUS);
        target.classList.remove(this.classes.HAS_ERROR);
        target.parentElement.classList.remove(this.classes.HAS_ERROR);
      }
      if (target.type !== 'file' && target.type !== 'checkbox' && target.type !== 'radio' && !target.closest('.quantity')) {
        target.closest('.input').classList.remove(this.classes.IS_FILLED);
      }
      this.removeError(target);
    }
  }
  handleFocusout(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (target.dataset.placeholder) {
        target.placeholder = target.dataset.placeholder;
      }
      if (!target.hasAttribute(this.attrs.IGNORE_FOCUS)) {
        target.classList.remove(this.classes.HAS_FOCUS);
        target.parentElement.classList.remove(this.classes.HAS_FOCUS);
      }
      if (target.hasAttribute(this.attrs.VALIDATE)) {
        this.validateField(target);
      }
      if (target.type !== 'file' && target.type !== 'checkbox' && target.type !== 'radio' && !target.closest('.quantity')) {
        if (!target.classList.contains(this.classes.HAS_ERROR) && target.value.trim()) {
          target.closest('.input').classList.add(this.classes.IS_FILLED);
        } else {
          target.closest('.input').classList.remove(this.classes.IS_FILLED);
        }
      }
    }
  }
  init() {
    // save placeholder in data attribute
    this.savePlaceholder();

    // handle submition
    new FormSubmition();

    // events
    document.body.addEventListener('focusin', this.handleFocusin.bind(this));
    document.body.addEventListener('focusout', this.handleFocusout.bind(this));
  }
}

// --------------------------------------------------------------------------

new FormFields();

/***/ }),

/***/ "./src/js/utils/modals.js":
/*!********************************!*\
  !*** ./src/js/utils/modals.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules.js */ "./src/js/modules.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");



// --------------------------------------------------------------------------

class Modal {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: 'data-modal',
      attributeCloseButton: 'data-close',
      fixElementSelector: '[data-lp]',
      youtubeAttribute: 'data-modal-youtube',
      youtubePlaceAttribute: 'data-modal-youtube-place',
      setAutoplayYoutube: true,
      classes: {
        modal: 'modal',
        // modalWrapper: 'modal__wrapper',
        modalContent: 'modal__content',
        modalActive: 'modal_show',
        bodyActive: 'modal-show'
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        location: true,
        goHash: true
      },
      on: {
        beforeOpen: function () {},
        afterOpen: function () {},
        beforeClose: function () {},
        afterClose: function () {}
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ['a[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'area[href]', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
    //this.options = Object.assign(config, options);
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initmodals() : null;
  }
  initmodals() {
    this.eventsmodal();
  }
  eventsmodal() {
    document.addEventListener('click', function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : 'error';
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if (this._dataValue !== 'error') {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (!e.target.closest('#unconfirmedAgeModal') && !e.target.closest('#confirmAgeModal') && (buttonClose || !e.target.closest(`.${this.options.classes.modalContent}`) && this.isOpen)) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && e.which == 9 && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener('hashchange', function () {
        if (window.location.hash) {
          this._openToHash();
        } else {
          this.close(this.targetOpen.selector);
        }
      }.bind(this));
      window.addEventListener('load', function () {
        if (window.location.hash) {
          this._openToHash();
        }
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement('iframe');
          iframe.setAttribute('allowfullscreen', '');
          const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
          iframe.setAttribute('allow', `${autoplay}; encrypted-media`);
          iframe.setAttribute('src', urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            const youtubePlace = this.targetOpen.element.querySelector('.modal__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent('beforemodalOpen', {
          detail: {
            modal: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.modalActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) {
          const m = document.querySelector(this.hash);
          setTimeout(() => {
            !this.bodyLock && !m.hasAttribute('data-bl-mobile') || !this.bodyLock && window.innerWidth <= 768 && m.hasAttribute('data-bl-mobile') ? (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLock)() : null;
          }, 0);
        } else this._reopen = false;
        this.targetOpen.element.setAttribute('aria-hidden', 'false');
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        setTimeout(() => {
          this._focusTrap();
        }, 50);
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent('aftermodalOpen', {
          detail: {
            modal: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
      this.previousOpen.selector = selectorValue;
    }
    if (!this.isOpen || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLockStatus) {
      return;
    }
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent('beforemodalClose', {
      detail: {
        modal: this
      }
    }));
    if (this.youTubeCode) {
      if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
    }
    this.previousOpen.element.classList.remove(this.options.classes.modalActive);
    // aria-hidden
    this.previousOpen.element.setAttribute('aria-hidden', 'true');
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyUnlock)() : null;
      this.isOpen = false;
    }
    this._removeHash();
    if (this._selectorOpen) {
      this.lastClosed.selector = this.previousOpen.selector;
      this.lastClosed.element = this.previousOpen.element;
    }
    this.options.on.afterClose(this);
    document.dispatchEvent(new CustomEvent('aftermodalClose', {
      detail: {
        modal: this
      }
    }));
    setTimeout(() => {
      this._focusTrap();
    }, 50);
  }
  _getHash() {
    if (this.options.hashSettings.location) {
      this.hash = this.targetOpen.selector.includes('#') ? this.targetOpen.selector : this.targetOpen.selector.replace('.', '#');
    }
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', '#')}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState('', '', this.hash);
  }
  _removeHash() {
    history.pushState('', '', window.location.href.split('#')[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
  _focusTrap() {
    const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
    if (!this.isOpen && this.lastFocusEl) {
      this.lastFocusEl.focus();
    } else {
      focusable[0].focus();
    }
  }
}

// --------------------------------------------------------------------------

_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal = new Modal({});

/***/ }),

/***/ "./src/js/utils/tabs.js":
/*!******************************!*\
  !*** ./src/js/utils/tabs.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils/utils.js");


// --------------------------------------------------------------------------

class Tabs {
  constructor() {
    this.attrs = {
      TABS: 'data-tabs',
      INDEX: 'data-tabs-index',
      TITLES: 'data-tabs-titles',
      TITLE: 'data-tabs-title',
      TAB_ITEM: 'data-tabs-item',
      BODY: 'data-tabs-body',
      HASH: 'data-tabs-hash'
    };
    this.classes = {
      INIT: '_tabs-init',
      ACTIVE: '_is-active',
      MODAL: 'modal'
    };
    this.tabs = document.querySelectorAll(`[data-tabs]`);
    this.activeHash = [];
    if (this.tabs.length) {
      const hash = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getHash)();
      if (hash && hash.startsWith('tab-')) {
        activeHash = hash.replace('tab-', '').split('-');
      }
      this.tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add(this.classes.INIT);
        tabsBlock.setAttribute(this.attrs.INDEX, index);
        tabsBlock.addEventListener('click', this.setActions.bind(this));
        this.init(tabsBlock);
      });
    }
  }
  setStatus(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}]`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.TAB_ITEM}]`);
    const index = tabsBlock.dataset.tabsIndex;
    if (content.length) {
      const hasHash = tabsBlock.hasAttribute(this.attrs.HASH);
      content = Array.from(content).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      content.forEach((item, indx) => {
        if (titles[indx].classList.contains(this.classes.ACTIVE)) {
          item.hidden = false;
          if (hasHash && !item.closest(`.${this.classes.MODAL}`)) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setHash)(`tab-${index}-${indx}`);
          }
        } else {
          item.hidden = true;
        }
      });
    }
  }
  setActions(e) {
    const target = e.target;
    if (target.closest(`[${this.attrs.TITLE}]`)) {
      const title = target.closest(`[${this.attrs.TITLE}]`);
      const tabsBlock = title.closest(`[${this.attrs.TABS}]`);
      if (!title.classList.contains(this.classes.ACTIVE)) {
        let activeTitle = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}].${this.classes.ACTIVE}`);
        activeTitle.length ? activeTitle = Array.from(activeTitle).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock) : null;
        activeTitle.length ? activeTitle[0].classList.remove(this.classes.ACTIVE) : null;
        title.classList.add(this.classes.ACTIVE);
        this.setStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
  init(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLES}]>*`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.BODY}]>*`);
    const index = tabsBlock.dataset.tabsIndex;
    const activeHashBlock = this.activeHash[0] == index;
    if (activeHashBlock) {
      const activeTitle = tabsBlock.querySelector(`[${this.attrs.TITLES}]>.${this.classes.ACTIVE}`);
      activeTitle ? activeTitle.classList.remove(this.classes.ACTIVE) : null;
    }
    if (content.length) {
      content = Array.from(content).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      content.forEach((item, index) => {
        titles[index].setAttribute(this.attrs.TITLE, '');
        item.setAttribute(this.attrs.TAB_ITEM, '');
        if (activeHashBlock && index == this.activeHash[1]) {
          titles[index].classList.add(this.classes.ACTIVE);
        }
        item.hidden = !titles[index].classList.contains(this.classes.ACTIVE);
      });
    }
  }
}

// --------------------------------------------------------------------------

new Tabs();

/***/ }),

/***/ "./src/js/utils/utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _slideDown: () => (/* binding */ _slideDown),
/* harmony export */   _slideToggle: () => (/* binding */ _slideToggle),
/* harmony export */   _slideUp: () => (/* binding */ _slideUp),
/* harmony export */   bodyLock: () => (/* binding */ bodyLock),
/* harmony export */   bodyLockStatus: () => (/* binding */ bodyLockStatus),
/* harmony export */   bodyLockToggle: () => (/* binding */ bodyLockToggle),
/* harmony export */   bodyUnlock: () => (/* binding */ bodyUnlock),
/* harmony export */   dataMediaQueries: () => (/* binding */ dataMediaQueries),
/* harmony export */   getHash: () => (/* binding */ getHash),
/* harmony export */   menuClose: () => (/* binding */ menuClose),
/* harmony export */   menuInit: () => (/* binding */ menuInit),
/* harmony export */   menuOpen: () => (/* binding */ menuOpen),
/* harmony export */   remToPx: () => (/* binding */ remToPx),
/* harmony export */   removeClasses: () => (/* binding */ removeClasses),
/* harmony export */   setCurrentYear: () => (/* binding */ setCurrentYear),
/* harmony export */   setHash: () => (/* binding */ setHash),
/* harmony export */   uniqueArray: () => (/* binding */ uniqueArray)
/* harmony export */ });
/**
 * set hash to url
 * @param {string} hash
 */
const setHash = hash => {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
};

/**
 * get hash from url
 * @returns string
 */
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
};

/**
 * initializes hamburger menu
 */
const menuInit = () => {
  const mm = window.matchMedia('(max-width: 768px)');
  if (document.querySelector('.hamburger')) {
    document.querySelector('.hamburger').addEventListener('click', function (e) {
      const isActive = document.documentElement.classList.contains('_menu-opened');
      if (bodyLockStatus && !isActive) {
        menuOpen();
        console.log(e.target);
      } else if (bodyLockStatus && isActive) {
        menuClose();
      }
    });
    mm.addEventListener('change', function () {
      if (!mm.matches && document.documentElement.classList.contains('_menu-opened')) menuClose();
    });
  }
};
/**
 * opens hamburger menu
 */
const menuOpen = () => {
  bodyLock();
  document.documentElement.classList.add('_menu-opened');
};
/**
 * closes hamburger menu
 */
const menuClose = () => {
  bodyUnlock();
  document.documentElement.classList.remove('_menu-opened');
};

// body lock
let bodyLockStatus = true;
/**
 * toggles body lock
 * @param {number} delay
 */
const bodyLockToggle = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
/**
 * unlocks body
 * @param {number} delay
 */
const bodyUnlock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (bodyLockStatus) {
    setTimeout(() => {
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
/**
 * locks body
 * @param {number} delay
 */
const bodyLock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (bodyLockStatus) {
    document.documentElement.classList.add('lock');
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

/**
 * make the array unique
 * @param {array} array
 * @returns
 */
function uniqueArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

/**
 *
 * @param {array} array
 * @param {number} dataSetValue
 * process media requests from attributes
 */
const dataMediaQueries = (array, dataSetValue) => {
  // get objects with media queries
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0];
    }
  });
  // objects with media queries initialization
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // get unique breakpoints
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });
    mdQueries = uniqueArray(mdQueries);
    const mdQueriesArray = [];
    if (mdQueries.length) {
      // work with every breakpoint
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // objects with conditions
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        });
      });
      return mdQueriesArray;
    }
  }
};

/**
 * smoothly slides up
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
const _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}rem` : `0`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideUpDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};

/**
 * smoothly slides down
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
const _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}rem` : `0`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideDownDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};

/**
 * toggles smooth slide
 * @param {HTMLElement} target
 * @param {number} duration
 * @returns function
 */
const _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

/**
 * converts rem to pixels
 * @param {number} remValue
 * @returns string
 */
function remToPx(remValue) {
  const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const pxValue = remValue * htmlFontSize;
  return Math.round(pxValue) + 'px';
}

// remove class from all array elements
const removeClasses = (array, className) => {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
};

/**
 * set current year
 */
const setCurrentYear = () => {
  if (document.getElementById('currentYear')) {
    document.getElementById('currentYear').innerHTML = new Date().getFullYear();
  }
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:wght@400;500;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: "Gilroy";
  src: url("../assets/fonts/Gilroy-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Gilroy";
  src: url("../assets/fonts/Gilroy-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Gilroy";
  src: url("../assets/fonts/Gilroy-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-style: normal;
  font-weight: normal;
  line-height: 1.2;
  -webkit-animation: bugfix infinite 1s;
}

html {
  font-family: "Roboto";
  font-size: 0.5208335vw;
}

body {
  font-size: 2rem;
  color: #1e1e1e;
  background-color: #ffffff;
}

input,
textarea {
  margin: 0;
  padding: 0;
  border: none;
  line-height: inherit;
  background-color: transparent;
  color: inherit;
  -webkit-animation: bugfix infinite 1s;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
}

input[type=number] {
  -moz-appearance: textfield;
}

button,
input,
a,
textarea {
  font: inherit;
  outline: none;
  cursor: pointer;
}
button:focus,
input:focus,
a:focus,
textarea:focus {
  outline: none;
}
button:active,
input:active,
a:active,
textarea:active {
  outline: none;
}

a {
  color: unset;
}

a,
a:hover {
  text-decoration: none;
}

p {
  margin: 0;
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  text-align: inherit;
  color: inherit;
  background-color: transparent;
}

ul,
ul li {
  padding: 0;
  margin: 0;
}

ul li {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font: inherit;
}

.container {
  width: 172rem;
  margin: 0 auto;
}
html.lock {
  overflow: hidden;
  touch-action: none;
}

html,
body {
  overflow-x: clip;
}

main {
  position: relative;
  flex: 1 1 auto;
}

.wrapper {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  height: 100%;
}
.header__container {
  position: relative;
  z-index: 202;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 12.1rem;
}
.header__logo {
  flex: 0 0 22.9rem;
  width: 22.9rem;
}
.header__nav {
  display: flex;
  gap: 4rem;
}
.header__nav-link:not(.header__nav-link.tab) {
  position: relative;
  transition: color 0.5s ease;
}
.header__nav-link:not(.header__nav-link.tab)::after {
  content: "";
  position: absolute;
  bottom: -0.2rem;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #da251e;
  transform: scaleX(0);
  transition: transform 0.5s ease;
}

.hamburger {
  display: none;
}

.header-menu {
  display: none;
}

.footer__container {
  display: flex;
  flex-direction: column;
}
.footer__main {
  padding-bottom: 3.2rem;
  display: flex;
  border-bottom: 1px solid #aaaaaa;
}
.footer__logo-wrap {
  margin-right: auto;
  display: flex;
  flex-direction: column;
  row-gap: 5rem;
  max-width: 37rem;
}
.footer__logo {
  width: 23rem;
}
.footer__nav {
  margin-bottom: 6.4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 4rem;
}
.contacts-footer {
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
}
.contacts-footer__content {
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
}
.contacts-footer__icon {
  display: inline-flex;
}
.contacts-footer__icon svg {
  width: 2.4rem;
  height: 2.4rem;
}

.request-design-footer {
  padding: 6.4rem 0;
  display: grid;
  align-items: center;
  justify-items: center;
  row-gap: 2.4rem;
  width: 100%;
  color: #aaaaaa;
  text-align: center;
}
.request-design-footer__text {
  text-align: center;
}
.request-design-footer__logo {
  width: 30.4rem;
}

.h {
  font-family: "Roboto Condensed";
  font-weight: 500;
  text-transform: uppercase;
}
.h_h1 {
  font-size: 4.8rem;
  line-height: 5.6rem;
}
.h_h2 {
  font-size: 2.8rem;
  line-height: 3.3rem;
}
.h_large {
  font-size: 21rem;
  line-height: 24.6rem;
  text-transform: none;
}

.txt20 {
  font-size: 2rem;
  line-height: 2.3rem;
}

.txt18 {
  font-size: 1.8rem;
  line-height: 2.1rem;
}

.txt16 {
  font-size: 1.6rem;
  line-height: 1.9rem;
}

.fw-light {
  font-weight: 300;
}

.btn {
  display: inline-flex;
  align-items: center;
}
.btn_primary {
  padding: 1.6rem 3.2rem;
  height: 5.1rem;
  border-radius: 10rem;
  background-color: #da251e;
  transition: background-color 0.5s ease;
}
.btn_primary .btn__txt {
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: #ffffff;
}
.btn_secondary {
  padding: 10rem 3.2rem 3.2rem;
  align-items: flex-start;
  justify-content: flex-end;
  width: 25.2rem;
  height: 25.2rem;
  border: 1px solid #da251e;
  border-radius: 50%;
}
.btn_secondary .btn__txt {
  position: relative;
  font-size: 2rem;
  line-height: 2.3rem;
  color: #da251e;
}
.btn_secondary .btn__txt::after {
  content: "";
  position: absolute;
  bottom: -0.8rem;
  left: 100%;
  width: 5.4rem;
  height: 1.8rem;
  background: url("./assets/images/icons/arr-red.svg") center/contain no-repeat;
  transform: translate(-100%, 100%);
  transition: transform 0.5s ease, left 0.5s ease;
}
.btn__txt {
  font-family: "Roboto Condensed";
  font-weight: 500;
  text-transform: uppercase;
}

.i-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  border: 1px solid #da251e;
  border-radius: 50%;
}
.i-btn_bg {
  background-color: rgba(255, 255, 255, 0.7);
}
.i-btn svg {
  width: 3rem;
}
.i-btn_arr-next._has-hover svg, .i-btn_arr-prev._has-hover svg {
  transition: transform 0.5s ease;
}

input[type=text],
input[type=email],
input[type=tel],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

textarea:focus,
input:focus {
  outline: none;
}

.input {
  position: relative;
  padding-bottom: 1rem;
  line-height: 2.3rem;
  border-bottom: 1px solid #aaaaaa;
  transition: border-bottom 0.5s ease;
}
.input__field::placeholder {
  font-size: 2rem;
  line-height: 2.3rem;
  color: #aaaaaa;
}
.input._is-filled {
  border-bottom: 1px solid #1e1e1e;
}
.input._has-error {
  border-bottom: 1px solid #da251e;
}
.input._has-error .input__field::placeholder {
  color: #1e1e1e;
}
.input._has-error::after {
  content: attr(data-hint);
  font-family: "Roboto Condensed";
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: #da251e;
}

.tabs__navigation {
  display: flex;
  column-gap: 1.8rem;
}
.tabs__body {
  padding-top: 1rem;
}

.tab {
  position: relative;
  color: #aaaaaa;
}
.tab:not(.tab_static) {
  transition: color 0.5s ease, padding-left 0.3s ease;
}
.tab:not(.tab_static)._is-active {
  padding-left: 3.4rem;
  color: #da251e;
}
.tab:not(.tab_static)._is-active::before {
  transform: scale(1);
}
.tab_static {
  display: inline-flex;
  align-items: center;
  column-gap: 1rem;
  color: #da251e;
}
.tab_static.tab::before {
  position: static;
  transform: scale(1);
}
.tab::before {
  content: "";
  position: absolute;
  top: 0.8rem;
  left: 0;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background-color: #da251e;
  transform: scale(0);
  transition: transform 0.5s ease;
}
.tab__txt {
  font-family: "Roboto Condensed";
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.3rem;
}
@media (any-hover: hover) and (min-width: 48em){
  .btn_secondary:hover .btn__txt::after {
    left: 50%;
    transform: translate(-50%, 100%);
  }
}
@media (min-width: 48em){
  .header {
    border-bottom: 1px solid #aaaaaa;
  }
  .footer__nav {
    margin-bottom: 0;
    margin-right: 2.4rem;
    grid-template-columns: repeat(2, 24.5rem);
    gap: 2.4rem;
  }
  .request-design-footer {
    padding: 3.2rem 0;
    grid-template-columns: 25rem 1fr 25rem;
    justify-items: stretch;
  }
  .request-design-footer__text {
    justify-self: center;
  }
  .request-design-footer__logo {
    justify-self: end;
    width: 18.5rem;
  }
}
@media (min-width: 1920px){
  html {
    font-size: 10px;
  }
}
@media (max-width: 48em){
  html {
    font-size: 5px;
    font-size: 1.5625vw;
    font-size: 1.3333333333vw;
    -webkit-text-size-adjust: none;
  }
  body {
    font-size: 3.2rem;
    -webkit-text-size-adjust: none;
  }
  .container {
    padding: 0 2rem;
    width: 100%;
  }
  .header::before {
    content: "";
    position: absolute;
    z-index: 201;
    top: 0;
    left: 0;
    width: 100%;
    height: 15.2rem;
    background-color: #ffffff;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  ._menu-opened .header::before {
    opacity: 1;
  }
  .header__container {
    height: 15.2rem;
    border-bottom: 1px solid #aaaaaa;
  }
  .header__logo {
    flex: 0 0 35.4rem;
    width: 35.4rem;
  }
  .header__nav {
    flex-direction: column;
    align-items: center;
    gap: 6.4rem;
  }
  .header__nav-link {
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size: 4rem;
    line-height: 4.6rem;
  }
  .header__nav-link.txt20 {
    font-size: 4rem;
    line-height: 4.6rem;
  }
  .hamburger {
    position: relative;
    display: block;
    width: 4.8rem;
    height: 3rem;
    transform: rotate(0deg);
    transition: transform 0.5s ease-in-out;
    cursor: pointer;
  }
  ._menu-opened .hamburger span:first-child {
    top: 3.6rem;
    width: 0;
    height: 50%;
  }
  ._menu-opened .hamburger span:nth-child(2) {
    transform: rotate(45deg);
  }
  ._menu-opened .hamburger span:nth-child(3) {
    transform: rotate(-45deg);
  }
  ._menu-opened .hamburger span:last-child {
    top: 3.6rem;
    width: 0;
    left: 50%;
  }
  .hamburger span {
    position: absolute;
    left: 0;
    display: block;
    height: 0.2rem;
    width: 100%;
    background-color: #1e1e1e;
    opacity: 1;
    transform: rotate(0deg);
    transition: transform 0.25s ease-in-out;
  }
  .hamburger span:first-child {
    top: 0;
  }
  .hamburger span:nth-child(2), .hamburger span:nth-child(3) {
    top: 1.5rem;
  }
  .hamburger span:last-child {
    top: 3rem;
  }
  .header-menu {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    padding-top: 22.8rem;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow: auto;
    transform: translateY(-110%);
    transition: transform 0.5s ease;
  }
  ._menu-opened .header-menu {
    transform: translateY(0);
  }
  .footer__main {
    padding-bottom: 6.4rem;
    flex-direction: column;
  }
  .footer__logo-wrap {
    margin-right: 0;
    margin-bottom: 6.4rem;
    row-gap: 4rem;
    max-width: none;
  }
  .footer__logo {
    width: 35.6rem;
  }
  .footer__text {
    max-width: 56rem;
  }
  .contacts-footer {
    align-items: flex-start;
    row-gap: 4rem;
  }
  .contacts-footer__content {
    column-gap: 1.6rem;
  }
  .contacts-footer__icon svg {
    width: 4rem;
    height: 4rem;
  }
  .h_h1 {
    font-size: 5.2rem;
    line-height: 6rem;
  }
  .h_h2 {
    font-size: 4rem;
    line-height: 4.6rem;
  }
  .h_large {
    font-size: 8.8rem;
    line-height: 10.4rem;
    text-transform: uppercase;
  }
  .txt20 {
    font-size: 3.2rem;
    line-height: 3.6rem;
  }
  .txt18 {
    font-size: 3.2rem;
    line-height: 3.8rem;
  }
  .txt16 {
    font-size: 2.8rem;
    line-height: 3.2rem;
  }
  .btn_primary {
    width: 100%;
    height: 8.6rem;
    border-radius: 20rem;
  }
  .btn_primary .btn__txt {
    font-size: 3.2rem;
    line-height: 3.8rem;
  }
  .btn_secondary {
    padding: 0;
    justify-content: flex-start;
    align-items: center;
    height: 8.6rem;
    width: 100%;
    border-radius: 20rem;
  }
  .btn_secondary .btn__txt {
    padding: 2.4rem 21rem 2.4rem 4rem;
    font-size: 3.2rem;
    line-height: 3.8rem;
  }
  .btn_secondary .btn__txt::after {
    top: 50%;
    left: auto;
    right: 0;
    width: 6.4rem;
    height: 2rem;
    transform: translate(-4rem, -50%);
  }
  .i-btn {
    width: 11rem;
    height: 11rem;
  }
  .i-btn svg {
    width: 4.8rem;
  }
  .input {
    padding-bottom: 1.6rem;
    line-height: 3.6rem;
  }
  .input .input__field::placeholder {
    font-size: 3.2rem;
  }
  .input._has-error::after {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
  .tabs__navigation {
    column-gap: 3.6rem;
  }
  .tab:not(.tab_static)._is-active {
    padding-left: 4.8rem;
  }
  .tab_static {
    column-gap: 2.4rem;
  }
  .tab::before {
    top: 1rem;
    width: 2.4rem;
    height: 2.4rem;
  }
  .tab__txt {
    font-size: 4rem;
    line-height: 4.6rem;
  }
}
@media (max-width: 48em) and (any-hover: hover){
  .btn_secondary:hover .btn__txt::after {
    transform: translate(-14.6rem, -50%);
  }
}
@media (any-hover: hover){
  .header__nav-link:not(.header__nav-link.tab):hover {
    color: #da251e;
  }
  .header__nav-link:not(.header__nav-link.tab):hover::after {
    transform: scaleX(1);
  }
  .btn_primary:hover {
    background-color: #1e1e1e;
  }
  .i-btn_arr-next._has-hover:hover.i-btn_arr-prev svg, .i-btn_arr-prev._has-hover:hover.i-btn_arr-prev svg {
    transform: translateX(-0.8rem);
  }
  .i-btn_arr-next._has-hover:hover.i-btn_arr-next svg, .i-btn_arr-prev._has-hover:hover.i-btn_arr-next svg {
    transform: translateX(0.8rem);
  }
}`, "",{"version":3,"sources":["webpack://./src/scss/fonts.scss","webpack://./src/scss/style.scss","webpack://./src/scss/set.scss","webpack://./src/scss/sections/header.scss","webpack://./src/scss/sections/footer.scss","webpack://./src/ui/_typo.scss","webpack://./src/ui/_buttons.scss","webpack://./src/ui/_input.scss","webpack://./src/ui/_tabs.scss","<no source>"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"Gilroy\";\n  src: url(\"../assets/fonts/Gilroy-Regular.woff2\") format(\"woff2\");\n  font-weight: 400;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(\"../assets/fonts/Gilroy-Medium.woff2\") format(\"woff2\");\n  font-weight: 500;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(\"../assets/fonts/Gilroy-Bold.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: normal;\n}\n","// ---- variables\n\n// colors\n$white: #ffffff;\n$black: #1e1e1e;\n$gray: #aaaaaa;\n$red: #da251e;\n\n// ----- fonts\n\n// imported fonts\n@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:wght@400;500;700&display=swap');\n\n// local fonts\n@import './fonts';\n\n// ----- base styles\n\n// base scss file\n@import './set';\n\n// html, body\nhtml.lock {\n    overflow: hidden;\n    touch-action: none;\n}\nhtml,\nbody {\n    overflow-x: clip;\n}\n\n// main\nmain {\n    position: relative;\n\n    flex: 1 1 auto;\n}\n\n// wrapper\n.wrapper {\n    margin: 0 auto;\n\n    display: flex;\n    flex-direction: column;\n\n    max-width: 1920px;\n    height: 100%;\n}\n\n// ----- imports\n\n// header / footer\n@import './sections/header';\n@import './sections/footer';\n\n// ui\n@import '../ui/ui';\n","*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\n\n// html, body\nhtml,\nbody {\n    margin: 0;\n    padding: 0;\n\n    height: 100%;\n\n    font-style: normal;\n    font-weight: normal;\n    line-height: 1.2;\n\n    -webkit-animation: bugfix infinite 1s;\n}\nhtml {\n    font-family: 'Roboto';\n    font-size: 0.5208335vw;\n}\nbody {\n    font-size: 2rem;\n\n    color: $black;\n    background-color: $white;\n}\n\n// input, textarea\ninput,\ntextarea {\n    margin: 0;\n    padding: 0;\n\n    border: none;\n\n    line-height: inherit;\n\n    background-color: transparent;\n    color: inherit;\n\n    -webkit-animation: bugfix infinite 1s;\n}\ninput[type='number']::-webkit-inner-spin-button,\ninput[type='number']::-webkit-outer-spin-button {\n    margin: 0;\n\n    -webkit-appearance: none;\n}\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\n// remove outline\nbutton,\ninput,\na,\ntextarea {\n    font: inherit;\n\n    outline: none;\n    cursor: pointer;\n\n    &:focus {\n        outline: none;\n    }\n\n    &:active {\n        outline: none;\n    }\n}\n\n// -----\n\na {\n    color: unset;\n}\na,\na:hover {\n    text-decoration: none;\n}\n\np {\n    margin: 0;\n}\n\nimg {\n    display: block;\n\n    width: 100%;\n    height: auto;\n\n    object-fit: contain;\n}\n\nbutton {\n    padding: 0;\n\n    border: none;\n\n    font: inherit;\n    text-align: inherit;\n\n    color: inherit;\n    background-color: transparent;\n}\n\nul,\nul li {\n    padding: 0;\n    margin: 0;\n}\nul li {\n    list-style: none;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    margin: 0;\n    padding: 0;\n\n    font: inherit;\n}\n\n// ----- container\n\n.container {\n    width: 172rem;\n    margin: 0 auto;\n}\n\n// ----- media queries\n\n@media (max-width: 48em) {\n    html {\n        font-size: 5px;\n        font-size: 1.5625vw;\n        font-size: calc((100 / 375) * 5vw);\n\n        -webkit-text-size-adjust: none;\n    }\n    body {\n        font-size: 3.2rem;\n\n        -webkit-text-size-adjust: none;\n    }\n\n    .container {\n        padding: 0 2rem;\n\n        width: 100%;\n    }\n}\n@media (min-width: 1920px) {\n    html {\n        font-size: 10px;\n    }\n}\n",".header {\n    @media (min-width: 48em) {\n        border-bottom: 1px solid $gray;\n    }\n    @media (max-width: 48em) {\n        &::before {\n            content: '';\n\n            position: absolute;\n            z-index: 201;\n            top: 0;\n            left: 0;\n\n            width: 100%;\n            height: 15.2rem;\n\n            background-color: $white;\n\n            opacity: 0;\n\n            transition: opacity 0.5s ease;\n\n            ._menu-opened & {\n                opacity: 1;\n            }\n        }\n    }\n\n    &__container {\n        position: relative;\n        z-index: 202;\n\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n\n        height: 12.1rem;\n\n        @media (max-width: 48em) {\n            height: 15.2rem;\n            border-bottom: 1px solid $gray;\n        }\n    }\n\n    &__logo {\n        flex: 0 0 22.9rem;\n\n        width: 22.9rem;\n\n        @media (max-width: 48em) {\n            flex: 0 0 35.4rem;\n\n            width: 35.4rem;\n        }\n    }\n\n    &__nav {\n        display: flex;\n        gap: 4rem;\n\n        @media (max-width: 48em) {\n            flex-direction: column;\n            align-items: center;\n            gap: 6.4rem;\n        }\n    }\n\n    &__nav-link {\n        &:not(&.tab) {\n            position: relative;\n\n            transition: color 0.5s ease;\n\n            &::after {\n                content: '';\n\n                position: absolute;\n                bottom: -0.2rem;\n                left: 0;\n\n                width: 100%;\n                height: 1px;\n\n                background-color: $red;\n\n                transform: scaleX(0);\n\n                transition: transform 0.5s ease;\n            }\n\n            @media (any-hover: hover) {\n                &:hover {\n                    color: $red;\n\n                    &::after {\n                        transform: scaleX(1);\n                    }\n                }\n            }\n        }\n\n        @media (max-width: 48em) {\n            font-family: 'Roboto Condensed';\n            font-weight: 500;\n            font-size: 4rem;\n            line-height: 4.6rem;\n\n            &.txt20 {\n                font-size: 4rem;\n                line-height: 4.6rem;\n            }\n        }\n    }\n}\n\n.hamburger {\n    display: none;\n\n    @media (max-width: 48em) {\n        position: relative;\n\n        display: block;\n        width: 4.8rem;\n        height: 3rem;\n\n        transform: rotate(0deg);\n        transition: transform 0.5s ease-in-out;\n\n        cursor: pointer;\n\n        ._menu-opened & {\n            span {\n                &:first-child {\n                    top: 3.6rem;\n\n                    width: 0;\n                    height: 50%;\n                }\n                &:nth-child(2) {\n                    transform: rotate(45deg);\n                }\n                &:nth-child(3) {\n                    transform: rotate(-45deg);\n                }\n                &:last-child {\n                    top: 3.6rem;\n                    width: 0;\n                    left: 50%;\n                }\n            }\n        }\n\n        span {\n            position: absolute;\n            left: 0;\n\n            display: block;\n\n            height: 0.2rem;\n            width: 100%;\n\n            background-color: $black;\n\n            opacity: 1;\n\n            transform: rotate(0deg);\n\n            transition: transform 0.25s ease-in-out;\n\n            &:first-child {\n                top: 0;\n            }\n            &:nth-child(2),\n            &:nth-child(3) {\n                top: 1.5rem;\n            }\n            &:last-child {\n                top: 3rem;\n            }\n        }\n    }\n}\n\n.header-menu {\n    display: none;\n\n    @media (max-width: 48em) {\n        position: fixed;\n        z-index: 200;\n        top: 0;\n        left: 0;\n\n        padding-top: 22.8rem;\n\n        display: block;\n        width: 100%;\n        height: 100%;\n\n        background-color: $white;\n\n        overflow: auto;\n        transform: translateY(-110%);\n\n        transition: transform 0.5s ease;\n\n        ._menu-opened & {\n            transform: translateY(0);\n        }\n    }\n}\n",".footer {\n    &__container {\n        display: flex;\n        flex-direction: column;\n    }\n\n    &__main {\n        padding-bottom: 3.2rem;\n\n        display: flex;\n\n        border-bottom: 1px solid $gray;\n\n        @media (max-width: 48em) {\n            padding-bottom: 6.4rem;\n\n            flex-direction: column;\n        }\n    }\n\n    &__logo-wrap {\n        margin-right: auto;\n\n        display: flex;\n        flex-direction: column;\n        row-gap: 5rem;\n\n        max-width: 37rem;\n\n        @media (max-width: 48em) {\n            margin-right: 0;\n            margin-bottom: 6.4rem;\n\n            row-gap: 4rem;\n\n            max-width: none;\n        }\n    }\n\n    &__logo {\n        width: 23rem;\n\n        @media (max-width: 48em) {\n            width: 35.6rem;\n        }\n    }\n\n    &__text {\n        @media (max-width: 48em) {\n            max-width: 56rem;\n        }\n    }\n\n    &__nav {\n        margin-bottom: 6.4rem;\n\n        display: grid;\n        grid-template-columns: repeat(2, 1fr);\n        row-gap: 4rem;\n\n        @media (min-width: 48em) {\n            margin-bottom: 0;\n            margin-right: 2.4rem;\n\n            grid-template-columns: repeat(2, 24.5rem);\n            gap: 2.4rem;\n        }\n    }\n\n    &__nav-link {\n    }\n}\n\n.contacts-footer {\n    display: flex;\n    flex-direction: column;\n    row-gap: 2.5rem;\n\n    @media (max-width: 48em) {\n        align-items: flex-start;\n        row-gap: 4rem;\n    }\n\n    &__content {\n        display: flex;\n        align-items: center;\n        column-gap: 1.2rem;\n\n        @media (max-width: 48em) {\n            column-gap: 1.6rem;\n        }\n    }\n\n    &__icon {\n        display: inline-flex;\n\n        svg {\n            width: 2.4rem;\n            height: 2.4rem;\n\n            @media (max-width: 48em) {\n                width: 4rem;\n                height: 4rem;\n            }\n        }\n    }\n}\n\n.request-design-footer {\n    padding: 6.4rem 0;\n\n    display: grid;\n    align-items: center;\n    justify-items: center;\n    row-gap: 2.4rem;\n\n    width: 100%;\n\n    color: $gray;\n    text-align: center;\n\n    @media (min-width: 48em) {\n        padding: 3.2rem 0;\n\n        grid-template-columns: 25rem 1fr 25rem;\n        justify-items: stretch;\n    }\n\n    &__text {\n        text-align: center;\n\n        @media (min-width: 48em) {\n            justify-self: center;\n        }\n    }\n\n    &__logo {\n        width: 30.4rem;\n\n        @media (min-width: 48em) {\n            justify-self: end;\n\n            width: 18.5rem;\n        }\n    }\n}\n",".h {\n    font-family: 'Roboto Condensed';\n    font-weight: 500;\n    text-transform: uppercase;\n\n    &_h1 {\n        font-size: 4.8rem;\n        line-height: 5.6rem;\n\n        @media (max-width: 48em) {\n            font-size: 5.2rem;\n            line-height: 6rem;\n        }\n    }\n\n    &_h2 {\n        font-size: 2.8rem;\n        line-height: 3.3rem;\n\n        @media (max-width: 48em) {\n            font-size: 4rem;\n            line-height: 4.6rem;\n        }\n    }\n\n    &_large {\n        font-size: 21rem;\n        line-height: 24.6rem;\n        text-transform: none;\n\n        @media (max-width: 48em) {\n            font-size: 8.8rem;\n            line-height: 10.4rem;\n            text-transform: uppercase;\n        }\n    }\n}\n\n.txt20 {\n    font-size: 2rem;\n    line-height: 2.3rem;\n\n    @media (max-width: 48em) {\n        font-size: 3.2rem;\n        line-height: 3.6rem;\n    }\n}\n\n.txt18 {\n    font-size: 1.8rem;\n    line-height: 2.1rem;\n\n    @media (max-width: 48em) {\n        font-size: 3.2rem;\n        line-height: 3.8rem;\n    }\n}\n\n.txt16 {\n    font-size: 1.6rem;\n    line-height: 1.9rem;\n\n    @media (max-width: 48em) {\n        font-size: 2.8rem;\n        line-height: 3.2rem;\n    }\n}\n\n.fw-light {\n    font-weight: 300;\n}\n",".btn {\n    display: inline-flex;\n    align-items: center;\n\n    &_primary {\n        padding: 1.6rem 3.2rem;\n\n        height: 5.1rem;\n        border-radius: 10rem;\n\n        background-color: $red;\n\n        transition: background-color 0.5s ease;\n\n        .btn__txt {\n            font-size: 1.6rem;\n            line-height: 1.9rem;\n            color: $white;\n        }\n\n        @media (any-hover: hover) {\n            &:hover {\n                background-color: $black;\n            }\n        }\n\n        @media (max-width: 48em) {\n            width: 100%;\n            height: 8.6rem;\n            border-radius: 20rem;\n\n            .btn__txt {\n                font-size: 3.2rem;\n                line-height: 3.8rem;\n            }\n        }\n    }\n\n    &_secondary {\n        padding: 10rem 3.2rem 3.2rem;\n\n        align-items: flex-start;\n        justify-content: flex-end;\n\n        width: 25.2rem;\n        height: 25.2rem;\n        border: 1px solid $red;\n        border-radius: 50%;\n\n        .btn__txt {\n            position: relative;\n\n            font-size: 2rem;\n            line-height: 2.3rem;\n            color: $red;\n\n            &::after {\n                content: '';\n\n                position: absolute;\n                bottom: -0.8rem;\n                left: 100%;\n\n                width: 5.4rem;\n                height: 1.8rem;\n\n                background: url('./assets/images/icons/arr-red.svg') center / contain no-repeat;\n\n                transform: translate(-100%, 100%);\n\n                transition:\n                    transform 0.5s ease,\n                    left 0.5s ease;\n            }\n        }\n\n        @media (any-hover: hover) and (min-width: 48em) {\n            &:hover {\n                .btn__txt::after {\n                    left: 50%;\n\n                    transform: translate(-50%, 100%);\n                }\n            }\n        }\n\n        @media (max-width: 48em) {\n            padding: 0;\n\n            justify-content: flex-start;\n            align-items: center;\n\n            height: 8.6rem;\n            width: 100%;\n            border-radius: 20rem;\n\n            .btn__txt {\n                padding: 2.4rem 21rem 2.4rem 4rem;\n\n                font-size: 3.2rem;\n                line-height: 3.8rem;\n\n                &::after {\n                    top: 50%;\n                    left: auto;\n                    right: 0;\n\n                    width: 6.4rem;\n                    height: 2rem;\n\n                    transform: translate(-4rem, -50%);\n                }\n            }\n\n            @media (any-hover: hover) {\n                &:hover {\n                    .btn__txt::after {\n                        transform: translate(-14.6rem, -50%);\n                    }\n                }\n            }\n        }\n    }\n\n    &__txt {\n        font-family: 'Roboto Condensed';\n        font-weight: 500;\n        text-transform: uppercase;\n    }\n}\n\n.i-btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n\n    width: 6rem;\n    height: 6rem;\n    border: 1px solid $red;\n    border-radius: 50%;\n\n    &_bg {\n        background-color: rgba(255, 255, 255, 0.7);\n    }\n\n    svg {\n        width: 3rem;\n    }\n\n    &_arr-next._has-hover,\n    &_arr-prev._has-hover {\n        svg {\n            transition: transform 0.5s ease;\n        }\n\n        @media (any-hover: hover) {\n            &:hover {\n                &.i-btn_arr-prev {\n                    svg {\n                        transform: translateX(-0.8rem);\n                    }\n                }\n                &.i-btn_arr-next {\n                    svg {\n                        transform: translateX(0.8rem);\n                    }\n                }\n            }\n        }\n    }\n\n    @media (max-width: 48em) {\n        width: 11rem;\n        height: 11rem;\n\n        svg {\n            width: 4.8rem;\n        }\n    }\n}\n","input[type='text'],\ninput[type='email'],\ninput[type='tel'],\ntextarea {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\ntextarea:focus,\ninput:focus {\n    outline: none;\n}\n\n.input {\n    position: relative;\n\n    padding-bottom: 1rem;\n\n    line-height: 2.3rem;\n\n    border-bottom: 1px solid $gray;\n\n    transition: border-bottom 0.5s ease;\n\n    &__field {\n        &::placeholder {\n            font-size: 2rem;\n            line-height: 2.3rem;\n            color: $gray;\n        }\n    }\n\n    @media (max-width: 48em) {\n        padding-bottom: 1.6rem;\n\n        line-height: 3.6rem;\n\n        .input__field {\n            &::placeholder {\n                font-size: 3.2rem;\n            }\n        }\n    }\n\n    &._is-filled {\n        border-bottom: 1px solid $black;\n    }\n\n    &._has-error {\n        border-bottom: 1px solid $red;\n\n        .input__field {\n            &::placeholder {\n                color: $black;\n            }\n        }\n\n        &::after {\n            content: attr(data-hint);\n\n            font-family: 'Roboto Condensed';\n            font-size: 1.4rem;\n            line-height: 1.6rem;\n            color: $red;\n\n            @media (max-width: 48em) {\n                font-size: 2.4rem;\n                line-height: 2.8rem;\n            }\n        }\n    }\n}\n",".tabs {\n    &__navigation {\n        display: flex;\n        column-gap: 1.8rem;\n\n        @media (max-width: 48em) {\n            column-gap: 3.6rem;\n        }\n    }\n\n    &__body {\n        padding-top: 1rem;\n    }\n}\n\n.tab {\n    position: relative;\n\n    color: $gray;\n\n    &:not(&_static) {\n        transition:\n            color 0.5s ease,\n            padding-left 0.3s ease;\n\n        &._is-active {\n            padding-left: 3.4rem;\n\n            color: $red;\n\n            &::before {\n                transform: scale(1);\n            }\n\n            @media (max-width: 48em) {\n                padding-left: 4.8rem;\n            }\n        }\n    }\n\n    &_static {\n        display: inline-flex;\n        align-items: center;\n        column-gap: 1rem;\n\n        color: $red;\n\n        &.tab::before {\n            position: static;\n\n            transform: scale(1);\n        }\n\n        @media (max-width: 48em) {\n            column-gap: 2.4rem;\n        }\n    }\n\n    &::before {\n        content: '';\n\n        position: absolute;\n        top: 0.8rem;\n        left: 0;\n\n        width: 1.8rem;\n        height: 1.8rem;\n        border-radius: 50%;\n\n        background-color: $red;\n\n        transform: scale(0);\n\n        transition: transform 0.5s ease;\n\n        @media (max-width: 48em) {\n            top: 1rem;\n\n            width: 2.4rem;\n            height: 2.4rem;\n        }\n    }\n\n    &__txt {\n        font-family: 'Roboto Condensed';\n        font-weight: 500;\n        font-size: 2.8rem;\n        line-height: 3.3rem;\n\n        @media (max-width: 48em) {\n            font-size: 4rem;\n            line-height: 4.6rem;\n        }\n    }\n}\n",null],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../node_modules/group-css-media-queries-loader/lib/index.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/forms */ "./src/js/utils/forms.js");
/* harmony import */ var _utils_tabs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/tabs.js */ "./src/js/utils/tabs.js");
/* harmony import */ var _utils_modals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/modals.js */ "./src/js/utils/modals.js");
/* harmony import */ var _lib_dd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/dd */ "./src/js/lib/dd.js");
/* harmony import */ var _lib_dd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_dd__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dev/vzmsk1.js */ "./src/js/dev/vzmsk1.js");
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dev/markusDM.js */ "./src/js/dev/markusDM.js");
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_dev_markusDM_js__WEBPACK_IMPORTED_MODULE_7__);


// ---------------------------------- utils ---------------------------------



// hamburger menu
_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.menuInit();

// set current year
_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.setCurrentYear();

// ------------------------------- components -------------------------------

// forms


// tabs


// accordion
// import './utils/accordion.js';

// select
// import './utils/select.js';

// modals


// ---------------------------------- libs ----------------------------------

// dynamic dom


// --------------------------------------------------------------------------



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxrWUFBa1ksV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLFFBQVEsV0FBVyxPQUFPLE9BQU8sVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLEtBQUssV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsYUFBYSxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sUUFBUSxVQUFVLFVBQVUsVUFBVSxLQUFLLFFBQVEsVUFBVSxLQUFLLFFBQVEsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksWUFBWSxXQUFXLFFBQVEsTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxPQUFPLFdBQVcsV0FBVyxPQUFPLE9BQU8sV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsVUFBVSxPQUFPLE9BQU8sV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE9BQU8sV0FBVyxVQUFVLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsUUFBUSxNQUFNLFdBQVcsV0FBVyxXQUFXLFFBQVEsT0FBTyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLE9BQU8sT0FBTyxVQUFVLE9BQU8sT0FBTyxXQUFXLFFBQVEsVUFBVSxXQUFXLFdBQVcsV0FBVyxRQUFRLFFBQVEsVUFBVSxRQUFRLE9BQU8sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxVQUFVLFdBQVcsV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFFBQVEsT0FBTyxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsUUFBUSxPQUFPLFdBQVcsVUFBVSxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFFBQVEsT0FBTyxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsT0FBTyxPQUFPLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsT0FBTyxPQUFPLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxPQUFPLE9BQU8sVUFBVSxXQUFXLFFBQVEsTUFBTSxNQUFNLEtBQUssV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLEtBQUssTUFBTSxNQUFNLFVBQVUsS0FBSyxNQUFNLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxZQUFZLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFX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QUV5QiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy9saWIvZGQuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL2Zvcm1zLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9tb2RhbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9zY3NzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzPzZjMmQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmZ1bmN0aW9uIER5bmFtaWNBZGFwdCh0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbn1cbkR5bmFtaWNBZGFwdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy7QvmJqZWN0cyA9IFtdO1xuICAgIHRoaXMuZGFDbGFzc25hbWUgPSAnX2R5bmFtaWNfYWRhcHRfJztcbiAgICB0aGlzLm5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGFdJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGVzW2ldO1xuICAgICAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhc2V0LmRhLnRyaW0oKTtcbiAgICAgICAgY29uc3QgZGF0YUFycmF5ID0gZGF0YS5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCDQvmJqZWN0ID0ge307XG4gICAgICAgINC+YmplY3QuZWxlbWVudCA9IG5vZGU7XG4gICAgICAgINC+YmplY3QucGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICDQvmJqZWN0LmRlc3RpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhQXJyYXlbMF0udHJpbSgpKTtcbiAgICAgICAg0L5iamVjdC5icmVha3BvaW50ID0gZGF0YUFycmF5WzFdID8gZGF0YUFycmF5WzFdLnRyaW0oKSA6ICc3NjcnO1xuICAgICAgICDQvmJqZWN0LnBsYWNlID0gZGF0YUFycmF5WzJdID8gZGF0YUFycmF5WzJdLnRyaW0oKSA6ICdsYXN0JztcbiAgICAgICAg0L5iamVjdC5pbmRleCA9IHRoaXMuaW5kZXhJblBhcmVudCjQvmJqZWN0LnBhcmVudCwg0L5iamVjdC5lbGVtZW50KTtcbiAgICAgICAgdGhpcy7QvmJqZWN0cy5wdXNoKNC+YmplY3QpO1xuICAgIH1cbiAgICB0aGlzLmFycmF5U29ydCh0aGlzLtC+YmplY3RzKTtcbiAgICB0aGlzLm1lZGlhUXVlcmllcyA9IEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChcbiAgICAgICAgdGhpcy7QvmJqZWN0cyxcbiAgICAgICAgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAnKCcgKyB0aGlzLnR5cGUgKyAnLXdpZHRoOiAnICsgaXRlbS5icmVha3BvaW50ICsgJ3B4KSwnICsgaXRlbS5icmVha3BvaW50O1xuICAgICAgICB9LFxuICAgICAgICB0aGlzXG4gICAgKTtcbiAgICB0aGlzLm1lZGlhUXVlcmllcyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCh0aGlzLm1lZGlhUXVlcmllcywgZnVuY3Rpb24gKGl0ZW0sIGluZGV4LCBzZWxmKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHNlbGYsIGl0ZW0pID09PSBpbmRleDtcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWVkaWFRdWVyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhID0gdGhpcy5tZWRpYVF1ZXJpZXNbaV07XG4gICAgICAgIGNvbnN0IG1lZGlhU3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0LmNhbGwobWVkaWEsICcsJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShtZWRpYVNwbGl0WzBdKTtcbiAgICAgICAgY29uc3QgbWVkaWFCcmVha3BvaW50ID0gbWVkaWFTcGxpdFsxXTtcbiAgICAgICAgY29uc3Qg0L5iamVjdHNGaWx0ZXIgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwodGhpcy7QvmJqZWN0cywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmJyZWFrcG9pbnQgPT09IG1lZGlhQnJlYWtwb2ludDtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hdGNoTWVkaWEuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMubWVkaWFIYW5kbGVyKG1hdGNoTWVkaWEsINC+YmplY3RzRmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWVkaWFIYW5kbGVyKG1hdGNoTWVkaWEsINC+YmplY3RzRmlsdGVyKTtcbiAgICB9XG59O1xuRHluYW1pY0FkYXB0LnByb3RvdHlwZS5tZWRpYUhhbmRsZXIgPSBmdW5jdGlvbiAobWF0Y2hNZWRpYSwg0L5iamVjdHMpIHtcbiAgICBpZiAobWF0Y2hNZWRpYS5tYXRjaGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwg0L5iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0INC+YmplY3QgPSDQvmJqZWN0c1tpXTtcbiAgICAgICAgICAgINC+YmplY3QuaW5kZXggPSB0aGlzLmluZGV4SW5QYXJlbnQo0L5iamVjdC5wYXJlbnQsINC+YmplY3QuZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVUbyjQvmJqZWN0LnBsYWNlLCDQvmJqZWN0LmVsZW1lbnQsINC+YmplY3QuZGVzdGluYXRpb24pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8INC+YmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSDQvmJqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3Qg0L5iamVjdCA9INC+YmplY3RzW2ldO1xuICAgICAgICAgICAgaWYgKNC+YmplY3QuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kYUNsYXNzbmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVCYWNrKNC+YmplY3QucGFyZW50LCDQvmJqZWN0LmVsZW1lbnQsINC+YmplY3QuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbkR5bmFtaWNBZGFwdC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24gKHBsYWNlLCBlbGVtZW50LCBkZXN0aW5hdGlvbikge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmRhQ2xhc3NuYW1lKTtcbiAgICBpZiAocGxhY2UgPT09ICdsYXN0JyB8fCBwbGFjZSA+PSBkZXN0aW5hdGlvbi5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgZGVzdGluYXRpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGxhY2UgPT09ICdmaXJzdCcpIHtcbiAgICAgICAgZGVzdGluYXRpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgZWxlbWVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVzdGluYXRpb24uY2hpbGRyZW5bcGxhY2VdLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBlbGVtZW50KTtcbn07XG5EeW5hbWljQWRhcHQucHJvdG90eXBlLm1vdmVCYWNrID0gZnVuY3Rpb24gKHBhcmVudCwgZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kYUNsYXNzbmFtZSk7XG4gICAgaWYgKHBhcmVudC5jaGlsZHJlbltpbmRleF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5baW5kZXhdLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBlbGVtZW50KTtcbiAgICB9XG59O1xuRHluYW1pY0FkYXB0LnByb3RvdHlwZS5pbmRleEluUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IGFycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyZW50LmNoaWxkcmVuKTtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhcnJheSwgZWxlbWVudCk7XG59O1xuRHluYW1pY0FkYXB0LnByb3RvdHlwZS5hcnJheVNvcnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ21pbicpIHtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnNvcnQuY2FsbChhcnIsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYS5icmVha3BvaW50ID09PSBiLmJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYS5wbGFjZSA9PT0gYi5wbGFjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYS5wbGFjZSA9PT0gJ2ZpcnN0JyB8fCBiLnBsYWNlID09PSAnbGFzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhLnBsYWNlID09PSAnbGFzdCcgfHwgYi5wbGFjZSA9PT0gJ2ZpcnN0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wbGFjZSAtIGIucGxhY2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhLmJyZWFrcG9pbnQgLSBiLmJyZWFrcG9pbnQ7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5zb3J0LmNhbGwoYXJyLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEuYnJlYWtwb2ludCA9PT0gYi5icmVha3BvaW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGEucGxhY2UgPT09IGIucGxhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGEucGxhY2UgPT09ICdmaXJzdCcgfHwgYi5wbGFjZSA9PT0gJ2xhc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhLnBsYWNlID09PSAnbGFzdCcgfHwgYi5wbGFjZSA9PT0gJ2ZpcnN0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIucGxhY2UgLSBhLnBsYWNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYi5icmVha3BvaW50IC0gYS5icmVha3BvaW50O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn07XG5jb25zdCBkYSA9IG5ldyBEeW5hbWljQWRhcHQoJ21heCcpO1xuZGEuaW5pdCgpO1xuIiwiZXhwb3J0IGNvbnN0IG1vZHVsZXMgPSB7fTtcbiIsImltcG9ydCB7IG1vZHVsZXMgfSBmcm9tICcuLi9tb2R1bGVzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgVmFsaWRhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICAgICAgICBSRVFVSVJFRDogJ2RhdGEtcmVxdWlyZWQnLFxuICAgICAgICAgICAgSUdOT1JFX1ZBTElEQVRJT046ICdkYXRhLWlnbm9yZS12YWxpZGF0aW9uJyxcbiAgICAgICAgICAgIEFKQVg6ICdkYXRhLWFqYXgnLFxuICAgICAgICAgICAgREVWOiAnZGF0YS1kZXYnLFxuICAgICAgICAgICAgSUdOT1JFX0ZPQ1VTOiAnZGF0YS1pZ25vcmUtZm9jdXMnLFxuICAgICAgICAgICAgU0hPV19QTEFDRUhPTERFUjogJ2RhdGEtc2hvdy1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBWQUxJREFURTogJ2RhdGEtdmFsaWRhdGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgICAgICAgSEFTX0ZPQ1VTOiAnX2hhcy1mb2N1cycsXG4gICAgICAgICAgICBJU19GSUxMRUQ6ICdfaXMtZmlsbGVkJyxcbiAgICAgICAgICAgIElTX1JFVkVBTEVEOiAnX2lzLXJldmVhbGVkJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEVycm9ycyhmb3JtKSB7XG4gICAgICAgIGxldCBlcnIgPSAwO1xuICAgICAgICBsZXQgcmVxdWlyZWRGaWVsZHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoYCpbJHt0aGlzLmF0dHJzLlJFUVVJUkVEfV1gKTtcblxuICAgICAgICBpZiAocmVxdWlyZWRGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKChyZXF1aXJlZEZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAocmVxdWlyZWRGaWVsZC5vZmZzZXRQYXJlbnQgIT09IG51bGwgfHwgcmVxdWlyZWRGaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJykgJiZcbiAgICAgICAgICAgICAgICAgICAgIXJlcXVpcmVkRmllbGQuZGlzYWJsZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyICs9IHRoaXMudmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGFkZEVycm9yKHJlcXVpcmVkRmllbGQpIHtcbiAgICAgICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgICAgICByZXF1aXJlZEZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKTtcbiAgICAgICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCkge1xuICAgICAgICByZXF1aXJlZEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRmllbGQocmVxdWlyZWRGaWVsZCkge1xuICAgICAgICBsZXQgZXJyID0gMDtcblxuICAgICAgICBpZiAocmVxdWlyZWRGaWVsZC5kYXRhc2V0LnJlcXVpcmVkID09PSAnZW1haWwnKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkLnZhbHVlID0gcmVxdWlyZWRGaWVsZC52YWx1ZS5yZXBsYWNlKCcgJywgJycpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICAgICAgICAgIGVycisrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcXVpcmVkRmllbGQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiAhcmVxdWlyZWRGaWVsZC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICAgICAgZXJyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXJlcXVpcmVkRmllbGQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgICAgICAgICBlcnIrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGNsZWFyRmllbGRzKGZvcm0pIHtcbiAgICAgICAgZm9ybS5yZXNldCgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBpbnB1dHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihpbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoZWNrYm94ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY2hlY2tib3hlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHRlc3RFbWFpbChyZXF1aXJlZEZpZWxkKSB7XG4gICAgICAgIHJldHVybiAhL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDh9KSskLy50ZXN0KHJlcXVpcmVkRmllbGQudmFsdWUpO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1TdWJtaXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihzaG91bGRWYWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNob3VsZFZhbGlkYXRlID0gc2hvdWxkVmFsaWRhdGUgPyBzaG91bGRWYWxpZGF0ZSA6IHRydWU7XG4gICAgICAgIHRoaXMuZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNlbmRGb3JtKGZvcm0sIHJlc3BvbnNlUmVzdWx0ID0gYGApIHtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2VuZEZvcm0nLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHNob3cgbW9kYWwsIGlmIHBvcHVwIG1vZHVsZSBpcyBjb25uZWN0ZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAobW9kdWxlcy5wb3B1cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZm9ybS5kYXRhc2V0Lm1vZGFsTWVzc2FnZTtcbiAgICAgICAgICAgICAgICBtb2RhbCA/IG1vZHVsZXMubW9kYWwub3Blbihtb2RhbCkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcblxuICAgICAgICB0aGlzLmNsZWFyRmllbGRzKGZvcm0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdpcyBzZW50Jyk7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlU3VibWl0aW9uKGZvcm0sIGUpIHtcbiAgICAgICAgY29uc3QgZXJyID0gIWZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX1ZBTElEQVRJT04pID8gdGhpcy5nZXRFcnJvcnMoZm9ybSkgOiAwO1xuXG4gICAgICAgIGlmIChlcnIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFqYXggPSBmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkFKQVgpO1xuXG4gICAgICAgICAgICBpZiAoYWpheCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSA/IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKS50cmltKCkgOiAnIyc7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpID8gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpLnRyaW0oKSA6ICdHRVQnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAgICAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ19pcy1zZW5kaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFjdGlvbiwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0sIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnX2lzLXNlbmRpbmcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuREVWKSkge1xuICAgICAgICAgICAgICAgIC8vIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRm9ybShmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgY29uc3QgcGFzc3dvcmRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXF1aXJlZD1cInBhc3NcIl0nKTtcblxuICAgICAgICBpZiAodGhpcy5mb3Jtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXMuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlU3VibWl0aW9uKGUudGFyZ2V0LCBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xlYXJGaWVsZHMoZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFzc3dvcmRGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwYXNzd29yZEZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ0biA9IGZpZWxkLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKF90aGlzLmNsYXNzZXMuSVNfUkVWRUFMRUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAncGFzc3dvcmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShfdGhpcy5jbGFzc2VzLklTX1JFVkVBTEVEKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBGb3JtRmllbGRzIGV4dGVuZHMgVmFsaWRhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsdGV4dGFyZWEnKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2F2ZVBsYWNlaG9sZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuU0hPV19QTEFDRUhPTERFUikpIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuZGF0YXNldC5wbGFjZWhvbGRlciA9IGZpZWxkLnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXNpbihlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB0YXJnZXQucGxhY2Vob2xkZXIgPSAnJztcblxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX0ZPQ1VTKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlICE9PSAnZmlsZScgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSAhPT0gJ2NoZWNrYm94JyAmJlxuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlICE9PSAncmFkaW8nICYmXG4gICAgICAgICAgICAgICAgIXRhcmdldC5jbG9zZXN0KCcucXVhbnRpdHknKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1c291dChlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuZGF0YXNldC5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuVkFMSURBVEUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKHRhcmdldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSAhPT0gJ2ZpbGUnICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUgIT09ICdjaGVja2JveCcgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSAhPT0gJ3JhZGlvJyAmJlxuICAgICAgICAgICAgICAgICF0YXJnZXQuY2xvc2VzdCgnLnF1YW50aXR5JylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKSAmJiB0YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIHNhdmUgcGxhY2Vob2xkZXIgaW4gZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5zYXZlUGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAvLyBoYW5kbGUgc3VibWl0aW9uXG4gICAgICAgIG5ldyBGb3JtU3VibWl0aW9uKCk7XG5cbiAgICAgICAgLy8gZXZlbnRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuaGFuZGxlRm9jdXNpbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuaGFuZGxlRm9jdXNvdXQuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgRm9ybUZpZWxkcygpO1xuIiwiaW1wb3J0IHsgbW9kdWxlcyB9IGZyb20gJy4uL21vZHVsZXMuanMnO1xuaW1wb3J0IHsgYm9keUxvY2tTdGF0dXMsIGJvZHlMb2NrLCBib2R5VW5sb2NrIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgbG9nZ2luZzogdHJ1ZSxcbiAgICAgIGluaXQ6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVPcGVuQnV0dG9uOiAnZGF0YS1tb2RhbCcsXG4gICAgICBhdHRyaWJ1dGVDbG9zZUJ1dHRvbjogJ2RhdGEtY2xvc2UnLFxuICAgICAgZml4RWxlbWVudFNlbGVjdG9yOiAnW2RhdGEtbHBdJyxcbiAgICAgIHlvdXR1YmVBdHRyaWJ1dGU6ICdkYXRhLW1vZGFsLXlvdXR1YmUnLFxuICAgICAgeW91dHViZVBsYWNlQXR0cmlidXRlOiAnZGF0YS1tb2RhbC15b3V0dWJlLXBsYWNlJyxcbiAgICAgIHNldEF1dG9wbGF5WW91dHViZTogdHJ1ZSxcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgbW9kYWw6ICdtb2RhbCcsXG4gICAgICAgIC8vIG1vZGFsV3JhcHBlcjogJ21vZGFsX193cmFwcGVyJyxcbiAgICAgICAgbW9kYWxDb250ZW50OiAnbW9kYWxfX2NvbnRlbnQnLFxuICAgICAgICBtb2RhbEFjdGl2ZTogJ21vZGFsX3Nob3cnLFxuICAgICAgICBib2R5QWN0aXZlOiAnbW9kYWwtc2hvdycsXG4gICAgICB9LFxuICAgICAgZm9jdXNDYXRjaDogdHJ1ZSxcbiAgICAgIGNsb3NlRXNjOiB0cnVlLFxuICAgICAgYm9keUxvY2s6IHRydWUsXG4gICAgICBoYXNoU2V0dGluZ3M6IHtcbiAgICAgICAgbG9jYXRpb246IHRydWUsXG4gICAgICAgIGdvSGFzaDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYWZ0ZXJPcGVuOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYmVmb3JlQ2xvc2U6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLnlvdVR1YmVDb2RlO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy50YXJnZXRPcGVuID0ge1xuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgZWxlbWVudDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnByZXZpb3VzT3BlbiA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5sYXN0Q2xvc2VkID0ge1xuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgZWxlbWVudDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLl9kYXRhVmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLmhhc2ggPSBmYWxzZTtcblxuICAgIHRoaXMuX3Jlb3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5sYXN0Rm9jdXNFbCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZvY3VzRWwgPSBbXG4gICAgICAnYVtocmVmXScsXG4gICAgICAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdidXR0b246bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ2FyZWFbaHJlZl0nLFxuICAgICAgJ2lmcmFtZScsXG4gICAgICAnb2JqZWN0JyxcbiAgICAgICdlbWJlZCcsXG4gICAgICAnW2NvbnRlbnRlZGl0YWJsZV0nLFxuICAgICAgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKScsXG4gICAgXTtcbiAgICAvL3RoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAuLi5jb25maWcsXG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAuLi5jb25maWcuY2xhc3NlcyxcbiAgICAgICAgLi4ub3B0aW9ucz8uY2xhc3NlcyxcbiAgICAgIH0sXG4gICAgICBoYXNoU2V0dGluZ3M6IHtcbiAgICAgICAgLi4uY29uZmlnLmhhc2hTZXR0aW5ncyxcbiAgICAgICAgLi4ub3B0aW9ucz8uaGFzaFNldHRpbmdzLFxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIC4uLmNvbmZpZy5vbixcbiAgICAgICAgLi4ub3B0aW9ucz8ub24sXG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy5ib2R5TG9jayA9IGZhbHNlO1xuICAgIHRoaXMub3B0aW9ucy5pbml0ID8gdGhpcy5pbml0bW9kYWxzKCkgOiBudWxsO1xuICB9XG4gIGluaXRtb2RhbHMoKSB7XG4gICAgdGhpcy5ldmVudHNtb2RhbCgpO1xuICB9XG4gIGV2ZW50c21vZGFsKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uT3BlbiA9IGUudGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufV1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChidXR0b25PcGVuKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuX2RhdGFWYWx1ZSA9IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b25cbiAgICAgICAgICApXG4gICAgICAgICAgICA/IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9uKVxuICAgICAgICAgICAgOiAnZXJyb3InO1xuICAgICAgICAgIHRoaXMueW91VHViZUNvZGUgPSBidXR0b25PcGVuLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy55b3V0dWJlQXR0cmlidXRlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgPyBidXR0b25PcGVuLmdldEF0dHJpYnV0ZSh0aGlzLm9wdGlvbnMueW91dHViZUF0dHJpYnV0ZSlcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICBpZiAodGhpcy5fZGF0YVZhbHVlICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB0aGlzLmxhc3RGb2N1c0VsID0gYnV0dG9uT3BlbjtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvciA9IGAke3RoaXMuX2RhdGFWYWx1ZX1gO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBidXR0b25DbG9zZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVDbG9zZUJ1dHRvbn1dYFxuICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoJyN1bmNvbmZpcm1lZEFnZU1vZGFsJykgJiZcbiAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdCgnI2NvbmZpcm1BZ2VNb2RhbCcpICYmXG4gICAgICAgICAgKGJ1dHRvbkNsb3NlIHx8XG4gICAgICAgICAgICAoIWUudGFyZ2V0LmNsb3Nlc3QoYC4ke3RoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQ29udGVudH1gKSAmJlxuICAgICAgICAgICAgICB0aGlzLmlzT3BlbikpXG4gICAgICAgICkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAna2V5ZG93bicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmNsb3NlRXNjICYmXG4gICAgICAgICAgZS53aGljaCA9PSAyNyAmJlxuICAgICAgICAgIGUuY29kZSA9PT0gJ0VzY2FwZScgJiZcbiAgICAgICAgICB0aGlzLmlzT3BlblxuICAgICAgICApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZvY3VzQ2F0Y2ggJiYgZS53aGljaCA9PSA5ICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgdGhpcy5fZm9jdXNDYXRjaChlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmhhc2hTZXR0aW5ncy5nb0hhc2gpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnaGFzaGNoYW5nZScsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMuX29wZW5Ub0hhc2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2xvYWQnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuVG9IYXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIG9wZW4oc2VsZWN0b3JWYWx1ZSkge1xuICAgIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgICAgdGhpcy5ib2R5TG9jayA9XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2snKSAmJiAhdGhpcy5pc09wZW5cbiAgICAgICAgICA/IHRydWVcbiAgICAgICAgICA6IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdG9yVmFsdWUgJiZcbiAgICAgICAgdHlwZW9mIHNlbGVjdG9yVmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIHNlbGVjdG9yVmFsdWUudHJpbSgpICE9PSAnJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvciA9IHNlbGVjdG9yVmFsdWU7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5fcmVvcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rvck9wZW4pXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvciA9IHRoaXMubGFzdENsb3NlZC5zZWxlY3RvcjtcbiAgICAgIGlmICghdGhpcy5fcmVvcGVuKSB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy50YXJnZXRPcGVuLmVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueW91VHViZUNvZGUpIHtcbiAgICAgICAgICBjb25zdCBjb2RlVmlkZW8gPSB0aGlzLnlvdVR1YmVDb2RlO1xuICAgICAgICAgIGNvbnN0IHVybFZpZGVvID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7Y29kZVZpZGVvfT9yZWw9MCZzaG93aW5mbz0wJmF1dG9wbGF5PTFgO1xuICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcblxuICAgICAgICAgIGNvbnN0IGF1dG9wbGF5ID0gdGhpcy5vcHRpb25zLnNldEF1dG9wbGF5WW91dHViZSA/ICdhdXRvcGxheTsnIDogJyc7XG4gICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3cnLCBgJHthdXRvcGxheX07IGVuY3J5cHRlZC1tZWRpYWApO1xuXG4gICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsVmlkZW8pO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB5b3V0dWJlUGxhY2UgPSB0aGlzLnRhcmdldE9wZW4uZWxlbWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm1vZGFsX190ZXh0JylcbiAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZShgJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfWAsICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gKVxuICAgICAgICAgICAgLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MubG9jYXRpb24pIHtcbiAgICAgICAgICB0aGlzLl9nZXRIYXNoKCk7XG4gICAgICAgICAgdGhpcy5fc2V0SGFzaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLm9uLmJlZm9yZU9wZW4odGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdiZWZvcmVtb2RhbE9wZW4nLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbEFjdGl2ZSk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5jbGFzc2VzLmJvZHlBY3RpdmUpO1xuXG4gICAgICAgIGlmICghdGhpcy5fcmVvcGVuKSB7XG4gICAgICAgICAgY29uc3QgbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5oYXNoKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICghdGhpcy5ib2R5TG9jayAmJiAhbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYmwtbW9iaWxlJykpIHx8XG4gICAgICAgICAgICAoIXRoaXMuYm9keUxvY2sgJiZcbiAgICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGggPD0gNzY4ICYmXG4gICAgICAgICAgICAgIG0uaGFzQXR0cmlidXRlKCdkYXRhLWJsLW1vYmlsZScpKVxuICAgICAgICAgICAgICA/IGJvZHlMb2NrKClcbiAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9IGVsc2UgdGhpcy5fcmVvcGVuID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yID0gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yO1xuICAgICAgICB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50ID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzVHJhcCgpO1xuICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLm9uLmFmdGVyT3Blbih0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2FmdGVybW9kYWxPcGVuJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjbG9zZShzZWxlY3RvclZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgc2VsZWN0b3JWYWx1ZSAmJlxuICAgICAgdHlwZW9mIHNlbGVjdG9yVmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICBzZWxlY3RvclZhbHVlLnRyaW0oKSAhPT0gJydcbiAgICApIHtcbiAgICAgIHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yID0gc2VsZWN0b3JWYWx1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzT3BlbiB8fCAhYm9keUxvY2tTdGF0dXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zLm9uLmJlZm9yZUNsb3NlKHRoaXMpO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2JlZm9yZW1vZGFsQ2xvc2UnLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMueW91VHViZUNvZGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICApXG4gICAgICApXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgKS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgdGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxBY3RpdmVcbiAgICApO1xuICAgIC8vIGFyaWEtaGlkZGVuXG4gICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBpZiAoIXRoaXMuX3Jlb3Blbikge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgIHRoaXMub3B0aW9ucy5jbGFzc2VzLmJvZHlBY3RpdmVcbiAgICAgICk7XG4gICAgICAhdGhpcy5ib2R5TG9jayA/IGJvZHlVbmxvY2soKSA6IG51bGw7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVIYXNoKCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdG9yT3Blbikge1xuICAgICAgdGhpcy5sYXN0Q2xvc2VkLnNlbGVjdG9yID0gdGhpcy5wcmV2aW91c09wZW4uc2VsZWN0b3I7XG4gICAgICB0aGlzLmxhc3RDbG9zZWQuZWxlbWVudCA9IHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucy5vbi5hZnRlckNsb3NlKHRoaXMpO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2FmdGVybW9kYWxDbG9zZScsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2ZvY3VzVHJhcCgpO1xuICAgIH0sIDUwKTtcbiAgfVxuICBfZ2V0SGFzaCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmhhc2hTZXR0aW5ncy5sb2NhdGlvbikge1xuICAgICAgdGhpcy5oYXNoID0gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yLmluY2x1ZGVzKCcjJylcbiAgICAgICAgPyB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3JcbiAgICAgICAgOiB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IucmVwbGFjZSgnLicsICcjJyk7XG4gICAgfVxuICB9XG4gIF9vcGVuVG9IYXNoKCkge1xuICAgIGxldCBjbGFzc0luSGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKX1gXG4gICAgKVxuICAgICAgPyBgLiR7d2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKX1gXG4gICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7d2luZG93LmxvY2F0aW9uLmhhc2h9YClcbiAgICAgID8gYCR7d2luZG93LmxvY2F0aW9uLmhhc2h9YFxuICAgICAgOiBudWxsO1xuXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259ID0gXCIke2NsYXNzSW5IYXNofVwiXWBcbiAgICApXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaH1cIl1gXG4gICAgICAgIClcbiAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259ID0gXCIke2NsYXNzSW5IYXNoLnJlcGxhY2UoXG4gICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAnIydcbiAgICAgICAgICApfVwiXWBcbiAgICAgICAgKTtcbiAgICBpZiAoYnV0dG9ucyAmJiBjbGFzc0luSGFzaCkgdGhpcy5vcGVuKGNsYXNzSW5IYXNoKTtcbiAgfVxuICBfc2V0SGFzaCgpIHtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHRoaXMuaGFzaCk7XG4gIH1cbiAgX3JlbW92ZUhhc2goKSB7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdKTtcbiAgfVxuICBfZm9jdXNDYXRjaChlKSB7XG4gICAgY29uc3QgZm9jdXNhYmxlID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c0VsKTtcbiAgICBjb25zdCBmb2N1c0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlKTtcbiAgICBjb25zdCBmb2N1c2VkSW5kZXggPSBmb2N1c0FycmF5LmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICBpZiAoZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IDApIHtcbiAgICAgIGZvY3VzQXJyYXlbZm9jdXNBcnJheS5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSBmb2N1c0FycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGZvY3VzQXJyYXlbMF0uZm9jdXMoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgX2ZvY3VzVHJhcCgpIHtcbiAgICBjb25zdCBmb2N1c2FibGUgPSB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbCk7XG4gICAgaWYgKCF0aGlzLmlzT3BlbiAmJiB0aGlzLmxhc3RGb2N1c0VsKSB7XG4gICAgICB0aGlzLmxhc3RGb2N1c0VsLmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvY3VzYWJsZVswXS5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGVzLm1vZGFsID0gbmV3IE1vZGFsKHt9KTtcbiIsImltcG9ydCB7IHNldEhhc2gsIGdldEhhc2ggfSBmcm9tICcuL3V0aWxzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgVGFicyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICBUQUJTOiAnZGF0YS10YWJzJyxcbiAgICAgIElOREVYOiAnZGF0YS10YWJzLWluZGV4JyxcbiAgICAgIFRJVExFUzogJ2RhdGEtdGFicy10aXRsZXMnLFxuICAgICAgVElUTEU6ICdkYXRhLXRhYnMtdGl0bGUnLFxuICAgICAgVEFCX0lURU06ICdkYXRhLXRhYnMtaXRlbScsXG4gICAgICBCT0RZOiAnZGF0YS10YWJzLWJvZHknLFxuICAgICAgSEFTSDogJ2RhdGEtdGFicy1oYXNoJyxcbiAgICB9O1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIElOSVQ6ICdfdGFicy1pbml0JyxcbiAgICAgIEFDVElWRTogJ19pcy1hY3RpdmUnLFxuICAgICAgTU9EQUw6ICdtb2RhbCcsXG4gICAgfTtcbiAgICB0aGlzLnRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS10YWJzXWApO1xuICAgIHRoaXMuYWN0aXZlSGFzaCA9IFtdO1xuXG4gICAgaWYgKHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc2ggPSBnZXRIYXNoKCk7XG5cbiAgICAgIGlmIChoYXNoICYmIGhhc2guc3RhcnRzV2l0aCgndGFiLScpKSB7XG4gICAgICAgIGFjdGl2ZUhhc2ggPSBoYXNoLnJlcGxhY2UoJ3RhYi0nLCAnJykuc3BsaXQoJy0nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYnNCbG9jaywgaW5kZXgpID0+IHtcbiAgICAgICAgdGFic0Jsb2NrLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklOSVQpO1xuICAgICAgICB0YWJzQmxvY2suc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuSU5ERVgsIGluZGV4KTtcbiAgICAgICAgdGFic0Jsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRBY3Rpb25zLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmluaXQodGFic0Jsb2NrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXR1cyh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVEFCX0lURU19XWApO1xuICAgIGNvbnN0IGluZGV4ID0gdGFic0Jsb2NrLmRhdGFzZXQudGFic0luZGV4O1xuXG4gICAgaWYgKGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICBjb25zdCBoYXNIYXNoID0gdGFic0Jsb2NrLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkhBU0gpO1xuXG4gICAgICBjb250ZW50ID0gQXJyYXkuZnJvbShjb250ZW50KS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIGNvbnRlbnQuZm9yRWFjaCgoaXRlbSwgaW5keCkgPT4ge1xuICAgICAgICBpZiAodGl0bGVzW2luZHhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoaGFzSGFzaCAmJiAhaXRlbS5jbG9zZXN0KGAuJHt0aGlzLmNsYXNzZXMuTU9EQUx9YCkpIHtcbiAgICAgICAgICAgIHNldEhhc2goYHRhYi0ke2luZGV4fS0ke2luZHh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aW9ucyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRJVExFfV1gKTtcbiAgICAgIGNvbnN0IHRhYnNCbG9jayA9IHRpdGxlLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCk7XG5cbiAgICAgIGlmICghdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgIGxldCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIGBbJHt0aGlzLmF0dHJzLlRJVExFfV0uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICAgKTtcblxuICAgICAgICBhY3RpdmVUaXRsZS5sZW5ndGhcbiAgICAgICAgICA/IChhY3RpdmVUaXRsZSA9IEFycmF5LmZyb20oYWN0aXZlVGl0bGUpLmZpbHRlcihcbiAgICAgICAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgICAgICAgKSlcbiAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gYWN0aXZlVGl0bGVbMF0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuQUNUSVZFKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModGFic0Jsb2NrKTtcbiAgICAgIH1cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQodGFic0Jsb2NrKSB7XG4gICAgbGV0IHRpdGxlcyA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLlRJVExFU31dPipgKTtcbiAgICBsZXQgY29udGVudCA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLkJPRFl9XT4qYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG4gICAgY29uc3QgYWN0aXZlSGFzaEJsb2NrID0gdGhpcy5hY3RpdmVIYXNoWzBdID09IGluZGV4O1xuXG4gICAgaWYgKGFjdGl2ZUhhc2hCbG9jaykge1xuICAgICAgY29uc3QgYWN0aXZlVGl0bGUgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEVTfV0+LiR7dGhpcy5jbGFzc2VzLkFDVElWRX1gXG4gICAgICApO1xuICAgICAgYWN0aXZlVGl0bGUgPyBhY3RpdmVUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpIDogbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIGNvbnRlbnQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGl0bGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5USVRMRSwgJycpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRBQl9JVEVNLCAnJyk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZUhhc2hCbG9jayAmJiBpbmRleCA9PSB0aGlzLmFjdGl2ZUhhc2hbMV0pIHtcbiAgICAgICAgICB0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5oaWRkZW4gPSAhdGl0bGVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IFRhYnMoKTtcbiIsIi8qKlxuICogc2V0IGhhc2ggdG8gdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICovXG5leHBvcnQgY29uc3Qgc2V0SGFzaCA9IChoYXNoKSA9PiB7XG4gICAgaGFzaCA9IGhhc2ggPyBgIyR7aGFzaH1gIDogd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIGhhc2gpO1xufTtcblxuLyoqXG4gKiBnZXQgaGFzaCBmcm9tIHVybFxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRIYXNoID0gKCkgPT4ge1xuICAgIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUluaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgbW0gPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNzY4cHgpJyk7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19tZW51LW9wZW5lZCcpO1xuICAgICAgICAgICAgaWYgKGJvZHlMb2NrU3RhdHVzICYmICFpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIG1lbnVPcGVuKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChib2R5TG9ja1N0YXR1cyAmJiBpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIG1lbnVDbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIW1tLm1hdGNoZXMgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnX21lbnUtb3BlbmVkJykpIG1lbnVDbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBvcGVucyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gICAgYm9keUxvY2soKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnX21lbnUtb3BlbmVkJyk7XG59O1xuLyoqXG4gKiBjbG9zZXMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVDbG9zZSA9ICgpID0+IHtcbiAgICBib2R5VW5sb2NrKCk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ19tZW51LW9wZW5lZCcpO1xufTtcblxuLy8gYm9keSBsb2NrXG5leHBvcnQgbGV0IGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcbi8qKlxuICogdG9nZ2xlcyBib2R5IGxvY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keUxvY2tUb2dnbGUgPSAoZGVsYXkgPSA1MDApID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9jaycpKSB7XG4gICAgICAgIGJvZHlVbmxvY2soZGVsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHlMb2NrKGRlbGF5KTtcbiAgICB9XG59O1xuLyoqXG4gKiB1bmxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keVVubG9jayA9IChkZWxheSA9IDUwMCkgPT4ge1xuICAgIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2NrJyk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG59O1xuLyoqXG4gKiBsb2NrcyBib2R5XG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gICAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2NrJyk7XG5cbiAgICAgICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIG1ha2UgdGhlIGFycmF5IHVuaXF1ZVxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0sIGluZGV4LCBzZWxmKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICAgIH0pO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGFTZXRWYWx1ZVxuICogcHJvY2VzcyBtZWRpYSByZXF1ZXN0cyBmcm9tIGF0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFNZWRpYVF1ZXJpZXMgPSAoYXJyYXksIGRhdGFTZXRWYWx1ZSkgPT4ge1xuICAgIC8vIGdldCBvYmplY3RzIHdpdGggbWVkaWEgcXVlcmllc1xuICAgIGNvbnN0IG1lZGlhID0gQXJyYXkuZnJvbShhcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgICBpZiAoaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXS5zcGxpdCgnLCcpWzBdO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gb2JqZWN0cyB3aXRoIG1lZGlhIHF1ZXJpZXMgaW5pdGlhbGl6YXRpb25cbiAgICBpZiAobWVkaWEubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGJyZWFrcG9pbnRzQXJyYXkgPSBbXTtcbiAgICAgICAgbWVkaWEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV07XG4gICAgICAgICAgICBjb25zdCBicmVha3BvaW50ID0ge307XG4gICAgICAgICAgICBjb25zdCBwYXJhbXNBcnJheSA9IHBhcmFtcy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgYnJlYWtwb2ludC52YWx1ZSA9IHBhcmFtc0FycmF5WzBdO1xuICAgICAgICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcbiAgICAgICAgICAgIGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICBicmVha3BvaW50c0FycmF5LnB1c2goYnJlYWtwb2ludCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBnZXQgdW5pcXVlIGJyZWFrcG9pbnRzXG4gICAgICAgIGxldCBtZFF1ZXJpZXMgPSBicmVha3BvaW50c0FycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuICcoJyArIGl0ZW0udHlwZSArICctd2lkdGg6ICcgKyBpdGVtLnZhbHVlICsgJ3B4KSwnICsgaXRlbS52YWx1ZSArICcsJyArIGl0ZW0udHlwZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1kUXVlcmllcyA9IHVuaXF1ZUFycmF5KG1kUXVlcmllcyk7XG4gICAgICAgIGNvbnN0IG1kUXVlcmllc0FycmF5ID0gW107XG5cbiAgICAgICAgaWYgKG1kUXVlcmllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHdvcmsgd2l0aCBldmVyeSBicmVha3BvaW50XG4gICAgICAgICAgICBtZFF1ZXJpZXMuZm9yRWFjaCgoYnJlYWtwb2ludCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lZGlhQnJlYWtwb2ludCA9IHBhcmFtc0FycmF5WzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lZGlhVHlwZSA9IHBhcmFtc0FycmF5WzJdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShwYXJhbXNBcnJheVswXSk7XG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0cyB3aXRoIGNvbmRpdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtc0FycmF5ID0gYnJlYWtwb2ludHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udmFsdWUgPT09IG1lZGlhQnJlYWtwb2ludCAmJiBpdGVtLnR5cGUgPT09IG1lZGlhVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZFF1ZXJpZXNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hNZWRpYVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWRRdWVyaWVzQXJyYXk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyB1cFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd21vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVVwID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDAsIHNob3dtb3JlID0gMCkgPT4ge1xuICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xuICAgICAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgICAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHNob3dtb3JlID8gYCR7c2hvd21vcmV9cmVtYCA6IGAwYDtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgICAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgICAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0LmhpZGRlbiA9ICFzaG93bW9yZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICAgICAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKSA6IG51bGw7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xuICAgICAgICAgICAgLy8gY3JlYXRlIGV2ZW50XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2xpZGVVcERvbmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBzbW9vdGhseSBzbGlkZXMgZG93blxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd21vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZURvd24gPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gICAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgICAgIHRhcmdldC5oaWRkZW4gPSB0YXJnZXQuaGlkZGVuID8gZmFsc2UgOiBudWxsO1xuICAgICAgICBzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXJlbWAgOiBgMGA7XG4gICAgICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgICAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgICAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xuICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKTtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XG4gICAgICAgICAgICAvLyBjcmVhdGUgZXZlbnRcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZURvd25Eb25lJywge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cbn07XG5cbi8qKlxuICogdG9nZ2xlcyBzbW9vdGggc2xpZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxuICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uXG4gKiBAcmV0dXJucyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlVG9nZ2xlID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDApID0+IHtcbiAgICBpZiAodGFyZ2V0LmhpZGRlbikge1xuICAgICAgICByZXR1cm4gX3NsaWRlRG93bih0YXJnZXQsIGR1cmF0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gX3NsaWRlVXAodGFyZ2V0LCBkdXJhdGlvbik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBjb252ZXJ0cyByZW0gdG8gcGl4ZWxzXG4gKiBAcGFyYW0ge251bWJlcn0gcmVtVmFsdWVcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtVG9QeChyZW1WYWx1ZSkge1xuICAgIGNvbnN0IGh0bWxGb250U2l6ZSA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmZvbnRTaXplKTtcblxuICAgIGNvbnN0IHB4VmFsdWUgPSByZW1WYWx1ZSAqIGh0bWxGb250U2l6ZTtcblxuICAgIHJldHVybiBNYXRoLnJvdW5kKHB4VmFsdWUpICsgJ3B4Jztcbn1cblxuLy8gcmVtb3ZlIGNsYXNzIGZyb20gYWxsIGFycmF5IGVsZW1lbnRzXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IChhcnJheSwgY2xhc3NOYW1lKSA9PiB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJheVtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBzZXQgY3VycmVudCB5ZWFyXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRDdXJyZW50WWVhciA9ICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRZZWFyJykpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRZZWFyJykuaW5uZXJIVE1MID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIH1cbn07XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDMwMDs0MDA7NTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytDb25kZW5zZWQ6aXRhbCx3Z2h0QDAsMTAwLi45MDA7MSwxMDAuLjkwMCZmYW1pbHk9Um9ib3RvOndnaHRANDAwOzUwMDs3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiR2lscm95XCI7XG4gIHNyYzogdXJsKFwiLi4vYXNzZXRzL2ZvbnRzL0dpbHJveS1SZWd1bGFyLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiR2lscm95XCI7XG4gIHNyYzogdXJsKFwiLi4vYXNzZXRzL2ZvbnRzL0dpbHJveS1NZWRpdW0ud29mZjJcIikgZm9ybWF0KFwid29mZjJcIik7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJHaWxyb3lcIjtcbiAgc3JjOiB1cmwoXCIuLi9hc3NldHMvZm9udHMvR2lscm95LUJvbGQud29mZjJcIikgZm9ybWF0KFwid29mZjJcIik7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbiosXG4qOjpiZWZvcmUsXG4qOjphZnRlciB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmh0bWwsXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbn1cblxuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiO1xuICBmb250LXNpemU6IDAuNTIwODMzNXZ3O1xufVxuXG5ib2R5IHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBjb2xvcjogIzFlMWUxZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cblxuaW5wdXQsXG50ZXh0YXJlYSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyOiBub25lO1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xufVxuXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICBtYXJnaW46IDA7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdIHtcbiAgLW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XG59XG5cbmJ1dHRvbixcbmlucHV0LFxuYSxcbnRleHRhcmVhIHtcbiAgZm9udDogaW5oZXJpdDtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuYnV0dG9uOmZvY3VzLFxuaW5wdXQ6Zm9jdXMsXG5hOmZvY3VzLFxudGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuYnV0dG9uOmFjdGl2ZSxcbmlucHV0OmFjdGl2ZSxcbmE6YWN0aXZlLFxudGV4dGFyZWE6YWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuYSB7XG4gIGNvbG9yOiB1bnNldDtcbn1cblxuYSxcbmE6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbmltZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuXG5idXR0b24ge1xuICBwYWRkaW5nOiAwO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGluaGVyaXQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxudWwsXG51bCBsaSB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxudWwgbGkge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGZvbnQ6IGluaGVyaXQ7XG59XG5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTcycmVtO1xuICBtYXJnaW46IDAgYXV0bztcbn1cbmh0bWwubG9jayB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cblxuaHRtbCxcbmJvZHkge1xuICBvdmVyZmxvdy14OiBjbGlwO1xufVxuXG5tYWluIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLndyYXBwZXIge1xuICBtYXJnaW46IDAgYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWF4LXdpZHRoOiAxOTIwcHg7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5oZWFkZXJfX2NvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMjAyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTIuMXJlbTtcbn1cbi5oZWFkZXJfX2xvZ28ge1xuICBmbGV4OiAwIDAgMjIuOXJlbTtcbiAgd2lkdGg6IDIyLjlyZW07XG59XG4uaGVhZGVyX19uYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDRyZW07XG59XG4uaGVhZGVyX19uYXYtbGluazpub3QoLmhlYWRlcl9fbmF2LWxpbmsudGFiKSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlO1xufVxuLmhlYWRlcl9fbmF2LWxpbms6bm90KC5oZWFkZXJfX25hdi1saW5rLnRhYik6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0wLjJyZW07XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RhMjUxZTtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2U7XG59XG5cbi5oYW1idXJnZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGVhZGVyLW1lbnUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uZm9vdGVyX19jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmZvb3Rlcl9fbWFpbiB7XG4gIHBhZGRpbmctYm90dG9tOiAzLjJyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWFhYWFhO1xufVxuLmZvb3Rlcl9fbG9nby13cmFwIHtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiA1cmVtO1xuICBtYXgtd2lkdGg6IDM3cmVtO1xufVxuLmZvb3Rlcl9fbG9nbyB7XG4gIHdpZHRoOiAyM3JlbTtcbn1cbi5mb290ZXJfX25hdiB7XG4gIG1hcmdpbi1ib3R0b206IDYuNHJlbTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgcm93LWdhcDogNHJlbTtcbn1cbi5jb250YWN0cy1mb290ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAyLjVyZW07XG59XG4uY29udGFjdHMtZm9vdGVyX19jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMS4ycmVtO1xufVxuLmNvbnRhY3RzLWZvb3Rlcl9faWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuLmNvbnRhY3RzLWZvb3Rlcl9faWNvbiBzdmcge1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbn1cblxuLnJlcXVlc3QtZGVzaWduLWZvb3RlciB7XG4gIHBhZGRpbmc6IDYuNHJlbSAwO1xuICBkaXNwbGF5OiBncmlkO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIHJvdy1nYXA6IDIuNHJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiAjYWFhYWFhO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ucmVxdWVzdC1kZXNpZ24tZm9vdGVyX190ZXh0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnJlcXVlc3QtZGVzaWduLWZvb3Rlcl9fbG9nbyB7XG4gIHdpZHRoOiAzMC40cmVtO1xufVxuXG4uaCB7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90byBDb25kZW5zZWRcIjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5oX2gxIHtcbiAgZm9udC1zaXplOiA0LjhyZW07XG4gIGxpbmUtaGVpZ2h0OiA1LjZyZW07XG59XG4uaF9oMiB7XG4gIGZvbnQtc2l6ZTogMi44cmVtO1xuICBsaW5lLWhlaWdodDogMy4zcmVtO1xufVxuLmhfbGFyZ2Uge1xuICBmb250LXNpemU6IDIxcmVtO1xuICBsaW5lLWhlaWdodDogMjQuNnJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi50eHQyMCB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuM3JlbTtcbn1cblxuLnR4dDE4IHtcbiAgZm9udC1zaXplOiAxLjhyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjFyZW07XG59XG5cbi50eHQxNiB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBsaW5lLWhlaWdodDogMS45cmVtO1xufVxuXG4uZnctbGlnaHQge1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4uYnRuIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYnRuX3ByaW1hcnkge1xuICBwYWRkaW5nOiAxLjZyZW0gMy4ycmVtO1xuICBoZWlnaHQ6IDUuMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMTByZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNkYTI1MWU7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlO1xufVxuLmJ0bl9wcmltYXJ5IC5idG5fX3R4dCB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBsaW5lLWhlaWdodDogMS45cmVtO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cbi5idG5fc2Vjb25kYXJ5IHtcbiAgcGFkZGluZzogMTByZW0gMy4ycmVtIDMuMnJlbTtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIHdpZHRoOiAyNS4ycmVtO1xuICBoZWlnaHQ6IDI1LjJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYTI1MWU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbi5idG5fc2Vjb25kYXJ5IC5idG5fX3R4dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi4zcmVtO1xuICBjb2xvcjogI2RhMjUxZTtcbn1cbi5idG5fc2Vjb25kYXJ5IC5idG5fX3R4dDo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogLTAuOHJlbTtcbiAgbGVmdDogMTAwJTtcbiAgd2lkdGg6IDUuNHJlbTtcbiAgaGVpZ2h0OiAxLjhyZW07XG4gIGJhY2tncm91bmQ6IHVybChcIi4vYXNzZXRzL2ltYWdlcy9pY29ucy9hcnItcmVkLnN2Z1wiKSBjZW50ZXIvY29udGFpbiBuby1yZXBlYXQ7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAxMDAlKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZSwgbGVmdCAwLjVzIGVhc2U7XG59XG4uYnRuX190eHQge1xuICBmb250LWZhbWlseTogXCJSb2JvdG8gQ29uZGVuc2VkXCI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5pLWJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDZyZW07XG4gIGhlaWdodDogNnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RhMjUxZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLmktYnRuX2JnIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xufVxuLmktYnRuIHN2ZyB7XG4gIHdpZHRoOiAzcmVtO1xufVxuLmktYnRuX2Fyci1uZXh0Ll9oYXMtaG92ZXIgc3ZnLCAuaS1idG5fYXJyLXByZXYuX2hhcy1ob3ZlciBzdmcge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlO1xufVxuXG5pbnB1dFt0eXBlPXRleHRdLFxuaW5wdXRbdHlwZT1lbWFpbF0sXG5pbnB1dFt0eXBlPXRlbF0sXG50ZXh0YXJlYSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG50ZXh0YXJlYTpmb2N1cyxcbmlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmlucHV0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuM3JlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWFhYWE7XG4gIHRyYW5zaXRpb246IGJvcmRlci1ib3R0b20gMC41cyBlYXNlO1xufVxuLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICBmb250LXNpemU6IDJyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjNyZW07XG4gIGNvbG9yOiAjYWFhYWFhO1xufVxuLmlucHV0Ll9pcy1maWxsZWQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzFlMWUxZTtcbn1cbi5pbnB1dC5faGFzLWVycm9yIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkYTI1MWU7XG59XG4uaW5wdXQuX2hhcy1lcnJvciAuaW5wdXRfX2ZpZWxkOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiAjMWUxZTFlO1xufVxuLmlucHV0Ll9oYXMtZXJyb3I6OmFmdGVyIHtcbiAgY29udGVudDogYXR0cihkYXRhLWhpbnQpO1xuICBmb250LWZhbWlseTogXCJSb2JvdG8gQ29uZGVuc2VkXCI7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICBsaW5lLWhlaWdodDogMS42cmVtO1xuICBjb2xvcjogI2RhMjUxZTtcbn1cblxuLnRhYnNfX25hdmlnYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiAxLjhyZW07XG59XG4udGFic19fYm9keSB7XG4gIHBhZGRpbmctdG9wOiAxcmVtO1xufVxuXG4udGFiIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjb2xvcjogI2FhYWFhYTtcbn1cbi50YWI6bm90KC50YWJfc3RhdGljKSB7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZSwgcGFkZGluZy1sZWZ0IDAuM3MgZWFzZTtcbn1cbi50YWI6bm90KC50YWJfc3RhdGljKS5faXMtYWN0aXZlIHtcbiAgcGFkZGluZy1sZWZ0OiAzLjRyZW07XG4gIGNvbG9yOiAjZGEyNTFlO1xufVxuLnRhYjpub3QoLnRhYl9zdGF0aWMpLl9pcy1hY3RpdmU6OmJlZm9yZSB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG4udGFiX3N0YXRpYyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAxcmVtO1xuICBjb2xvcjogI2RhMjUxZTtcbn1cbi50YWJfc3RhdGljLnRhYjo6YmVmb3JlIHtcbiAgcG9zaXRpb246IHN0YXRpYztcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cbi50YWI6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjhyZW07XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxLjhyZW07XG4gIGhlaWdodDogMS44cmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkYTI1MWU7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2U7XG59XG4udGFiX190eHQge1xuICBmb250LWZhbWlseTogXCJSb2JvdG8gQ29uZGVuc2VkXCI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMi44cmVtO1xuICBsaW5lLWhlaWdodDogMy4zcmVtO1xufVxuQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSBhbmQgKG1pbi13aWR0aDogNDhlbSl7XG4gIC5idG5fc2Vjb25kYXJ5OmhvdmVyIC5idG5fX3R4dDo6YWZ0ZXIge1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAxMDAlKTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDQ4ZW0pe1xuICAuaGVhZGVyIHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2FhYWFhYTtcbiAgfVxuICAuZm9vdGVyX19uYXYge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgbWFyZ2luLXJpZ2h0OiAyLjRyZW07XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMjQuNXJlbSk7XG4gICAgZ2FwOiAyLjRyZW07XG4gIH1cbiAgLnJlcXVlc3QtZGVzaWduLWZvb3RlciB7XG4gICAgcGFkZGluZzogMy4ycmVtIDA7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyNXJlbSAxZnIgMjVyZW07XG4gICAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcbiAgfVxuICAucmVxdWVzdC1kZXNpZ24tZm9vdGVyX190ZXh0IHtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgfVxuICAucmVxdWVzdC1kZXNpZ24tZm9vdGVyX19sb2dvIHtcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcbiAgICB3aWR0aDogMTguNXJlbTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCl7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDVweDtcbiAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xuICAgIGZvbnQtc2l6ZTogMS4zMzMzMzMzMzMzdnc7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xuICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogbm9uZTtcbiAgfVxuICAuY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAwIDJyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmhlYWRlcjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAyMDE7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxNS4ycmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcbiAgfVxuICAuX21lbnUtb3BlbmVkIC5oZWFkZXI6OmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAuaGVhZGVyX19jb250YWluZXIge1xuICAgIGhlaWdodDogMTUuMnJlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2FhYWFhYTtcbiAgfVxuICAuaGVhZGVyX19sb2dvIHtcbiAgICBmbGV4OiAwIDAgMzUuNHJlbTtcbiAgICB3aWR0aDogMzUuNHJlbTtcbiAgfVxuICAuaGVhZGVyX19uYXYge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDYuNHJlbTtcbiAgfVxuICAuaGVhZGVyX19uYXYtbGluayB7XG4gICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvIENvbmRlbnNlZFwiO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiA0LjZyZW07XG4gIH1cbiAgLmhlYWRlcl9fbmF2LWxpbmsudHh0MjAge1xuICAgIGZvbnQtc2l6ZTogNHJlbTtcbiAgICBsaW5lLWhlaWdodDogNC42cmVtO1xuICB9XG4gIC5oYW1idXJnZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogNC44cmVtO1xuICAgIGhlaWdodDogM3JlbTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlLWluLW91dDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbiAgLl9tZW51LW9wZW5lZCAuaGFtYnVyZ2VyIHNwYW46Zmlyc3QtY2hpbGQge1xuICAgIHRvcDogMy42cmVtO1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogNTAlO1xuICB9XG4gIC5fbWVudS1vcGVuZWQgLmhhbWJ1cmdlciBzcGFuOm50aC1jaGlsZCgyKSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICB9XG4gIC5fbWVudS1vcGVuZWQgLmhhbWJ1cmdlciBzcGFuOm50aC1jaGlsZCgzKSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgfVxuICAuX21lbnUtb3BlbmVkIC5oYW1idXJnZXIgc3BhbjpsYXN0LWNoaWxkIHtcbiAgICB0b3A6IDMuNnJlbTtcbiAgICB3aWR0aDogMDtcbiAgICBsZWZ0OiA1MCU7XG4gIH1cbiAgLmhhbWJ1cmdlciBzcGFuIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IDAuMnJlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUxZTFlO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW4tb3V0O1xuICB9XG4gIC5oYW1idXJnZXIgc3BhbjpmaXJzdC1jaGlsZCB7XG4gICAgdG9wOiAwO1xuICB9XG4gIC5oYW1idXJnZXIgc3BhbjpudGgtY2hpbGQoMiksIC5oYW1idXJnZXIgc3BhbjpudGgtY2hpbGQoMykge1xuICAgIHRvcDogMS41cmVtO1xuICB9XG4gIC5oYW1idXJnZXIgc3BhbjpsYXN0LWNoaWxkIHtcbiAgICB0b3A6IDNyZW07XG4gIH1cbiAgLmhlYWRlci1tZW51IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMjAwO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBhZGRpbmctdG9wOiAyMi44cmVtO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTEwJSk7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZTtcbiAgfVxuICAuX21lbnUtb3BlbmVkIC5oZWFkZXItbWVudSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG4gIC5mb290ZXJfX21haW4ge1xuICAgIHBhZGRpbmctYm90dG9tOiA2LjRyZW07XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAuZm9vdGVyX19sb2dvLXdyYXAge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiA2LjRyZW07XG4gICAgcm93LWdhcDogNHJlbTtcbiAgICBtYXgtd2lkdGg6IG5vbmU7XG4gIH1cbiAgLmZvb3Rlcl9fbG9nbyB7XG4gICAgd2lkdGg6IDM1LjZyZW07XG4gIH1cbiAgLmZvb3Rlcl9fdGV4dCB7XG4gICAgbWF4LXdpZHRoOiA1NnJlbTtcbiAgfVxuICAuY29udGFjdHMtZm9vdGVyIHtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICByb3ctZ2FwOiA0cmVtO1xuICB9XG4gIC5jb250YWN0cy1mb290ZXJfX2NvbnRlbnQge1xuICAgIGNvbHVtbi1nYXA6IDEuNnJlbTtcbiAgfVxuICAuY29udGFjdHMtZm9vdGVyX19pY29uIHN2ZyB7XG4gICAgd2lkdGg6IDRyZW07XG4gICAgaGVpZ2h0OiA0cmVtO1xuICB9XG4gIC5oX2gxIHtcbiAgICBmb250LXNpemU6IDUuMnJlbTtcbiAgICBsaW5lLWhlaWdodDogNnJlbTtcbiAgfVxuICAuaF9oMiB7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiA0LjZyZW07XG4gIH1cbiAgLmhfbGFyZ2Uge1xuICAgIGZvbnQtc2l6ZTogOC44cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxMC40cmVtO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIH1cbiAgLnR4dDIwIHtcbiAgICBmb250LXNpemU6IDMuMnJlbTtcbiAgICBsaW5lLWhlaWdodDogMy42cmVtO1xuICB9XG4gIC50eHQxOCB7XG4gICAgZm9udC1zaXplOiAzLjJyZW07XG4gICAgbGluZS1oZWlnaHQ6IDMuOHJlbTtcbiAgfVxuICAudHh0MTYge1xuICAgIGZvbnQtc2l6ZTogMi44cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAzLjJyZW07XG4gIH1cbiAgLmJ0bl9wcmltYXJ5IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDguNnJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAyMHJlbTtcbiAgfVxuICAuYnRuX3ByaW1hcnkgLmJ0bl9fdHh0IHtcbiAgICBmb250LXNpemU6IDMuMnJlbTtcbiAgICBsaW5lLWhlaWdodDogMy44cmVtO1xuICB9XG4gIC5idG5fc2Vjb25kYXJ5IHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGhlaWdodDogOC42cmVtO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcmVtO1xuICB9XG4gIC5idG5fc2Vjb25kYXJ5IC5idG5fX3R4dCB7XG4gICAgcGFkZGluZzogMi40cmVtIDIxcmVtIDIuNHJlbSA0cmVtO1xuICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAzLjhyZW07XG4gIH1cbiAgLmJ0bl9zZWNvbmRhcnkgLmJ0bl9fdHh0OjphZnRlciB7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogYXV0bztcbiAgICByaWdodDogMDtcbiAgICB3aWR0aDogNi40cmVtO1xuICAgIGhlaWdodDogMnJlbTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNHJlbSwgLTUwJSk7XG4gIH1cbiAgLmktYnRuIHtcbiAgICB3aWR0aDogMTFyZW07XG4gICAgaGVpZ2h0OiAxMXJlbTtcbiAgfVxuICAuaS1idG4gc3ZnIHtcbiAgICB3aWR0aDogNC44cmVtO1xuICB9XG4gIC5pbnB1dCB7XG4gICAgcGFkZGluZy1ib3R0b206IDEuNnJlbTtcbiAgICBsaW5lLWhlaWdodDogMy42cmVtO1xuICB9XG4gIC5pbnB1dCAuaW5wdXRfX2ZpZWxkOjpwbGFjZWhvbGRlciB7XG4gICAgZm9udC1zaXplOiAzLjJyZW07XG4gIH1cbiAgLmlucHV0Ll9oYXMtZXJyb3I6OmFmdGVyIHtcbiAgICBmb250LXNpemU6IDIuNHJlbTtcbiAgICBsaW5lLWhlaWdodDogMi44cmVtO1xuICB9XG4gIC50YWJzX19uYXZpZ2F0aW9uIHtcbiAgICBjb2x1bW4tZ2FwOiAzLjZyZW07XG4gIH1cbiAgLnRhYjpub3QoLnRhYl9zdGF0aWMpLl9pcy1hY3RpdmUge1xuICAgIHBhZGRpbmctbGVmdDogNC44cmVtO1xuICB9XG4gIC50YWJfc3RhdGljIHtcbiAgICBjb2x1bW4tZ2FwOiAyLjRyZW07XG4gIH1cbiAgLnRhYjo6YmVmb3JlIHtcbiAgICB0b3A6IDFyZW07XG4gICAgd2lkdGg6IDIuNHJlbTtcbiAgICBoZWlnaHQ6IDIuNHJlbTtcbiAgfVxuICAudGFiX190eHQge1xuICAgIGZvbnQtc2l6ZTogNHJlbTtcbiAgICBsaW5lLWhlaWdodDogNC42cmVtO1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNDhlbSkgYW5kIChhbnktaG92ZXI6IGhvdmVyKXtcbiAgLmJ0bl9zZWNvbmRhcnk6aG92ZXIgLmJ0bl9fdHh0OjphZnRlciB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE0LjZyZW0sIC01MCUpO1xuICB9XG59XG5AbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpe1xuICAuaGVhZGVyX19uYXYtbGluazpub3QoLmhlYWRlcl9fbmF2LWxpbmsudGFiKTpob3ZlciB7XG4gICAgY29sb3I6ICNkYTI1MWU7XG4gIH1cbiAgLmhlYWRlcl9fbmF2LWxpbms6bm90KC5oZWFkZXJfX25hdi1saW5rLnRhYik6aG92ZXI6OmFmdGVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKTtcbiAgfVxuICAuYnRuX3ByaW1hcnk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxZTFlMWU7XG4gIH1cbiAgLmktYnRuX2Fyci1uZXh0Ll9oYXMtaG92ZXI6aG92ZXIuaS1idG5fYXJyLXByZXYgc3ZnLCAuaS1idG5fYXJyLXByZXYuX2hhcy1ob3Zlcjpob3Zlci5pLWJ0bl9hcnItcHJldiBzdmcge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMC44cmVtKTtcbiAgfVxuICAuaS1idG5fYXJyLW5leHQuX2hhcy1ob3Zlcjpob3Zlci5pLWJ0bl9hcnItbmV4dCBzdmcsIC5pLWJ0bl9hcnItcHJldi5faGFzLWhvdmVyOmhvdmVyLmktYnRuX2Fyci1uZXh0IHN2ZyB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuOHJlbSk7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2ZvbnRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3N0eWxlLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3NldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zZWN0aW9ucy9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc2VjdGlvbnMvZm9vdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9fdHlwby5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvX2J1dHRvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL19pbnB1dC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvX3RhYnMuc2Nzc1wiLFwiPG5vIHNvdXJjZT5cIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBQTtFQUNBLGdFQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0dGO0FEQUE7RUFDRSxxQkFBQTtFQUNBLCtEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0VGO0FEQ0E7RUFDRSxxQkFBQTtFQUNBLDZEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0NGO0FDbkJBOzs7RUFHSSxzQkFBQTtBRHFCSjs7QUNqQkE7O0VBRUksU0FBQTtFQUNBLFVBQUE7RUFFQSxZQUFBO0VBRUEsa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBRUEscUNBQUE7QURpQko7O0FDZkE7RUFDSSxxQkFBQTtFQUNBLHNCQUFBO0FEa0JKOztBQ2hCQTtFQUNJLGVBQUE7RUFFQSxjRHZCSTtFQ3dCSix5QkR6Qkk7QUEyQ1I7O0FDZEE7O0VBRUksU0FBQTtFQUNBLFVBQUE7RUFFQSxZQUFBO0VBRUEsb0JBQUE7RUFFQSw2QkFBQTtFQUNBLGNBQUE7RUFFQSxxQ0FBQTtBRGFKOztBQ1hBOztFQUVJLFNBQUE7RUFFQSx3QkFBQTtBRGFKOztBQ1hBO0VBQ0ksMEJBQUE7QURjSjs7QUNWQTs7OztFQUlJLGFBQUE7RUFFQSxhQUFBO0VBQ0EsZUFBQTtBRFlKO0FDVkk7Ozs7RUFDSSxhQUFBO0FEZVI7QUNaSTs7OztFQUNJLGFBQUE7QURpQlI7O0FDWEE7RUFDSSxZQUFBO0FEY0o7O0FDWkE7O0VBRUkscUJBQUE7QURlSjs7QUNaQTtFQUNJLFNBQUE7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QkFBQTtFTHNnQnRCO0VLbGdCa0I7SUFDSSw2QkFBQTtFTG9nQnRCO0FBeUVGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHaWxyb3lcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3ktUmVndWxhci53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHaWxyb3lcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3ktTWVkaXVtLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIkdpbHJveVxcXCI7XFxuICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL0dpbHJveS1Cb2xkLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXCIsXCIvLyAtLS0tIHZhcmlhYmxlc1xcblxcbi8vIGNvbG9yc1xcbiR3aGl0ZTogI2ZmZmZmZjtcXG4kYmxhY2s6ICMxZTFlMWU7XFxuJGdyYXk6ICNhYWFhYWE7XFxuJHJlZDogI2RhMjUxZTtcXG5cXG4vLyAtLS0tLSBmb250c1xcblxcbi8vIGltcG9ydGVkIGZvbnRzXFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRAMzAwOzQwMDs1MDAmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvK0NvbmRlbnNlZDppdGFsLHdnaHRAMCwxMDAuLjkwMDsxLDEwMC4uOTAwJmZhbWlseT1Sb2JvdG86d2dodEA0MDA7NTAwOzcwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG4vLyBsb2NhbCBmb250c1xcbkBpbXBvcnQgJy4vZm9udHMnO1xcblxcbi8vIC0tLS0tIGJhc2Ugc3R5bGVzXFxuXFxuLy8gYmFzZSBzY3NzIGZpbGVcXG5AaW1wb3J0ICcuL3NldCc7XFxuXFxuLy8gaHRtbCwgYm9keVxcbmh0bWwubG9jayB7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRvdWNoLWFjdGlvbjogbm9uZTtcXG59XFxuaHRtbCxcXG5ib2R5IHtcXG4gICAgb3ZlcmZsb3cteDogY2xpcDtcXG59XFxuXFxuLy8gbWFpblxcbm1haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbn1cXG5cXG4vLyB3cmFwcGVyXFxuLndyYXBwZXIge1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG4gICAgbWF4LXdpZHRoOiAxOTIwcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLy8gLS0tLS0gaW1wb3J0c1xcblxcbi8vIGhlYWRlciAvIGZvb3RlclxcbkBpbXBvcnQgJy4vc2VjdGlvbnMvaGVhZGVyJztcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2Zvb3Rlcic7XFxuXFxuLy8gdWlcXG5AaW1wb3J0ICcuLi91aS91aSc7XFxuXCIsXCIqLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi8vIGh0bWwsIGJvZHlcXG5odG1sLFxcbmJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuXFxuICAgIGhlaWdodDogMTAwJTtcXG5cXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBsaW5lLWhlaWdodDogMS4yO1xcblxcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbn1cXG5odG1sIHtcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgICBmb250LXNpemU6IDAuNTIwODMzNXZ3O1xcbn1cXG5ib2R5IHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcblxcbiAgICBjb2xvcjogJGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxufVxcblxcbi8vIGlucHV0LCB0ZXh0YXJlYVxcbmlucHV0LFxcbnRleHRhcmVhIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcblxcbiAgICBib3JkZXI6IG5vbmU7XFxuXFxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxuXFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxufVxcbmlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcbmlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gICAgbWFyZ2luOiAwO1xcblxcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcbmlucHV0W3R5cGU9J251bWJlciddIHtcXG4gICAgLW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XFxufVxcblxcbi8vIHJlbW92ZSBvdXRsaW5lXFxuYnV0dG9uLFxcbmlucHV0LFxcbmEsXFxudGV4dGFyZWEge1xcbiAgICBmb250OiBpbmhlcml0O1xcblxcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuXFxuICAgICY6Zm9jdXMge1xcbiAgICAgICAgb3V0bGluZTogbm9uZTtcXG4gICAgfVxcblxcbiAgICAmOmFjdGl2ZSB7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICB9XFxufVxcblxcbi8vIC0tLS0tXFxuXFxuYSB7XFxuICAgIGNvbG9yOiB1bnNldDtcXG59XFxuYSxcXG5hOmhvdmVyIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5wIHtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG5pbWcge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG5cXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG5cXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgcGFkZGluZzogMDtcXG5cXG4gICAgYm9yZGVyOiBub25lO1xcblxcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICB0ZXh0LWFsaWduOiBpbmhlcml0O1xcblxcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbnVsLFxcbnVsIGxpIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG51bCBsaSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcblxcbiAgICBmb250OiBpbmhlcml0O1xcbn1cXG5cXG4vLyAtLS0tLSBjb250YWluZXJcXG5cXG4uY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDE3MnJlbTtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbi8vIC0tLS0tIG1lZGlhIHF1ZXJpZXNcXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxLjU2MjV2dztcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygoMTAwIC8gMzc1KSAqIDV2dyk7XFxuXFxuICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAgIH1cXG4gICAgYm9keSB7XFxuICAgICAgICBmb250LXNpemU6IDMuMnJlbTtcXG5cXG4gICAgICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogbm9uZTtcXG4gICAgfVxcblxcbiAgICAuY29udGFpbmVyIHtcXG4gICAgICAgIHBhZGRpbmc6IDAgMnJlbTtcXG5cXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxOTIwcHgpIHtcXG4gICAgaHRtbCB7XFxuICAgICAgICBmb250LXNpemU6IDEwcHg7XFxuICAgIH1cXG59XFxuXCIsXCIuaGVhZGVyIHtcXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkZ3JheTtcXG4gICAgfVxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgJjo6YmVmb3JlIHtcXG4gICAgICAgICAgICBjb250ZW50OiAnJztcXG5cXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgei1pbmRleDogMjAxO1xcbiAgICAgICAgICAgIHRvcDogMDtcXG4gICAgICAgICAgICBsZWZ0OiAwO1xcblxcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICAgIGhlaWdodDogMTUuMnJlbTtcXG5cXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuXFxuICAgICAgICAgICAgb3BhY2l0eTogMDtcXG5cXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG5cXG4gICAgICAgICAgICAuX21lbnUtb3BlbmVkICYge1xcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmX19jb250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgei1pbmRleDogMjAyO1xcblxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAgICAgICBoZWlnaHQ6IDEyLjFyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGhlaWdodDogMTUuMnJlbTtcXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGdyYXk7XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9fbG9nbyB7XFxuICAgICAgICBmbGV4OiAwIDAgMjIuOXJlbTtcXG5cXG4gICAgICAgIHdpZHRoOiAyMi45cmVtO1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBmbGV4OiAwIDAgMzUuNHJlbTtcXG5cXG4gICAgICAgICAgICB3aWR0aDogMzUuNHJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmX19uYXYge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGdhcDogNHJlbTtcXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgICAgIGdhcDogNi40cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX25hdi1saW5rIHtcXG4gICAgICAgICY6bm90KCYudGFiKSB7XFxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZTtcXG5cXG4gICAgICAgICAgICAmOjphZnRlciB7XFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xcblxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgICAgIGJvdHRvbTogLTAuMnJlbTtcXG4gICAgICAgICAgICAgICAgbGVmdDogMDtcXG5cXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgICAgIGhlaWdodDogMXB4O1xcblxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVkO1xcblxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcXG5cXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZTtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAgICAgQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSB7XFxuICAgICAgICAgICAgICAgICY6aG92ZXIge1xcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICRyZWQ7XFxuXFxuICAgICAgICAgICAgICAgICAgICAmOjphZnRlciB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgICAgICAgICBmb250LXNpemU6IDRyZW07XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDQuNnJlbTtcXG5cXG4gICAgICAgICAgICAmLnR4dDIwIHtcXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogNC42cmVtO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cXG4uaGFtYnVyZ2VyIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG5cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgd2lkdGg6IDQuOHJlbTtcXG4gICAgICAgIGhlaWdodDogM3JlbTtcXG5cXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZS1pbi1vdXQ7XFxuXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuXFxuICAgICAgICAuX21lbnUtb3BlbmVkICYge1xcbiAgICAgICAgICAgIHNwYW4ge1xcbiAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMy42cmVtO1xcblxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwJTtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAmOm50aC1jaGlsZCgyKSB7XFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgJjpudGgtY2hpbGQoMykge1xcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAmOmxhc3QtY2hpbGQge1xcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAzLjZyZW07XFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMDtcXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIHNwYW4ge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBsZWZ0OiAwO1xcblxcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcblxcbiAgICAgICAgICAgIGhlaWdodDogMC4ycmVtO1xcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xcblxcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG5cXG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xcblxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcblxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluLW91dDtcXG5cXG4gICAgICAgICAgICAmOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgICAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgyKSxcXG4gICAgICAgICAgICAmOm50aC1jaGlsZCgzKSB7XFxuICAgICAgICAgICAgICAgIHRvcDogMS41cmVtO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAmOmxhc3QtY2hpbGQge1xcbiAgICAgICAgICAgICAgICB0b3A6IDNyZW07XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9XFxufVxcblxcbi5oZWFkZXItbWVudSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICB6LWluZGV4OiAyMDA7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBsZWZ0OiAwO1xcblxcbiAgICAgICAgcGFkZGluZy10b3A6IDIyLjhyZW07XFxuXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcblxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcblxcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTExMCUpO1xcblxcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZTtcXG5cXG4gICAgICAgIC5fbWVudS1vcGVuZWQgJiB7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgfVxcbiAgICB9XFxufVxcblwiLFwiLmZvb3RlciB7XFxuICAgICZfX2NvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgfVxcblxcbiAgICAmX19tYWluIHtcXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAzLjJyZW07XFxuXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcblxcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRncmF5O1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNi40cmVtO1xcblxcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9fbG9nby13cmFwIHtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG5cXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgcm93LWdhcDogNXJlbTtcXG5cXG4gICAgICAgIG1heC13aWR0aDogMzdyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMDtcXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA2LjRyZW07XFxuXFxuICAgICAgICAgICAgcm93LWdhcDogNHJlbTtcXG5cXG4gICAgICAgICAgICBtYXgtd2lkdGg6IG5vbmU7XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9fbG9nbyB7XFxuICAgICAgICB3aWR0aDogMjNyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIHdpZHRoOiAzNS42cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX3RleHQge1xcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBtYXgtd2lkdGg6IDU2cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX25hdiB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA2LjRyZW07XFxuXFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgICAgIHJvdy1nYXA6IDRyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyLjRyZW07XFxuXFxuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMjQuNXJlbSk7XFxuICAgICAgICAgICAgZ2FwOiAyLjRyZW07XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9fbmF2LWxpbmsge1xcbiAgICB9XFxufVxcblxcbi5jb250YWN0cy1mb290ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAyLjVyZW07XFxuXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgICAgIHJvdy1nYXA6IDRyZW07XFxuICAgIH1cXG5cXG4gICAgJl9fY29udGVudCB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgIGNvbHVtbi1nYXA6IDEuMnJlbTtcXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgY29sdW1uLWdhcDogMS42cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX2ljb24ge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuXFxuICAgICAgICBzdmcge1xcbiAgICAgICAgICAgIHdpZHRoOiAyLjRyZW07XFxuICAgICAgICAgICAgaGVpZ2h0OiAyLjRyZW07XFxuXFxuICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICAgICAgd2lkdGg6IDRyZW07XFxuICAgICAgICAgICAgICAgIGhlaWdodDogNHJlbTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG59XFxuXFxuLnJlcXVlc3QtZGVzaWduLWZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDYuNHJlbSAwO1xcblxcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAgIHJvdy1nYXA6IDIuNHJlbTtcXG5cXG4gICAgd2lkdGg6IDEwMCU7XFxuXFxuICAgIGNvbG9yOiAkZ3JheTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDhlbSkge1xcbiAgICAgICAgcGFkZGluZzogMy4ycmVtIDA7XFxuXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI1cmVtIDFmciAyNXJlbTtcXG4gICAgICAgIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICAgIH1cXG5cXG4gICAgJl9fdGV4dCB7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX2xvZ28ge1xcbiAgICAgICAgd2lkdGg6IDMwLjRyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGp1c3RpZnktc2VsZjogZW5kO1xcblxcbiAgICAgICAgICAgIHdpZHRoOiAxOC41cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxufVxcblwiLFwiLmgge1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcblxcbiAgICAmX2gxIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNC44cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUuNnJlbTtcXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgZm9udC1zaXplOiA1LjJyZW07XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDZyZW07XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9oMiB7XFxuICAgICAgICBmb250LXNpemU6IDIuOHJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzLjNyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNC42cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfbGFyZ2Uge1xcbiAgICAgICAgZm9udC1zaXplOiAyMXJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyNC42cmVtO1xcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogOC44cmVtO1xcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMC40cmVtO1xcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgICAgICB9XFxuICAgIH1cXG59XFxuXFxuLnR4dDIwIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBsaW5lLWhlaWdodDogMi4zcmVtO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgZm9udC1zaXplOiAzLjJyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMy42cmVtO1xcbiAgICB9XFxufVxcblxcbi50eHQxOCB7XFxuICAgIGZvbnQtc2l6ZTogMS44cmVtO1xcbiAgICBsaW5lLWhlaWdodDogMi4xcmVtO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgZm9udC1zaXplOiAzLjJyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMy44cmVtO1xcbiAgICB9XFxufVxcblxcbi50eHQxNiB7XFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICBsaW5lLWhlaWdodDogMS45cmVtO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgZm9udC1zaXplOiAyLjhyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMy4ycmVtO1xcbiAgICB9XFxufVxcblxcbi5mdy1saWdodCB7XFxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblwiLFwiLmJ0biB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgICAmX3ByaW1hcnkge1xcbiAgICAgICAgcGFkZGluZzogMS42cmVtIDMuMnJlbTtcXG5cXG4gICAgICAgIGhlaWdodDogNS4xcmVtO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTByZW07XFxuXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVkO1xcblxcbiAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2U7XFxuXFxuICAgICAgICAuYnRuX190eHQge1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjlyZW07XFxuICAgICAgICAgICAgY29sb3I6ICR3aGl0ZTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICAgICAgICY6aG92ZXIge1xcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgICBoZWlnaHQ6IDguNnJlbTtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAyMHJlbTtcXG5cXG4gICAgICAgICAgICAuYnRuX190eHQge1xcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDMuMnJlbTtcXG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMuOHJlbTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9zZWNvbmRhcnkge1xcbiAgICAgICAgcGFkZGluZzogMTByZW0gMy4ycmVtIDMuMnJlbTtcXG5cXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG5cXG4gICAgICAgIHdpZHRoOiAyNS4ycmVtO1xcbiAgICAgICAgaGVpZ2h0OiAyNS4ycmVtO1xcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgJHJlZDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG5cXG4gICAgICAgIC5idG5fX3R4dCB7XFxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMi4zcmVtO1xcbiAgICAgICAgICAgIGNvbG9yOiAkcmVkO1xcblxcbiAgICAgICAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgICAgICAgICAgY29udGVudDogJyc7XFxuXFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICAgICAgYm90dG9tOiAtMC44cmVtO1xcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMDAlO1xcblxcbiAgICAgICAgICAgICAgICB3aWR0aDogNS40cmVtO1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEuOHJlbTtcXG5cXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdXJsKCcuL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYXJyLXJlZC5zdmcnKSBjZW50ZXIgLyBjb250YWluIG5vLXJlcGVhdDtcXG5cXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCUsIDEwMCUpO1xcblxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOlxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIDAuNXMgZWFzZSxcXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgMC41cyBlYXNlO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3ZlcikgYW5kIChtaW4td2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgICAgICAgLmJ0bl9fdHh0OjphZnRlciB7XFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiA1MCU7XFxuXFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAxMDAlKTtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgcGFkZGluZzogMDtcXG5cXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgICAgICAgICBoZWlnaHQ6IDguNnJlbTtcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAyMHJlbTtcXG5cXG4gICAgICAgICAgICAuYnRuX190eHQge1xcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAyLjRyZW0gMjFyZW0gMi40cmVtIDRyZW07XFxuXFxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMy44cmVtO1xcblxcbiAgICAgICAgICAgICAgICAmOjphZnRlciB7XFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDUwJTtcXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgICAgICAgICAgICAgICByaWdodDogMDtcXG5cXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2LjRyZW07XFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDJyZW07XFxuXFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNHJlbSwgLTUwJSk7XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAgICAgQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSB7XFxuICAgICAgICAgICAgICAgICY6aG92ZXIge1xcbiAgICAgICAgICAgICAgICAgICAgLmJ0bl9fdHh0OjphZnRlciB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE0LjZyZW0sIC01MCUpO1xcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX3R4dCB7XFxuICAgICAgICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIH1cXG59XFxuXFxuLmktYnRuIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcbiAgICB3aWR0aDogNnJlbTtcXG4gICAgaGVpZ2h0OiA2cmVtO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkcmVkO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuXFxuICAgICZfYmcge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgICB9XFxuXFxuICAgIHN2ZyB7XFxuICAgICAgICB3aWR0aDogM3JlbTtcXG4gICAgfVxcblxcbiAgICAmX2Fyci1uZXh0Ll9oYXMtaG92ZXIsXFxuICAgICZfYXJyLXByZXYuX2hhcy1ob3ZlciB7XFxuICAgICAgICBzdmcge1xcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2U7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpIHtcXG4gICAgICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgICAgICAgJi5pLWJ0bl9hcnItcHJldiB7XFxuICAgICAgICAgICAgICAgICAgICBzdmcge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMC44cmVtKTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAmLmktYnRuX2Fyci1uZXh0IHtcXG4gICAgICAgICAgICAgICAgICAgIHN2ZyB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuOHJlbSk7XFxuICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgIHdpZHRoOiAxMXJlbTtcXG4gICAgICAgIGhlaWdodDogMTFyZW07XFxuXFxuICAgICAgICBzdmcge1xcbiAgICAgICAgICAgIHdpZHRoOiA0LjhyZW07XFxuICAgICAgICB9XFxuICAgIH1cXG59XFxuXCIsXCJpbnB1dFt0eXBlPSd0ZXh0J10sXFxuaW5wdXRbdHlwZT0nZW1haWwnXSxcXG5pbnB1dFt0eXBlPSd0ZWwnXSxcXG50ZXh0YXJlYSB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcbn1cXG50ZXh0YXJlYTpmb2N1cyxcXG5pbnB1dDpmb2N1cyB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbi5pbnB1dCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgcGFkZGluZy1ib3R0b206IDFyZW07XFxuXFxuICAgIGxpbmUtaGVpZ2h0OiAyLjNyZW07XFxuXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkZ3JheTtcXG5cXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLWJvdHRvbSAwLjVzIGVhc2U7XFxuXFxuICAgICZfX2ZpZWxkIHtcXG4gICAgICAgICY6OnBsYWNlaG9sZGVyIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDJyZW07XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIuM3JlbTtcXG4gICAgICAgICAgICBjb2xvcjogJGdyYXk7XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxLjZyZW07XFxuXFxuICAgICAgICBsaW5lLWhlaWdodDogMy42cmVtO1xcblxcbiAgICAgICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgICAgICAgJjo6cGxhY2Vob2xkZXIge1xcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDMuMnJlbTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJi5faXMtZmlsbGVkIHtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYmxhY2s7XFxuICAgIH1cXG5cXG4gICAgJi5faGFzLWVycm9yIHtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkcmVkO1xcblxcbiAgICAgICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgICAgICAgJjo6cGxhY2Vob2xkZXIge1xcbiAgICAgICAgICAgICAgICBjb2xvcjogJGJsYWNrO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtaGludCk7XFxuXFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gICAgICAgICAgICBmb250LXNpemU6IDEuNHJlbTtcXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS42cmVtO1xcbiAgICAgICAgICAgIGNvbG9yOiAkcmVkO1xcblxcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMi40cmVtO1xcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMi44cmVtO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cIixcIi50YWJzIHtcXG4gICAgJl9fbmF2aWdhdGlvbiB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgY29sdW1uLWdhcDogMS44cmVtO1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBjb2x1bW4tZ2FwOiAzLjZyZW07XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9fYm9keSB7XFxuICAgICAgICBwYWRkaW5nLXRvcDogMXJlbTtcXG4gICAgfVxcbn1cXG5cXG4udGFiIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICBjb2xvcjogJGdyYXk7XFxuXFxuICAgICY6bm90KCZfc3RhdGljKSB7XFxuICAgICAgICB0cmFuc2l0aW9uOlxcbiAgICAgICAgICAgIGNvbG9yIDAuNXMgZWFzZSxcXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQgMC4zcyBlYXNlO1xcblxcbiAgICAgICAgJi5faXMtYWN0aXZlIHtcXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMuNHJlbTtcXG5cXG4gICAgICAgICAgICBjb2xvcjogJHJlZDtcXG5cXG4gICAgICAgICAgICAmOjpiZWZvcmUge1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIH1cXG5cXG4gICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDQuOHJlbTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9zdGF0aWMge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgY29sdW1uLWdhcDogMXJlbTtcXG5cXG4gICAgICAgIGNvbG9yOiAkcmVkO1xcblxcbiAgICAgICAgJi50YWI6OmJlZm9yZSB7XFxuICAgICAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG5cXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBjb2x1bW4tZ2FwOiAyLjRyZW07XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xcblxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAwLjhyZW07XFxuICAgICAgICBsZWZ0OiAwO1xcblxcbiAgICAgICAgd2lkdGg6IDEuOHJlbTtcXG4gICAgICAgIGhlaWdodDogMS44cmVtO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcblxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHJlZDtcXG5cXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuXFxuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlO1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICB0b3A6IDFyZW07XFxuXFxuICAgICAgICAgICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgICAgICAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmX190eHQge1xcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgICBmb250LXNpemU6IDIuOHJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzLjNyZW07XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNC42cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxufVxcblwiLG51bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zY3NzL3N0eWxlLnNjc3MnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gaGFtYnVyZ2VyIG1lbnVcbnV0aWxzLm1lbnVJbml0KCk7XG5cbi8vIHNldCBjdXJyZW50IHllYXJcbnV0aWxzLnNldEN1cnJlbnRZZWFyKCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29tcG9uZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGZvcm1zXG5pbXBvcnQgJy4vdXRpbHMvZm9ybXMnO1xuXG4vLyB0YWJzXG5pbXBvcnQgJy4vdXRpbHMvdGFicy5qcyc7XG5cbi8vIGFjY29yZGlvblxuLy8gaW1wb3J0ICcuL3V0aWxzL2FjY29yZGlvbi5qcyc7XG5cbi8vIHNlbGVjdFxuLy8gaW1wb3J0ICcuL3V0aWxzL3NlbGVjdC5qcyc7XG5cbi8vIG1vZGFsc1xuaW1wb3J0ICcuL3V0aWxzL21vZGFscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbGlicyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGR5bmFtaWMgZG9tXG5pbXBvcnQgJy4vbGliL2RkJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0ICcuL2Rldi92em1zazEuanMnO1xuaW1wb3J0ICcuL2Rldi9tYXJrdXNETS5qcyc7XG4iXSwibmFtZXMiOlsiRHluYW1pY0FkYXB0IiwidHlwZSIsInByb3RvdHlwZSIsImluaXQiLCJfdGhpcyIsItC+YmplY3RzIiwiZGFDbGFzc25hbWUiLCJub2RlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJub2RlIiwiZGF0YSIsImRhdGFzZXQiLCJkYSIsInRyaW0iLCJkYXRhQXJyYXkiLCJzcGxpdCIsItC+YmplY3QiLCJlbGVtZW50IiwicGFyZW50IiwicGFyZW50Tm9kZSIsImRlc3RpbmF0aW9uIiwicXVlcnlTZWxlY3RvciIsImJyZWFrcG9pbnQiLCJwbGFjZSIsImluZGV4IiwiaW5kZXhJblBhcmVudCIsInB1c2giLCJhcnJheVNvcnQiLCJtZWRpYVF1ZXJpZXMiLCJBcnJheSIsIm1hcCIsImNhbGwiLCJpdGVtIiwiZmlsdGVyIiwic2VsZiIsImluZGV4T2YiLCJtZWRpYSIsIm1lZGlhU3BsaXQiLCJTdHJpbmciLCJtYXRjaE1lZGlhIiwid2luZG93IiwibWVkaWFCcmVha3BvaW50Iiwi0L5iamVjdHNGaWx0ZXIiLCJhZGRMaXN0ZW5lciIsIm1lZGlhSGFuZGxlciIsIm1hdGNoZXMiLCJtb3ZlVG8iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm1vdmVCYWNrIiwiYWRkIiwiY2hpbGRyZW4iLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJyZW1vdmUiLCJ1bmRlZmluZWQiLCJhcnJheSIsInNsaWNlIiwiYXJyIiwic29ydCIsImEiLCJiIiwibW9kdWxlcyIsIlZhbGlkYXRpb24iLCJjb25zdHJ1Y3RvciIsImF0dHJzIiwiUkVRVUlSRUQiLCJJR05PUkVfVkFMSURBVElPTiIsIkFKQVgiLCJERVYiLCJJR05PUkVfRk9DVVMiLCJTSE9XX1BMQUNFSE9MREVSIiwiVkFMSURBVEUiLCJjbGFzc2VzIiwiSEFTX0VSUk9SIiwiSEFTX0ZPQ1VTIiwiSVNfRklMTEVEIiwiSVNfUkVWRUFMRUQiLCJnZXRFcnJvcnMiLCJmb3JtIiwiZXJyIiwicmVxdWlyZWRGaWVsZHMiLCJmb3JFYWNoIiwicmVxdWlyZWRGaWVsZCIsIm9mZnNldFBhcmVudCIsInRhZ05hbWUiLCJkaXNhYmxlZCIsInZhbGlkYXRlRmllbGQiLCJhZGRFcnJvciIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVFcnJvciIsInJlcXVpcmVkIiwidmFsdWUiLCJyZXBsYWNlIiwidGVzdEVtYWlsIiwiY2hlY2tlZCIsImNsZWFyRmllbGRzIiwicmVzZXQiLCJzZXRUaW1lb3V0IiwiaW5wdXRzIiwiY2hlY2tib3hlcyIsImlucHV0IiwiY2hlY2tib3giLCJ0ZXN0IiwiRm9ybVN1Ym1pdGlvbiIsInNob3VsZFZhbGlkYXRlIiwiZm9ybXMiLCJzZW5kRm9ybSIsInJlc3BvbnNlUmVzdWx0IiwiYXJndW1lbnRzIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwicG9wdXAiLCJtb2RhbCIsIm1vZGFsTWVzc2FnZSIsIm9wZW4iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlU3VibWl0aW9uIiwiZSIsImhhc0F0dHJpYnV0ZSIsImFqYXgiLCJwcmV2ZW50RGVmYXVsdCIsImFjdGlvbiIsImdldEF0dHJpYnV0ZSIsIm1ldGhvZCIsIkZvcm1EYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsImJvZHkiLCJvayIsInJlc3VsdCIsImpzb24iLCJhbGVydCIsInBhc3N3b3JkRmllbGRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImZpZWxkIiwiYnRuIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlIiwiRm9ybUZpZWxkcyIsImZpZWxkcyIsInNhdmVQbGFjZWhvbGRlciIsInBsYWNlaG9sZGVyIiwiaGFuZGxlRm9jdXNpbiIsImNsb3Nlc3QiLCJoYW5kbGVGb2N1c291dCIsImJpbmQiLCJib2R5TG9ja1N0YXR1cyIsImJvZHlMb2NrIiwiYm9keVVubG9jayIsIk1vZGFsIiwib3B0aW9ucyIsImNvbmZpZyIsImxvZ2dpbmciLCJhdHRyaWJ1dGVPcGVuQnV0dG9uIiwiYXR0cmlidXRlQ2xvc2VCdXR0b24iLCJmaXhFbGVtZW50U2VsZWN0b3IiLCJ5b3V0dWJlQXR0cmlidXRlIiwieW91dHViZVBsYWNlQXR0cmlidXRlIiwic2V0QXV0b3BsYXlZb3V0dWJlIiwibW9kYWxDb250ZW50IiwibW9kYWxBY3RpdmUiLCJib2R5QWN0aXZlIiwiZm9jdXNDYXRjaCIsImNsb3NlRXNjIiwiaGFzaFNldHRpbmdzIiwibG9jYXRpb24iLCJnb0hhc2giLCJvbiIsImJlZm9yZU9wZW4iLCJhZnRlck9wZW4iLCJiZWZvcmVDbG9zZSIsImFmdGVyQ2xvc2UiLCJ5b3VUdWJlQ29kZSIsImlzT3BlbiIsInRhcmdldE9wZW4iLCJzZWxlY3RvciIsInByZXZpb3VzT3BlbiIsImxhc3RDbG9zZWQiLCJfZGF0YVZhbHVlIiwiaGFzaCIsIl9yZW9wZW4iLCJfc2VsZWN0b3JPcGVuIiwibGFzdEZvY3VzRWwiLCJfZm9jdXNFbCIsImluaXRtb2RhbHMiLCJldmVudHNtb2RhbCIsImJ1dHRvbk9wZW4iLCJidXR0b25DbG9zZSIsImNsb3NlIiwid2hpY2giLCJjb2RlIiwiX2ZvY3VzQ2F0Y2giLCJfb3BlblRvSGFzaCIsInNlbGVjdG9yVmFsdWUiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmV2aW91c0FjdGl2ZUVsZW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29kZVZpZGVvIiwidXJsVmlkZW8iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiYXV0b3BsYXkiLCJ5b3V0dWJlUGxhY2UiLCJhcHBlbmRDaGlsZCIsIl9nZXRIYXNoIiwiX3NldEhhc2giLCJtIiwiaW5uZXJXaWR0aCIsIl9mb2N1c1RyYXAiLCJpbm5lckhUTUwiLCJfcmVtb3ZlSGFzaCIsImluY2x1ZGVzIiwiY2xhc3NJbkhhc2giLCJidXR0b25zIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhyZWYiLCJmb2N1c2FibGUiLCJmb2N1c0FycmF5IiwiZm9jdXNlZEluZGV4Iiwic2hpZnRLZXkiLCJmb2N1cyIsInNldEhhc2giLCJnZXRIYXNoIiwiVGFicyIsIlRBQlMiLCJJTkRFWCIsIlRJVExFUyIsIlRJVExFIiwiVEFCX0lURU0iLCJCT0RZIiwiSEFTSCIsIklOSVQiLCJBQ1RJVkUiLCJNT0RBTCIsInRhYnMiLCJhY3RpdmVIYXNoIiwic3RhcnRzV2l0aCIsInRhYnNCbG9jayIsInNldEFjdGlvbnMiLCJzZXRTdGF0dXMiLCJ0aXRsZXMiLCJjb250ZW50IiwidGFic0luZGV4IiwiaGFzSGFzaCIsImZyb20iLCJpbmR4IiwiaGlkZGVuIiwidGl0bGUiLCJhY3RpdmVUaXRsZSIsImFjdGl2ZUhhc2hCbG9jayIsIm1lbnVJbml0IiwibW0iLCJpc0FjdGl2ZSIsIm1lbnVPcGVuIiwibWVudUNsb3NlIiwiYm9keUxvY2tUb2dnbGUiLCJkZWxheSIsInVuaXF1ZUFycmF5IiwiZGF0YU1lZGlhUXVlcmllcyIsImRhdGFTZXRWYWx1ZSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJwYXJhbXNBcnJheSIsIm1kUXVlcmllcyIsIm1kUXVlcmllc0FycmF5IiwibWVkaWFUeXBlIiwiaXRlbXNBcnJheSIsIl9zbGlkZVVwIiwiZHVyYXRpb24iLCJzaG93bW9yZSIsInN0eWxlIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwib3ZlcmZsb3ciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInJlbW92ZVByb3BlcnR5IiwiX3NsaWRlRG93biIsIl9zbGlkZVRvZ2dsZSIsInJlbVRvUHgiLCJyZW1WYWx1ZSIsImh0bWxGb250U2l6ZSIsInBhcnNlRmxvYXQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZm9udFNpemUiLCJweFZhbHVlIiwiTWF0aCIsInJvdW5kIiwicmVtb3ZlQ2xhc3NlcyIsImNsYXNzTmFtZSIsInNldEN1cnJlbnRZZWFyIiwiZ2V0RWxlbWVudEJ5SWQiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ1dGlscyJdLCJzb3VyY2VSb290IjoiIn0=