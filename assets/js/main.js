(function () {
  const asideElement = document.querySelector("#aside");
  const asideElementHeight = asideElement.clientHeight;
  const scrollToTopEle = document.querySelector("#scrollToTopEle");
  let lastScrollTop = 0;
  window.addEventListener("scroll", (e) => {
    let offSetTop = Math.ceil(window.pageYOffset + window.innerHeight);
    asideElement.classList.remove("aside-fixed-bottom");
    scrollToTopEle.style.opacity = 0;

    if (window.pageYOffset > 100) {
      scrollToTopEle.style.opacity = 1;
    }
    if (offSetTop > asideElementHeight + 68) {
      asideElement.classList.add("aside-fixed-bottom");
    }
    if (window.pageYOffset < lastScrollTop) {
      console.log("Scroll back to top !");
    }
    lastScrollTop = window.pageYOffset;
  });
})();
