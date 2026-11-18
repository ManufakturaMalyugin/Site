(function () {
  function isEnPage() {
    const path = location.pathname.replace(/\\/g, "/");
    if (/\/smartpad\/en(?:\/|$)/i.test(path)) {
      return true;
    }
    if (location.protocol === "file:") {
      return /\/en\/[^/]*$/i.test(path);
    }
    return false;
  }

  function pageLang() {
    return isEnPage() ? "en" : "ru";
  }

  function langHref(code) {
    const onEn = isEnPage();

    if (location.protocol === "file:") {
      if (code === "ru") {
        return onEn ? "../index.html" : "index.html";
      }
      return onEn ? "index.html" : "en/index.html";
    }

    if (code === "ru") {
      return onEn ? "../" : "./";
    }
    return onEn ? "./" : "en/";
  }

  document.querySelectorAll(".spad__lang-select").forEach((select) => {
    select.value = pageLang();

    select.addEventListener("change", () => {
      const code = select.value;
      if (!code || code === pageLang()) {
        return;
      }
      location.assign(langHref(code));
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