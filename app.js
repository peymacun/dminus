(() => {
  const html = document.documentElement;
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("dminus-theme"); } catch {}
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.dataset.theme = ["dark", "light"].includes(savedTheme) ? savedTheme : (systemDark ? "dark" : "light");
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = html.dataset.theme === "dark" ? "light" : "dark";
      html.dataset.theme = next;
      try { localStorage.setItem("dminus-theme", next); } catch {}
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    });
    btn.setAttribute("aria-pressed", html.dataset.theme === "dark" ? "true" : "false");
  });
  document.querySelectorAll("[data-lang-link]").forEach(link => {
    link.addEventListener("click", () => {
      try { localStorage.setItem("dminus-language", link.dataset.lang); } catch {}
    });
  });
  const menuBtn = document.querySelector("[data-mobile-menu]");
  const panel = document.querySelector("[data-mobile-panel]");
  function closeMenu() {
    if (!panel || !menuBtn) return;
    panel.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && panel) {
    menuBtn.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? (menuBtn.dataset.closeLabel || "Close menu") : (menuBtn.dataset.openLabel || "Open menu"));
    });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
    document.addEventListener("click", event => {
      if (!panel.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", closeMenu));
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const lang = ["en", "tr", "de"].includes(html.lang) ? html.lang : "de";
  const copy = {
    de: { sending: "Ihre Anfrage wird gesendet …", sent: "Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns innerhalb eines Werktags.", error: "Ihre Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns an info@dminus.co.", invalid: "Bitte geben Sie eine gültige E-Mail-Adresse und eine Nachricht mit mindestens 10 Zeichen ein.", throttle: "Bitte versuchen Sie es später erneut." },
    en: { sending: "Sending your inquiry …", sent: "Thank you! Your inquiry has been sent. We normally reply within one business day.", error: "Your inquiry could not be delivered. Please email info@dminus.co.", invalid: "Please enter a valid email and a message of at least 10 characters.", throttle: "Please try again later." },
    tr: { sending: "Talebiniz gönderiliyor …", sent: "Teşekkürler! Talebiniz iletildi. Genellikle bir iş günü içinde dönüş yaparız.", error: "Talebiniz iletilemedi. Lütfen info@dminus.co adresine e-posta gönderin.", invalid: "Geçerli bir e-posta ve en az 10 karakterlik mesaj girin.", throttle: "Lütfen daha sonra yeniden deneyin." }
  }[lang];
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');
  const openedAt = Date.now();
  function report(message, failed) {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = failed ? "error" : "success";
    status.setAttribute("role", failed ? "alert" : "status");
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form).entries());
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || String(fields.message || "").trim().length < 10) {
      return report(copy.invalid, true);
    }
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    report(copy.sending, false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, lang, openedAt })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        report(response.status === 429 ? copy.throttle : copy.error, true);
        return;
      }
      report(copy.sent, false);
      form.reset();
    } catch {
      report(copy.error, true);
    } finally {
      submit.disabled = false;
      submit.removeAttribute("aria-busy");
    }
  });
})();
