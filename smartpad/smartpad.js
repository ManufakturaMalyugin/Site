(function () {
  document.querySelectorAll(".spad__lang-select").forEach((select) => {
    select.addEventListener("change", () => {
      const url = select.value;
      if (url) {
        location.href = url;
      }
    });
  });
})();

(function () {
  if (document.documentElement.lang !== "ru") {
    return;
  }

  function fixTypography(text) {
    return text
      .replace(/\bдля /gi, "для\u00A0")
      .replace(/(?<=[\s,.:;\u2014\u2013-])и /g, "и\u00A0");
  }

  document.querySelectorAll("main").forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      if (!node.parentElement?.closest("script, style")) {
        node.textContent = fixTypography(node.textContent);
      }
      node = walker.nextNode();
    }
  });
})();