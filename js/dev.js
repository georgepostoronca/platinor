// import forEach from "lodash.forEach";
// import debounce from "lodash.debounce";
// import Swiper from "swiper";

function loadScript(url, callback) {
  
  var script = document.createElement("script")
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
  loadScript("js/include/swiper.min.js", function () {
    // Slider
    if (document.querySelector('.js__headslid-slider')) {
      var swiper = new Swiper('.js__headslid-slider', {
        autoHeight: true,
        pagination: {
          el: '.headslid__pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init: function () {
            setTimeout(function () {
              document.querySelector('.headslid').classList.remove("loading");
            }, 100);
          }
        }
      });
    }
    
    // headslid
    if (document.querySelector('.js__topproduct-slider')) {
      var headslid = new Swiper('.js__topproduct-slider', {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: "row",
        spaceBetween: 24,
        navigation: {
          nextEl: '.topproduct__arrow .arrow-slider__next',
          prevEl: '.topproduct__arrow .arrow-slider__prev',
        },
        on: {
          init: function () {
            document.querySelector('.js__topproduct-slider').classList.remove("loading");
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
  });
}

// ==============================
// Function
// ==============================
var getSiblingsFn = function (elem) {
  
  // Setup siblings array and get the first sibling
  console.log("Element: " + elem);
  
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
  type: "open",
  callback: function (el) {
    setTimeout(function () {
      onClickClose(searchBlock, function () {
        searchBlock.classList.remove("active");
      });
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