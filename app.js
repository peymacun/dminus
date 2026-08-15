
(() => {
  const html = document.documentElement;
  const storedTheme = localStorage.getItem("dminus-theme");
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || storedTheme === "light") {
    html.dataset.theme = storedTheme;
  } else {
    html.dataset.theme = systemDark ? "dark" : "light";
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = html.dataset.theme === "dark" ? "light" : "dark";
      html.dataset.theme = next;
      localStorage.setItem("dminus-theme", next);
    });
  });

  document.querySelectorAll("[data-lang-link]").forEach(link => {
    link.addEventListener("click", () => {
      localStorage.setItem("dminus-language", link.dataset.lang);
    });
  });

  const menuBtn = document.querySelector("[data-mobile-menu]");
  const panel = document.querySelector("[data-mobile-panel]");
  if (menuBtn && panel) {
    menuBtn.addEventListener("click", () => {
      panel.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", panel.classList.contains("open") ? "true" : "false");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      if (panel) panel.classList.remove("open");
    });
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lang = html.lang || "de";
      const subjectMap = {
        de: "Anfrage über dminus.co",
        en: "Inquiry via dminus.co",
        tr: "dminus.co üzerinden talep"
      };
      const labels = {
        de: ["Name", "Unternehmen", "E-Mail", "Telefon", "Nachricht"],
        en: ["Name", "Company", "Email", "Phone", "Message"],
        tr: ["İsim", "Şirket", "E-posta", "Telefon", "Mesaj"]
      }[lang] || ["Name","Company","Email","Phone","Message"];
      const values = [
        data.get("name") || "",
        data.get("company") || "",
        data.get("email") || "",
        data.get("phone") || "",
        data.get("message") || ""
      ];
      const body = labels.map((label, i) => `${label}: ${values[i]}`).join("\n");
      window.location.href = `mailto:info@dminus.co?subject=${encodeURIComponent(subjectMap[lang])}&body=${encodeURIComponent(body)}`;
    });
  }
})();
