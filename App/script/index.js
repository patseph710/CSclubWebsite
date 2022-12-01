var responsiveSlider = function () {
  var slider = document.getElementById("slider");
  var sliderWidth = slider.offsetWidth;
  var slideList = document.getElementById("slideWrap");
  var count = 1;
  var items = slideList.querySelectorAll("li").length;
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var tabList = document.getElementById("slick-dots");
  var tabItems = tabList.querySelectorAll("li");
  let timer = 5000;

  window.addEventListener("resize", function () {
    sliderWidth = slider.offsetWidth;
  });

  var tab = [];
  for(var i = 0; i < tabItems.length;i++){
    tabItems[i].setAttribute("id", i)
    tab.push(tabItems[i]);
  }

  tab.forEach((select) => {
    select.onclick = () => {
      tabList.querySelector(".active-tab").classList.remove("active-tab");
      select.setAttribute("class", "active-tab");

      count = select.getAttribute("id");
      slideList.style.left = "-" + count * sliderWidth + "px";
    }
  });

  var prevSlide = function () {
    if (count > 1) {
      count = count - 2;
      slideList.style.left = "-" + count * sliderWidth + "px";
      tabList.querySelector(".active-tab").classList.remove("active-tab");
      tab[count].setAttribute("class", "active-tab");
      count++;
    } else if ((count = 1)) {
      count = items - 1;
      slideList.style.left = "-" + count * sliderWidth + "px";
      tabList.querySelector(".active-tab").classList.remove("active-tab");
      tab[count].setAttribute("class", "active-tab");
      count++;
    }
  };

  var nextSlide = function () {
    if(timer === 10000){
      clearInterval(slowInterval);
      timer = 5000;
      normalSliderInterval = setInterval(function () {
        nextSlide();
      }, timer); 
    }
    if (count < items) { 
      tabList.querySelector(".active-tab").classList.remove("active-tab");
      tab[count].setAttribute("class", "active-tab");
      slideList.style.left = "-" + count * sliderWidth + "px";
      count++;
    } else if ((count = items)) {
      slideList.style.left = "0px";
      count = 0;
      tabList.querySelector(".active-tab").classList.remove("active-tab");
      tab[count].setAttribute("class", "active-tab");
    }
  };

  next.addEventListener("click", function () {
    nextSlide();
    clearInterval(normalSliderInterval);
    timer = 7000;
    slowInterval = setInterval(function () {
      nextSlide();
    }, timer); 

  });

  prev.addEventListener("click", function () {
    prevSlide();
    clearInterval(normalSliderInterval);
    timer = 7000;
    slowInterval = setInterval(function () {
      nextSlide();
    }, timer); 

  });

  normalSliderInterval = setInterval(function () {
    nextSlide();
  }, timer); 

};

window.onload = function () {
  responsiveSlider();
};
