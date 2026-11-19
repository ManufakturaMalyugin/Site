(function () {
  function startVideo(video) {
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }

  document.querySelectorAll(".spad__video").forEach((video) => {
    if (video.readyState >= 2) {
      startVideo(video);
    } else {
      video.addEventListener("loadeddata", () => startVideo(video), { once: true });
    }
  });
})();

(function () {
  function normalizeLang(code) {
    const lang = String(code || "").trim().toLowerCase();
    return lang === "en" ? "en" : "ru";
  }

  function isEnPage() {
    const path = location.pathname.replace(/\\/g, "/").toLowerCase();
    if (/\/smartpad\/en(?:\/|$)/.test(path)) {
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

  function smartpadRoot() {
    const path = location.pathname.replace(/\\/g, "/");
    const marker = "/smartpad";
    const idx = path.toLowerCase().indexOf(marker);
    if (idx === -1) {
      return null;
    }
    return path.slice(0, idx + marker.length);
  }

  function langHref(code) {
    const lang = normalizeLang(code);
    const onEn = isEnPage();

    if (location.protocol === "file:") {
      if (lang === "ru") {
        return onEn ? "../index.html" : "index.html";
      }
      return onEn ? "index.html" : "en/index.html";
    }

    const root = smartpadRoot();
    const path = lang === "en" ? `${root || "/smartpad"}/en/` : `${root || "/smartpad"}/`;
    return new URL(path, location.origin).href;
  }

  document.querySelectorAll(".spad__lang-select").forEach((select) => {
    select.value = pageLang();

    select.addEventListener("change", () => {
      const lang = normalizeLang(select.value);
      if (lang === pageLang()) {
        select.value = pageLang();
        return;
      }
      location.assign(langHref(lang));
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