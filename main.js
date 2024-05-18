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

document.querySelector("div#scroll>img").addEventListener("click", function (e) {
  e.preventDefault();
  var targetId = this.dataset.scroll;
  smoothScroll(targetId, 1000);
});
