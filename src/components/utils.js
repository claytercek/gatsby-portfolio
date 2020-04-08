export function addHoverClass(e) {
  const target = e.target;
  var minDur = 250;

  target.classList.add("hover");
  if (target.classList.contains("u-underline-anim--active") || target.closest(".u-pageContent")) {
    minDur = 500;
  }

  setTimeout(function() {
    target.classList.remove("hover");
  }, minDur)
}