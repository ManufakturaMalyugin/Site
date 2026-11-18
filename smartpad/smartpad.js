(function () {
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