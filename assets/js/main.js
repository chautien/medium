(function () {
  // Create variables and assign value to it
  const asideElement = document.querySelector("#aside");
  const asideElementHeight = asideElement.clientHeight;
  const scrollToTopEle = document.querySelector("#scrollToTopEle");
  let lastScrollTop = 0;
  let translateY = 0;
  // Listener scroll event
  window.addEventListener("scroll", (e) => {
    // Create variables and assign value to it
    let offSetTop = Math.ceil(window.pageYOffset + window.innerHeight);
    let contentElement = asideElement.previousSibling.previousSibling;

    // Change to defaul style
    scrollToTopEle.style.opacity = 0;
    asideElement.classList.remove("aside-fixed-bottom");

    // Condition to show scroll to top button
    if (window.pageYOffset > 100) {
      scrollToTopEle.style.opacity = 1;
    }
    // Condition to fixed aside
    if (offSetTop > asideElementHeight + 68) {
      asideElement.classList.add("aside-fixed-bottom");
      asideElement.style.left =
        contentElement.getBoundingClientRect().right + "px";

      if (lastScrollTop > window.pageYOffset) {
        translateY += lastScrollTop - window.pageYOffset;
        if (translateY < 140) {
          asideElement.style.transform = `translateY(${translateY}px)`;
        }
      } else {
        translateY = 0;
        asideElement.style.transform = `translateY(${translateY}px)`;
      }
    } else if (
      offSetTop <= asideElementHeight + 67 &&
      offSetTop >= asideElementHeight - 53 &&
      lastScrollTop > window.pageYOffset
    ) {
      asideElement.style.transform = `translateY(120px)`;
    } else {
      asideElement.style.transform = `translateY(0)`;
    }

    // Assign offsetY to lastScrollTop varriable
    lastScrollTop = window.pageYOffset;
  });
})();
