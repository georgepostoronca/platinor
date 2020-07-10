function scrolled(o) {
  if (o.offsetWidth + o.scrollLeft == o.scrollWidth) {
    o.parentNode.classList.add("end");
    o.parentNode.classList.remove("between");
    o.parentNode.classList.remove("start");
  } else {
    o.parentNode.classList.remove("end");
    o.parentNode.classList.add("between");
    o.parentNode.classList.remove("start");
  }

  if (o.scrollLeft == 0) {
    o.parentNode.classList.remove("end");
    o.parentNode.classList.remove("between");
    o.parentNode.classList.add("start");
  }
}

(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;
    if (!this.parentElement) {
      return null
    } else return this.parentElement.closest(selector)
  };
}(Element.prototype));

// svg4everybody
!function (a, b) {
  "function" == typeof define && define.amd ? define([], function () {
    return a.svg4everybody = b()
  }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b()
}(this, function () {/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
  function a(a, b) {
    if (b) {
      var c = !a.getAttribute("viewBox") && b.getAttribute("viewBox"), d = document.createDocumentFragment(),
        e = b.cloneNode(!0);
      for (c && a.setAttribute("viewBox", c); e.childNodes.length;) d.appendChild(e.firstChild);
      a.appendChild(d)
    }
  }

  function b(b) {
    b.onreadystatechange = function () {
      if (4 === b.readyState) {
        var c = document.createElement("x");
        c.innerHTML = b.responseText, b.s.splice(0).map(function (b) {
          a(b[0], c.querySelector("#" + b[1].replace(/(\W)/g, "\\$1")))
        })
      }
    }, b.onreadystatechange()
  }

  function c(c) {
    function d() {
      for (var c; c = e[0];) {
        var j = c.parentNode;
        if (j && /svg/i.test(j.nodeName)) {
          var k = c.getAttribute("xlink:href");
          if (f && (!g || g(k, j, c))) {
            var l = k.split("#"), m = l[0], n = l[1];
            if (j.removeChild(c), m.length) {
              var o = i[m] = i[m] || new XMLHttpRequest;
              o.s || (o.s = [], o.open("GET", m), o.send()), o.s.push([j, n]), b(o)
            } else a(j, document.getElementById(n))
          }
        }
      }
      h(d, 17)
    }

    c = c || {};
    var e = document.getElementsByTagName("use"),
      f = "shim" in c ? c.shim : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537,
      g = c.validate, h = window.requestAnimationFrame || setTimeout, i = {};
    f && d()
  }

  return c
});
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
var productSlider = "!!";
var productSize = "!!";

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
          slideChangeTransitionEnd: function () {
            if (firstStart) {
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
        if (progresSlideInterval) clearInterval(progresSlideInterval);
        document.querySelector(".headslid").classList.remove("progress-active");

        setTimeout(function () {
          document.querySelector(".headslid").classList.add("progress-active");
          progresSlideInterval = setTimeout(function () {
            document.querySelector(".headslid").classList.remove("progress-active");
            headslid.slideNext();
          }, 8000);
        }, 10)
      }

      var stopBtn = document.querySelectorAll('.js__headslid-stop')
      stopBtn = [].slice.call(stopBtn);
      stopBtn.forEach(function (el) {
        el.addEventListener("mouseover", function () {
          StopSlider();
        });

        el.addEventListener("mouseout", function () {
          PlaySlider();
        });
      });
    }

    // topproduct
    if (document.querySelectorAll('.js__topproduct-slider').length) {
      const topproductSlider = [].slice.call(document.querySelectorAll('.js__topproduct-slider'));
      topproductSlider.forEach(function (item) {
        let topproduct = new Swiper(item, {
          slidesPerView: 3,
          slidesPerColumn: parseInt(item.dataset.slidrow) || 2,
          slidesPerColumnFill: "row",
          spaceBetween: 24,
          threshold: 20,
          navigation: {
            nextEl: item.closest(".topproduct").querySelector(".arrow-slider__next"),
            prevEl: item.closest(".topproduct").querySelector(".arrow-slider__prev"),
          },
          on: {
            init: function () {
              item.classList.remove("loading");
            }
          },
          pagination: {
            el: '.swiper-pagination',
          },
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
              slidesPerColumn: parseInt(item.dataset.slidrow) || 2,
              slidesPerColumnFill: "row",
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              slidesPerColumn: parseInt(item.dataset.slidrow) || 2,
              slidesPerColumnFill: "row",
            },
          }
        });
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

    // Product Slider
    productSlider = function productSliders() {
      // console.log("Reinit Product Slider");

      // prodslid-min slider
      if (document.querySelector('.js__prodslid-min-slider')) {
        var prodslidMin = new Swiper('.js__prodslid-min-slider', {
          slidesPerView: 5,
          spaceBetween: 9,
          navigation: {
            nextEl: '.prodslid-min-button-next',
            prevEl: '.prodslid-min-button-prev',
          },
          on: {
            init: function () {
              document.querySelector('.js__prodslid-min-slider').classList.remove("loading");
            }
          },
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          preventClicks: false,
          preventClicksPropagation: false,
          breakpoints: {
            0: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            880: {
              slidesPerView: 5,
              spaceBetween: 9,
            },
          }
        });
      }

      // prodslid slider
      if (document.querySelector('.js__prodslid-slider')) {
        var prodslider = new Swiper('.js__prodslid-slider', {
          slidesPerView: 1,
          autoHeight: true,
          on: {
            init: function () {
              document.querySelector('.js__prodslid-slider').classList.remove("loading");
            }
          },
          thumbs: {
            swiper: prodslidMin
          }
        });
      }
    }
    productSlider();

    // prodsizeslid slider
    productSize = function prodsizeslid() {
      if (document.querySelector('.js__prodsizeslid-slider')) {
        var prodslidMin = new Swiper('.js__prodsizeslid-slider', {
          // slidesPerView: 5,
          // spaceBetween: 9,
          slidesPerView: 'auto',
          allowTouchMove: false,
          noSwiping: false,
          preventClicks: false,
          preventClicksPropagation: false,
          navigation: {
            nextEl: '.prodsizeslid-button-next',
            prevEl: '.prodsizeslid-button-prev',
          },
          on: {
            init: function () {
              document.querySelector('.js__prodsizeslid-slider').classList.remove("loading");
            }
          },

          breakpoints: {
            0: {
              allowTouchMove: true,
              noSwiping: true,
            },
            1024: {
              allowTouchMove: false,
              noSwiping: false,
            },
          }
        });
      }
    }
    productSize();

    // catalog slider(mobile)
    (function () {

      // breakpoint where swiper will be destroyed
      // and switches to a dual-column layout
      const breakpoint = window.matchMedia('(min-width:768px)');

      // keep track of swiper instances to destroy later
      let mySwiper;

      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////

      const breakpointChecker = function () {

        // if larger viewport and multi-row layout needed
        if (breakpoint.matches === true) {

          // clean up old instances and inline styles when available
          if (mySwiper !== undefined) mySwiper.destroy(true, true);
          if (document.querySelector('.js__catalog-slider')) {
            document.querySelector('.js__catalog-slider').classList.remove("loading");
          }
          // or/and do nothing
          return;

          // else if a small viewport and single column layout needed
        } else if (breakpoint.matches === false) {

          // fire small viewport version of swiper
          return enableSwiper();

        }

      };

      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////

      const enableSwiper = function () {
        mySwiper = new Swiper('.js__catalog-slider', {
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

console.log(productSlider)

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
  
    if(items.length == 0) return false;
    items = [].slice.call(items);
    items.forEach(function (item, index) {
      var $this = item;
      var span = document.createElement("span");
      if (index == 0) {
        $this.classList.add("active");
        span.classList.add("active");
      }
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
      
      if(pagination) {
        pagination.appendChild(span);
      }
    });
  });
})();


// Add class when input is not empty
var inputs = document.querySelectorAll(".js__input-notempty");
if (inputs.length) {
  inputs = [].slice.call(inputs);
  inputs.forEach(function (el) {
    el.addEventListener("focus", function() {
      // console.log("Focus");
      this.classList.add("focus");
    });
    el.addEventListener("blur", function (item) {
      let $this = this;
      setTimeout(function() {
        if(!$this.value) $this.classList.remove("focus")
        // console.log("blur")
      }, 100)
    })
  });
}


// Tabs
function Tabs(el) {
  var $this = this;
  this.root = document.querySelector(el);

  if (!this.root) return false;

  if (this.root.querySelectorAll(".js-tabs-btn")) {
    this.btns = [].slice.call(this.root.querySelectorAll(".js-tabs-btn"));
  }

  if (this.root.querySelectorAll(".js-tabs-content")) {
    this.contents = [].slice.call(this.root.querySelectorAll(".js-tabs-content"));
  }

  this.btns[0].classList.add("active");
  this.contents[0].classList.add("active");

  this.btns.forEach(function (item) {
    item.addEventListener("click", function (el) {
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

    if (document.querySelector(".js-block-newpass").classList.contains("active")) {
      console.log("True")
      input.forEach(function (el) {
        el.required = true;
      })
    } else {
      console.log("False")
      input.forEach(function (el) {
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
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}


var validatorClass = document.querySelectorAll(".js-form-validator");
if (validatorClass.length) {
  loadScript(defaultPATH + "/js/include/jquery.maskedinput.min.js", function () {
    console.log("maskedinput Loaded");

    var el = [].slice.call(document.querySelectorAll(".js-phone-mask"));
    el.forEach(function (item) {
      $(item).mask("+9 (999) 999 99 99", {autoclear: true});
    });
  });
}


// Check Password
function check(pass, input) {
  if ($(input).hasClass("js-no-pass-check")) return false;
  if ($(input).attr("name") != "repeat-pass") {
    if (!$(input).parent().find(".pass-check").length) {
      $(input).parent().append("<div class='pass-check'><span></span><div></div></div>")
    }

    var protect = 0;

    if (pass.length < 8) {
      $(input).parent().removeClass('normal');
      $(input).parent().removeClass("good");
      $(input).parent().removeClass("verygood");
      $(input).parent().addClass('low');
      $(input).parent().find(".pass-check span").text("Минимум 8 символов")
      return "Минимум 8 символов";
    }

    //a,s,d,f
    var small = "([a-zа-я]+)";
    if (pass.match(small)) {
      protect++;
    }

    //A,B,C,D
    var big = "([A-ZА-Я]+)";
    if (pass.match(big)) {
      protect++;
    }
    //1,2,3,4,5 ... 0
    var numb = "([0-9]+)";
    if (pass.match(numb)) {
      protect++;
    }
    //!@#$
    // var vv = /\W/;
    var vv = /[!@#$]/;
    if (pass.match(vv)) {
      protect++;
    }

    if (protect == 1) {
      $(input).parent().removeClass("low");
      $(input).parent().removeClass("good");
      $(input).parent().removeClass("verygood");
      $(input).parent().addClass('low');
      $(input).parent().find(".pass-check span").text("Слабый")
      return "Слабый";
    }

    if (protect == 2) {
      $(input).parent().removeClass("low");
      $(input).parent().removeClass("good");
      $(input).parent().removeClass("verygood");
      $(input).parent().addClass('normal');
      $(input).parent().find(".pass-check span").text("Средний")
      return "Средний";
    }
    if (protect == 3) {
      $(input).parent().removeClass("low");
      $(input).parent().removeClass("normal");
      $(input).parent().removeClass("verygood");
      $(input).parent().addClass('good');
      $(input).parent().find(".pass-check span").text("Хороший")
      return "Хороший";
    }
    if (protect == 4) {
      $(input).parent().removeClass("low");
      $(input).parent().removeClass("normal");
      $(input).parent().removeClass("good");
      $(input).parent().addClass('verygood');
      $(input).parent().find(".pass-check span").text("Высокий")
      return "Высокий";
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  var validatorClass = document.querySelectorAll(".js-form-validator");
  if (validatorClass.length) {
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

      let arrinput = [].slice.apply(document.querySelectorAll("input[type='password']"));
      arrinput.forEach(function (input) {
        input.addEventListener("input", function () {
          check(this.value, this);
        });
      });

    });
  }
});


// Tab Table
var btnopentabtable = [].slice.call(document.querySelectorAll(".js-open-tabtable"));
if (btnopentabtable.length) {
  btnopentabtable.forEach(function (el) {
    el.addEventListener("click", function (item) {
      var parent = this.closest(".tabtable__item");
      parent.classList.toggle("active");

      if (parent.classList.contains("active")) {
        parent.querySelector("button span").innerText = "Свернуть";
      } else {
        parent.querySelector("button span").innerText = "Подробнее";
      }
    });
  });
}


// tabshead check fixed
var tahheadfix = document.querySelector(".js-tabhead");
if (tahheadfix) {
  document.body.onscroll = function (scroll) {
    if (window.scrollY >= tahheadfix.offsetTop) {
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

  for (let i = 1; i <= 4; i++) {
    let input = document.createElement("input");
    input.type = "number";
    input.name = "number-" + i;
    input.min = "0";
    input.max = "9";
    input.required = true;

    if (i != 1) input.disabled = true;
    el.append(input);
    inputs.push(input);
  }

  // el.addEventListener("resetPhoneCode", function() {
  //   activeInput = 0;
  //   inputs.forEach(function (item, index) {
  //     if (index != 0) input.disabled = true;
  //   });
  // });

  inputs.forEach(function (item, index) {
    if (index == 0) {
      item.addEventListener("focus", function () {
        activeInput = 0;
      });
    }

    item.addEventListener("input", function () {
      let val = this.value;
      if (this.value != "") {
        if (parseInt(this.value) < parseInt(this.min)) {
          this.value = this.min;
        }
        if (parseInt(this.value) > parseInt(this.max)) {
          this.value = this.dataset.value;
        }
      }
      this.dataset.value = this.value;

      if (this.value) {
        if (activeInput == 3) {
          // this.blur();
          nrclick = 0;
          return false;
        }
        activeInput++;
        inputs[activeInput].disabled = false;
        inputs[activeInput].focus();
        nrclick = 0;
      }
    });
    
    item.addEventListener("focus", function() {
      let index = $(this).index();
      this.value = "";
      activeInput = index;
    });


    let nrclick = 0;
    item.onkeydown = function (event) {
      var key = event.keyCode || event.charCode;
      if (key == 8 || key == 46) {
        if (nrclick > 0 || !this.value) {
          event.target.value = "";
          if (activeInput == 0) return false;
          activeInput--;
          inputs[activeInput + 1].disabled = true;
          inputs[activeInput].focus();
          nrclick = 0;
        }
        nrclick++;
      }
    };
  })
}

var phonecode = [].slice.call(document.querySelectorAll(".js-phone-code"));
if (phonecode.length) {
  phonecode.forEach(function (item, index) {
    PhoneCode(item);
  });
}

// Modal Tab
var tabmodalbtn = [].slice.call(document.querySelectorAll(".js-tabmodal-btn"));
if (tabmodalbtn.length) {
  tabmodalbtn.forEach(function (item) {
    item.addEventListener("click", function () {
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

$('.js-modal').remodal({
  closeOnOutsideClick: false,
  hashTracking: false
});

$(document).on('closing', '.js-modal', function (e) {

  if ($(".cmodal").length) {
    if ($(e.currentTarget).hasClass("remodal-rel")) {
      setTimeout(function () {
        $(".remodal-rel .cmodal-item").removeClass("active");
        $(".cmodal-rel-reglogin").addClass("active");

        $(".cmodal-tab__btn:first-child").addClass("active").siblings().removeClass("active");
        $(".cmodal-rel-login").addClass("active");
      }, 300)
    }

    if ($(e.currentTarget).hasClass("remodal-rep")) {
      setTimeout(function () {
        $(".remodal-rep .cmodal-item").removeClass("active");
        $(".cmodal-rep-phone").addClass("active");
      }, 300)
    }

    $(".cmodal-item form").each(function (item) {
      $(this).get(0).reset();
      $(this).find("input").removeClass("error notempty")
      $(this).find("textarea").removeClass("error")
    });
  }
});


$(document).on('opened', '.js-modal', function (e) {
  
  let form = this.querySelector("form");
  if(form) {
    let firstInput = form.querySelectorAll("input")[0];
    firstInput.focus();
  }
  
  let tmp = document.createElement("div");
  tmp.dataset.dataRemodalAction = "close";
  tmp.classList.add("remodal-close");
  tmp.classList.add("remodal-close-root");

  tmp.addEventListener("click", function () {
    var close = $(e.currentTarget).closest(".remodal-wrapper").find('[data-remodal-action="close"]')
    close.trigger("click");
  });

  if (!$(e.currentTarget).closest(".remodal-wrapper").find(".remodal-close-root").length) {
    $(e.currentTarget).closest(".remodal-wrapper").append(tmp)
  }
});

// Product Tab
productTab = function () {
  if ($(".js-producttab").length) {
    $(".js-producttab-btn").each(function () {
      $(this).click(function () {
        let index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(this).closest(".js-producttab").find(".bproduct-tab__info").eq(index).addClass("active").siblings().removeClass("active");
      });
    });

    $(".js-producttab-minimize").each(function () {
      let open = "Показать все";
      let close = "Скрыть";
      $(this).click(function () {
        let parent = $(this).closest(".bproduct-tab__info");

        if (parent.hasClass("max")) {
          parent.removeClass("max");
          $(this).removeClass("active");
          $(this).find("span").text(open)
        } else {
          let body = $("html, body");
          body.stop().animate({
            scrollTop: $(".bproduct-tab").offset().top - $(".menu").height() - 20},
            500, 'swing');
          parent.addClass("max");
          $(this).addClass("active");
          $(this).find("span").text(close)
        }
      });
    });
  }
}
productTab();


// RangeSlider
(function () {
  var range = document.querySelector('.js-range');
  if (!document.querySelector('.js-range')) return false;

  var wrap = document.querySelector('.js-range-input');
  var input0 = range.querySelector(".js-range-min");
  var input1 = range.querySelector(".js-range-max");
  var inputs = [input0, input1];

  let min = parseInt(wrap.dataset.min) || 0;
  let max = parseInt(wrap.dataset.max) || 1000000;

  noUiSlider.create(wrap, {
    start: [0, max],
    connect: true,
    step: 1,
    // tooltips: [wNumb({
    //   decimals: 0,
    //   suffix: ' ₽'
    // }), wNumb({
    //   decimals: 0,
    //   suffix: ' ₽'
    // })],
    range: {
      'min': min,
      'max': max
    },
  });

  wrap.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = parseInt(values[handle]);
  });

  let event = new Event('change');
  wrap.noUiSlider.on('change', function (values, handle) {
    console.log("End")
    inputs[handle].dispatchEvent(event);
  });

  wrap.addEventListener("resetRange", function () {
    wrap.noUiSlider.reset();
  });

  // Listen to keydown events on the input field.
  inputs.forEach(function (input, handle) {

    input.addEventListener('change', function () {
      wrap.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function (e) {

      var values = wrap.noUiSlider.get();
      var value = Number(values[handle]) + "₽";

      // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
      var steps = wrap.noUiSlider.steps();

      // [down, up]
      var step = steps[handle];

      var position;

      // 13 is enter,
      // 38 is key up,
      // 40 is key down.
      switch (e.which) {

        case 13:
          wrap.noUiSlider.setHandle(handle, this.value);
          break;

        case 38:

          // Get step to go increase slider value (up)
          position = step[1];

          // false = no step is set
          if (position === false) {
            position = 1;
          }

          // null = edge of slider
          if (position !== null) {
            wrap.noUiSlider.setHandle(handle, value + position);
          }

          break;

        case 40:

          position = step[0];

          if (position === false) {
            position = 1;
          }

          if (position !== null) {
            wrap.noUiSlider.setHandle(handle, value - position);
          }

          break;
      }
    });
  });
})();


// Custom Select
const customselect = [].slice.call(document.querySelectorAll(".js-cselect"));
const btnReset = [].slice.call(document.querySelectorAll(".js-form-reset"));

let arrFilter = [];
customselect.forEach(function (item) {
  const input = [].slice.call(item.querySelectorAll("input"));
  const selected = item.querySelector(".js-cselect-selected");
  const head = item.querySelector(".js-cselect-head");
  const reset = item.querySelector(".js-cselect-reset");

  const form = input[0].form;

  const min = item.querySelector(".js-range-min");
  const max = item.querySelector(".js-range-max");


  if (min && max) {
    selected.innerText = min.value + (min.value > 0 ? "₽" : "") + " - " + max.value + (max.value > 0 ? "₽" : "");
  }

  selected.addEventListener("click", function () {
    head.classList.toggle("active");
    item.classList.toggle("zindex");
    item.classList.remove("dishov");
  });

  jQuery(function ($) {
    $(document).mouseup(function (e) { // событие клика по веб-документу
      var div = $(item); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        head.classList.remove("active");
        item.classList.remove("zindex");
      }
    });
  });

  // Init
  function init() {
    let checkedInput = 0;
    input.forEach(function (el) {
      if (el.classList.contains("js-notindexed")) return false;
      if (el.checked) {
        checkedInput++;
      } else {
        return false;
      }

      let value = el.dataset.value;
      if (el.type === "checkbox") {
        if (checkedInput == 0) {
          selected.innerText = "Не выбрано";
          head.classList.remove("selected");
          head.classList.remove("active");
          item.classList.remove("zindex");
        } else {
          selected.innerText = "Выбрано " + checkedInput;
        }
      } else {
        selected.innerText = value;
        if (item.classList.contains("nocheck")) {
          head.classList.remove("active");
          item.classList.remove("zindex");
          item.classList.add("dishov");
        }
      }
      head.classList.add("selected");
    });
  }

  setTimeout(function () {
    init();
  }, 100)

  // Render Selected
  function renderSelectedItem() {
    $(".filter-selected").empty();
    let arr = [];
    $(".js-filter").find("input").each(function () {
      if ($(this).prop("checked")) {
        arr.push(this);
      }
    });

    arr.forEach(function (item) {
      let tmp = document.createElement("div")
      tmp.classList.add("filter-selected__item");

      let span = document.createElement("span")
      let button = document.createElement("button")
      button.type = "button";

      button.addEventListener("click", function () {
        $(item).trigger("click");
        item.checked = false;

        if (!$(item).closest(".custom-select__content").find("input:checked").length) {
          // console.log("true")
          $(item).closest(".js-cselect").find(".js-cselect-head").removeClass("selected");
        }
        if (item.type == "radio") {
          $(item).closest(".js-cselect").find(".js-cselect-selected").text("Не выбрано");
        }

        $(tmp).remove();
      });

      span.innerText = item.dataset.value

      tmp.append(span);
      tmp.append(button);
      $(".filter-selected").append($(tmp))
    });
  }

  input.forEach(function (el) {
    el.addEventListener("click", function () {
      if (this.classList.contains("js-range-result")) return false;
      if (this.classList.contains("js-notindexed")) return false;

      let checkedInput = 0;
      input.forEach(function (el) {
        if (el.classList.contains("js-notindexed")) return false;
        if (el.checked) {
          checkedInput++;
        }
      });

      // let value = this.value;
      let value = this.dataset.value;
      if (this.type === "checkbox") {
        if (checkedInput == 0) {
          selected.innerText = "Не выбрано";
          head.classList.remove("selected");
          head.classList.remove("active");
          item.classList.remove("zindex");
        } else {
          selected.innerText = "Выбрано " + checkedInput;
        }
      } else {
        selected.innerText = value;
        if (item.classList.contains("nocheck")) {
          head.classList.remove("active");
          item.classList.remove("zindex");
          item.classList.add("dishov");
        }
      }

      head.classList.add("selected");
    });

    renderSelectedItem();

    // Input Change
    el.addEventListener("change", function () {
      if (this.classList.contains("js-range-result")) {
        selected.innerText = min.value + (min.value > 0 ? "₽" : "") + " - " + max.value + (max.value > 0 ? "₽" : "");
      }

      renderSelectedItem();

      let submitData = this.form.dataset.submit;
      window[submitData](this.form);
    });
  });

  reset.addEventListener("click", function () {
    input.forEach(function (el) {
      el.checked = false;
      head.classList.remove("selected");
      head.classList.remove("active");

      if (input[0].type === "checkbox") {
        selected.innerText = "Не выбрано";
      } else {
        selected.innerText = "Не выбрано";
      }
    });

    setTimeout(function () {
      renderSelectedItem();
    }, 100);
  });

  // if (!item.querySelector(".js-cselect-dropdown")) {
  //   if (input[0] && (input[0].type === "checkbox" || input[0].type === "radio")) {
  //     input[0].click();
  //   }
  // }

  // Reset form
  btnReset.forEach(function (el) {
    el.addEventListener("click", function () {
      $(".filter-selected").empty();

      const resetEvent = new Event("resetRange");
      document.querySelector('.js-range-input').dispatchEvent(resetEvent);

      input.forEach(function (el) {
        el.checked = false;
        head.classList.remove("selected");
        head.classList.remove("active");

        if (input[0].type === "checkbox") {
          selected.innerText = "Не выбрано";
        } else {
          selected.innerText = "Не выбрано";
        }
      });
    })
  });
});

// SelectDropDown Check/Uncheck
$(".js-cselect-dropdown").each(function () {
  // let root = $(this).closest(".js-cselect-dropdown");
  // let input = $(this).find(".js-notindexed");
  const head = $(this).closest(".custom-select__dropdown");
  // const headParent = $(this).closest(".js-cselect").find(".js-cselect-head");
  // let inputs = $(this)
  //                 .closest(".js-cselect-dropdown")
  //                 .find(".custom-select__dropdown-content input");
  //
  // const dropdown = root.closest(".dropdown");
  // const parent = $(this).closest(".js-cselect");
  // const selected = parent.find(".js-cselect-selected");
  //
  // let inputLength = inputs.length;
  // let inputChecked = 0;

  // console.log(head)
  head.on("click", function () {
    $(this).toggleClass("open")
  });

  // input.on("change", function() {
  //   // inputs.each(function() {
  //   //   $(this).trigger("click");
  //   // });
  //
  //   if($(this).prop("checked")) {
  //     root.addClass("open")
  //     inputs.each(function() {
  //       this.checked = true;
  //       inputChecked++;
  //     })
  //   } else {
  //     root.removeClass("open")
  //     inputs.each(function() {
  //       this.checked = false;
  //       inputChecked = 0;
  //     })
  //   }
  //
  //   let num = 0;
  //   dropdown.find("input:not(.js-notindexed)").each(function() {
  //     if($(this).prop("checked")) {
  //       num++;
  //     }
  //   })
  //   selected.text("Выбрано " + num);
  //   headParent.addClass("selected");
  // });
  //
  // inputs.each(function() {
  //   // inputChecked = 0;
  //   $(this).on("change", function() {
  //     if($(this).prop("checked")) {
  //       inputChecked++;
  //     } else {
  //       inputChecked--;
  //     }
  //
  //     console.log(inputChecked)
  //     if(inputChecked == 0) {
  //       input.prop("checked", false)
  //     } else {
  //       input.prop("checked", true)
  //     }
  //   });
  // });
});


function ChangeGrid(el) {
  const parent = el.parentElement;
  const max = parent.querySelector(".max");
  const min = parent.querySelector(".min");

  const grid = document.querySelector(".js-changegrid");

  if (el.classList.contains("max")) {
    max.classList.add("active");
    min.classList.remove("active");
    grid.classList.remove("min")
  } else {
    max.classList.remove("active");
    min.classList.add("active");
    grid.classList.add("min")
  }
}

// Open Filter
$(".js-open-filter").click(function () {
  $(".js-filter").addClass("active");
  $("body").addClass("block-scroll");
});

$(".js-close-filter").click(function () {
  $(".js-filter").removeClass("active");
  $("body").removeClass("block-scroll");
});


// Scroll Size
(function () {
  let root = document.querySelector(".js-scrollsize");
  if (!root) return false;
  let wrap = root.querySelector(".js-scrollsize-wrap");
  let prev = root.querySelector(".js-scrollsize-prev");
  let next = root.querySelector(".js-scrollsize-next");
  let item = root.querySelector(".js-scrollsize-item");

  if (wrap.scrollWidth == wrap.offsetWidth) {
    root.classList.add("no-arrow");
  } else {
    root.classList.remove("no-arrow");
  }

  window.addEventListener("resize", function () {
    if (wrap.scrollWidth == wrap.offsetWidth) {
      root.classList.add("no-arrow");
    } else {
      root.classList.remove("no-arrow");
    }
  });

  function checkBtnDisable() {
    if (wrap.scrollLeft === 0) {
      prev.classList.add("disable")
      next.classList.remove("disable")
    } else if (wrap.scrollLeft === wrap.scrollWidth - wrap.offsetWidth) {
      prev.classList.remove("disable")
      next.classList.add("disable")
    } else {
      prev.classList.remove("disable")
      next.classList.remove("disable")
    }
  }

  checkBtnDisable();

  // function checkInputChecked() {
  //   let inputs = $(root).find("input");
  //   console.log($(root).find("input:checked"));
  //
  //   // if($(root).find("input:checked"))
  //
  //   inputs.each(function() {
  //     $(this).on("change", function() {
  //       $(this).parent().addClass("checked").siblings().removeClass("checked");
  //     });
  //   });
  // }
  // checkInputChecked();

  prev.addEventListener("click", function () {
    wrap.scrollLeft -= item.clientWidth;
    checkBtnDisable();
  });

  next.addEventListener("click", function () {
    wrap.scrollLeft += item.clientWidth;
    checkBtnDisable();
  });
})();


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


var arFiles = [];
$(document).on('change', '#upload-btn', function (e) {

  var $this = $(this);
  var $ctrFiles = $('.ctrFiles');
  var value = $this.val();
  var fileCnt = $ctrFiles.find('.item').length;

  var nameFile = value.match(/[a-zA-Z0-9а-яА-Я\w\s\-\_\.]+\.([A-Za-z]+)$/gmi);
  var formatFile = nameFile[0].split(".");

  if (!formatFile[formatFile.length - 1].match(/(jpg|jpeg|png|webp)/gmi)) {
    alert("jpg,jpeg,webp,png");
    return false;
  }


  if (fileCnt >= 5) {
    alert("Не больше 5 файлов");
    return false;
  }

  console.log(arFiles)
  if (value && !arFiles.includes(value)) {
    arFiles.push(value);
    var time = Date.now();
    $ctrFiles.append(
      $('<div class="item"><div class="cls">' +
        '</div>' +
        '<span>' + nameFile + '</span>' +
        '</div>')
        .append($this.clone().attr('id', 'att_' + time).addClass("js__edit-input-file")
          .attr('name', 'attach[]'))
        .append("<label for='att_" + time + "'></label>"));
  }
});

$(document).on("change", ".js__edit-input-file", function () {
  var parent = $(this).closest(".item");
  var nameFile = $(this).val().match(/[a-zA-Z0-9а-яА-Я\w\s\-\_\.]+\.([A-Za-z]+)$/gmi);
  parent.find("span").text(nameFile);
});

$(document).on('click', '.ctrFiles .item .cls', function (e) {
  $(this).closest('.item').remove();
});

$(document).on('focus', 'input[type="phone"]', function (e) {
  if(!e.currentTarget.value) {
    setTimeout(function() {
      console.log("Start")
      e.currentTarget.setSelectionRange(0,0);
    }, 200);
  }
});