const defaultPATH = ".";

(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;
    if (!this.parentElement) {return null}
    else return this.parentElement.closest(selector)
  };
}(Element.prototype));

// svg4everybody
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof exports?module.exports=b():a.svg4everybody=b()}(this,function(){/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
  function a(a,b){if(b){var c=!a.getAttribute("viewBox")&&b.getAttribute("viewBox"),d=document.createDocumentFragment(),e=b.cloneNode(!0);for(c&&a.setAttribute("viewBox",c);e.childNodes.length;)d.appendChild(e.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=document.createElement("x");c.innerHTML=b.responseText,b.s.splice(0).map(function(b){a(b[0],c.querySelector("#"+b[1].replace(/(\W)/g,"\\$1")))})}},b.onreadystatechange()}function c(c){function d(){for(var c;c=e[0];){var j=c.parentNode;if(j&&/svg/i.test(j.nodeName)){var k=c.getAttribute("xlink:href");if(f&&(!g||g(k,j,c))){var l=k.split("#"),m=l[0],n=l[1];if(j.removeChild(c),m.length){var o=i[m]=i[m]||new XMLHttpRequest;o.s||(o.s=[],o.open("GET",m),o.send()),o.s.push([j,n]),b(o)}else a(j,document.getElementById(n))}}}h(d,17)}c=c||{};var e=document.getElementsByTagName("use"),f="shim"in c?c.shim:/\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent)||(navigator.userAgent.match(/AppleWebKit\/(\d+)/)||[])[1]<537,g=c.validate,h=window.requestAnimationFrame||setTimeout,i={};f&&d()}return c});
svg4everybody();


function loadScript(url, callback) {
  
  var script = document.createElement("script");
  script.type = "text/javascript";
  
  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback();
    };
  }
  
  script.src = url;
  document.getElementsByTagName("body")[0].appendChild(script);
}


// Init Slider
if (document.querySelector(".swiper-container")) {
  loadScript(defaultPATH + "/js/include/swiper.min.js", function () {
    // Slider
    if (document.querySelector('.js__headslid-slider')) {
      var firstStart = false;
      var progresSlideInterval;
      
      var headslid = new Swiper('.js__headslid-slider', {
        autoHeight: true,
        loop: true,
        threshold: 20,
        updateOnWindowResize: true,
        pagination: {
          el: '.headslid__pagination',
          type: 'progressbar',
          clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init: function () {
            setTimeout(function () {
              document.querySelector('.headslid').classList.remove("loading");
              firstStart = true;
              PlaySlider();
            }, 100);
          },
          slideChangeTransitionEnd: function() {
            if(firstStart) {
              PlaySlider();
              firstStart = true;
            }
          },
        }
      });
      
      
      function StopSlider() {
        clearInterval(progresSlideInterval);
        document.querySelector(".headslid").classList.remove("progress-active");
      }
      
      function PlaySlider() {
        if(progresSlideInterval) clearInterval(progresSlideInterval);
        document.querySelector(".headslid").classList.remove("progress-active");
        
        setTimeout(function() {
          document.querySelector(".headslid").classList.add("progress-active");
          progresSlideInterval = setTimeout(function() {
            document.querySelector(".headslid").classList.remove("progress-active");
            headslid.slideNext();
          }, 8000);
        }, 10)
      }
      
      var stopBtn = document.querySelectorAll('.js__headslid-stop')
      stopBtn = [].slice.call(stopBtn);
      stopBtn.forEach(function(el) {
        el.addEventListener("mouseover", function() {
          StopSlider();
        });
        
        el.addEventListener("mouseout", function() {
          PlaySlider();
        });
      });
      
    }
    
    // topproduct
    if (document.querySelector('.js__topproduct-slider')) {
      var topproduct = new Swiper('.js__topproduct-slider', {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: "row",
        spaceBetween: 24,
        threshold: 20,
        navigation: {
          nextEl: '.topproduct__arrow .arrow-slider__next',
          prevEl: '.topproduct__arrow .arrow-slider__prev',
        },
        on: {
          init: function () {
            document.querySelector('.js__topproduct-slider').classList.remove("loading");
          }
        },
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        breakpoints: {
          0: {
            slidesPerView: 1.15,
            slidesPerColumn: 1,
            slidesPerColumnFill: "row",
            spaceBetween: 20,
          },
          370: {
            slidesPerView: 1.35,
            slidesPerColumn: 1,
            slidesPerColumnFill: "row",
            spaceBetween: 30,
          },
          500: {
            slidesPerView: 1.7,
            slidesPerColumn: 1,
            slidesPerColumnFill: "row",
          },
          768: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
          },
        }
      });
    }
    
    
    // review slider
    if (document.querySelector('.js__review-slider')) {
      var reviewslider = new Swiper('.js__review-slider', {
        slidesPerView: 2,
        spaceBetween: 74,
        autoHeight: true,
        navigation: {
          nextEl: '.review .arrow-slider__next',
          prevEl: '.review .arrow-slider__prev',
        },
        on: {
          init: function () {
            document.querySelector('.js__review-slider').classList.remove("loading");
          }
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          880: {
            slidesPerView: 2,
            spaceBetween: 74,
          },
        }
      });
    }
    
    // catalog slider(mobile)
    (function() {
      
      // breakpoint where swiper will be destroyed
      // and switches to a dual-column layout
      const breakpoint = window.matchMedia( '(min-width:768px)' );
      
      // keep track of swiper instances to destroy later
      let mySwiper;
      
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      
      const breakpointChecker = function() {
        
        // if larger viewport and multi-row layout needed
        if ( breakpoint.matches === true ) {
          
          // clean up old instances and inline styles when available
          if ( mySwiper !== undefined ) mySwiper.destroy( true, true );
          document.querySelector('.js__catalog-slider').classList.remove("loading");
          // or/and do nothing
          return;
          
          // else if a small viewport and single column layout needed
        } else if ( breakpoint.matches === false ) {
          
          // fire small viewport version of swiper
          return enableSwiper();
          
        }
        
      };
      
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      
      const enableSwiper = function() {
        mySwiper = new Swiper ('.js__catalog-slider', {
          slidesPerView: 3,
          spaceBetween: 10,
          autoHeight: true,
          on: {
            init: function () {
              document.querySelector('.js__catalog-slider').classList.remove("loading");
            }
          },
          breakpoints: {
            0: {
              slidesPerView: 1.15,
              spaceBetween: 10,
            },
            370: {
              slidesPerView: 1.45,
              spaceBetween: 30,
            },
            450: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }
        });
        
      };
      
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      
      // keep an eye on viewport size changes
      breakpoint.addListener(breakpointChecker);
      
      // kickstart
      breakpointChecker();
    })();
  });
}

// ==============================
// Function
// ==============================
var getSiblingsFn = function (elem) {
  
  // Setup siblings array and get the first sibling
  
  var siblings = [];
  var sibling = elem.parentElement.firstElementChild;
  
  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling
  }
  return siblings;
};

function getSiblings(item, func) {
  var siblings = getSiblingsFn(item);
  siblings.forEach(func);
}


function oepnClose(arg) {
  /*
      btn
      el
      event
      type
      className
      callback
  */
  var open = arg.btn;
  var cl = arg.className || "active";
  
  if (open) {
    open.addEventListener((arg.event ? arg.event : "click"), function () {
      
      if (arg.type == "open") {
        arg.el.classList.add(cl);
      } else if (arg.type == "toggle") {
        arg.el.classList.toggle(cl);
      } else {
        arg.el.classList.remove(cl);
      }
      
      if (arg.callback) {
        arg.callback(this);
      }
    });
  }
}


function onClickClose(elem, fn) { // вызвать в момент показа окна, где elem - окно
  function outsideClickListener(event) {
    if (!elem.contains(event.target) && isVisible(elem)) {  // проверяем, что клик не по элементу и элемент виден
      if (fn) fn();
      document.removeEventListener('click', outsideClickListener);
    }
  }
  
  document.addEventListener('click', outsideClickListener)
}

function isVisible(elem) { //открыто ли условное окно
  return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

// ==============================
// JS Code
// ==============================

// hover effect menu items
(function () {
  var element = ".js__menu-hover";
  var first = "active";
  var active = "hover";
  var inactive = "no-hover";
  
  elements = [].slice.call(document.querySelectorAll(element));
  
  elements.forEach(function (el) {
    // console.log(el);
    if (el.classList.contains(first)) {
      getSiblings(el, function (el) {
        el.classList.add(inactive);
        el.classList.remove(active);
      });
    }
    
    el.addEventListener("mouseover", function () {
      this.classList.add(active);
      this.classList.remove(inactive);
      
      getSiblings(this, function (el) {
        el.classList.add(inactive);
        el.classList.remove(active);
      });
    });
    
    el.addEventListener("mouseout", function () {
      var active = document.querySelector(element + "." + active);
      
      elements.forEach(function (el) {
        el.classList.remove(inactive);
        el.classList.remove(active);
      });
      
      if (document.querySelector(element + "." + first)) {
        getSiblings(document.querySelector(element + "." + first), function (el) {
          el.classList.add(inactive);
          el.classList.remove(active);
        });
      }
    });
  });
})();


// Menu
// =========
var menuNav = document.querySelector(".menu__nav");

// Open
oepnClose({
  btn: document.querySelector(".js__open-menu"),
  el: menuNav,
  type: "open"
});

// Close
oepnClose({
  btn: document.querySelector(".js__close-menu"),
  el: menuNav,
  type: "close"
});


// Search
// =========
var searchBlock = document.querySelector(".js__search-block");

// Open
oepnClose({
  btn: document.querySelector(".js__open-search"),
  el: searchBlock,
  type: "toggle",
  callback: function (el) {
    setTimeout(function () {
      // onClickClose(searchBlock, function () {
      //   searchBlock.classList.remove("active");
      // });
    }, 100);
  }
});

// Close
oepnClose({
  btn: document.querySelector(".js__close-search"),
  el: searchBlock,
  type: "close"
});


// Product Slider
(function ProductSlider() {
  var el = document.querySelectorAll(".product");
  if (!el.length) return;
  
  el = [].slice.call(el);
  el.forEach(function (el) {
    var slider = el.querySelector(".product__slider");
    var pagination = el.querySelector(".product__pagination");
    var items = [].slice.call(el.querySelectorAll(".product__slider-item"));
    
    items = [].slice.call(items);
    items.forEach(function (item, index) {
      var $this = item;
      var span = document.createElement("span");
      if (index == 0) span.classList.add("active");
      span.addEventListener("mouseover", function (el) {
        this.classList.add("active");
        $this.classList.add("active");
        getSiblings($this, function (el) {
          el.classList.remove("active");
        });
        getSiblings(this, function (el) {
          el.classList.remove("active");
        });
      });
      pagination.appendChild(span);
    });
  });
})();


// Add class when input is not empty
var inputs = document.querySelectorAll(".js__input-notempty");
if(inputs.length) {
  inputs = [].slice.call(inputs);
  inputs.forEach(function(el) {
    el.addEventListener("blur", function(item) {
      this.value ? this.classList.add("notempty") : this.classList.remove("notempty");
    })
  });
}



// Tabs
function Tabs(el) {
  var $this = this;
  this.root = document.querySelector(el);
  
  if(!this.root) return false;
  
  if(this.root.querySelectorAll(".js-tabs-btn")) {
    this.btns = [].slice.call(this.root.querySelectorAll(".js-tabs-btn"));
  }
  
  if(this.root.querySelectorAll(".js-tabs-content")) {
    this.contents = [].slice.call(this.root.querySelectorAll(".js-tabs-content"));
  }
  
  this.btns[0].classList.add("active");
  this.contents[0].classList.add("active");
  
  this.btns.forEach(function(item) {
    item.addEventListener("click", function(el) {
      var index = Array.prototype.slice.call(this.parentElement.children).indexOf(this)
      
      this.classList.add("active");
      $this.contents[index].classList.add("active");
  
      getSiblings(this, function (el) {
        el.classList.remove("active");
      });
      getSiblings($this.contents[index], function (el) {
        el.classList.remove("active");
      });
    });
  });
}
var tabs = new Tabs(".js-tabs");
var tabs2 = new Tabs(".js-tabs2");


// Open/Close Newpass input
oepnClose({
  btn: document.querySelector(".js-open-newpass"),
  el: document.querySelector(".js-block-newpass"),
  type: "toggle",
  callback: function (el) {
    var input = [].slice.call(document.querySelectorAll(".js-block-newpass input"));
    
    if(document.querySelector(".js-block-newpass").classList.contains("active")) {
      console.log("True")
      input.forEach(function(el) {
        el.required = true;
      })
    } else {
      console.log("False")
      input.forEach(function(el) {
        el.required = false;
        el.value = "";
      })
    }
  }
});


// Include Plugin Validator
function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}


var validatorClass = document.querySelectorAll(".js-form-validator");
if(validatorClass.length) {
  loadScript(defaultPATH + "/js/include/inputmask.min.js", function () {
    console.log("InputMask Loaded");
    
    var el = [].slice.call(document.querySelectorAll(".js-phone-mask"));
    el.forEach(function(item) {
      Inputmask({
        mask: "+9 (999) 999 99 99",
        clearIncomplete: true,
        showMaskOnHover: false
        // onincomplete: function(el) {
        //   el.target.value = "";
        // }
      }).mask(item);
    });
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  var validatorClass = document.querySelectorAll(".js-form-validator");
  if(validatorClass.length) {
    loadScript(defaultPATH + "/js/include/bouncer.polyfills.min.js", function () {
      console.log("Validator Loaded");
      
      var bouncer = new Bouncer('.js-form-validator', {
        disableSubmit: true,
        fieldClass: 'error', // Applied to fields with errors
        errorClass: 'error-message', // Applied to the error message for invalid fields
        fieldPrefix: 'bouncer-field_', // If a field doesn't have a name or ID, one is generated with this prefix
        errorPrefix: 'bouncer-error_', // Prefix used for error message IDs
        patterns: {
          email: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
          password: /(?=.*\d)(?=.*[a-z|A-Z]).{8,}/,
        },
        customValidations: {
          valueMismatch: function (field) {
            // Look for a selector for a field to compare
            // If there isn't one, return false (no error)
            var selector = field.getAttribute('data-bouncer-match');
            if (!selector) return false;
          
            // Get the field to compare
            var otherField = field.form.querySelector(selector);
            if (!otherField) return false;
          
            // Compare the two field values
            // We use a negative comparison here because if they do match, the field validates
            // We want to return true for failures, which can be confusing
            return otherField.value !== field.value;
          
          },
          checkPass: function(field) {
            
          }
        },
      });
    
      document.addEventListener('bouncerFormInvalid', function (event) {
        // console.log(event.detail.errors);
        window.scrollTo(0, event.target.offsetTop);
      }, false);
    
      document.addEventListener('bouncerFormValid', function (el) {
        var fn = el.target.dataset.submit;
        window[fn](el);
      }, false);
      
      let arrinput = [].slice.apply(document.querySelectorAll("input"));
      arrinput.forEach(function(input) {
        input.addEventListener("input", function() {
          console.log(this.value)
          let letters = /[A-Z|a-z]/g;
          let numbers = /[0-9]/g;
          
          
          let value = 0;
  
          if(this.value.length >= 8) {
            value = 1;
            
            if(this.value.match(letters)) {
              value += 1;
            } else {
              value = 1;
            }

            if(this.value.match(numbers)) {
              value += 1;
            } else {
              value = 1;
            }
          } else {
            value = 0;
          }
  
          // if(this.value.match(letters)) {
          //   value += 1;
          // } else {
          //   value -= 1;
          // }
          //
          // if(this.value.match(numbers)) {
          //   value += 1;
          // } else {
          //   value -= 1;
          // }
          //
          // if(this.value.length >= 8) {
          //   value += 1;
          // } else {
          //   value -= 1;
          // }
  
          console.log("Pass: " + value)
  
          switch (value) {
            case 1:
              this.classList.add("low");
              this.classList.remove("normal");
              this.classList.remove("high");
              break;
            case 2:
              this.classList.remove("low");
              this.classList.add("normal");
              this.classList.remove("high");
              break;
            case 3:
              this.classList.remove("low");
              this.classList.remove("normal");
              this.classList.add("high");
              break;
          }
        })
      });
      
    });
  }
});



// Tab Table
var btnopentabtable = [].slice.call(document.querySelectorAll(".js-open-tabtable"));
if(btnopentabtable.length) {
  btnopentabtable.forEach(function(el) {
    el.addEventListener("click", function(item) {
      var parent = this.closest(".tabtable__item");
      parent.classList.toggle("active");
      
      if(parent.classList.contains("active")) {
        parent.querySelector("button span").innerText = "Свернуть";
      } else {
        parent.querySelector("button span").innerText = "Подробнее";
      }
    });
  });
}


// tabshead check fixed
var tahheadfix = document.querySelector(".js-tabhead");
if(tahheadfix) {
  document.body.onscroll = function(scroll) {
    if(window.scrollY >= tahheadfix.offsetTop) {
      console.log("Fixed");
      tahheadfix.classList.add("fixed");
    } else {
      console.log("No Fixed");
      tahheadfix.classList.remove("fixed");
    }
  }
}


// Phone Code
function PhoneCode(el) {
  let inputs = [];
  let activeInput = 0;
  
  for(let i=1;i<=4;i++) {
    let input = document.createElement("input");
    input.type = "number";
    input.name = "number-" + i;
    input.min = "1";
    input.max = "9";
    input.required = true;
    if(i != 1) input.disabled = true;
    el.append(input);
    inputs.push(input);
  }
  
  inputs.forEach(function(item) {
    item.addEventListener("input", function() {
      let val = this.value;
      
      if(this.value != ""){
        if(parseInt(this.value) < parseInt(this.min)){
          this.value = this.min;
        }
        if(parseInt(this.value) > parseInt(this.max)){
          this.value = this.max;
        }
      }
      
      if(this.value) {
        if(activeInput == 3) return false;
        activeInput++;
        inputs[activeInput].disabled = false;
        inputs[activeInput].focus();
      }
    });
  
    item.onkeydown = function(event) {
      var key = event.keyCode || event.charCode;
      if( key == 8 || key == 46 ) {
        event.target.value = "";
        if(activeInput == 0) return false;
        activeInput--;
        inputs[activeInput + 1].disabled = true;
        inputs[activeInput].focus();
      }
    };
  })
}

var phonecode = [].slice.call(document.querySelectorAll(".js-phone-code"));
if(phonecode.length) {
  phonecode.forEach(function(item, index) {
    new PhoneCode(item);
  });
}

// Modal Tab
var tabmodalbtn = [].slice.call(document.querySelectorAll(".js-tabmodal-btn"));
if(tabmodalbtn.length) {
  tabmodalbtn.forEach(function(item) {
    item.addEventListener("click", function() {
      let data = this.dataset.modal;
  
      getSiblings(this, function (el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
      
      document.querySelector(".cmodal-login").classList.remove("active");
      document.querySelector(".cmodal-reg").classList.remove("active");
      
      document.querySelector(data).classList.add("active");
    })
  });  
}

// Popup
$(document).on('closing', '.js-modal', function (e) {
  console.log(e)
  
  if($(".cmodal").length) {
    if($(e.currentTarget).hasClass("remodal-rel")) {
      setTimeout(function() {
        $(".remodal-rel .cmodal-item").removeClass("active");
        $(".cmodal-rel-reglogin").addClass("active");
        
        $(".cmodal-tab__btn:first-child").addClass("active").siblings().removeClass("active");
        $(".cmodal-rel-login").addClass("active");
      }, 300)
    }
  
    if($(e.currentTarget).hasClass("remodal-rep")) {
      setTimeout(function() {
        $(".remodal-rep .cmodal-item").removeClass("active");
        $(".cmodal-rep-phone").addClass("active");
      }, 300)
    }
  
    $(".cmodal-item form").each(function(item) {
      $(this).get(0).reset();
      $(this).find("input").removeClass("error notempty")
      $(this).find("textarea").removeClass("error")
    });
  }
});

// // File Upload
// document.addEventListener("DOMContentLoaded", function(event) {
//   var validatorClass = document.querySelectorAll("input[type='file']");
//   if(validatorClass.length) {
//     loadScript("js/include/filepond-plugin-file-validate-size.js", function() {
//       loadScript("js/include/filepond-plugin-file-validate-type.min.js", function() {
//         loadScript(defaultPATH + "js/include/filepond.min.js", function () {
//           console.log("File Upload Loaded");
//
//           FilePond.registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);
//
//           const inputElement = document.querySelector('input[type="file"]');
//           const pond = FilePond.create(inputElement, {
//             multiple: true,
//             maxFiles: 10,
//             maxFileSize: "20MB",
//             allowFileTypeValidation: true,
//             labelFileTypeNotAllowed: "Файл неверного типа",
//             fileValidateTypeLabelExpectedTypes: 'допустимые типы {allButLastType} или {lastType}',
//             labelMaxFileSizeExceeded: "Файл слишком большой",
//             labelMaxFileSize: 'максимальный размер файла {filesize}',
//             acceptedFileTypes: ['image/png','image/jpg','image/jpeg','image/webp','image/gif', 'image/bmp'],
//           });
//
//           window.podfile = pond;
//         });
//
//       });
//
//     });
//   }
// });
//
// document.querySelector(".indorder-form").addEventListener("submit", function(form) {
//   console.log(this, form);
//   form.preventDefault();
//
//   let transfer = new DataTransfer();
//   let files = podfile.getFiles();
//
//   podfile.getFiles().forEach(function(el) {
//     transfer.items.add(el.file);
//
//     var r = new FileReader();
//     r.onload = function(){ alert(r.result); };
//     let res= r.readAsBinaryString(el.file);
//     console.log(res);
//     [].slice.call(document.querySelectorAll(".filepond--data input")).forEach(function(item) {
//       item.value = res
//     })
//   });
//
//   console.log(files);
//   console.log(transfer.files);
//
//
//   let data = new FormData(this);
//   data.append("file", transfer.files)
//
//   // const response = fetch('https://example.com/profile/avatar', {
//   //   method: 'PUT',
//   //   body: data
//   // });
//   // const result = response.json();
//   // console.log(result)
//   // console.log(data)
//
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/upload.php', true);
//   xhr.onload = function(e) {
//     console.log(e)
//   };
//   xhr.send(data);
// });


// var arFiles = [];
// $(document).on('change', '#upload-btn', function(e) {
//
//   var $this = $(this);
//   var $ctrFiles = $('.ctrFiles');
//   var value = $this.val();
//   var fileCnt = $ctrFiles.find('.item').length;
//
//   var nameFile = value.match(/[a-zA-Z0-9а-яА-Я\w\s\-\_\.]+\.([A-Za-z]+)$/gmi);
//   var formatFile = nameFile[0].split(".");
//
//   if(!formatFile[formatFile.length - 1].match(/(pdf|xls[x]?|doc[x]?|txt)/gmi)) {
//     alert("pdf, xls, xlsx, doc, docx, txt");
//     return false;
//   }
//
//
//   if(fileCnt >=5) {
//     $.fancybox.open({
//       src: "#popup-file-save-error",
//       type: "inline"
//     })
//     return false;
//   }
//
//   if (value && !arFiles.includes(value)) {
//     arFiles.push(value);
//     var time = Date.now();
//     $ctrFiles.append($('<div class="item"><div class="cls"></div><span>' + nameFile + '</span></div>').append($this.clone().attr('id', 'att_' + time).addClass("js__edit-input-file").attr('name', 'attach[]')).append("<label for='att_"+ time +"'><svg class='svg svg-edit'><use xlink:href="+BX.message('PATH_TO_SPRITE')+"></use></svg></label>"));
//   }
// });
//
// $(document).on("change", ".js__edit-input-file", function() {
//   var parent = $(this).closest(".item");
//   var nameFile = $(this).val().match(/[a-zA-Z0-9а-яА-Я\w\s\-\_\.]+\.([A-Za-z]+)$/gmi);
//   parent.find("span").text(nameFile);
// })
//
// $(document).on('click', '.ctrFiles .item .cls', function(e) {
//   $(this).closest('.item').remove();
// });

