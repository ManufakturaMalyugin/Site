(function () {
  const pageLang = document.documentElement.lang === "en" ? "en" : "ru";

  function isEnPage() {
    const path = location.pathname.replace(/\\/g, "/");
    return /\/smartpad\/en(?:\/|$)/i.test(path) || /\/en\/index\.html$/i.test(path);
  }

  function langUrl(code) {
    if (location.protocol === "file:") {
      const onEn = isEnPage();
      if (code === "ru") {
        return onEn ? "../index.html" : "index.html";
      }
      return onEn ? "index.html" : "en/index.html";
    }
    return code === "en" ? "/smartpad/en/" : "/smartpad/";
  }

  document.querySelectorAll(".spad__lang-select").forEach((select) => {
    select.querySelectorAll("option[data-lang]").forEach((option) => {
      option.value = langUrl(option.dataset.lang);
    });
    select.value = langUrl(pageLang);

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