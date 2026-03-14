document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (menuButton && mobileMenu) {
    const setMenuState = function (open) {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mobileMenu.setAttribute("data-open", String(open));
      mobileMenu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    };

    setMenuState(false);

    menuButton.addEventListener("click", function () {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      setMenuState(!expanded);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });

    document.addEventListener("click", function (event) {
      const insideMenu = mobileMenu.contains(event.target);
      const insideButton = menuButton.contains(event.target);
      if (!insideMenu && !insideButton) {
        setMenuState(false);
      }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) {
        setMenuState(false);
      }
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach(function (node) {
    observer.observe(node);
  });

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const leadForms = document.querySelectorAll("[data-lead-form]");
  leadForms.forEach(function (leadForm) {
    const status = leadForm.querySelector("[data-form-status]");
    const whatsappPrompt = leadForm.querySelector("[data-whatsapp-prompt]");

    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const button = leadForm.querySelector("button[type='submit']");
      const originalLabel = button ? button.textContent : "";
      const invalidField = leadForm.querySelector(":invalid");

      if (!leadForm.checkValidity()) {
        if (invalidField) {
          invalidField.focus();
        }
        if (status) {
          status.textContent = "Please complete all required fields before sending.";
        }
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "Sending Request…";
      }
      if (status) {
        status.textContent = "Sending your request…";
      }
      if (whatsappPrompt) {
        whatsappPrompt.hidden = true;
      }

      const isContactForm = leadForm.dataset.contactForm === "true";
      if (!isContactForm) {
        window.setTimeout(function () {
          leadForm.reset();
          if (button) {
            button.disabled = false;
            button.textContent = originalLabel || "Send";
          }
          if (status) {
            status.textContent = "Thanks. Your request has been received and our team will respond within one business day.";
          }
        }, 900);
        return;
      }

      const endpoint = leadForm.getAttribute("action") || "https://formsubmit.co/ajax/info@bettypride.com";
      const formData = new FormData(leadForm);

      fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then(function () {
          leadForm.reset();
          if (status) {
            status.textContent = "Thank you. Your request has been submitted successfully. Please check your email for our thank-you message.";
          }
          if (whatsappPrompt) {
            whatsappPrompt.hidden = false;
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = "We could not submit your request right now. Please try again or reach us directly via WhatsApp.";
          }
          if (whatsappPrompt) {
            whatsappPrompt.hidden = false;
          }
        })
        .finally(function () {
          if (button) {
            button.disabled = false;
            button.textContent = originalLabel || "Send";
          }
        });
    });
  });
});