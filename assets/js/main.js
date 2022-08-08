"use strict";

/* SLIDE UP */
var slideUp = function slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property'); //alert("!")
  }, duration);
};
/* SLIDE DOWN */


var slideDown = function slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.removeProperty('display');
  var display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  var height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
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
  }, duration);
};
/* TOOGGLE */


var slideToggle = function slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

(function ($) {
  $(document).ready(function () {
    svg4everybody({});
  });
})(jQuery);

window.addEventListener("resize", function () {
  var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
});
window.addEventListener("load", function () {
  var body = this.document.querySelector("body");
  var html = this.document.querySelector("html");
  var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

  document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // aos

  setTimeout(function () {
    AOS.init({
      duration: 800,
      once: true
    });
  }, 10); // aos end
  // SELECT ===================================================

  function closeSelect() {
    selects.forEach(item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    dropDowns.forEach(item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        slideUp(item, 100);
      }
    });
  }

  var selectsInside = document.querySelector('.selects-inside');
  var selectTrigger = document.querySelectorAll('.select__trigger');
  var selects = document.querySelectorAll('.selecter');
  var dropDowns = document.querySelectorAll('.select__dropdown');
  var dropDownOption = document.querySelectorAll('.select__option');
  selectTrigger && selectTrigger.forEach(item => {
    item.addEventListener('click', function () {
      var container = this.closest('.selecter');
      var dropdown = container.querySelector('.select__dropdown');
      var selectsItems = [...selects].filter(item => item !== container);
      var dropDownsItems = [...dropDowns].filter(item => item !== dropdown);
      selectsItems.forEach(item => {
        item.classList.remove('active');
      });
      dropDownsItems.forEach(item => {
        item.classList.remove('active');
        slideUp(item, 100);
      }); // closeSelect()

      if (!container.classList.contains('active')) {
        container.classList.add('active');
        dropdown && dropdown.classList.add('active');
        slideDown(dropdown, 100);
      } else {
        container.classList.remove('active');
        dropdown && dropdown.classList.remove('active');
        slideUp(dropdown, 100);
      }
    });
  });
  selectsInside && selectsInside.addEventListener('click', function (e) {
    var target = e.target;

    if (!target.closest('.selecter')) {
      closeSelect();
    }
  });
  dropDownOption && dropDownOption.forEach(item => {
    item.addEventListener('click', function () {
      var container = this.closest('.selecter');
      var valueItem = container.querySelector('.select__value');

      if (valueItem) {
        var _valueImage = valueItem.querySelector("img");
      }

      var input = container.querySelector('.select__input');
      var options = container.querySelectorAll('.select__option');
      var formItem = this.closest('.form-item');
      var trigger = container.querySelector('.select__trigger');

      if (trigger.classList.contains('placeholder')) {
        trigger.classList.remove('placeholder');
      }

      if (formItem) {
        if (formItem.classList.contains('error')) {
          formItem.classList.remove('error');
        }
      }

      var value = this.getAttribute('data-value');
      var valueSource = this.getAttribute("data-src"); // const valueText = container.querySelector('.select__elem')

      if (valueItem && !valueItem.classList.contains("lang-img")) {
        valueItem.innerHTML = value;
      } else if (valueItem && valueItem.classList.contains("lang-img") && valueImage && valueSource) {
        valueImage.src = valueSource;
      }

      input.value = value;
      options.forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
      closeSelect();
    });
  }); // END SELECT ===================================================
  // header search 

  var SearchBlock = document.querySelectorAll(".header__search");

  if (SearchBlock) {
    SearchBlock.forEach(el => {
      var searchInput = el.querySelector(".header-search__input");
      var searchField = el.querySelector(".search__box");
      searchInput && searchInput.addEventListener("focus", function () {
        if (searchField && !searchField.classList.contains("active")) {
          slideDown(searchField, 200);
          searchField.classList.add("active");
        }
      }); // searchInput && searchInput.addEventListener("blur",function(){
      //   if(searchField && searchField.classList.contains("active")){
      //     slideUp(searchField,200)
      //     searchField.classList.remove("active")
      //   }
      // })

      window.addEventListener("click", function (e) {
        if (!e.target.closest('.header__search')) {
          if (searchField) {
            slideUp(searchField, 200);
            searchField.classList.remove("active");
          }
        }
      });
    });
  } // header search end
  // cart


  var cartBlock = this.document.querySelector(".product__cart");
  var cartBtn = this.document.querySelector(".header__cart");
  var overlay = this.document.querySelector(".overlay");

  if (cartBlock && cartBtn) {
    // main 
    cartBtn.addEventListener("click", function () {
      cartBlock.classList.add("active");
      overlay.classList.add("active");
      body.classList.add("lock");
      html.classList.add("lock");
    });
    var closeCart = cartBlock.querySelector(".cart__close");

    var closeCartFunc = function closeCartFunc() {
      cartBlock.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("lock");
      html.classList.remove("lock");
    };

    closeCart && closeCart.addEventListener("click", closeCartFunc);

    if (overlay) {
      window.addEventListener("click", function (e) {
        if (e.target == overlay) {
          closeCartFunc();
        }
      });
    } // main end
    // cart product


    var productItems = cartBlock.querySelectorAll(".cart__item");

    if (productItems) {
      // count cart products
      var cartItemsLenght = function cartItemsLenght() {
        var cartList = cartBlock.querySelectorAll(".cart__item");
        var cartNumber = cartList.length;
        var cartCircle = cartBlock.querySelector(".cart__header .cart__count");
        var cartShopValue = cartBlock.querySelector(".cart__header .cart-name__count");

        if (cartCircle && cartShopValue) {
          cartCircle.innerHTML = cartNumber;
          cartShopValue.innerHTML = "(" + cartNumber + ")";
        }
      }; // count cart products end
      // calculate func


      var calculatePrice = function calculatePrice() {
        var cartList = cartBlock.querySelectorAll(".cart__item");
        var totalValuePrice = 0;
        var totalPriceHolder = cartBlock.querySelector(".cart__total-price .value");

        if (cartList.length >= 1) {
          cartList.forEach(el => {
            var productInput = el.querySelector("input").value;
            var product__price = el.querySelector(".cart-item__price .value");

            if (productInput && product__price) {
              totalValuePrice += parseInt(productInput) * parseFloat(product__price.innerHTML); // console.log(totalValuePrice)

              if (totalPriceHolder) {
                totalPriceHolder.innerHTML = totalValuePrice;
              }
            }
          });
        } else {
          if (totalPriceHolder) {
            totalPriceHolder.innerHTML = totalValuePrice;
          }
        }
      }; // calculate func end


      productItems.forEach(block => {
        var plusProduct = block.querySelector(".cart-plus__btn");
        var minusProduct = block.querySelector(".cart-minus__btn");
        var itemInput = block.querySelector(".cart-item__input");

        if (itemInput) {
          // count buttons
          plusProduct && plusProduct.addEventListener("click", function () {
            var productValue = parseInt(itemInput.value) + 1;
            itemInput.value = productValue;
            calculatePrice();
          });
          minusProduct && minusProduct.addEventListener("click", function () {
            var productValue = parseInt(itemInput.value) - 1;

            if (productValue < 1) {
              productValue = 1;
              itemInput.value = productValue; // calculatePrice()
            } else {
              itemInput.value = productValue;
              calculatePrice();
            }
          }); // count buttons
          // input validate

          itemInput.addEventListener("change", function () {
            if (parseInt(itemInput.value) < 1 || itemInput.value == "") {
              itemInput.value = 1;
            }

            calculatePrice();
          }); // input validate end

          calculatePrice();
          cartItemsLenght();
        } // remove item


        var removeItem = block.querySelector(".cart-item__remove");
        removeItem && removeItem.addEventListener("click", function () {
          block.remove();
          calculatePrice();
          cartItemsLenght();
        }); // remove item end
      });
    }
  } // cart end
  // header menu


  var headerBurger = this.document.querySelector(".header__burger");
  var headerMobileMenu = this.document.querySelector(".header-menu__mobile");

  if (headerMobileMenu && headerBurger) {
    headerBurger.addEventListener("click", function () {
      headerMobileMenu.classList.toggle("active");
      headerBurger.classList.toggle("active");

      if (headerMobileMenu.classList.contains("active")) {
        body.classList.add("lock");
        html.classList.add("lock");
      } else {
        body.classList.remove("lock");
        html.classList.remove("lock");
      }
    }); // header menu list

    var headerMenuLinks = this.document.querySelectorAll(".mobile-link__wrapp");

    if (headerMenuLinks) {
      headerMenuLinks.forEach(link => {
        var trigger = link.querySelector(".mobile-link__trigger");
        var menuDrop = link.querySelector(".mobile-link__dropdown");
        trigger && trigger.addEventListener("click", function () {
          trigger.classList.toggle("active");
          slideToggle(menuDrop, 300);
        });
      });
    } // header menu list end

  } // header menu end
  // swipers


  var swiperProduct = new Swiper(".product-options .options__slider .swiper-main", {
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: {
      nextEl: ".product-options .options__slider .slider-btn-next.main-btn",
      prevEl: ".product-options .options__slider .slider-btn-prev.main-btn"
    },
    speed: 700,
    breakpoints: {
      1025: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      901: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      501: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  }); // swipers end
  // back to top btn

  var backToTop = document.querySelector(".back-to-top__btn");

  if (backToTop) {
    var CountTop = function CountTop() {
      if (window.scrollY > 500) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    };

    CountTop();
    window.addEventListener("scroll", CountTop);
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  } // back to top btn end

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic2xpZGVVcCIsInRhcmdldCIsImR1cmF0aW9uIiwic3R5bGUiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJib3hTaXppbmciLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwid2luZG93Iiwic2V0VGltZW91dCIsImRpc3BsYXkiLCJyZW1vdmVQcm9wZXJ0eSIsInNsaWRlRG93biIsImdldENvbXB1dGVkU3R5bGUiLCJzbGlkZVRvZ2dsZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic3ZnNGV2ZXJ5Ym9keSIsImpRdWVyeSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2aCIsImlubmVySGVpZ2h0IiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0UHJvcGVydHkiLCJib2R5IiwicXVlcnlTZWxlY3RvciIsImh0bWwiLCJBT1MiLCJpbml0Iiwib25jZSIsImNsb3NlU2VsZWN0Iiwic2VsZWN0cyIsImZvckVhY2giLCJpdGVtIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJkcm9wRG93bnMiLCJzZWxlY3RzSW5zaWRlIiwic2VsZWN0VHJpZ2dlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcm9wRG93bk9wdGlvbiIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJkcm9wZG93biIsInNlbGVjdHNJdGVtcyIsImZpbHRlciIsImRyb3BEb3duc0l0ZW1zIiwiYWRkIiwiZSIsInZhbHVlSXRlbSIsInZhbHVlSW1hZ2UiLCJpbnB1dCIsIm9wdGlvbnMiLCJmb3JtSXRlbSIsInRyaWdnZXIiLCJ2YWx1ZSIsImdldEF0dHJpYnV0ZSIsInZhbHVlU291cmNlIiwiaW5uZXJIVE1MIiwic3JjIiwiU2VhcmNoQmxvY2siLCJlbCIsInNlYXJjaElucHV0Iiwic2VhcmNoRmllbGQiLCJjYXJ0QmxvY2siLCJjYXJ0QnRuIiwib3ZlcmxheSIsImNsb3NlQ2FydCIsImNsb3NlQ2FydEZ1bmMiLCJwcm9kdWN0SXRlbXMiLCJjYXJ0SXRlbXNMZW5naHQiLCJjYXJ0TGlzdCIsImNhcnROdW1iZXIiLCJsZW5ndGgiLCJjYXJ0Q2lyY2xlIiwiY2FydFNob3BWYWx1ZSIsImNhbGN1bGF0ZVByaWNlIiwidG90YWxWYWx1ZVByaWNlIiwidG90YWxQcmljZUhvbGRlciIsInByb2R1Y3RJbnB1dCIsInByb2R1Y3RfX3ByaWNlIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwiYmxvY2siLCJwbHVzUHJvZHVjdCIsIm1pbnVzUHJvZHVjdCIsIml0ZW1JbnB1dCIsInByb2R1Y3RWYWx1ZSIsInJlbW92ZUl0ZW0iLCJoZWFkZXJCdXJnZXIiLCJoZWFkZXJNb2JpbGVNZW51IiwidG9nZ2xlIiwiaGVhZGVyTWVudUxpbmtzIiwibGluayIsIm1lbnVEcm9wIiwic3dpcGVyUHJvZHVjdCIsIlN3aXBlciIsInNwYWNlQmV0d2VlbiIsInNsaWRlc1BlclZpZXciLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwic3BlZWQiLCJicmVha3BvaW50cyIsImJhY2tUb1RvcCIsIkNvdW50VG9wIiwic2Nyb2xsWSIsInNjcm9sbFRvIiwidG9wIiwiYmVoYXZpb3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDQyxNQUFELEVBQTRCO0VBQUEsSUFBbkJDLFFBQW1CLHVFQUFSLEdBQVE7RUFDMUNELE1BQU0sQ0FBQ0UsS0FBUCxDQUFhQyxrQkFBYixHQUFrQyx5QkFBbEM7RUFDQUgsTUFBTSxDQUFDRSxLQUFQLENBQWFFLGtCQUFiLEdBQWtDSCxRQUFRLEdBQUcsSUFBN0M7RUFDQUQsTUFBTSxDQUFDRSxLQUFQLENBQWFHLFNBQWIsR0FBeUIsWUFBekI7RUFDQUwsTUFBTSxDQUFDRSxLQUFQLENBQWFJLE1BQWIsR0FBc0JOLE1BQU0sQ0FBQ08sWUFBUCxHQUFzQixJQUE1QztF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RixDQU5EOztJQU9Bc0UsUUFBUTtJQUNSbkcsTUFBTSxDQUFDWSxnQkFBUCxDQUF3QixRQUF4QixFQUFpQ3VGLFFBQWpDO0lBQ0FELFNBQVMsQ0FBQ3RGLGdCQUFWLENBQTJCLE9BQTNCLEVBQW1DLFlBQVU7TUFDM0NaLE1BQU0sQ0FBQ3FHLFFBQVAsQ0FBZ0I7UUFDZEMsR0FBRyxFQUFFLENBRFM7UUFFZEMsUUFBUSxFQUFFO01BRkksQ0FBaEI7SUFJRCxDQUxEO0VBTUQsQ0FqV3dDLENBa1d6Qzs7QUFFQyxDQXBXRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogU0xJREUgVVAgKi9cclxuY29uc3Qgc2xpZGVVcCA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcbiAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZydcclxuICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnXHJcbiAgdGFyZ2V0LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94J1xyXG4gIHRhcmdldC5zdHlsZS5oZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0ICsgJ3B4J1xyXG4gIHRhcmdldC5vZmZzZXRIZWlnaHRcclxuICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG4gIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwXHJcbiAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwXHJcbiAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwXHJcbiAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDBcclxuICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMFxyXG4gIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpXHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJylcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKVxyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJylcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpXHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93JylcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpXHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKVxyXG4gICAgLy9hbGVydChcIiFcIilcclxuICB9LCBkdXJhdGlvbilcclxufVxyXG5cclxuLyogU0xJREUgRE9XTiAqL1xyXG5jb25zdCBzbGlkZURvd24gPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xyXG4gIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpXHJcbiAgbGV0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmRpc3BsYXlcclxuICBpZiAoZGlzcGxheSA9PT0gJ25vbmUnKSBkaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVxyXG4gIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0XHJcbiAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMFxyXG4gIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMFxyXG4gIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMFxyXG4gIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwXHJcbiAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDBcclxuICB0YXJnZXQub2Zmc2V0SGVpZ2h0XHJcbiAgdGFyZ2V0LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94J1xyXG4gIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcImhlaWdodCwgbWFyZ2luLCBwYWRkaW5nXCJcclxuICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnXHJcbiAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCdcclxuICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJylcclxuICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJylcclxuICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKVxyXG4gIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpXHJcbiAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKVxyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpXHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKVxyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5JylcclxuICB9LCBkdXJhdGlvbilcclxufVxyXG5cclxuLyogVE9PR0dMRSAqL1xyXG5jb25zdCBzbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICByZXR1cm4gc2xpZGVEb3duKHRhcmdldCwgZHVyYXRpb24pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gc2xpZGVVcCh0YXJnZXQsIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgc3ZnNGV2ZXJ5Ym9keSh7fSk7XHJcbiAgfSk7XHJcbn0pKGpRdWVyeSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGZ1bmN0aW9uKCl7XHJcbiAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTtcclxuICAvLyBUaGVuIHdlIHNldCB0aGUgdmFsdWUgaW4gdGhlIC0tdmggY3VzdG9tIHByb3BlcnR5IHRvIHRoZSByb290IG9mIHRoZSBkb2N1bWVudFxyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YCk7XHJcblxyXG59KVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtcclxuICBsZXQgYm9keSA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgbGV0IGh0bWwgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpO1xyXG4gIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDE7XHJcbiAgLy8gVGhlbiB3ZSBzZXQgdGhlIHZhbHVlIGluIHRoZSAtLXZoIGN1c3RvbSBwcm9wZXJ0eSB0byB0aGUgcm9vdCBvZiB0aGUgZG9jdW1lbnRcclxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdmgnLCBgJHt2aH1weGApO1xyXG5cclxuXHJcbiAgLy8gYW9zXHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgQU9TLmluaXQoe1xyXG4gICAgICBkdXJhdGlvbjogODAwLFxyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfSwxMClcclxuICAvLyBhb3MgZW5kXHJcblxyXG4gIC8vIFNFTEVDVCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICBmdW5jdGlvbiBjbG9zZVNlbGVjdCgpIHtcclxuICAgIHNlbGVjdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCgnYWN0aXZlJykpKSB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgZHJvcERvd25zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygoJ2FjdGl2ZScpKSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICBzbGlkZVVwKGl0ZW0sIDEwMClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgY29uc3Qgc2VsZWN0c0luc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RzLWluc2lkZScpXHJcbiAgY29uc3Qgc2VsZWN0VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RfX3RyaWdnZXInKVxyXG4gIGNvbnN0IHNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0ZXInKVxyXG4gIGNvbnN0IGRyb3BEb3ducyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RfX2Ryb3Bkb3duJylcclxuICBjb25zdCBkcm9wRG93bk9wdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RfX29wdGlvbicpXHJcbiAgc2VsZWN0VHJpZ2dlciAmJiBzZWxlY3RUcmlnZ2VyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNsb3Nlc3QoJy5zZWxlY3RlcicpXHJcbiAgICAgIGNvbnN0IGRyb3Bkb3duID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2Ryb3Bkb3duJylcclxuICAgICAgY29uc3Qgc2VsZWN0c0l0ZW1zID0gWy4uLnNlbGVjdHNdLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGNvbnRhaW5lcilcclxuICAgICAgY29uc3QgZHJvcERvd25zSXRlbXMgPSBbLi4uZHJvcERvd25zXS5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBkcm9wZG93bilcclxuICAgICAgc2VsZWN0c0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICB9KVxyXG4gICAgICBkcm9wRG93bnNJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICBzbGlkZVVwKGl0ZW0sIDEwMClcclxuICAgICAgfSlcclxuICAgICAgLy8gY2xvc2VTZWxlY3QoKVxyXG4gICAgICBpZiAoIWNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgZHJvcGRvd24gJiYgZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICBzbGlkZURvd24oZHJvcGRvd24sIDEwMClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICBkcm9wZG93biAmJiBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIHNsaWRlVXAoZHJvcGRvd24sIDEwMClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBzZWxlY3RzSW5zaWRlICYmIHNlbGVjdHNJbnNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcclxuICAgIGlmICghdGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3RlcicpKSB7XHJcbiAgICAgIGNsb3NlU2VsZWN0KClcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBkcm9wRG93bk9wdGlvbiAmJiBkcm9wRG93bk9wdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jbG9zZXN0KCcuc2VsZWN0ZXInKVxyXG4gICAgICBjb25zdCB2YWx1ZUl0ZW0gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fdmFsdWUnKVxyXG4gICAgICBpZih2YWx1ZUl0ZW0pe1xyXG4gICAgICAgIGNvbnN0IHZhbHVlSW1hZ2UgPSB2YWx1ZUl0ZW0ucXVlcnlTZWxlY3RvcihcImltZ1wiKVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGlucHV0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2lucHV0JylcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X19vcHRpb24nKVxyXG4gICAgICBjb25zdCBmb3JtSXRlbSA9IHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbScpXHJcbiAgICAgIGNvbnN0IHRyaWdnZXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fdHJpZ2dlcicpXHJcblxyXG4gICAgICBpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYWNlaG9sZGVyJykpIHtcclxuICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZvcm1JdGVtKSB7XHJcbiAgICAgICAgaWYgKGZvcm1JdGVtLmNsYXNzTGlzdC5jb250YWlucygnZXJyb3InKSkge1xyXG4gICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJylcclxuICAgICAgY29uc3QgdmFsdWVTb3VyY2UgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpXHJcbiAgICAgIC8vIGNvbnN0IHZhbHVlVGV4dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19lbGVtJylcclxuICAgICAgaWYgKHZhbHVlSXRlbSAmJiAhdmFsdWVJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcImxhbmctaW1nXCIpKSB7XHJcbiAgICAgICAgdmFsdWVJdGVtLmlubmVySFRNTCA9IHZhbHVlXHJcblxyXG4gICAgICB9ZWxzZSBpZih2YWx1ZUl0ZW0gJiYgdmFsdWVJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcImxhbmctaW1nXCIpICYmIHZhbHVlSW1hZ2UgJiYgdmFsdWVTb3VyY2Upe1xyXG4gICAgICAgIHZhbHVlSW1hZ2Uuc3JjID0gdmFsdWVTb3VyY2VcclxuICAgICAgfVxyXG4gICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlXHJcbiAgICAgIG9wdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgY2xvc2VTZWxlY3QoKVxyXG4gICAgfSlcclxuICB9KVxyXG4gIC8vIEVORCBTRUxFQ1QgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cclxuICAvLyBoZWFkZXIgc2VhcmNoIFxyXG5cclxuICBsZXQgU2VhcmNoQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhlYWRlcl9fc2VhcmNoXCIpXHJcbiAgaWYoU2VhcmNoQmxvY2spe1xyXG4gICAgU2VhcmNoQmxvY2suZm9yRWFjaChlbD0+e1xyXG4gICAgICBsZXQgc2VhcmNoSW5wdXQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlci1zZWFyY2hfX2lucHV0XCIpXHJcbiAgICAgIGxldCBzZWFyY2hGaWVsZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoX19ib3hcIilcclxuICAgICAgc2VhcmNoSW5wdXQgJiYgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihzZWFyY2hGaWVsZCAmJiAhc2VhcmNoRmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcclxuICAgICAgICAgIHNsaWRlRG93bihzZWFyY2hGaWVsZCwyMDApXHJcbiAgICAgICAgICBzZWFyY2hGaWVsZC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAvLyBzZWFyY2hJbnB1dCAmJiBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgIC8vICAgaWYoc2VhcmNoRmllbGQgJiYgc2VhcmNoRmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcclxuICAgICAgLy8gICAgIHNsaWRlVXAoc2VhcmNoRmllbGQsMjAwKVxyXG4gICAgICAvLyAgICAgc2VhcmNoRmllbGQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSlcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKCFlLnRhcmdldC5jbG9zZXN0KCcuaGVhZGVyX19zZWFyY2gnKSl7XHJcbiAgICAgICAgICBpZihzZWFyY2hGaWVsZCl7XHJcbiAgICAgICAgICAgIHNsaWRlVXAoc2VhcmNoRmllbGQsMjAwKVxyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICAvLyBoZWFkZXIgc2VhcmNoIGVuZFxyXG5cclxuLy8gY2FydFxyXG5cclxubGV0IGNhcnRCbG9jayA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0X19jYXJ0XCIpXHJcbmxldCBjYXJ0QnRuID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fY2FydFwiKVxyXG5sZXQgb3ZlcmxheSA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpXHJcbmlmKGNhcnRCbG9jayAmJiBjYXJ0QnRuKXtcclxuICAvLyBtYWluIFxyXG4gIGNhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBjYXJ0QmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJsb2NrXCIpXHJcbiAgICBodG1sLmNsYXNzTGlzdC5hZGQoXCJsb2NrXCIpXHJcbiAgfSlcclxuICBsZXQgY2xvc2VDYXJ0ID0gY2FydEJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCIuY2FydF9fY2xvc2VcIilcclxuICBsZXQgY2xvc2VDYXJ0RnVuYyA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjYXJ0QmxvY2suY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxyXG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2NrXCIpXHJcbiAgICBodG1sLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2NrXCIpXHJcbiAgfVxyXG4gIGNsb3NlQ2FydCAmJiBjbG9zZUNhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlQ2FydEZ1bmMpXHJcbiAgaWYob3ZlcmxheSl7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGlmKGUudGFyZ2V0ID09IG92ZXJsYXkpe1xyXG4gICAgICAgIGNsb3NlQ2FydEZ1bmMoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICAvLyBtYWluIGVuZFxyXG5cclxuICAvLyBjYXJ0IHByb2R1Y3RcclxuICBsZXQgcHJvZHVjdEl0ZW1zID0gY2FydEJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FydF9faXRlbVwiKVxyXG4gIGlmKHByb2R1Y3RJdGVtcyl7XHJcblxyXG4gICAgLy8gY291bnQgY2FydCBwcm9kdWN0c1xyXG4gICAgbGV0IGNhcnRJdGVtc0xlbmdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCBjYXJ0TGlzdCA9IGNhcnRCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcnRfX2l0ZW1cIilcclxuICAgICAgbGV0IGNhcnROdW1iZXIgPSBjYXJ0TGlzdC5sZW5ndGhcclxuICAgICAgbGV0IGNhcnRDaXJjbGUgPSBjYXJ0QmxvY2sucXVlcnlTZWxlY3RvcihcIi5jYXJ0X19oZWFkZXIgLmNhcnRfX2NvdW50XCIpXHJcbiAgICAgIGxldCBjYXJ0U2hvcFZhbHVlID0gY2FydEJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCIuY2FydF9faGVhZGVyIC5jYXJ0LW5hbWVfX2NvdW50XCIpXHJcbiAgICAgIGlmKGNhcnRDaXJjbGUgJiYgY2FydFNob3BWYWx1ZSl7XHJcbiAgICAgICAgY2FydENpcmNsZS5pbm5lckhUTUwgPSBjYXJ0TnVtYmVyXHJcbiAgICAgICAgY2FydFNob3BWYWx1ZS5pbm5lckhUTUwgPSBcIihcIiArIGNhcnROdW1iZXIgKyBcIilcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGNvdW50IGNhcnQgcHJvZHVjdHMgZW5kXHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIGZ1bmNcclxuICAgIGxldCBjYWxjdWxhdGVQcmljZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCBjYXJ0TGlzdCA9IGNhcnRCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcnRfX2l0ZW1cIilcclxuICAgICAgbGV0IHRvdGFsVmFsdWVQcmljZSA9IDBcclxuICAgICAgbGV0IHRvdGFsUHJpY2VIb2xkZXIgPSBjYXJ0QmxvY2sucXVlcnlTZWxlY3RvcihcIi5jYXJ0X190b3RhbC1wcmljZSAudmFsdWVcIilcclxuICAgICAgaWYoY2FydExpc3QubGVuZ3RoID49IDEpe1xyXG4gICAgICAgIGNhcnRMaXN0LmZvckVhY2goZWw9PntcclxuICAgICAgICAgIGxldCBwcm9kdWN0SW5wdXQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWVcclxuICAgICAgICAgIGxldCBwcm9kdWN0X19wcmljZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuY2FydC1pdGVtX19wcmljZSAudmFsdWVcIilcclxuICAgICAgICAgIGlmKHByb2R1Y3RJbnB1dCAmJiBwcm9kdWN0X19wcmljZSl7XHJcbiAgICAgICAgICAgIHRvdGFsVmFsdWVQcmljZSArPSBwYXJzZUludChwcm9kdWN0SW5wdXQpICogcGFyc2VGbG9hdChwcm9kdWN0X19wcmljZS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRvdGFsVmFsdWVQcmljZSlcclxuICAgICAgICAgICAgaWYodG90YWxQcmljZUhvbGRlcil7XHJcbiAgICAgICAgICAgICAgdG90YWxQcmljZUhvbGRlci5pbm5lckhUTUwgPSB0b3RhbFZhbHVlUHJpY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGlmKHRvdGFsUHJpY2VIb2xkZXIpe1xyXG4gICAgICAgICAgdG90YWxQcmljZUhvbGRlci5pbm5lckhUTUwgPSB0b3RhbFZhbHVlUHJpY2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNhbGN1bGF0ZSBmdW5jIGVuZFxyXG4gICAgcHJvZHVjdEl0ZW1zLmZvckVhY2goYmxvY2s9PntcclxuICAgICAgbGV0IHBsdXNQcm9kdWN0ID0gYmxvY2sucXVlcnlTZWxlY3RvcihcIi5jYXJ0LXBsdXNfX2J0blwiKVxyXG4gICAgICBsZXQgbWludXNQcm9kdWN0ID0gYmxvY2sucXVlcnlTZWxlY3RvcihcIi5jYXJ0LW1pbnVzX19idG5cIilcclxuICAgICAgbGV0IGl0ZW1JbnB1dCA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCIuY2FydC1pdGVtX19pbnB1dFwiKVxyXG4gICAgICBpZihpdGVtSW5wdXQpe1xyXG5cclxuICAgICAgICAvLyBjb3VudCBidXR0b25zXHJcbiAgICAgICAgcGx1c1Byb2R1Y3QgJiYgcGx1c1Byb2R1Y3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGxldCBwcm9kdWN0VmFsdWUgPSBwYXJzZUludChpdGVtSW5wdXQudmFsdWUpICsgMVxyXG4gICAgICAgICAgaXRlbUlucHV0LnZhbHVlID0gcHJvZHVjdFZhbHVlXHJcbiAgICAgICAgICBjYWxjdWxhdGVQcmljZSgpXHJcbiAgICAgICAgfSlcclxuICBcclxuICAgICAgICBtaW51c1Byb2R1Y3QgJiYgbWludXNQcm9kdWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBsZXQgcHJvZHVjdFZhbHVlID0gcGFyc2VJbnQoaXRlbUlucHV0LnZhbHVlKSAtMVxyXG4gICAgICAgICAgaWYocHJvZHVjdFZhbHVlIDwgMSl7XHJcbiAgICAgICAgICAgIHByb2R1Y3RWYWx1ZSA9IDFcclxuICAgICAgICAgICAgaXRlbUlucHV0LnZhbHVlID0gcHJvZHVjdFZhbHVlXHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZVByaWNlKClcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpdGVtSW5wdXQudmFsdWUgPSBwcm9kdWN0VmFsdWVcclxuICAgICAgICAgICAgY2FsY3VsYXRlUHJpY2UoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gY291bnQgYnV0dG9uc1xyXG5cclxuICAgICAgICAvLyBpbnB1dCB2YWxpZGF0ZVxyXG4gICAgICAgIGl0ZW1JbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGlmKChwYXJzZUludChpdGVtSW5wdXQudmFsdWUpIDwgMSkgfHwgKGl0ZW1JbnB1dC52YWx1ZSA9PSBcIlwiKSl7XHJcbiAgICAgICAgICAgIGl0ZW1JbnB1dC52YWx1ZSA9IDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhbGN1bGF0ZVByaWNlKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGlucHV0IHZhbGlkYXRlIGVuZFxyXG5cclxuICAgICAgICBjYWxjdWxhdGVQcmljZSgpXHJcbiAgICAgICAgY2FydEl0ZW1zTGVuZ2h0KClcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJlbW92ZSBpdGVtXHJcbiAgICAgIGxldCByZW1vdmVJdGVtID0gYmxvY2sucXVlcnlTZWxlY3RvcihcIi5jYXJ0LWl0ZW1fX3JlbW92ZVwiKVxyXG4gICAgICByZW1vdmVJdGVtICYmIHJlbW92ZUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICBibG9jay5yZW1vdmUoKVxyXG4gICAgICAgIGNhbGN1bGF0ZVByaWNlKClcclxuICAgICAgICBjYXJ0SXRlbXNMZW5naHQoKVxyXG4gICAgICB9KVxyXG4gICAgICAvLyByZW1vdmUgaXRlbSBlbmRcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbi8vIGNhcnQgZW5kXHJcblxyXG5cclxuLy8gaGVhZGVyIG1lbnVcclxuXHJcbmxldCBoZWFkZXJCdXJnZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyX19idXJnZXJcIilcclxubGV0IGhlYWRlck1vYmlsZU1lbnUgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLW1lbnVfX21vYmlsZVwiKVxyXG5cclxuaWYoaGVhZGVyTW9iaWxlTWVudSAmJiBoZWFkZXJCdXJnZXIpe1xyXG4gIGhlYWRlckJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xyXG4gICAgaGVhZGVyTW9iaWxlTWVudS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpXHJcbiAgICBoZWFkZXJCdXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxyXG4gICAgaWYoaGVhZGVyTW9iaWxlTWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xyXG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJsb2NrXCIpXHJcbiAgICAgIGh0bWwuY2xhc3NMaXN0LmFkZChcImxvY2tcIilcclxuICAgIH1lbHNle1xyXG4gICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2NrXCIpXHJcbiAgICAgIGh0bWwuY2xhc3NMaXN0LnJlbW92ZShcImxvY2tcIilcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyBoZWFkZXIgbWVudSBsaXN0XHJcbiAgbGV0IGhlYWRlck1lbnVMaW5rcyA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2JpbGUtbGlua19fd3JhcHBcIilcclxuICBpZihoZWFkZXJNZW51TGlua3Mpe1xyXG4gICAgaGVhZGVyTWVudUxpbmtzLmZvckVhY2gobGluaz0+e1xyXG4gICAgICBsZXQgdHJpZ2dlciA9IGxpbmsucXVlcnlTZWxlY3RvcihcIi5tb2JpbGUtbGlua19fdHJpZ2dlclwiKVxyXG4gICAgICBsZXQgbWVudURyb3AgPSBsaW5rLnF1ZXJ5U2VsZWN0b3IoXCIubW9iaWxlLWxpbmtfX2Ryb3Bkb3duXCIpXHJcbiAgICAgIHRyaWdnZXIgJiYgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xyXG4gICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxyXG4gICAgICAgIHNsaWRlVG9nZ2xlKG1lbnVEcm9wLDMwMClcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8vIGhlYWRlciBtZW51IGxpc3QgZW5kXHJcbn1cclxuXHJcbi8vIGhlYWRlciBtZW51IGVuZFxyXG5cclxuXHJcbi8vIHN3aXBlcnNcclxubGV0IHN3aXBlclByb2R1Y3QgPSBuZXcgU3dpcGVyKFwiLnByb2R1Y3Qtb3B0aW9ucyAub3B0aW9uc19fc2xpZGVyIC5zd2lwZXItbWFpblwiLCB7XHJcbiAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gIG5hdmlnYXRpb246IHtcclxuICAgIG5leHRFbDogXCIucHJvZHVjdC1vcHRpb25zIC5vcHRpb25zX19zbGlkZXIgLnNsaWRlci1idG4tbmV4dC5tYWluLWJ0blwiLFxyXG4gICAgcHJldkVsOiBcIi5wcm9kdWN0LW9wdGlvbnMgLm9wdGlvbnNfX3NsaWRlciAuc2xpZGVyLWJ0bi1wcmV2Lm1haW4tYnRuXCIsXHJcbiAgfSxcclxuICBzcGVlZDo3MDAsXHJcbiAgYnJlYWtwb2ludHM6e1xyXG4gICAgMTAyNTp7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgIHNwYWNlQmV0d2VlbjoxMCwgXHJcbiAgICB9LFxyXG4gICAgOTAxOntcclxuICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgc3BhY2VCZXR3ZWVuOjIwLCBcclxuICAgIH0sXHJcbiAgICA1MDE6e1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICBzcGFjZUJldHdlZW46MjAsIFxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbi8vIHN3aXBlcnMgZW5kXHJcblxyXG5cclxuLy8gYmFjayB0byB0b3AgYnRuXHJcbmxldCBiYWNrVG9Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2stdG8tdG9wX19idG5cIik7XHJcbmlmKGJhY2tUb1RvcCl7XHJcbiAgbGV0IENvdW50VG9wID0gZnVuY3Rpb24oKXtcclxuICAgIGlmKHdpbmRvdy5zY3JvbGxZID4gNTAwKXtcclxuICAgICAgYmFja1RvVG9wLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgYmFja1RvVG9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgfSAgXHJcbiAgQ291bnRUb3AoKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLENvdW50VG9wKTtcclxuICBiYWNrVG9Ub3AuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4vLyBiYWNrIHRvIHRvcCBidG4gZW5kXHJcblxyXG59KSJdfQ==
