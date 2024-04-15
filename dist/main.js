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
  if (document.querySelector('.hamburger')) {
    document.addEventListener('click', function (e) {
      if (bodyLockStatus && e.target.closest('.hamburger')) {
        menuOpen();
      } else if (bodyLockStatus && document.documentElement.classList.contains('_menu-opened') && (e.target.closest('.menu__close-btn') || !e.target.closest('.menu'))) {
        menuClose();
      }
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
  transition: color 0.5s ease, padding-left 0.3s ease;
}
.tab._is-active {
  padding-left: 3.4rem;
  color: #da251e;
}
.tab._is-active::before {
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
  .tab._is-active {
    padding-left: 4.8rem;
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
  .btn_primary:hover {
    background-color: #1e1e1e;
  }
  .i-btn_arr-next._has-hover:hover.i-btn_arr-prev svg, .i-btn_arr-prev._has-hover:hover.i-btn_arr-prev svg {
    transform: translateX(-0.8rem);
  }
  .i-btn_arr-next._has-hover:hover.i-btn_arr-next svg, .i-btn_arr-prev._has-hover:hover.i-btn_arr-next svg {
    transform: translateX(0.8rem);
  }
}`, "",{"version":3,"sources":["webpack://./src/scss/fonts.scss","webpack://./src/scss/style.scss","webpack://./src/scss/set.scss","webpack://./src/ui/_typo.scss","webpack://./src/ui/_buttons.scss","webpack://./src/ui/_input.scss","webpack://./src/ui/_tabs.scss","<no source>"],"names":[],"mappings":"AAAA;EACE,qBAAA;EACA,gEAAA;EACA,gBAAA;EACA,kBAAA;ACGF;ADAA;EACE,qBAAA;EACA,+DAAA;EACA,gBAAA;EACA,kBAAA;ACEF;ADCA;EACE,qBAAA;EACA,6DAAA;EACA,gBAAA;EACA,kBAAA;ACCF;ACnBA;;;EAGI,sBAAA;ADqBJ;;ACjBA;;EAEI,SAAA;EACA,UAAA;EAEA,YAAA;EAEA,kBAAA;EACA,mBAAA;EACA,gBAAA;EAEA,qCAAA;ADiBJ;;ACfA;EACI,qBAAA;EACA,sBAAA;ADkBJ;;AChBA;EACI,eAAA;EAEA,cDvBI;ECwBJ,yBDzBI;AA2CR;;ACdA;;EAEI,SAAA;EACA,UAAA;EAEA,YAAA;EAEA,oBAAA;EAEA,6BAAA;EACA,cAAA;EAEA,qCAAA;ADaJ;;ACXA;;EAEI,SAAA;EAEA,wBAAA;ADaJ;;ACXA;EACI,0BAAA;ADcJ;;ACVA;;;;EAII,aAAA;EAEA,aAAA;EACA,eAAA;ADYJ;ACVI;;;;EACI,aAAA;ADeR;ACZI;;;;EACI,aAAA;ADiBR;;ACXA;EACI,YAAA;ADcJ;;ACZA;;EAEI,qBAAA;ADeJ;;ACZA;EACI,SAAA;ADeJ;;ACZA;EACI,cAAA;EAEA,WAAA;EACA,YAAA;EAEA,mBAAA;ADaJ;;ACVA;EACI,UAAA;EAEA,YAAA;EAEA,aAAA;EACA,mBAAA;EAEA,cAAA;EACA,6BAAA;ADUJ;;ACPA;;EAEI,UAAA;EACA,SAAA;ADUJ;;ACRA;EACI,gBAAA;ADWJ;;ACRA;;;;;;EAMI,SAAA;EACA,UAAA;EAEA,aAAA;ADUJ;;ACLA;EACI,aAAA;EACA,cAAA;ADQJ;AAxHA;EACI,gBAAA;EACA,kBAAA;AAgJJ;;AA9IA;;EAEI,gBAAA;AAiJJ;;AA7IA;EACI,kBAAA;EAEA,cAAA;AA+IJ;;AA3IA;EACI,cAAA;EAEA,aAAA;EACA,sBAAA;EAEA,iBAAA;EACA,YAAA;AA4IJ;;AE3LA;EACE,+BAAA;EACA,gBAAA;EACA,yBAAA;AF8LF;AE5LE;EACE,iBAAA;EACA,mBAAA;AF8LJ;AEtLE;EACE,iBAAA;EACA,mBAAA;AF8LJ;AEtLE;EACE,gBAAA;EACA,oBAAA;EACA,oBAAA;AF8LJ;;AEpLA;EACE,eAAA;EACA,mBAAA;AF8LF;;AEtLA;EACE,iBAAA;EACA,mBAAA;AF+LF;;AEvLA;EACE,gBAAA;AFgMF;;AG3PA;EACI,oBAAA;EACA,mBAAA;AH8PJ;AG5PI;EACI,sBAAA;EAEA,cAAA;EACA,oBAAA;EAEA,yBHJF;EGME,sCAAA;AH2PR;AGzPQ;EACI,iBAAA;EACA,mBAAA;EACA,cHdJ;AAyQR;AGtOI;EACI,4BAAA;EAEA,uBAAA;EACA,yBAAA;EAEA,cAAA;EACA,eAAA;EACA,yBAAA;EACA,kBAAA;AHsPR;AGpPQ;EACI,kBAAA;EAEA,eAAA;EACA,mBAAA;EACA,cHhDN;AAqSN;AGnPY;EACI,WAAA;EAEA,kBAAA;EACA,eAAA;EACA,UAAA;EAEA,aAAA;EACA,cAAA;EAEA,6EAAA;EAEA,iCAAA;EAEA,+CACI;AH+OpB;AG1LI;EACI,+BAAA;EACA,gBAAA;EACA,yBAAA;AH8NR;;AG1NA;EACI,oBAAA;EACA,mBAAA;EACA,uBAAA;EAEA,WAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;AH4NJ;AG1NI;EACI,0CAAA;AH4NR;AGzNI;EACI,WAAA;AH2NR;AGtNQ;EACI,+BAAA;AHwNZ;;AIhXA;;;;EAII,wBAAA;EACA,qBAAA;EACA,gBAAA;AJoYJ;;AIlYA;;EAEI,aAAA;AJqYJ;;AIlYA;EACI,kBAAA;EAEA,oBAAA;EAEA,mBAAA;EAEA,gCAAA;EAEA,mCAAA;AJiYJ;AI9XQ;EACI,eAAA;EACA,mBAAA;EACA,cJvBL;AAuZP;AIhXI;EACI,gCAAA;AJ2XR;AIxXI;EACI,gCAAA;AJ0XR;AIvXY;EACI,cJjDR;AA0aR;AIrXQ;EACI,wBAAA;EAEA,+BAAA;EACA,iBAAA;EACA,mBAAA;EACA,cJzDN;AA+aN;;AKpbI;EACI,aAAA;EACA,kBAAA;AL6bR;AKtbI;EACI,iBAAA;AL6bR;;AKzbA;EACI,kBAAA;EAEA,cLbG;EKeH,mDACI;ALybR;AKtbI;EACI,oBAAA;EAEA,cLrBF;AA4cN;AKrbQ;EACI,mBAAA;ALubZ;AK/aI;EACI,WAAA;EAEA,kBAAA;EACA,WAAA;EACA,OAAA;EAEA,aAAA;EACA,cAAA;EACA,kBAAA;EAEA,yBL3CF;EK6CE,mBAAA;EAEA,+BAAA;ALibR;AKvaI;EACI,+BAAA;EACA,gBAAA;EACA,iBAAA;EACA,mBAAA;ALgbR;AMnfA;EH8EgB;IACI,SAAA;IAEA,gCAAA;EH0OlB;AAsCF;AMjWA;ELiKI;IACI,eAAA;EDEN;AAkMF;AMtWA;EL6II;IACI,cAAA;IACA,mBAAA;IACA,yBAAA;IAEA,8BAAA;EDKN;ECHE;IACI,iBAAA;IAEA,8BAAA;EDIN;ECDE;IACI,eAAA;IAEA,WAAA;EDEN;EE1JA;IAKI,iBAAA;IACA,iBAAA;EF+LJ;EE3LA;IAKI,eAAA;IACA,mBAAA;EF+LJ;EE3LA;IAMI,iBAAA;IACA,oBAAA;IACA,yBAAA;EF+LJ;EE1LF;IAKI,iBAAA;IACA,mBAAA;EF+LF;EE3LF;IAKI,iBAAA;IACA,mBAAA;EFgMF;EGlPE;IAuBQ,WAAA;IACA,cAAA;IACA,oBAAA;EH0PV;EGxPU;IACI,iBAAA;IACA,mBAAA;EH0Pd;EGrPE;IAiDQ,UAAA;IAEA,2BAAA;IACA,mBAAA;IAEA,cAAA;IACA,WAAA;IACA,oBAAA;EHuOV;EGrOU;IACI,iCAAA;IAEA,iBAAA;IACA,mBAAA;EHsOd;EGpOc;IACI,QAAA;IACA,UAAA;IACA,QAAA;IAEA,aAAA;IACA,YAAA;IAEA,iCAAA;EHoOlB;EG/MF;IAyCQ,YAAA;IACA,aAAA;EHgNN;EG9MM;IACI,aAAA;EHgNV;EInXF;IAoBQ,sBAAA;IAEA,mBAAA;EJ8XN;EI3XU;IACI,iBAAA;EJ6Xd;EI3WM;IASQ,iBAAA;IACA,mBAAA;EJuXd;EKzbE;IAKQ,kBAAA;EL8bV;EK5aE;IAUQ,oBAAA;ELubV;EKnbE;IAkBQ,SAAA;IAEA,aAAA;IACA,cAAA;ELibV;EK7aE;IAOQ,eAAA;IACA,mBAAA;ELibV;AA9CF;AM1cA;EHoHoB;IACI,oCAAA;EHkOtB;AAwHF;AM/cA;EHqBY;IACI,yBHlBR;EA4QN;EGlHkB;IACI,8BAAA;EHqNtB;EGjNkB;IACI,6BAAA;EHmNtB;AAmGF","sourcesContent":["@font-face {\n  font-family: \"Gilroy\";\n  src: url(\"../assets/fonts/Gilroy-Regular.woff2\") format(\"woff2\");\n  font-weight: 400;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(\"../assets/fonts/Gilroy-Medium.woff2\") format(\"woff2\");\n  font-weight: 500;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(\"../assets/fonts/Gilroy-Bold.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: normal;\n}\n","// ---- variables\n\n// colors\n$white: #ffffff;\n$black: #1e1e1e;\n$gray: #aaaaaa;\n$red: #da251e;\n\n// ----- fonts\n\n// imported fonts\n@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:wght@400;500;700&display=swap');\n\n// local fonts\n@import './fonts';\n\n// ----- base styles\n\n// base scss file\n@import './set';\n\n// html, body\nhtml.lock {\n    overflow: hidden;\n    touch-action: none;\n}\nhtml,\nbody {\n    overflow-x: clip;\n}\n\n// main\nmain {\n    position: relative;\n\n    flex: 1 1 auto;\n}\n\n// wrapper\n.wrapper {\n    margin: 0 auto;\n\n    display: flex;\n    flex-direction: column;\n\n    max-width: 1920px;\n    height: 100%;\n}\n\n// ----- imports\n\n// header / footer\n@import './sections/header';\n@import './sections/footer';\n\n// ui\n@import '../ui/ui';\n","*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\n\n// html, body\nhtml,\nbody {\n    margin: 0;\n    padding: 0;\n\n    height: 100%;\n\n    font-style: normal;\n    font-weight: normal;\n    line-height: 1.2;\n\n    -webkit-animation: bugfix infinite 1s;\n}\nhtml {\n    font-family: 'Roboto';\n    font-size: 0.5208335vw;\n}\nbody {\n    font-size: 2rem;\n\n    color: $black;\n    background-color: $white;\n}\n\n// input, textarea\ninput,\ntextarea {\n    margin: 0;\n    padding: 0;\n\n    border: none;\n\n    line-height: inherit;\n\n    background-color: transparent;\n    color: inherit;\n\n    -webkit-animation: bugfix infinite 1s;\n}\ninput[type='number']::-webkit-inner-spin-button,\ninput[type='number']::-webkit-outer-spin-button {\n    margin: 0;\n\n    -webkit-appearance: none;\n}\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\n// remove outline\nbutton,\ninput,\na,\ntextarea {\n    font: inherit;\n\n    outline: none;\n    cursor: pointer;\n\n    &:focus {\n        outline: none;\n    }\n\n    &:active {\n        outline: none;\n    }\n}\n\n// -----\n\na {\n    color: unset;\n}\na,\na:hover {\n    text-decoration: none;\n}\n\np {\n    margin: 0;\n}\n\nimg {\n    display: block;\n\n    width: 100%;\n    height: auto;\n\n    object-fit: contain;\n}\n\nbutton {\n    padding: 0;\n\n    border: none;\n\n    font: inherit;\n    text-align: inherit;\n\n    color: inherit;\n    background-color: transparent;\n}\n\nul,\nul li {\n    padding: 0;\n    margin: 0;\n}\nul li {\n    list-style: none;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    margin: 0;\n    padding: 0;\n\n    font: inherit;\n}\n\n// ----- container\n\n.container {\n    width: 172rem;\n    margin: 0 auto;\n}\n\n// ----- media queries\n\n@media (max-width: 48em) {\n    html {\n        font-size: 5px;\n        font-size: 1.5625vw;\n        font-size: calc((100 / 375) * 5vw);\n\n        -webkit-text-size-adjust: none;\n    }\n    body {\n        font-size: 3.2rem;\n\n        -webkit-text-size-adjust: none;\n    }\n\n    .container {\n        padding: 0 2rem;\n\n        width: 100%;\n    }\n}\n@media (min-width: 1920px) {\n    html {\n        font-size: 10px;\n    }\n}\n",".h {\n  font-family: \"Roboto Condensed\";\n  font-weight: 500;\n  text-transform: uppercase;\n\n  &_h1 {\n    font-size: 4.8rem;\n    line-height: 5.6rem;\n\n    @media (max-width: 48em) {\n      font-size: 5.2rem;\n      line-height: 6rem;\n    }\n  }\n\n  &_h2 {\n    font-size: 2.8rem;\n    line-height: 3.3rem;\n\n    @media (max-width: 48em) {\n      font-size: 4rem;\n      line-height: 4.6rem;\n    }\n  }\n\n  &_large {\n    font-size: 21rem;\n    line-height: 24.6rem;\n    text-transform: none;\n\n    @media (max-width: 48em) {\n      font-size: 8.8rem;\n      line-height: 10.4rem;\n      text-transform: uppercase;\n    }\n  }\n}\n\n.txt20 {\n  font-size: 2rem;\n  line-height: 2.3rem;\n\n  @media (max-width: 48em) {\n    font-size: 3.2rem;\n    line-height: 3.6rem;\n  }\n}\n\n.txt18 {\n  font-size: 1.8rem;\n  line-height: 2.1rem;\n\n  @media (max-width: 48em) {\n    font-size: 3.2rem;\n    line-height: 3.8rem;\n  }\n}\n\n.fw-light {\n  font-weight: 300;\n}\n",".btn {\n    display: inline-flex;\n    align-items: center;\n\n    &_primary {\n        padding: 1.6rem 3.2rem;\n\n        height: 5.1rem;\n        border-radius: 10rem;\n\n        background-color: $red;\n\n        transition: background-color 0.5s ease;\n\n        .btn__txt {\n            font-size: 1.6rem;\n            line-height: 1.9rem;\n            color: $white;\n        }\n\n        @media (any-hover: hover) {\n            &:hover {\n                background-color: $black;\n            }\n        }\n\n        @media (max-width: 48em) {\n            width: 100%;\n            height: 8.6rem;\n            border-radius: 20rem;\n\n            .btn__txt {\n                font-size: 3.2rem;\n                line-height: 3.8rem;\n            }\n        }\n    }\n\n    &_secondary {\n        padding: 10rem 3.2rem 3.2rem;\n\n        align-items: flex-start;\n        justify-content: flex-end;\n\n        width: 25.2rem;\n        height: 25.2rem;\n        border: 1px solid $red;\n        border-radius: 50%;\n\n        .btn__txt {\n            position: relative;\n\n            font-size: 2rem;\n            line-height: 2.3rem;\n            color: $red;\n\n            &::after {\n                content: '';\n\n                position: absolute;\n                bottom: -0.8rem;\n                left: 100%;\n\n                width: 5.4rem;\n                height: 1.8rem;\n\n                background: url('./assets/images/icons/arr-red.svg') center / contain no-repeat;\n\n                transform: translate(-100%, 100%);\n\n                transition:\n                    transform 0.5s ease,\n                    left 0.5s ease;\n            }\n        }\n\n        @media (any-hover: hover) and (min-width: 48em) {\n            &:hover {\n                .btn__txt::after {\n                    left: 50%;\n\n                    transform: translate(-50%, 100%);\n                }\n            }\n        }\n\n        @media (max-width: 48em) {\n            padding: 0;\n\n            justify-content: flex-start;\n            align-items: center;\n\n            height: 8.6rem;\n            width: 100%;\n            border-radius: 20rem;\n\n            .btn__txt {\n                padding: 2.4rem 21rem 2.4rem 4rem;\n\n                font-size: 3.2rem;\n                line-height: 3.8rem;\n\n                &::after {\n                    top: 50%;\n                    left: auto;\n                    right: 0;\n\n                    width: 6.4rem;\n                    height: 2rem;\n\n                    transform: translate(-4rem, -50%);\n                }\n            }\n\n            @media (any-hover: hover) {\n                &:hover {\n                    .btn__txt::after {\n                        transform: translate(-14.6rem, -50%);\n                    }\n                }\n            }\n        }\n    }\n\n    &__txt {\n        font-family: 'Roboto Condensed';\n        font-weight: 500;\n        text-transform: uppercase;\n    }\n}\n\n.i-btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n\n    width: 6rem;\n    height: 6rem;\n    border: 1px solid $red;\n    border-radius: 50%;\n\n    &_bg {\n        background-color: rgba(255, 255, 255, 0.7);\n    }\n\n    svg {\n        width: 3rem;\n    }\n\n    &_arr-next._has-hover,\n    &_arr-prev._has-hover {\n        svg {\n            transition: transform 0.5s ease;\n        }\n\n        @media (any-hover: hover) {\n            &:hover {\n                &.i-btn_arr-prev {\n                    svg {\n                        transform: translateX(-0.8rem);\n                    }\n                }\n                &.i-btn_arr-next {\n                    svg {\n                        transform: translateX(0.8rem);\n                    }\n                }\n            }\n        }\n    }\n\n    @media (max-width: 48em) {\n        width: 11rem;\n        height: 11rem;\n\n        svg {\n            width: 4.8rem;\n        }\n    }\n}\n","input[type='text'],\ninput[type='email'],\ninput[type='tel'],\ntextarea {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\ntextarea:focus,\ninput:focus {\n    outline: none;\n}\n\n.input {\n    position: relative;\n\n    padding-bottom: 1rem;\n\n    line-height: 2.3rem;\n\n    border-bottom: 1px solid $gray;\n\n    transition: border-bottom 0.5s ease;\n\n    &__field {\n        &::placeholder {\n            font-size: 2rem;\n            line-height: 2.3rem;\n            color: $gray;\n        }\n    }\n\n    @media (max-width: 48em) {\n        padding-bottom: 1.6rem;\n\n        line-height: 3.6rem;\n\n        .input__field {\n            &::placeholder {\n                font-size: 3.2rem;\n            }\n        }\n    }\n\n    &._is-filled {\n        border-bottom: 1px solid $black;\n    }\n\n    &._has-error {\n        border-bottom: 1px solid $red;\n\n        .input__field {\n            &::placeholder {\n                color: $black;\n            }\n        }\n\n        &::after {\n            content: attr(data-hint);\n\n            font-family: 'Roboto Condensed';\n            font-size: 1.4rem;\n            line-height: 1.6rem;\n            color: $red;\n\n            @media (max-width: 48em) {\n                font-size: 2.4rem;\n                line-height: 2.8rem;\n            }\n        }\n    }\n}\n",".tabs {\n    &__navigation {\n        display: flex;\n        column-gap: 1.8rem;\n\n        @media (max-width: 48em) {\n            column-gap: 3.6rem;\n        }\n    }\n\n    &__body {\n        padding-top: 1rem;\n    }\n}\n\n.tab {\n    position: relative;\n\n    color: $gray;\n\n    transition:\n        color 0.5s ease,\n        padding-left 0.3s ease;\n\n    &._is-active {\n        padding-left: 3.4rem;\n\n        color: $red;\n\n        &::before {\n            transform: scale(1);\n        }\n\n        @media (max-width: 48em) {\n            padding-left: 4.8rem;\n        }\n    }\n\n    &::before {\n        content: '';\n\n        position: absolute;\n        top: 0.8rem;\n        left: 0;\n\n        width: 1.8rem;\n        height: 1.8rem;\n        border-radius: 50%;\n\n        background-color: $red;\n\n        transform: scale(0);\n\n        transition: transform 0.5s ease;\n\n        @media (max-width: 48em) {\n            top: 1rem;\n\n            width: 2.4rem;\n            height: 2.4rem;\n        }\n    }\n\n    &__txt {\n        font-family: 'Roboto Condensed';\n        font-weight: 500;\n        font-size: 2.8rem;\n        line-height: 3.3rem;\n\n        @media (max-width: 48em) {\n            font-size: 4rem;\n            line-height: 4.6rem;\n        }\n    }\n}\n",null],"sourceRoot":""}]);
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
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dev/vzmsk1.js */ "./src/js/dev/vzmsk1.js");
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dev/markusDM.js */ "./src/js/dev/markusDM.js");
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dev_markusDM_js__WEBPACK_IMPORTED_MODULE_6__);


// ---------------------------------- utils ---------------------------------



// hamburger menu
_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.menuInit();

// ------------------------------- components -------------------------------

// forms


// tabs


// accordion
// import './utils/accordion.js';

// select
// import './utils/select.js';

// modals


// --------------------------------------------------------------------------



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTywwU0FBMFMsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLFFBQVEsV0FBVyxPQUFPLE9BQU8sVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLEtBQUssV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsYUFBYSxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sUUFBUSxVQUFVLFVBQVUsVUFBVSxLQUFLLFFBQVEsVUFBVSxLQUFLLFFBQVEsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE9BQU8sU0FBUyxXQUFXLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxX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QUVBO0FBQzJCOztBQUUzQjs7QUFFeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvbW9kdWxlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvZm9ybXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL21vZGFscy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvdGFicy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL3Njc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9zY3NzL3N0eWxlLnNjc3M/NmMyZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IG1vZHVsZXMgPSB7fTtcbiIsImltcG9ydCB7IG1vZHVsZXMgfSBmcm9tICcuLi9tb2R1bGVzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgVmFsaWRhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICAgICAgICBSRVFVSVJFRDogJ2RhdGEtcmVxdWlyZWQnLFxuICAgICAgICAgICAgSUdOT1JFX1ZBTElEQVRJT046ICdkYXRhLWlnbm9yZS12YWxpZGF0aW9uJyxcbiAgICAgICAgICAgIEFKQVg6ICdkYXRhLWFqYXgnLFxuICAgICAgICAgICAgREVWOiAnZGF0YS1kZXYnLFxuICAgICAgICAgICAgSUdOT1JFX0ZPQ1VTOiAnZGF0YS1pZ25vcmUtZm9jdXMnLFxuICAgICAgICAgICAgU0hPV19QTEFDRUhPTERFUjogJ2RhdGEtc2hvdy1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBWQUxJREFURTogJ2RhdGEtdmFsaWRhdGUnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgICAgICAgSEFTX0ZPQ1VTOiAnX2hhcy1mb2N1cycsXG4gICAgICAgICAgICBJU19GSUxMRUQ6ICdfaXMtZmlsbGVkJyxcbiAgICAgICAgICAgIElTX1JFVkVBTEVEOiAnX2lzLXJldmVhbGVkJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEVycm9ycyhmb3JtKSB7XG4gICAgICAgIGxldCBlcnIgPSAwO1xuICAgICAgICBsZXQgcmVxdWlyZWRGaWVsZHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoYCpbJHt0aGlzLmF0dHJzLlJFUVVJUkVEfV1gKTtcblxuICAgICAgICBpZiAocmVxdWlyZWRGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKChyZXF1aXJlZEZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAocmVxdWlyZWRGaWVsZC5vZmZzZXRQYXJlbnQgIT09IG51bGwgfHwgcmVxdWlyZWRGaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJykgJiZcbiAgICAgICAgICAgICAgICAgICAgIXJlcXVpcmVkRmllbGQuZGlzYWJsZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyICs9IHRoaXMudmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGFkZEVycm9yKHJlcXVpcmVkRmllbGQpIHtcbiAgICAgICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgICAgICByZXF1aXJlZEZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKTtcbiAgICAgICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCkge1xuICAgICAgICByZXF1aXJlZEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRmllbGQocmVxdWlyZWRGaWVsZCkge1xuICAgICAgICBsZXQgZXJyID0gMDtcblxuICAgICAgICBpZiAocmVxdWlyZWRGaWVsZC5kYXRhc2V0LnJlcXVpcmVkID09PSAnZW1haWwnKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkLnZhbHVlID0gcmVxdWlyZWRGaWVsZC52YWx1ZS5yZXBsYWNlKCcgJywgJycpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICAgICAgICAgIGVycisrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcXVpcmVkRmllbGQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiAhcmVxdWlyZWRGaWVsZC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICAgICAgZXJyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXJlcXVpcmVkRmllbGQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgICAgICAgICBlcnIrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGNsZWFyRmllbGRzKGZvcm0pIHtcbiAgICAgICAgZm9ybS5yZXNldCgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBpbnB1dHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihpbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoZWNrYm94ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY2hlY2tib3hlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHRlc3RFbWFpbChyZXF1aXJlZEZpZWxkKSB7XG4gICAgICAgIHJldHVybiAhL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDh9KSskLy50ZXN0KHJlcXVpcmVkRmllbGQudmFsdWUpO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1TdWJtaXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihzaG91bGRWYWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNob3VsZFZhbGlkYXRlID0gc2hvdWxkVmFsaWRhdGUgPyBzaG91bGRWYWxpZGF0ZSA6IHRydWU7XG4gICAgICAgIHRoaXMuZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNlbmRGb3JtKGZvcm0sIHJlc3BvbnNlUmVzdWx0ID0gYGApIHtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2VuZEZvcm0nLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHNob3cgbW9kYWwsIGlmIHBvcHVwIG1vZHVsZSBpcyBjb25uZWN0ZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAobW9kdWxlcy5wb3B1cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZm9ybS5kYXRhc2V0Lm1vZGFsTWVzc2FnZTtcbiAgICAgICAgICAgICAgICBtb2RhbCA/IG1vZHVsZXMubW9kYWwub3Blbihtb2RhbCkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcblxuICAgICAgICB0aGlzLmNsZWFyRmllbGRzKGZvcm0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdpcyBzZW50Jyk7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlU3VibWl0aW9uKGZvcm0sIGUpIHtcbiAgICAgICAgY29uc3QgZXJyID0gIWZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX1ZBTElEQVRJT04pID8gdGhpcy5nZXRFcnJvcnMoZm9ybSkgOiAwO1xuXG4gICAgICAgIGlmIChlcnIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFqYXggPSBmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkFKQVgpO1xuXG4gICAgICAgICAgICBpZiAoYWpheCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSA/IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKS50cmltKCkgOiAnIyc7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpID8gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpLnRyaW0oKSA6ICdHRVQnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAgICAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ19pcy1zZW5kaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFjdGlvbiwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0sIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnX2lzLXNlbmRpbmcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuREVWKSkge1xuICAgICAgICAgICAgICAgIC8vIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRm9ybShmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgY29uc3QgcGFzc3dvcmRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXF1aXJlZD1cInBhc3NcIl0nKTtcblxuICAgICAgICBpZiAodGhpcy5mb3Jtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXMuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlU3VibWl0aW9uKGUudGFyZ2V0LCBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xlYXJGaWVsZHMoZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFzc3dvcmRGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwYXNzd29yZEZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ0biA9IGZpZWxkLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKF90aGlzLmNsYXNzZXMuSVNfUkVWRUFMRUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAncGFzc3dvcmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShfdGhpcy5jbGFzc2VzLklTX1JFVkVBTEVEKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBGb3JtRmllbGRzIGV4dGVuZHMgVmFsaWRhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsdGV4dGFyZWEnKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2F2ZVBsYWNlaG9sZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuU0hPV19QTEFDRUhPTERFUikpIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuZGF0YXNldC5wbGFjZWhvbGRlciA9IGZpZWxkLnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXNpbihlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB0YXJnZXQucGxhY2Vob2xkZXIgPSAnJztcblxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX0ZPQ1VTKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlICE9PSAnZmlsZScgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSAhPT0gJ2NoZWNrYm94JyAmJlxuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlICE9PSAncmFkaW8nICYmXG4gICAgICAgICAgICAgICAgIXRhcmdldC5jbG9zZXN0KCcucXVhbnRpdHknKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1c291dChlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuZGF0YXNldC5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuVkFMSURBVEUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKHRhcmdldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSAhPT0gJ2ZpbGUnICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUgIT09ICdjaGVja2JveCcgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSAhPT0gJ3JhZGlvJyAmJlxuICAgICAgICAgICAgICAgICF0YXJnZXQuY2xvc2VzdCgnLnF1YW50aXR5JylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKSAmJiB0YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIHNhdmUgcGxhY2Vob2xkZXIgaW4gZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy5zYXZlUGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAvLyBoYW5kbGUgc3VibWl0aW9uXG4gICAgICAgIG5ldyBGb3JtU3VibWl0aW9uKCk7XG5cbiAgICAgICAgLy8gZXZlbnRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuaGFuZGxlRm9jdXNpbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuaGFuZGxlRm9jdXNvdXQuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgRm9ybUZpZWxkcygpO1xuIiwiaW1wb3J0IHsgbW9kdWxlcyB9IGZyb20gJy4uL21vZHVsZXMuanMnO1xuaW1wb3J0IHsgYm9keUxvY2tTdGF0dXMsIGJvZHlMb2NrLCBib2R5VW5sb2NrIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgbG9nZ2luZzogdHJ1ZSxcbiAgICAgIGluaXQ6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVPcGVuQnV0dG9uOiAnZGF0YS1tb2RhbCcsXG4gICAgICBhdHRyaWJ1dGVDbG9zZUJ1dHRvbjogJ2RhdGEtY2xvc2UnLFxuICAgICAgZml4RWxlbWVudFNlbGVjdG9yOiAnW2RhdGEtbHBdJyxcbiAgICAgIHlvdXR1YmVBdHRyaWJ1dGU6ICdkYXRhLW1vZGFsLXlvdXR1YmUnLFxuICAgICAgeW91dHViZVBsYWNlQXR0cmlidXRlOiAnZGF0YS1tb2RhbC15b3V0dWJlLXBsYWNlJyxcbiAgICAgIHNldEF1dG9wbGF5WW91dHViZTogdHJ1ZSxcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgbW9kYWw6ICdtb2RhbCcsXG4gICAgICAgIC8vIG1vZGFsV3JhcHBlcjogJ21vZGFsX193cmFwcGVyJyxcbiAgICAgICAgbW9kYWxDb250ZW50OiAnbW9kYWxfX2NvbnRlbnQnLFxuICAgICAgICBtb2RhbEFjdGl2ZTogJ21vZGFsX3Nob3cnLFxuICAgICAgICBib2R5QWN0aXZlOiAnbW9kYWwtc2hvdycsXG4gICAgICB9LFxuICAgICAgZm9jdXNDYXRjaDogdHJ1ZSxcbiAgICAgIGNsb3NlRXNjOiB0cnVlLFxuICAgICAgYm9keUxvY2s6IHRydWUsXG4gICAgICBoYXNoU2V0dGluZ3M6IHtcbiAgICAgICAgbG9jYXRpb246IHRydWUsXG4gICAgICAgIGdvSGFzaDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYWZ0ZXJPcGVuOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYmVmb3JlQ2xvc2U6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLnlvdVR1YmVDb2RlO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy50YXJnZXRPcGVuID0ge1xuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgZWxlbWVudDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnByZXZpb3VzT3BlbiA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5sYXN0Q2xvc2VkID0ge1xuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgZWxlbWVudDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLl9kYXRhVmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLmhhc2ggPSBmYWxzZTtcblxuICAgIHRoaXMuX3Jlb3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5sYXN0Rm9jdXNFbCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZvY3VzRWwgPSBbXG4gICAgICAnYVtocmVmXScsXG4gICAgICAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdidXR0b246bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ2FyZWFbaHJlZl0nLFxuICAgICAgJ2lmcmFtZScsXG4gICAgICAnb2JqZWN0JyxcbiAgICAgICdlbWJlZCcsXG4gICAgICAnW2NvbnRlbnRlZGl0YWJsZV0nLFxuICAgICAgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKScsXG4gICAgXTtcbiAgICAvL3RoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAuLi5jb25maWcsXG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAuLi5jb25maWcuY2xhc3NlcyxcbiAgICAgICAgLi4ub3B0aW9ucz8uY2xhc3NlcyxcbiAgICAgIH0sXG4gICAgICBoYXNoU2V0dGluZ3M6IHtcbiAgICAgICAgLi4uY29uZmlnLmhhc2hTZXR0aW5ncyxcbiAgICAgICAgLi4ub3B0aW9ucz8uaGFzaFNldHRpbmdzLFxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIC4uLmNvbmZpZy5vbixcbiAgICAgICAgLi4ub3B0aW9ucz8ub24sXG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy5ib2R5TG9jayA9IGZhbHNlO1xuICAgIHRoaXMub3B0aW9ucy5pbml0ID8gdGhpcy5pbml0bW9kYWxzKCkgOiBudWxsO1xuICB9XG4gIGluaXRtb2RhbHMoKSB7XG4gICAgdGhpcy5ldmVudHNtb2RhbCgpO1xuICB9XG4gIGV2ZW50c21vZGFsKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uT3BlbiA9IGUudGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufV1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChidXR0b25PcGVuKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuX2RhdGFWYWx1ZSA9IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b25cbiAgICAgICAgICApXG4gICAgICAgICAgICA/IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9uKVxuICAgICAgICAgICAgOiAnZXJyb3InO1xuICAgICAgICAgIHRoaXMueW91VHViZUNvZGUgPSBidXR0b25PcGVuLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy55b3V0dWJlQXR0cmlidXRlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgPyBidXR0b25PcGVuLmdldEF0dHJpYnV0ZSh0aGlzLm9wdGlvbnMueW91dHViZUF0dHJpYnV0ZSlcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICBpZiAodGhpcy5fZGF0YVZhbHVlICE9PSAnZXJyb3InKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB0aGlzLmxhc3RGb2N1c0VsID0gYnV0dG9uT3BlbjtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvciA9IGAke3RoaXMuX2RhdGFWYWx1ZX1gO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBidXR0b25DbG9zZSA9IGUudGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVDbG9zZUJ1dHRvbn1dYFxuICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoJyN1bmNvbmZpcm1lZEFnZU1vZGFsJykgJiZcbiAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdCgnI2NvbmZpcm1BZ2VNb2RhbCcpICYmXG4gICAgICAgICAgKGJ1dHRvbkNsb3NlIHx8XG4gICAgICAgICAgICAoIWUudGFyZ2V0LmNsb3Nlc3QoYC4ke3RoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQ29udGVudH1gKSAmJlxuICAgICAgICAgICAgICB0aGlzLmlzT3BlbikpXG4gICAgICAgICkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAna2V5ZG93bicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmNsb3NlRXNjICYmXG4gICAgICAgICAgZS53aGljaCA9PSAyNyAmJlxuICAgICAgICAgIGUuY29kZSA9PT0gJ0VzY2FwZScgJiZcbiAgICAgICAgICB0aGlzLmlzT3BlblxuICAgICAgICApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZvY3VzQ2F0Y2ggJiYgZS53aGljaCA9PSA5ICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgdGhpcy5fZm9jdXNDYXRjaChlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmhhc2hTZXR0aW5ncy5nb0hhc2gpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnaGFzaGNoYW5nZScsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMuX29wZW5Ub0hhc2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2xvYWQnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuVG9IYXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIG9wZW4oc2VsZWN0b3JWYWx1ZSkge1xuICAgIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgICAgdGhpcy5ib2R5TG9jayA9XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2snKSAmJiAhdGhpcy5pc09wZW5cbiAgICAgICAgICA/IHRydWVcbiAgICAgICAgICA6IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdG9yVmFsdWUgJiZcbiAgICAgICAgdHlwZW9mIHNlbGVjdG9yVmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIHNlbGVjdG9yVmFsdWUudHJpbSgpICE9PSAnJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvciA9IHNlbGVjdG9yVmFsdWU7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5fcmVvcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rvck9wZW4pXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvciA9IHRoaXMubGFzdENsb3NlZC5zZWxlY3RvcjtcbiAgICAgIGlmICghdGhpcy5fcmVvcGVuKSB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy50YXJnZXRPcGVuLmVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueW91VHViZUNvZGUpIHtcbiAgICAgICAgICBjb25zdCBjb2RlVmlkZW8gPSB0aGlzLnlvdVR1YmVDb2RlO1xuICAgICAgICAgIGNvbnN0IHVybFZpZGVvID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7Y29kZVZpZGVvfT9yZWw9MCZzaG93aW5mbz0wJmF1dG9wbGF5PTFgO1xuICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcblxuICAgICAgICAgIGNvbnN0IGF1dG9wbGF5ID0gdGhpcy5vcHRpb25zLnNldEF1dG9wbGF5WW91dHViZSA/ICdhdXRvcGxheTsnIDogJyc7XG4gICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3cnLCBgJHthdXRvcGxheX07IGVuY3J5cHRlZC1tZWRpYWApO1xuXG4gICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsVmlkZW8pO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB5b3V0dWJlUGxhY2UgPSB0aGlzLnRhcmdldE9wZW4uZWxlbWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm1vZGFsX190ZXh0JylcbiAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZShgJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfWAsICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gKVxuICAgICAgICAgICAgLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MubG9jYXRpb24pIHtcbiAgICAgICAgICB0aGlzLl9nZXRIYXNoKCk7XG4gICAgICAgICAgdGhpcy5fc2V0SGFzaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLm9uLmJlZm9yZU9wZW4odGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdiZWZvcmVtb2RhbE9wZW4nLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbEFjdGl2ZSk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5jbGFzc2VzLmJvZHlBY3RpdmUpO1xuXG4gICAgICAgIGlmICghdGhpcy5fcmVvcGVuKSB7XG4gICAgICAgICAgY29uc3QgbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5oYXNoKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICghdGhpcy5ib2R5TG9jayAmJiAhbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYmwtbW9iaWxlJykpIHx8XG4gICAgICAgICAgICAoIXRoaXMuYm9keUxvY2sgJiZcbiAgICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGggPD0gNzY4ICYmXG4gICAgICAgICAgICAgIG0uaGFzQXR0cmlidXRlKCdkYXRhLWJsLW1vYmlsZScpKVxuICAgICAgICAgICAgICA/IGJvZHlMb2NrKClcbiAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9IGVsc2UgdGhpcy5fcmVvcGVuID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yID0gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yO1xuICAgICAgICB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50ID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzVHJhcCgpO1xuICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLm9uLmFmdGVyT3Blbih0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2FmdGVybW9kYWxPcGVuJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjbG9zZShzZWxlY3RvclZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgc2VsZWN0b3JWYWx1ZSAmJlxuICAgICAgdHlwZW9mIHNlbGVjdG9yVmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICBzZWxlY3RvclZhbHVlLnRyaW0oKSAhPT0gJydcbiAgICApIHtcbiAgICAgIHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yID0gc2VsZWN0b3JWYWx1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzT3BlbiB8fCAhYm9keUxvY2tTdGF0dXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zLm9uLmJlZm9yZUNsb3NlKHRoaXMpO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2JlZm9yZW1vZGFsQ2xvc2UnLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMueW91VHViZUNvZGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICApXG4gICAgICApXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgKS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgdGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxBY3RpdmVcbiAgICApO1xuICAgIC8vIGFyaWEtaGlkZGVuXG4gICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBpZiAoIXRoaXMuX3Jlb3Blbikge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgIHRoaXMub3B0aW9ucy5jbGFzc2VzLmJvZHlBY3RpdmVcbiAgICAgICk7XG4gICAgICAhdGhpcy5ib2R5TG9jayA/IGJvZHlVbmxvY2soKSA6IG51bGw7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVIYXNoKCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdG9yT3Blbikge1xuICAgICAgdGhpcy5sYXN0Q2xvc2VkLnNlbGVjdG9yID0gdGhpcy5wcmV2aW91c09wZW4uc2VsZWN0b3I7XG4gICAgICB0aGlzLmxhc3RDbG9zZWQuZWxlbWVudCA9IHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucy5vbi5hZnRlckNsb3NlKHRoaXMpO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2FmdGVybW9kYWxDbG9zZScsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2ZvY3VzVHJhcCgpO1xuICAgIH0sIDUwKTtcbiAgfVxuICBfZ2V0SGFzaCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmhhc2hTZXR0aW5ncy5sb2NhdGlvbikge1xuICAgICAgdGhpcy5oYXNoID0gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yLmluY2x1ZGVzKCcjJylcbiAgICAgICAgPyB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3JcbiAgICAgICAgOiB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IucmVwbGFjZSgnLicsICcjJyk7XG4gICAgfVxuICB9XG4gIF9vcGVuVG9IYXNoKCkge1xuICAgIGxldCBjbGFzc0luSGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKX1gXG4gICAgKVxuICAgICAgPyBgLiR7d2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKX1gXG4gICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7d2luZG93LmxvY2F0aW9uLmhhc2h9YClcbiAgICAgID8gYCR7d2luZG93LmxvY2F0aW9uLmhhc2h9YFxuICAgICAgOiBudWxsO1xuXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259ID0gXCIke2NsYXNzSW5IYXNofVwiXWBcbiAgICApXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaH1cIl1gXG4gICAgICAgIClcbiAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259ID0gXCIke2NsYXNzSW5IYXNoLnJlcGxhY2UoXG4gICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAnIydcbiAgICAgICAgICApfVwiXWBcbiAgICAgICAgKTtcbiAgICBpZiAoYnV0dG9ucyAmJiBjbGFzc0luSGFzaCkgdGhpcy5vcGVuKGNsYXNzSW5IYXNoKTtcbiAgfVxuICBfc2V0SGFzaCgpIHtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHRoaXMuaGFzaCk7XG4gIH1cbiAgX3JlbW92ZUhhc2goKSB7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdKTtcbiAgfVxuICBfZm9jdXNDYXRjaChlKSB7XG4gICAgY29uc3QgZm9jdXNhYmxlID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c0VsKTtcbiAgICBjb25zdCBmb2N1c0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlKTtcbiAgICBjb25zdCBmb2N1c2VkSW5kZXggPSBmb2N1c0FycmF5LmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICBpZiAoZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IDApIHtcbiAgICAgIGZvY3VzQXJyYXlbZm9jdXNBcnJheS5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSBmb2N1c0FycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGZvY3VzQXJyYXlbMF0uZm9jdXMoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgX2ZvY3VzVHJhcCgpIHtcbiAgICBjb25zdCBmb2N1c2FibGUgPSB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbCk7XG4gICAgaWYgKCF0aGlzLmlzT3BlbiAmJiB0aGlzLmxhc3RGb2N1c0VsKSB7XG4gICAgICB0aGlzLmxhc3RGb2N1c0VsLmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvY3VzYWJsZVswXS5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGVzLm1vZGFsID0gbmV3IE1vZGFsKHt9KTtcbiIsImltcG9ydCB7IHNldEhhc2gsIGdldEhhc2ggfSBmcm9tICcuL3V0aWxzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgVGFicyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICBUQUJTOiAnZGF0YS10YWJzJyxcbiAgICAgIElOREVYOiAnZGF0YS10YWJzLWluZGV4JyxcbiAgICAgIFRJVExFUzogJ2RhdGEtdGFicy10aXRsZXMnLFxuICAgICAgVElUTEU6ICdkYXRhLXRhYnMtdGl0bGUnLFxuICAgICAgVEFCX0lURU06ICdkYXRhLXRhYnMtaXRlbScsXG4gICAgICBCT0RZOiAnZGF0YS10YWJzLWJvZHknLFxuICAgICAgSEFTSDogJ2RhdGEtdGFicy1oYXNoJyxcbiAgICB9O1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIElOSVQ6ICdfdGFicy1pbml0JyxcbiAgICAgIEFDVElWRTogJ19pcy1hY3RpdmUnLFxuICAgICAgTU9EQUw6ICdtb2RhbCcsXG4gICAgfTtcbiAgICB0aGlzLnRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS10YWJzXWApO1xuICAgIHRoaXMuYWN0aXZlSGFzaCA9IFtdO1xuXG4gICAgaWYgKHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc2ggPSBnZXRIYXNoKCk7XG5cbiAgICAgIGlmIChoYXNoICYmIGhhc2guc3RhcnRzV2l0aCgndGFiLScpKSB7XG4gICAgICAgIGFjdGl2ZUhhc2ggPSBoYXNoLnJlcGxhY2UoJ3RhYi0nLCAnJykuc3BsaXQoJy0nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYnNCbG9jaywgaW5kZXgpID0+IHtcbiAgICAgICAgdGFic0Jsb2NrLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklOSVQpO1xuICAgICAgICB0YWJzQmxvY2suc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuSU5ERVgsIGluZGV4KTtcbiAgICAgICAgdGFic0Jsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRBY3Rpb25zLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmluaXQodGFic0Jsb2NrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXR1cyh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVEFCX0lURU19XWApO1xuICAgIGNvbnN0IGluZGV4ID0gdGFic0Jsb2NrLmRhdGFzZXQudGFic0luZGV4O1xuXG4gICAgaWYgKGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICBjb25zdCBoYXNIYXNoID0gdGFic0Jsb2NrLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkhBU0gpO1xuXG4gICAgICBjb250ZW50ID0gQXJyYXkuZnJvbShjb250ZW50KS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIGNvbnRlbnQuZm9yRWFjaCgoaXRlbSwgaW5keCkgPT4ge1xuICAgICAgICBpZiAodGl0bGVzW2luZHhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoaGFzSGFzaCAmJiAhaXRlbS5jbG9zZXN0KGAuJHt0aGlzLmNsYXNzZXMuTU9EQUx9YCkpIHtcbiAgICAgICAgICAgIHNldEhhc2goYHRhYi0ke2luZGV4fS0ke2luZHh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aW9ucyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRJVExFfV1gKTtcbiAgICAgIGNvbnN0IHRhYnNCbG9jayA9IHRpdGxlLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCk7XG5cbiAgICAgIGlmICghdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgIGxldCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIGBbJHt0aGlzLmF0dHJzLlRJVExFfV0uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICAgKTtcblxuICAgICAgICBhY3RpdmVUaXRsZS5sZW5ndGhcbiAgICAgICAgICA/IChhY3RpdmVUaXRsZSA9IEFycmF5LmZyb20oYWN0aXZlVGl0bGUpLmZpbHRlcihcbiAgICAgICAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgICAgICAgKSlcbiAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gYWN0aXZlVGl0bGVbMF0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuQUNUSVZFKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModGFic0Jsb2NrKTtcbiAgICAgIH1cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQodGFic0Jsb2NrKSB7XG4gICAgbGV0IHRpdGxlcyA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLlRJVExFU31dPipgKTtcbiAgICBsZXQgY29udGVudCA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLkJPRFl9XT4qYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG4gICAgY29uc3QgYWN0aXZlSGFzaEJsb2NrID0gdGhpcy5hY3RpdmVIYXNoWzBdID09IGluZGV4O1xuXG4gICAgaWYgKGFjdGl2ZUhhc2hCbG9jaykge1xuICAgICAgY29uc3QgYWN0aXZlVGl0bGUgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEVTfV0+LiR7dGhpcy5jbGFzc2VzLkFDVElWRX1gXG4gICAgICApO1xuICAgICAgYWN0aXZlVGl0bGUgPyBhY3RpdmVUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpIDogbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIGNvbnRlbnQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGl0bGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5USVRMRSwgJycpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRBQl9JVEVNLCAnJyk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZUhhc2hCbG9jayAmJiBpbmRleCA9PSB0aGlzLmFjdGl2ZUhhc2hbMV0pIHtcbiAgICAgICAgICB0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5oaWRkZW4gPSAhdGl0bGVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IFRhYnMoKTtcbiIsIi8qKlxuICogc2V0IGhhc2ggdG8gdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICovXG5leHBvcnQgY29uc3Qgc2V0SGFzaCA9IGhhc2ggPT4ge1xuICBoYXNoID0gaGFzaCA/IGAjJHtoYXNofWAgOiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdO1xuICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIGhhc2gpO1xufTtcblxuLyoqXG4gKiBnZXQgaGFzaCBmcm9tIHVybFxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRIYXNoID0gKCkgPT4ge1xuICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgIHJldHVybiBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW5pdGlhbGl6ZXMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVJbml0ID0gKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGJvZHlMb2NrU3RhdHVzICYmIGUudGFyZ2V0LmNsb3Nlc3QoJy5oYW1idXJnZXInKSkge1xuICAgICAgICBtZW51T3BlbigpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgYm9keUxvY2tTdGF0dXMgJiZcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnX21lbnUtb3BlbmVkJykgJiZcbiAgICAgICAgKGUudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19jbG9zZS1idG4nKSB8fCAhZS50YXJnZXQuY2xvc2VzdCgnLm1lbnUnKSlcbiAgICAgICkge1xuICAgICAgICBtZW51Q2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbi8qKlxuICogb3BlbnMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICBib2R5TG9jaygpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnX21lbnUtb3BlbmVkJyk7XG59O1xuLyoqXG4gKiBjbG9zZXMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVDbG9zZSA9ICgpID0+IHtcbiAgYm9keVVubG9jaygpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnX21lbnUtb3BlbmVkJyk7XG59O1xuXG4vLyBib2R5IGxvY2tcbmV4cG9ydCBsZXQgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xuLyoqXG4gKiB0b2dnbGVzIGJvZHkgbG9ja1xuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBib2R5TG9ja1RvZ2dsZSA9IChkZWxheSA9IDUwMCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9jaycpKSB7XG4gICAgYm9keVVubG9jayhkZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgYm9keUxvY2soZGVsYXkpO1xuICB9XG59O1xuLyoqXG4gKiB1bmxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keVVubG9jayA9IChkZWxheSA9IDUwMCkgPT4ge1xuICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2NrJyk7XG4gICAgfSwgZGVsYXkpO1xuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuLyoqXG4gKiBsb2NrcyBib2R5XG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2NrJyk7XG5cbiAgICBib2R5TG9ja1N0YXR1cyA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xuICAgIH0sIGRlbGF5KTtcbiAgfVxufTtcblxuLyoqXG4gKiBtYWtlIHRoZSBhcnJheSB1bmlxdWVcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQXJyYXkoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICByZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcbiAgfSk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gZGF0YVNldFZhbHVlXG4gKiBwcm9jZXNzIG1lZGlhIHJlcXVlc3RzIGZyb20gYXR0cmlidXRlc1xuICovXG5leHBvcnQgY29uc3QgZGF0YU1lZGlhUXVlcmllcyA9IChhcnJheSwgZGF0YVNldFZhbHVlKSA9PiB7XG4gIC8vIGdldCBvYmplY3RzIHdpdGggbWVkaWEgcXVlcmllc1xuICBjb25zdCBtZWRpYSA9IEFycmF5LmZyb20oYXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICBpZiAoaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV0pIHtcbiAgICAgIHJldHVybiBpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXS5zcGxpdCgnLCcpWzBdO1xuICAgIH1cbiAgfSk7XG4gIC8vIG9iamVjdHMgd2l0aCBtZWRpYSBxdWVyaWVzIGluaXRpYWxpemF0aW9uXG4gIGlmIChtZWRpYS5sZW5ndGgpIHtcbiAgICBjb25zdCBicmVha3BvaW50c0FycmF5ID0gW107XG4gICAgbWVkaWEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGl0ZW0uZGF0YXNldFtkYXRhU2V0VmFsdWVdO1xuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHt9O1xuICAgICAgY29uc3QgcGFyYW1zQXJyYXkgPSBwYXJhbXMuc3BsaXQoJywnKTtcbiAgICAgIGJyZWFrcG9pbnQudmFsdWUgPSBwYXJhbXNBcnJheVswXTtcbiAgICAgIGJyZWFrcG9pbnQudHlwZSA9IHBhcmFtc0FycmF5WzFdID8gcGFyYW1zQXJyYXlbMV0udHJpbSgpIDogJ21heCc7XG4gICAgICBicmVha3BvaW50Lml0ZW0gPSBpdGVtO1xuICAgICAgYnJlYWtwb2ludHNBcnJheS5wdXNoKGJyZWFrcG9pbnQpO1xuICAgIH0pO1xuICAgIC8vIGdldCB1bmlxdWUgYnJlYWtwb2ludHNcbiAgICBsZXQgbWRRdWVyaWVzID0gYnJlYWtwb2ludHNBcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICcoJyArXG4gICAgICAgIGl0ZW0udHlwZSArXG4gICAgICAgICctd2lkdGg6ICcgK1xuICAgICAgICBpdGVtLnZhbHVlICtcbiAgICAgICAgJ3B4KSwnICtcbiAgICAgICAgaXRlbS52YWx1ZSArXG4gICAgICAgICcsJyArXG4gICAgICAgIGl0ZW0udHlwZVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBtZFF1ZXJpZXMgPSB1bmlxdWVBcnJheShtZFF1ZXJpZXMpO1xuICAgIGNvbnN0IG1kUXVlcmllc0FycmF5ID0gW107XG5cbiAgICBpZiAobWRRdWVyaWVzLmxlbmd0aCkge1xuICAgICAgLy8gd29yayB3aXRoIGV2ZXJ5IGJyZWFrcG9pbnRcbiAgICAgIG1kUXVlcmllcy5mb3JFYWNoKGJyZWFrcG9pbnQgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXNBcnJheSA9IGJyZWFrcG9pbnQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgbWVkaWFCcmVha3BvaW50ID0gcGFyYW1zQXJyYXlbMV07XG4gICAgICAgIGNvbnN0IG1lZGlhVHlwZSA9IHBhcmFtc0FycmF5WzJdO1xuICAgICAgICBjb25zdCBtYXRjaE1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEocGFyYW1zQXJyYXlbMF0pO1xuICAgICAgICAvLyBvYmplY3RzIHdpdGggY29uZGl0aW9uc1xuICAgICAgICBjb25zdCBpdGVtc0FycmF5ID0gYnJlYWtwb2ludHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gbWVkaWFCcmVha3BvaW50ICYmIGl0ZW0udHlwZSA9PT0gbWVkaWFUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtZFF1ZXJpZXNBcnJheS5wdXNoKHtcbiAgICAgICAgICBpdGVtc0FycmF5LFxuICAgICAgICAgIG1hdGNoTWVkaWEsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWRRdWVyaWVzQXJyYXk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyB1cFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd21vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVVwID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDAsIHNob3dtb3JlID0gMCkgPT4ge1xuICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHNob3dtb3JlID8gYCR7c2hvd21vcmV9cmVtYCA6IGAwYDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ1RvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRhcmdldC5oaWRkZW4gPSAhc2hvd21vcmUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAhc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpIDogbnVsbDtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XG4gICAgICAhc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93JykgOiBudWxsO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZVVwRG9uZScsIHtcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sIGR1cmF0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbW9vdGhseSBzbGlkZXMgZG93blxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd21vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZURvd24gPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgdGFyZ2V0LmhpZGRlbiA9IHRhcmdldC5oaWRkZW4gPyBmYWxzZSA6IG51bGw7XG4gICAgc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpIDogbnVsbDtcbiAgICBsZXQgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1yZW1gIDogYDBgO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XG4gICAgICAvLyBjcmVhdGUgZXZlbnRcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2xpZGVEb3duRG9uZScsIHtcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sIGR1cmF0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiB0b2dnbGVzIHNtb290aCBzbGlkZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEByZXR1cm5zIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBfc2xpZGVUb2dnbGUgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xuICBpZiAodGFyZ2V0LmhpZGRlbikge1xuICAgIHJldHVybiBfc2xpZGVEb3duKHRhcmdldCwgZHVyYXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfc2xpZGVVcCh0YXJnZXQsIGR1cmF0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBjb252ZXJ0cyByZW0gdG8gcGl4ZWxzXG4gKiBAcGFyYW0ge251bWJlcn0gcmVtVmFsdWVcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtVG9QeChyZW1WYWx1ZSkge1xuICBjb25zdCBodG1sRm9udFNpemUgPSBwYXJzZUZsb2F0KFxuICAgIGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5mb250U2l6ZVxuICApO1xuXG4gIGNvbnN0IHB4VmFsdWUgPSByZW1WYWx1ZSAqIGh0bWxGb250U2l6ZTtcblxuICByZXR1cm4gTWF0aC5yb3VuZChweFZhbHVlKSArICdweCc7XG59XG5cbi8vIHJlbW92ZSBjbGFzcyBmcm9tIGFsbCBhcnJheSBlbGVtZW50c1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNsYXNzZXMgPSAoYXJyYXksIGNsYXNzTmFtZSkgPT4ge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXlbaV0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG59O1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEAzMDA7NDAwOzUwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8rQ29uZGVuc2VkOml0YWwsd2dodEAwLDEwMC4uOTAwOzEsMTAwLi45MDAmZmFtaWx5PVJvYm90bzp3Z2h0QDQwMDs1MDA7NzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3ktUmVndWxhci53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3ktTWVkaXVtLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiR2lscm95XCI7XG4gIHNyYzogdXJsKFwiLi4vYXNzZXRzL2ZvbnRzL0dpbHJveS1Cb2xkLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sLFxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XG59XG5cbmh0bWwge1xuICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgZm9udC1zaXplOiAwLjUyMDgzMzV2dztcbn1cblxuYm9keSB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgY29sb3I6ICMxZTFlMWU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbmlucHV0LFxudGV4dGFyZWEge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgbWFyZ2luOiAwO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG5idXR0b24sXG5pbnB1dCxcbmEsXG50ZXh0YXJlYSB7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbmJ1dHRvbjpmb2N1cyxcbmlucHV0OmZvY3VzLFxuYTpmb2N1cyxcbnRleHRhcmVhOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cbmJ1dHRvbjphY3RpdmUsXG5pbnB1dDphY3RpdmUsXG5hOmFjdGl2ZSxcbnRleHRhcmVhOmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbmEge1xuICBjb2xvcjogdW5zZXQ7XG59XG5cbmEsXG5hOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuYnV0dG9uIHtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250OiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBpbmhlcml0O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbnVsLFxudWwgbGkge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbnVsIGxpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBmb250OiBpbmhlcml0O1xufVxuXG4uY29udGFpbmVyIHtcbiAgd2lkdGg6IDE3MnJlbTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5odG1sLmxvY2sge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG59XG5cbmh0bWwsXG5ib2R5IHtcbiAgb3ZlcmZsb3cteDogY2xpcDtcbn1cblxubWFpbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi53cmFwcGVyIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1heC13aWR0aDogMTkyMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5oIHtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvIENvbmRlbnNlZFwiO1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmhfaDEge1xuICBmb250LXNpemU6IDQuOHJlbTtcbiAgbGluZS1oZWlnaHQ6IDUuNnJlbTtcbn1cbi5oX2gyIHtcbiAgZm9udC1zaXplOiAyLjhyZW07XG4gIGxpbmUtaGVpZ2h0OiAzLjNyZW07XG59XG4uaF9sYXJnZSB7XG4gIGZvbnQtc2l6ZTogMjFyZW07XG4gIGxpbmUtaGVpZ2h0OiAyNC42cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLnR4dDIwIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi4zcmVtO1xufVxuXG4udHh0MTgge1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuMXJlbTtcbn1cblxuLmZ3LWxpZ2h0IHtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbn1cblxuLmJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmJ0bl9wcmltYXJ5IHtcbiAgcGFkZGluZzogMS42cmVtIDMuMnJlbTtcbiAgaGVpZ2h0OiA1LjFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDEwcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGEyNTFlO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZTtcbn1cbi5idG5fcHJpbWFyeSAuYnRuX190eHQge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuOXJlbTtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG4uYnRuX3NlY29uZGFyeSB7XG4gIHBhZGRpbmc6IDEwcmVtIDMuMnJlbSAzLjJyZW07XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICB3aWR0aDogMjUuMnJlbTtcbiAgaGVpZ2h0OiAyNS4ycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGEyNTFlO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG4uYnRuX3NlY29uZGFyeSAuYnRuX190eHQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuM3JlbTtcbiAgY29sb3I6ICNkYTI1MWU7XG59XG4uYnRuX3NlY29uZGFyeSAuYnRuX190eHQ6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0wLjhyZW07XG4gIGxlZnQ6IDEwMCU7XG4gIHdpZHRoOiA1LjRyZW07XG4gIGhlaWdodDogMS44cmVtO1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYXJyLXJlZC5zdmdcIikgY2VudGVyL2NvbnRhaW4gbm8tcmVwZWF0O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSwgMTAwJSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UsIGxlZnQgMC41cyBlYXNlO1xufVxuLmJ0bl9fdHh0IHtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvIENvbmRlbnNlZFwiO1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uaS1idG4ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA2cmVtO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkYTI1MWU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbi5pLWJ0bl9iZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbn1cbi5pLWJ0biBzdmcge1xuICB3aWR0aDogM3JlbTtcbn1cbi5pLWJ0bl9hcnItbmV4dC5faGFzLWhvdmVyIHN2ZywgLmktYnRuX2Fyci1wcmV2Ll9oYXMtaG92ZXIgc3ZnIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZTtcbn1cblxuaW5wdXRbdHlwZT10ZXh0XSxcbmlucHV0W3R5cGU9ZW1haWxdLFxuaW5wdXRbdHlwZT10ZWxdLFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cblxudGV4dGFyZWE6Zm9jdXMsXG5pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5pbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjNyZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWFhYWFhO1xuICB0cmFuc2l0aW9uOiBib3JkZXItYm90dG9tIDAuNXMgZWFzZTtcbn1cbi5pbnB1dF9fZmllbGQ6OnBsYWNlaG9sZGVyIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi4zcmVtO1xuICBjb2xvcjogI2FhYWFhYTtcbn1cbi5pbnB1dC5faXMtZmlsbGVkIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxZTFlMWU7XG59XG4uaW5wdXQuX2hhcy1lcnJvciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGEyNTFlO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICBjb2xvcjogIzFlMWUxZTtcbn1cbi5pbnB1dC5faGFzLWVycm9yOjphZnRlciB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvIENvbmRlbnNlZFwiO1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNnJlbTtcbiAgY29sb3I6ICNkYTI1MWU7XG59XG5cbi50YWJzX19uYXZpZ2F0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMS44cmVtO1xufVxuLnRhYnNfX2JvZHkge1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbn1cblxuLnRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6ICNhYWFhYWE7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZSwgcGFkZGluZy1sZWZ0IDAuM3MgZWFzZTtcbn1cbi50YWIuX2lzLWFjdGl2ZSB7XG4gIHBhZGRpbmctbGVmdDogMy40cmVtO1xuICBjb2xvcjogI2RhMjUxZTtcbn1cbi50YWIuX2lzLWFjdGl2ZTo6YmVmb3JlIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cbi50YWI6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjhyZW07XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxLjhyZW07XG4gIGhlaWdodDogMS44cmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkYTI1MWU7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2U7XG59XG4udGFiX190eHQge1xuICBmb250LWZhbWlseTogXCJSb2JvdG8gQ29uZGVuc2VkXCI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMi44cmVtO1xuICBsaW5lLWhlaWdodDogMy4zcmVtO1xufVxuQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSBhbmQgKG1pbi13aWR0aDogNDhlbSl7XG4gIC5idG5fc2Vjb25kYXJ5OmhvdmVyIC5idG5fX3R4dDo6YWZ0ZXIge1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAxMDAlKTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCl7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDVweDtcbiAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xuICAgIGZvbnQtc2l6ZTogMS4zMzMzMzMzMzMzdnc7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xuICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogbm9uZTtcbiAgfVxuICAuY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAwIDJyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmhfaDEge1xuICAgIGZvbnQtc2l6ZTogNS4ycmVtO1xuICAgIGxpbmUtaGVpZ2h0OiA2cmVtO1xuICB9XG4gIC5oX2gyIHtcbiAgICBmb250LXNpemU6IDRyZW07XG4gICAgbGluZS1oZWlnaHQ6IDQuNnJlbTtcbiAgfVxuICAuaF9sYXJnZSB7XG4gICAgZm9udC1zaXplOiA4LjhyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEwLjRyZW07XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgfVxuICAudHh0MjAge1xuICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAzLjZyZW07XG4gIH1cbiAgLnR4dDE4IHtcbiAgICBmb250LXNpemU6IDMuMnJlbTtcbiAgICBsaW5lLWhlaWdodDogMy44cmVtO1xuICB9XG4gIC5idG5fcHJpbWFyeSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA4LjZyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMjByZW07XG4gIH1cbiAgLmJ0bl9wcmltYXJ5IC5idG5fX3R4dCB7XG4gICAgZm9udC1zaXplOiAzLjJyZW07XG4gICAgbGluZS1oZWlnaHQ6IDMuOHJlbTtcbiAgfVxuICAuYnRuX3NlY29uZGFyeSB7XG4gICAgcGFkZGluZzogMDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDguNnJlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXItcmFkaXVzOiAyMHJlbTtcbiAgfVxuICAuYnRuX3NlY29uZGFyeSAuYnRuX190eHQge1xuICAgIHBhZGRpbmc6IDIuNHJlbSAyMXJlbSAyLjRyZW0gNHJlbTtcbiAgICBmb250LXNpemU6IDMuMnJlbTtcbiAgICBsaW5lLWhlaWdodDogMy44cmVtO1xuICB9XG4gIC5idG5fc2Vjb25kYXJ5IC5idG5fX3R4dDo6YWZ0ZXIge1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IGF1dG87XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDYuNHJlbTtcbiAgICBoZWlnaHQ6IDJyZW07XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTRyZW0sIC01MCUpO1xuICB9XG4gIC5pLWJ0biB7XG4gICAgd2lkdGg6IDExcmVtO1xuICAgIGhlaWdodDogMTFyZW07XG4gIH1cbiAgLmktYnRuIHN2ZyB7XG4gICAgd2lkdGg6IDQuOHJlbTtcbiAgfVxuICAuaW5wdXQge1xuICAgIHBhZGRpbmctYm90dG9tOiAxLjZyZW07XG4gICAgbGluZS1oZWlnaHQ6IDMuNnJlbTtcbiAgfVxuICAuaW5wdXQgLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xuICB9XG4gIC5pbnB1dC5faGFzLWVycm9yOjphZnRlciB7XG4gICAgZm9udC1zaXplOiAyLjRyZW07XG4gICAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcbiAgfVxuICAudGFic19fbmF2aWdhdGlvbiB7XG4gICAgY29sdW1uLWdhcDogMy42cmVtO1xuICB9XG4gIC50YWIuX2lzLWFjdGl2ZSB7XG4gICAgcGFkZGluZy1sZWZ0OiA0LjhyZW07XG4gIH1cbiAgLnRhYjo6YmVmb3JlIHtcbiAgICB0b3A6IDFyZW07XG4gICAgd2lkdGg6IDIuNHJlbTtcbiAgICBoZWlnaHQ6IDIuNHJlbTtcbiAgfVxuICAudGFiX190eHQge1xuICAgIGZvbnQtc2l6ZTogNHJlbTtcbiAgICBsaW5lLWhlaWdodDogNC42cmVtO1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNDhlbSkgYW5kIChhbnktaG92ZXI6IGhvdmVyKXtcbiAgLmJ0bl9zZWNvbmRhcnk6aG92ZXIgLmJ0bl9fdHh0OjphZnRlciB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE0LjZyZW0sIC01MCUpO1xuICB9XG59XG5AbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpe1xuICAuYnRuX3ByaW1hcnk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxZTFlMWU7XG4gIH1cbiAgLmktYnRuX2Fyci1uZXh0Ll9oYXMtaG92ZXI6aG92ZXIuaS1idG5fYXJyLXByZXYgc3ZnLCAuaS1idG5fYXJyLXByZXYuX2hhcy1ob3Zlcjpob3Zlci5pLWJ0bl9hcnItcHJldiBzdmcge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMC44cmVtKTtcbiAgfVxuICAuaS1idG5fYXJyLW5leHQuX2hhcy1ob3Zlcjpob3Zlci5pLWJ0bl9hcnItbmV4dCBzdmcsIC5pLWJ0bl9hcnItcHJldi5faGFzLWhvdmVyOmhvdmVyLmktYnRuX2Fyci1uZXh0IHN2ZyB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuOHJlbSk7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2ZvbnRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3N0eWxlLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3NldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvX3R5cG8uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL19idXR0b25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9faW5wdXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL190YWJzLnNjc3NcIixcIjxubyBzb3VyY2U+XCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQUE7RUFDQSxnRUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNHRjtBREFBO0VBQ0UscUJBQUE7RUFDQSwrREFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNFRjtBRENBO0VBQ0UscUJBQUE7RUFDQSw2REFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNDRjtBQ25CQTs7O0VBR0ksc0JBQUE7QURxQko7O0FDakJBOztFQUVJLFNBQUE7RUFDQSxVQUFBO0VBRUEsWUFBQTtFQUVBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUVBLHFDQUFBO0FEaUJKOztBQ2ZBO0VBQ0kscUJBQUE7RUFDQSxzQkFBQTtBRGtCSjs7QUNoQkE7RUFDSSxlQUFBO0VBRUEsY0R2Qkk7RUN3QkoseUJEekJJO0FBMkNSOztBQ2RBOztFQUVJLFNBQUE7RUFDQSxVQUFBO0VBRUEsWUFBQTtFQUVBLG9CQUFBO0VBRUEsNkJBQUE7RUFDQSxjQUFBO0VBRUEscUNBQUE7QURhSjs7QUNYQTs7RUFFSSxTQUFBO0VBRUEsd0JBQUE7QURhSjs7QUNYQTtFQUNJLDBCQUFBO0FEY0o7O0FDVkE7Ozs7RUFJSSxhQUFBO0VBRUEsYUFBQTtFQUNBLGVBQUE7QURZSjtBQ1ZJOzs7O0VBQ0ksYUFBQTtBRGVSO0FDWkk7Ozs7RUFDSSxhQUFBO0FEaUJSOztBQ1hBO0VBQ0ksWUFBQTtBRGNKOztBQ1pBOztFQUVJLHFCQUFBO0FEZUo7O0FDWkE7RUFDSSxTQUFBO0FEZUo7O0FDWkE7RUFDSSxjQUFBO0VBRUEsV0FBQTtFQUNBLFlBQUE7RUFFQSxtQkFBQTtBRGFKOztBQ1ZBO0VBQ0ksVUFBQTtFQUVBLFlBQUE7RUFFQSxhQUFBO0VBQ0EsbUJBQUE7RUFFQSxjQUFBO0VBQ0EsNkJBQUE7QURVSjs7QUNQQTs7RUFFSSxVQUFBO0VBQ0EsU0FBQTtBRFVKOztBQ1JB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SSxvQ0FBQTtFSGtPdEI7QUF3SEY7QU0vY0E7RUhxQlk7SUFDSSx5QkhsQlI7RUE0UU47RUdsSGtCO0lBQ0ksOEJBQUE7RUhxTnRCO0VHak5rQjtJQUNJLDZCQUFBO0VIbU50QjtBQW1HRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2lscm95XFxcIjtcXG4gIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvR2lscm95LVJlZ3VsYXIud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2lscm95XFxcIjtcXG4gIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvR2lscm95LU1lZGl1bS53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHaWxyb3lcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3ktQm9sZC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblwiLFwiLy8gLS0tLSB2YXJpYWJsZXNcXG5cXG4vLyBjb2xvcnNcXG4kd2hpdGU6ICNmZmZmZmY7XFxuJGJsYWNrOiAjMWUxZTFlO1xcbiRncmF5OiAjYWFhYWFhO1xcbiRyZWQ6ICNkYTI1MWU7XFxuXFxuLy8gLS0tLS0gZm9udHNcXG5cXG4vLyBpbXBvcnRlZCBmb250c1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDMwMDs0MDA7NTAwJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytDb25kZW5zZWQ6aXRhbCx3Z2h0QDAsMTAwLi45MDA7MSwxMDAuLjkwMCZmYW1pbHk9Um9ib3RvOndnaHRANDAwOzUwMDs3MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuLy8gbG9jYWwgZm9udHNcXG5AaW1wb3J0ICcuL2ZvbnRzJztcXG5cXG4vLyAtLS0tLSBiYXNlIHN0eWxlc1xcblxcbi8vIGJhc2Ugc2NzcyBmaWxlXFxuQGltcG9ydCAnLi9zZXQnO1xcblxcbi8vIGh0bWwsIGJvZHlcXG5odG1sLmxvY2sge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0b3VjaC1hY3Rpb246IG5vbmU7XFxufVxcbmh0bWwsXFxuYm9keSB7XFxuICAgIG92ZXJmbG93LXg6IGNsaXA7XFxufVxcblxcbi8vIG1haW5cXG5tYWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICBmbGV4OiAxIDEgYXV0bztcXG59XFxuXFxuLy8gd3JhcHBlclxcbi53cmFwcGVyIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICAgIG1heC13aWR0aDogMTkyMHB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi8vIC0tLS0tIGltcG9ydHNcXG5cXG4vLyBoZWFkZXIgLyBmb290ZXJcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2hlYWRlcic7XFxuQGltcG9ydCAnLi9zZWN0aW9ucy9mb290ZXInO1xcblxcbi8vIHVpXFxuQGltcG9ydCAnLi4vdWkvdWknO1xcblwiLFwiKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vLyBodG1sLCBib2R5XFxuaHRtbCxcXG5ib2R5IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcblxcbiAgICBoZWlnaHQ6IDEwMCU7XFxuXFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcXG5cXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcXG59XFxuaHRtbCB7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gICAgZm9udC1zaXplOiAwLjUyMDgzMzV2dztcXG59XFxuYm9keSB7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG5cXG4gICAgY29sb3I6ICRibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbn1cXG5cXG4vLyBpbnB1dCwgdGV4dGFyZWFcXG5pbnB1dCxcXG50ZXh0YXJlYSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG5cXG4gICAgYm9yZGVyOiBub25lO1xcblxcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcblxcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbn1cXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICAgIG1hcmdpbjogMDtcXG5cXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5pbnB1dFt0eXBlPSdudW1iZXInXSB7XFxuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbn1cXG5cXG4vLyByZW1vdmUgb3V0bGluZVxcbmJ1dHRvbixcXG5pbnB1dCxcXG5hLFxcbnRleHRhcmVhIHtcXG4gICAgZm9udDogaW5oZXJpdDtcXG5cXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcblxcbiAgICAmOmZvY3VzIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgJjphY3RpdmUge1xcbiAgICAgICAgb3V0bGluZTogbm9uZTtcXG4gICAgfVxcbn1cXG5cXG4vLyAtLS0tLVxcblxcbmEge1xcbiAgICBjb2xvcjogdW5zZXQ7XFxufVxcbmEsXFxuYTpob3ZlciB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxucCB7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuaW1nIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuXFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuXFxuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDA7XFxuXFxuICAgIGJvcmRlcjogbm9uZTtcXG5cXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgdGV4dC1hbGlnbjogaW5oZXJpdDtcXG5cXG4gICAgY29sb3I6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG51bCxcXG51bCBsaSB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG59XFxudWwgbGkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG5cXG4gICAgZm9udDogaW5oZXJpdDtcXG59XFxuXFxuLy8gLS0tLS0gY29udGFpbmVyXFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxNzJyZW07XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbn1cXG5cXG4vLyAtLS0tLSBtZWRpYSBxdWVyaWVzXFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgaHRtbCB7XFxuICAgICAgICBmb250LXNpemU6IDVweDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS41NjI1dnc7XFxuICAgICAgICBmb250LXNpemU6IGNhbGMoKDEwMCAvIDM3NSkgKiA1dncpO1xcblxcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuICAgIGJvZHkge1xcbiAgICAgICAgZm9udC1zaXplOiAzLjJyZW07XFxuXFxuICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgLmNvbnRhaW5lciB7XFxuICAgICAgICBwYWRkaW5nOiAwIDJyZW07XFxuXFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTkyMHB4KSB7XFxuICAgIGh0bWwge1xcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xcbiAgICB9XFxufVxcblwiLFwiLmgge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8gQ29uZGVuc2VkXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcblxcbiAgJl9oMSB7XFxuICAgIGZvbnQtc2l6ZTogNC44cmVtO1xcbiAgICBsaW5lLWhlaWdodDogNS42cmVtO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIGZvbnQtc2l6ZTogNS4ycmVtO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiA2cmVtO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX2gyIHtcXG4gICAgZm9udC1zaXplOiAyLjhyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAzLjNyZW07XFxuXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiA0LjZyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfbGFyZ2Uge1xcbiAgICBmb250LXNpemU6IDIxcmVtO1xcbiAgICBsaW5lLWhlaWdodDogMjQuNnJlbTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgZm9udC1zaXplOiA4LjhyZW07XFxuICAgICAgbGluZS1oZWlnaHQ6IDEwLjRyZW07XFxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4udHh0MjAge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgbGluZS1oZWlnaHQ6IDIuM3JlbTtcXG5cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xcbiAgICBsaW5lLWhlaWdodDogMy42cmVtO1xcbiAgfVxcbn1cXG5cXG4udHh0MTgge1xcbiAgZm9udC1zaXplOiAxLjhyZW07XFxuICBsaW5lLWhlaWdodDogMi4xcmVtO1xcblxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgZm9udC1zaXplOiAzLjJyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAzLjhyZW07XFxuICB9XFxufVxcblxcbi5mdy1saWdodCB7XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG5cIixcIi5idG4ge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgJl9wcmltYXJ5IHtcXG4gICAgICAgIHBhZGRpbmc6IDEuNnJlbSAzLjJyZW07XFxuXFxuICAgICAgICBoZWlnaHQ6IDUuMXJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcmVtO1xcblxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHJlZDtcXG5cXG4gICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlO1xcblxcbiAgICAgICAgLmJ0bl9fdHh0IHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS45cmVtO1xcbiAgICAgICAgICAgIGNvbG9yOiAkd2hpdGU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpIHtcXG4gICAgICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgaGVpZ2h0OiA4LjZyZW07XFxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjByZW07XFxuXFxuICAgICAgICAgICAgLmJ0bl9fdHh0IHtcXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzLjJyZW07XFxuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzLjhyZW07XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfc2Vjb25kYXJ5IHtcXG4gICAgICAgIHBhZGRpbmc6IDEwcmVtIDMuMnJlbSAzLjJyZW07XFxuXFxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuXFxuICAgICAgICB3aWR0aDogMjUuMnJlbTtcXG4gICAgICAgIGhlaWdodDogMjUuMnJlbTtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRyZWQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuXFxuICAgICAgICAuYnRuX190eHQge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgICAgICAgICBmb250LXNpemU6IDJyZW07XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIuM3JlbTtcXG4gICAgICAgICAgICBjb2xvcjogJHJlZDtcXG5cXG4gICAgICAgICAgICAmOjphZnRlciB7XFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xcblxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgICAgIGJvdHRvbTogLTAuOHJlbTtcXG4gICAgICAgICAgICAgICAgbGVmdDogMTAwJTtcXG5cXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUuNHJlbTtcXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxLjhyZW07XFxuXFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHVybCgnLi9hc3NldHMvaW1hZ2VzL2ljb25zL2Fyci1yZWQuc3ZnJykgY2VudGVyIC8gY29udGFpbiBuby1yZXBlYXQ7XFxuXFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAxMDAlKTtcXG5cXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjpcXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSAwLjVzIGVhc2UsXFxuICAgICAgICAgICAgICAgICAgICBsZWZ0IDAuNXMgZWFzZTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpIGFuZCAobWluLXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgJjpob3ZlciB7XFxuICAgICAgICAgICAgICAgIC5idG5fX3R4dDo6YWZ0ZXIge1xcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogNTAlO1xcblxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMTAwJSk7XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XFxuXFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAgICAgICAgICAgaGVpZ2h0OiA4LjZyZW07XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjByZW07XFxuXFxuICAgICAgICAgICAgLmJ0bl9fdHh0IHtcXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMi40cmVtIDIxcmVtIDIuNHJlbSA0cmVtO1xcblxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDMuMnJlbTtcXG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMuOHJlbTtcXG5cXG4gICAgICAgICAgICAgICAgJjo6YWZ0ZXIge1xcbiAgICAgICAgICAgICAgICAgICAgdG9wOiA1MCU7XFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDA7XFxuXFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNi40cmVtO1xcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAycmVtO1xcblxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTRyZW0sIC01MCUpO1xcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgICAgICAgICAgIC5idG5fX3R4dDo6YWZ0ZXIge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNC42cmVtLCAtNTAlKTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmX190eHQge1xcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICB9XFxufVxcblxcbi5pLWJ0biB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gICAgd2lkdGg6IDZyZW07XFxuICAgIGhlaWdodDogNnJlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgJHJlZDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcblxcbiAgICAmX2JnIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXG4gICAgfVxcblxcbiAgICBzdmcge1xcbiAgICAgICAgd2lkdGg6IDNyZW07XFxuICAgIH1cXG5cXG4gICAgJl9hcnItbmV4dC5faGFzLWhvdmVyLFxcbiAgICAmX2Fyci1wcmV2Ll9oYXMtaG92ZXIge1xcbiAgICAgICAgc3ZnIHtcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSB7XFxuICAgICAgICAgICAgJjpob3ZlciB7XFxuICAgICAgICAgICAgICAgICYuaS1idG5fYXJyLXByZXYge1xcbiAgICAgICAgICAgICAgICAgICAgc3ZnIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTAuOHJlbSk7XFxuICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgJi5pLWJ0bl9hcnItbmV4dCB7XFxuICAgICAgICAgICAgICAgICAgICBzdmcge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwLjhyZW0pO1xcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICB3aWR0aDogMTFyZW07XFxuICAgICAgICBoZWlnaHQ6IDExcmVtO1xcblxcbiAgICAgICAgc3ZnIHtcXG4gICAgICAgICAgICB3aWR0aDogNC44cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxufVxcblwiLFwiaW5wdXRbdHlwZT0ndGV4dCddLFxcbmlucHV0W3R5cGU9J2VtYWlsJ10sXFxuaW5wdXRbdHlwZT0ndGVsJ10sXFxudGV4dGFyZWEge1xcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgYXBwZWFyYW5jZTogbm9uZTtcXG59XFxudGV4dGFyZWE6Zm9jdXMsXFxuaW5wdXQ6Zm9jdXMge1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4uaW5wdXQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgIHBhZGRpbmctYm90dG9tOiAxcmVtO1xcblxcbiAgICBsaW5lLWhlaWdodDogMi4zcmVtO1xcblxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGdyYXk7XFxuXFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1ib3R0b20gMC41cyBlYXNlO1xcblxcbiAgICAmX19maWVsZCB7XFxuICAgICAgICAmOjpwbGFjZWhvbGRlciB7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAycmVtO1xcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyLjNyZW07XFxuICAgICAgICAgICAgY29sb3I6ICRncmF5O1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMS42cmVtO1xcblxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMuNnJlbTtcXG5cXG4gICAgICAgIC5pbnB1dF9fZmllbGQge1xcbiAgICAgICAgICAgICY6OnBsYWNlaG9sZGVyIHtcXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzLjJyZW07XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICYuX2lzLWZpbGxlZCB7XFxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGJsYWNrO1xcbiAgICB9XFxuXFxuICAgICYuX2hhcy1lcnJvciB7XFxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHJlZDtcXG5cXG4gICAgICAgIC5pbnB1dF9fZmllbGQge1xcbiAgICAgICAgICAgICY6OnBsYWNlaG9sZGVyIHtcXG4gICAgICAgICAgICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuXFxuICAgICAgICAmOjphZnRlciB7XFxuICAgICAgICAgICAgY29udGVudDogYXR0cihkYXRhLWhpbnQpO1xcblxcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNnJlbTtcXG4gICAgICAgICAgICBjb2xvcjogJHJlZDtcXG5cXG4gICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDIuNHJlbTtcXG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG59XFxuXCIsXCIudGFicyB7XFxuICAgICZfX25hdmlnYXRpb24ge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGNvbHVtbi1nYXA6IDEuOHJlbTtcXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgY29sdW1uLWdhcDogMy42cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfX2JvZHkge1xcbiAgICAgICAgcGFkZGluZy10b3A6IDFyZW07XFxuICAgIH1cXG59XFxuXFxuLnRhYiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgY29sb3I6ICRncmF5O1xcblxcbiAgICB0cmFuc2l0aW9uOlxcbiAgICAgICAgY29sb3IgMC41cyBlYXNlLFxcbiAgICAgICAgcGFkZGluZy1sZWZ0IDAuM3MgZWFzZTtcXG5cXG4gICAgJi5faXMtYWN0aXZlIHtcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMy40cmVtO1xcblxcbiAgICAgICAgY29sb3I6ICRyZWQ7XFxuXFxuICAgICAgICAmOjpiZWZvcmUge1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNC44cmVtO1xcbiAgICAgICAgfVxcbiAgICB9XFxuXFxuICAgICY6OmJlZm9yZSB7XFxuICAgICAgICBjb250ZW50OiAnJztcXG5cXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMC44cmVtO1xcbiAgICAgICAgbGVmdDogMDtcXG5cXG4gICAgICAgIHdpZHRoOiAxLjhyZW07XFxuICAgICAgICBoZWlnaHQ6IDEuOHJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG5cXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRyZWQ7XFxuXFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcblxcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZTtcXG5cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgICAgICAgdG9wOiAxcmVtO1xcblxcbiAgICAgICAgICAgIHdpZHRoOiAyLjRyZW07XFxuICAgICAgICAgICAgaGVpZ2h0OiAyLjRyZW07XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9fdHh0IHtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICAgICAgZm9udC1zaXplOiAyLjhyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMy4zcmVtO1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDRyZW07XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDQuNnJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cIixudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi4vc2Nzcy9zdHlsZS5zY3NzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB1dGlscyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy91dGlscy5qcyc7XG5cbi8vIGhhbWJ1cmdlciBtZW51XG51dGlscy5tZW51SW5pdCgpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNvbXBvbmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBmb3Jtc1xuaW1wb3J0ICcuL3V0aWxzL2Zvcm1zJztcblxuLy8gdGFic1xuaW1wb3J0ICcuL3V0aWxzL3RhYnMuanMnO1xuXG4vLyBhY2NvcmRpb25cbi8vIGltcG9ydCAnLi91dGlscy9hY2NvcmRpb24uanMnO1xuXG4vLyBzZWxlY3Rcbi8vIGltcG9ydCAnLi91dGlscy9zZWxlY3QuanMnO1xuXG4vLyBtb2RhbHNcbmltcG9ydCAnLi91dGlscy9tb2RhbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgJy4vZGV2L3Z6bXNrMS5qcyc7XG5pbXBvcnQgJy4vZGV2L21hcmt1c0RNLmpzJztcbiJdLCJuYW1lcyI6WyJtb2R1bGVzIiwiVmFsaWRhdGlvbiIsImNvbnN0cnVjdG9yIiwiYXR0cnMiLCJSRVFVSVJFRCIsIklHTk9SRV9WQUxJREFUSU9OIiwiQUpBWCIsIkRFViIsIklHTk9SRV9GT0NVUyIsIlNIT1dfUExBQ0VIT0xERVIiLCJWQUxJREFURSIsImNsYXNzZXMiLCJIQVNfRVJST1IiLCJIQVNfRk9DVVMiLCJJU19GSUxMRUQiLCJJU19SRVZFQUxFRCIsImdldEVycm9ycyIsImZvcm0iLCJlcnIiLCJyZXF1aXJlZEZpZWxkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJmb3JFYWNoIiwicmVxdWlyZWRGaWVsZCIsIm9mZnNldFBhcmVudCIsInRhZ05hbWUiLCJkaXNhYmxlZCIsInZhbGlkYXRlRmllbGQiLCJhZGRFcnJvciIsImNsYXNzTGlzdCIsImFkZCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJyZW1vdmVFcnJvciIsImRhdGFzZXQiLCJyZXF1aXJlZCIsInZhbHVlIiwicmVwbGFjZSIsInRlc3RFbWFpbCIsInR5cGUiLCJjaGVja2VkIiwidHJpbSIsImNsZWFyRmllbGRzIiwicmVzZXQiLCJzZXRUaW1lb3V0IiwiaW5wdXRzIiwiY2hlY2tib3hlcyIsImluZGV4IiwiaW5wdXQiLCJjaGVja2JveCIsInRlc3QiLCJGb3JtU3VibWl0aW9uIiwic2hvdWxkVmFsaWRhdGUiLCJmb3JtcyIsImRvY3VtZW50IiwiaW5pdCIsInNlbmRGb3JtIiwicmVzcG9uc2VSZXN1bHQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJwb3B1cCIsIm1vZGFsIiwibW9kYWxNZXNzYWdlIiwib3BlbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTdWJtaXRpb24iLCJlIiwiaGFzQXR0cmlidXRlIiwiYWpheCIsInByZXZlbnREZWZhdWx0IiwiYWN0aW9uIiwiZ2V0QXR0cmlidXRlIiwibWV0aG9kIiwiZGF0YSIsIkZvcm1EYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsImJvZHkiLCJvayIsInJlc3VsdCIsImpzb24iLCJhbGVydCIsIl90aGlzIiwicGFzc3dvcmRGaWVsZHMiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0IiwiZmllbGQiLCJidG4iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb250YWlucyIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZSIsIkZvcm1GaWVsZHMiLCJmaWVsZHMiLCJzYXZlUGxhY2Vob2xkZXIiLCJwbGFjZWhvbGRlciIsImhhbmRsZUZvY3VzaW4iLCJjbG9zZXN0IiwiaGFuZGxlRm9jdXNvdXQiLCJiaW5kIiwiYm9keUxvY2tTdGF0dXMiLCJib2R5TG9jayIsImJvZHlVbmxvY2siLCJNb2RhbCIsIm9wdGlvbnMiLCJjb25maWciLCJsb2dnaW5nIiwiYXR0cmlidXRlT3BlbkJ1dHRvbiIsImF0dHJpYnV0ZUNsb3NlQnV0dG9uIiwiZml4RWxlbWVudFNlbGVjdG9yIiwieW91dHViZUF0dHJpYnV0ZSIsInlvdXR1YmVQbGFjZUF0dHJpYnV0ZSIsInNldEF1dG9wbGF5WW91dHViZSIsIm1vZGFsQ29udGVudCIsIm1vZGFsQWN0aXZlIiwiYm9keUFjdGl2ZSIsImZvY3VzQ2F0Y2giLCJjbG9zZUVzYyIsImhhc2hTZXR0aW5ncyIsImxvY2F0aW9uIiwiZ29IYXNoIiwib24iLCJiZWZvcmVPcGVuIiwiYWZ0ZXJPcGVuIiwiYmVmb3JlQ2xvc2UiLCJhZnRlckNsb3NlIiwieW91VHViZUNvZGUiLCJpc09wZW4iLCJ0YXJnZXRPcGVuIiwic2VsZWN0b3IiLCJlbGVtZW50IiwicHJldmlvdXNPcGVuIiwibGFzdENsb3NlZCIsIl9kYXRhVmFsdWUiLCJoYXNoIiwiX3Jlb3BlbiIsIl9zZWxlY3Rvck9wZW4iLCJsYXN0Rm9jdXNFbCIsIl9mb2N1c0VsIiwiaW5pdG1vZGFscyIsImV2ZW50c21vZGFsIiwiYnV0dG9uT3BlbiIsImJ1dHRvbkNsb3NlIiwiY2xvc2UiLCJ3aGljaCIsImNvZGUiLCJfZm9jdXNDYXRjaCIsIndpbmRvdyIsIl9vcGVuVG9IYXNoIiwic2VsZWN0b3JWYWx1ZSIsImRvY3VtZW50RWxlbWVudCIsInByZXZpb3VzQWN0aXZlRWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29kZVZpZGVvIiwidXJsVmlkZW8iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiYXV0b3BsYXkiLCJ5b3V0dWJlUGxhY2UiLCJhcHBlbmRDaGlsZCIsIl9nZXRIYXNoIiwiX3NldEhhc2giLCJtIiwiaW5uZXJXaWR0aCIsIl9mb2N1c1RyYXAiLCJpbm5lckhUTUwiLCJfcmVtb3ZlSGFzaCIsImluY2x1ZGVzIiwiY2xhc3NJbkhhc2giLCJidXR0b25zIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhyZWYiLCJzcGxpdCIsImZvY3VzYWJsZSIsImZvY3VzQXJyYXkiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImZvY3VzZWRJbmRleCIsImluZGV4T2YiLCJzaGlmdEtleSIsImZvY3VzIiwic2V0SGFzaCIsImdldEhhc2giLCJUYWJzIiwiVEFCUyIsIklOREVYIiwiVElUTEVTIiwiVElUTEUiLCJUQUJfSVRFTSIsIkJPRFkiLCJIQVNIIiwiSU5JVCIsIkFDVElWRSIsIk1PREFMIiwidGFicyIsImFjdGl2ZUhhc2giLCJzdGFydHNXaXRoIiwidGFic0Jsb2NrIiwic2V0QWN0aW9ucyIsInNldFN0YXR1cyIsInRpdGxlcyIsImNvbnRlbnQiLCJ0YWJzSW5kZXgiLCJoYXNIYXNoIiwiZnJvbSIsImZpbHRlciIsIml0ZW0iLCJpbmR4IiwiaGlkZGVuIiwidGl0bGUiLCJhY3RpdmVUaXRsZSIsImFjdGl2ZUhhc2hCbG9jayIsIm1lbnVJbml0IiwibWVudU9wZW4iLCJtZW51Q2xvc2UiLCJib2R5TG9ja1RvZ2dsZSIsImRlbGF5IiwidW5pcXVlQXJyYXkiLCJhcnJheSIsInNlbGYiLCJkYXRhTWVkaWFRdWVyaWVzIiwiZGF0YVNldFZhbHVlIiwibWVkaWEiLCJicmVha3BvaW50c0FycmF5IiwicGFyYW1zIiwiYnJlYWtwb2ludCIsInBhcmFtc0FycmF5IiwicHVzaCIsIm1kUXVlcmllcyIsIm1hcCIsIm1kUXVlcmllc0FycmF5IiwibWVkaWFCcmVha3BvaW50IiwibWVkaWFUeXBlIiwibWF0Y2hNZWRpYSIsIml0ZW1zQXJyYXkiLCJfc2xpZGVVcCIsImR1cmF0aW9uIiwic2hvd21vcmUiLCJzdHlsZSIsInRyYW5zaXRpb25Qcm9wZXJ0eSIsInRyYW5zaXRpb25EdXJhdGlvbiIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsIm92ZXJmbG93IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJyZW1vdmVQcm9wZXJ0eSIsIl9zbGlkZURvd24iLCJfc2xpZGVUb2dnbGUiLCJyZW1Ub1B4IiwicmVtVmFsdWUiLCJodG1sRm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwicHhWYWx1ZSIsIk1hdGgiLCJyb3VuZCIsInJlbW92ZUNsYXNzZXMiLCJjbGFzc05hbWUiLCJpIiwidXRpbHMiXSwic291cmNlUm9vdCI6IiJ9