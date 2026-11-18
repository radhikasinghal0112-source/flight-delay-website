/* explorer.js : interactive view of the two key signals (finding.html).
   The numbers are the observed delayed shares plotted in the report's
   signals figure; nothing here is a model prediction. */
(function () {
  "use strict";

  // Among flights estimated to leave on time, by schedule gap (elapsed minus scheduled time).
  var GAP = [
    { label: "0 min or less", share: 8 },
    { label: "0 to 2 min", share: 19 },
    { label: "2 to 5 min", share: 34 },
    { label: "5 to 8 min", share: 62 },
    { label: "8 to 10 min", share: 84 },
    { label: "10 to 15 min", share: 94 },
    { label: "more than 15 min", share: 100 }
  ];

  // By estimated departure delay.
  var DEP = [
    { label: "no delay", share: 20 },
    { label: "0 to 5 min", share: 34 },
    { label: "5 to 15 min", share: 59 },
    { label: "15 to 30 min", share: 90 },
    { label: "30 to 60 min", share: 99 },
    { label: "more than 60 min", share: 92 }
  ];

  var root = document.getElementById("explorer");
  if (!root) return;

  function wire(prefix, data, sentence, extra) {
    var slider = document.getElementById(prefix + "-slider");
    var value = document.getElementById(prefix + "-value");
    var fill = document.getElementById(prefix + "-fill");
    var out = document.getElementById(prefix + "-out");
    if (!slider || !value || !fill || !out) return;

    function update() {
      var item = data[parseInt(slider.value, 10)];
      value.textContent = item.label;
      fill.style.width = item.share + "%";
      var text = sentence(item);
      if (extra) text += extra(item);
      out.textContent = text;
      slider.setAttribute("aria-valuetext", item.label + ", " + item.share + " percent delayed");
    }

    slider.addEventListener("input", update);
    update();
  }

  wire(
    "gap", GAP,
    function (item) {
      return "Of flights estimated to leave on time with a schedule gap of " + item.label +
        ", " + item.share + "% arrived delayed.";
    }
  );

  wire(
    "dep", DEP,
    function (item) {
      return "Of flights with an estimated departure delay of " + item.label +
        ", " + item.share + "% arrived delayed.";
    },
    function (item) {
      return item.share === 92
        ? " This slight dip is probably noise in very large estimates and was not investigated."
        : "";
    }
  );

  root.hidden = false;
})();
