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

// Select the element you want to observe
const element = document.querySelector("div#scroll>img");

// Define the callback function that will be called when the element enters or leaves the viewport
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    } else {
      entry.target.style.animationPlayState = "paused";
    }
  });
};

// Create the Intersection Observer instance and pass the callback function
const observer = new IntersectionObserver(handleIntersection);

// Start observing the element
observer.observe(element);
