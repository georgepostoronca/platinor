import forEach from "lodash.forEach";
import debounce from "lodash.debounce";
import Swiper from "swiper";


// ==============================
// Function
// ==============================
var getSiblingsFn = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

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
    forEach(siblings, func);
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

    if(open) {
        open.addEventListener((arg.event ?  arg.event : "click"), function() {

            if(arg.type == "open") {
                arg.el.classList.add(cl);
            } else if(arg.type == "toggle") {
                arg.el.classList.toggle(cl);
            } else {
                arg.el.classList.remove(cl);
            }

            if(arg.callback) {
                arg.callback(this);
            }
        });
    }
}


function onClickClose(elem, fn) { // вызвать в момент показа окна, где elem - окно
    function outsideClickListener(event) {
        if (!elem.contains(event.target) && isVisible(elem)) {  // проверяем, что клик не по элементу и элемент виден
             if(fn) fn();
             document.removeEventListener('click', outsideClickListener);
        }
    }
    document.addEventListener('click', outsideClickListener)
}
function isVisible(elem) { //открыто ли условное окно
   return !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}

// ==============================
// JS Code
// ==============================
(function() {
    var element = ".js__menu-hover";
    var first = "active";
    var active = "hover";
    var inactive = "no-hover";

    forEach(document.querySelectorAll(element), function(el) {
        // console.log(el);
        if(el.classList.contains(first)) {
            getSiblings(el, function(el) {
                el.classList.add(inactive);
                el.classList.remove(active);
            });
        }

        el.addEventListener("mouseover", function() {            
            this.classList.add(active);
            this.classList.remove(inactive);

            getSiblings(this, function(el) {
                el.classList.add(inactive);
                el.classList.remove(active);
            });
        });

        el.addEventListener("mouseout", function() {            
            var active = document.querySelector(element + "." + active);

            forEach(document.querySelectorAll(element), function(el) {
                el.classList.remove(inactive);
                el.classList.remove(active);
            });
            
            getSiblings(document.querySelector(element + "." + first), function(el) {
                el.classList.add(inactive);
                el.classList.remove(active);
            });
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
    callback: function(el) {
        setTimeout(function() {
            onClickClose(searchBlock, function() {
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


// Slider
var swiper = new Swiper('.headslid-slider', {
    autoHeight: true,
    pagination: {
      el: '.headslid__pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});


var headslid = new Swiper('.js__topproduct-slider', {
    slidesPerView: 3,
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    spaceBetween: 24,
    navigation: {
        nextEl: '.topproduct__arrow .arrow-slider__next',
        prevEl: '.topproduct__arrow .arrow-slider__prev',
    }
});

// Product Slider
(function ProductSlider() {
    var el = document.querySelectorAll(".product");
    if(!el) return false; 
    el = [].slice.call(el);
    console.log(el);
    
    el.forEach(function(el, index) {
        console.log(index);
        
        var slider = el.querySelector(".js__product__slider");
        var pagination = el.querySelector(".product__pagination");
        setTimeout(function() {
            var swiper = new Swiper(slider, {
                autoHeight: true,
                nested: true,
                pagination: {
                  el: pagination,
                  clickable: true,
                },
                on: {
                    init: function () {
                        el.classList.remove("loading")
                    },
                },
            });
        }, 100 * index)
        
    });
})();
