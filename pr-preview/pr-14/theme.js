(function () {
  "use strict";
  var KEY = "chasnelson-theme";

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var label = theme === "dark" ? "Nightfall" : "Daylight";
      var next = theme === "dark" ? "Daylight" : "Nightfall";
      btn.textContent = label;
      // Include the visible label itself, not just the action - an
      // aria-label of only "Switch to X mode" leaves the accessible name
      // with no overlap with what's on screen (WCAG 2.5.3 Label in Name),
      // which breaks voice-control users saying the visible word.
      btn.setAttribute("aria-label", label + " - switch to " + next + " theme");
    }
  }

  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  apply(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");

  toggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    var next = current === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) {
      // Storage unavailable (private browsing, etc) - theme still applies for this load.
    }
    apply(next);
  });
})();
