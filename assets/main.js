/* 个人博客 — 交互脚本（原生 JS，无依赖） */
(function () {
  "use strict";

  /* ---------- 明暗主题 ---------- */
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const moon = "🌙", sun = "☀️";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) toggle.textContent = theme === "dark" ? sun : moon;
  }

  function currentTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  applyTheme(currentTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  /* ---------- 阅读进度条 ---------- */
  const progress = document.getElementById("progress");
  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const total = h.scrollHeight - h.clientHeight;
    progress.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
  }

  /* ---------- 返回顶部 ---------- */
  const topBtn = document.getElementById("top-btn");
  function updateTopBtn() {
    if (!topBtn) return;
    topBtn.classList.toggle("show", window.scrollY > 400);
  }
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateTopBtn();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgress();
  updateTopBtn();

  /* ---------- 目录滚动高亮（IntersectionObserver） ---------- */
  const tocLinks = Array.from(document.querySelectorAll(".toc a"));
  const headings = tocLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (tocLinks.length && headings.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          tocLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach(function (h) { observer.observe(h); });
  }

  /* ---------- 邮箱一键复制 ---------- */
  const copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    const email = copyBtn.getAttribute("data-email");
    copyBtn.addEventListener("click", function () {
      const done = function () {
        const original = copyBtn.querySelector(".email-text").textContent;
        copyBtn.classList.add("copied");
        copyBtn.querySelector(".email-text").textContent = "已复制 ✓";
        setTimeout(function () {
          copyBtn.classList.remove("copied");
          copyBtn.querySelector(".email-text").textContent = original;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(done);
      } else {
        // 降级：选中文本
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(copyBtn.querySelector(".email-text"));
        sel.removeAllRanges();
        sel.addRange(range);
        done();
      }
    });
  }
})();
