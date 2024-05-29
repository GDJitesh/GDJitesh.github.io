// Smooth scroll function
function smoothScroll(targetElement, duration) {
  var target = document.querySelector(targetElement);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.scrollY;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document
  .querySelector("div#scroll>img")
  .addEventListener("click", function (e) {
    e.preventDefault();
    var targetId = this.dataset.scroll;
    smoothScroll(targetId, 1000);
  });

//check for viewport visiblity function
function isElementVisible(el, visibilityThreshold = 0.1) {
  const rect = el.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  const aboveViewBottom = rect.bottom < 0;
  const belowViewTop = rect.top - viewHeight >= 0;

  if (aboveViewBottom || belowViewTop) {
    return false;
  }

  const totalVisibleHeight =
    Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
  const elementHeight = rect.bottom - rect.top;
  const visiblePercentage = totalVisibleHeight / elementHeight;

  return visiblePercentage >= visibilityThreshold;
}

// Set an interval to check the element's visibility
function checkVisibility(elementID, shouldClear = true) {
  const checkVisibilityInterval = setInterval(() => {
    const yourElement = document.querySelector(elementID);
    if (yourElement && isElementVisible(yourElement)) {
      yourElement.style.animationPlayState = "running";
      // Clear the interval if the animation is running and shouldClear is true
      if (shouldClear && yourElement.style.animationPlayState === "running") {
        clearInterval(checkVisibilityInterval);
      }
    } else {
      yourElement.style.animationPlayState = "paused";
    }
  }, 100); // Check every 100 milliseconds
}

checkVisibility("div#pg-2 > div#side-contact");
checkVisibility("div#scroll>img", false);

