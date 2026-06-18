document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("#primary-nav");
  const pageLang = (document.documentElement.lang || "zh-CN").toLowerCase();
  const copyByLang = {
    zh: {
      locale: "zh-CN",
      datePlaceholder: "选择日期或日期范围",
      rangeSeparator: " 至 ",
      sendingMessage: "正在发送你的咨询...",
      sendingButton: "发送中...",
      formError: "表单暂时无法发送。",
      formSuccess: "谢谢，你的咨询已经发送。Fiona 会在 48 小时内回复。",
      formFailure: "发送时出现问题。请直接发送邮件到 fionatanggg@gmail.com 联系 Fiona。",
    },
    en: {
      locale: "en-GB",
      datePlaceholder: "Select a date or date range",
      rangeSeparator: " to ",
      sendingMessage: "Sending your inquiry...",
      sendingButton: "Sending...",
      formError: "The form cannot be sent right now",
      formSuccess: "Thank you, your inquiry has been sent, Fiona will reply within 48 hours",
      formFailure: "Something went wrong, please email fionatanggg@gmail.com to contact Fiona",
    },
    fr: {
      locale: "fr-FR",
      datePlaceholder: "Choisir une date ou une période",
      rangeSeparator: " au ",
      sendingMessage: "Envoi de votre demande...",
      sendingButton: "Envoi...",
      formError: "Le formulaire ne peut pas être envoyé pour le moment",
      formSuccess: "Merci, votre demande a été envoyée, Fiona vous répondra sous 48 heures",
      formFailure: "Un problème est survenu, écrivez directement à fionatanggg@gmail.com pour contacter Fiona",
    },
    de: {
      locale: "de-DE",
      datePlaceholder: "Datum oder Zeitraum auswählen",
      rangeSeparator: " bis ",
      sendingMessage: "Ihre Anfrage wird gesendet...",
      sendingButton: "Wird gesendet...",
      formError: "Das Formular kann gerade nicht gesendet werden",
      formSuccess: "Danke, Ihre Anfrage wurde gesendet, Fiona antwortet innerhalb von 48 Stunden",
      formFailure: "Es ist ein Problem aufgetreten, schreiben Sie bitte direkt an fionatanggg@gmail.com",
    },
  };
  const copy = copyByLang[pageLang.slice(0, 2)] || copyByLang.zh;

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".primary-nav a, .footer-links a").forEach((link) => {
    const href = link.getAttribute("href");
    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/index\.html$/, "/");
    if (linkPath === currentPath) {
      link.classList.add("is-active");
    }
  });

  const scrollToAnchorWithHeader = (target) => {
    if (!target) return;
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const offset = Math.ceil(headerHeight + 52);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, Math.max(0, top));
    root.style.scrollBehavior = previousScrollBehavior;
  };

  const openHashDetails = () => {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target || target.tagName.toLowerCase() !== "details") return;
    target.open = true;
    window.setTimeout(() => {
      scrollToAnchorWithHeader(target);
    }, 0);
  };

  openHashDetails();
  window.addEventListener("hashchange", openHashDetails);

  const faqLayout = document.querySelector(".faq-layout");
  if (faqLayout) {
    const scrollToFaqHash = (hash) => {
      const id = hash ? hash.slice(1) : "";
      const target = id ? document.getElementById(id) : null;
      if (!target || !target.classList.contains("faq-group")) return;
      scrollToAnchorWithHeader(target);
    };

    const queueFaqScroll = (hash) => {
      if (!hash) return;
      scrollToFaqHash(hash);
      window.requestAnimationFrame(() => scrollToFaqHash(hash));
      window.setTimeout(() => scrollToFaqHash(hash), 80);
      window.setTimeout(() => scrollToFaqHash(hash), 320);
    };

    faqLayout.querySelectorAll(".faq-nav a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const hash = link.getAttribute("href");
        if (!hash) return;
        history.pushState(null, "", hash);
        queueFaqScroll(hash);
      });
    });

    if (window.location.hash) {
      queueFaqScroll(window.location.hash);
      window.addEventListener("load", () => queueFaqScroll(window.location.hash), { once: true });
    }

    window.addEventListener("hashchange", () => {
      queueFaqScroll(window.location.hash);
    });
  }

  document.querySelectorAll("[data-hero-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    if (slides.length < 2) return;

    let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    if (activeIndex < 0) activeIndex = 0;
    let intervalId = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragLastX = 0;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
      });
    };

    const stopAuto = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startAuto = () => {
      stopAuto();
      intervalId = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 3400);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startAuto();
      });
    });

    carousel.addEventListener("pointerdown", (event) => {
      if (event.target.closest("[data-carousel-dot]")) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragLastX = event.clientX;
      carousel.classList.add("is-dragging");
      stopAuto();
      if (carousel.setPointerCapture) {
        carousel.setPointerCapture(event.pointerId);
      }
    });

    carousel.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      dragLastX = event.clientX;
    });

    const finishDrag = () => {
      if (!isDragging) return;
      const deltaX = dragLastX - dragStartX;
      if (Math.abs(deltaX) > 44) {
        showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
      }
      isDragging = false;
      carousel.classList.remove("is-dragging");
      startAuto();
    };

    carousel.addEventListener("pointerup", finishDrag);
    carousel.addEventListener("pointercancel", finishDrag);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAuto();
      } else {
        startAuto();
      }
    });

    showSlide(activeIndex);
    startAuto();
  });

  const storyPhotos = Array.from(document.querySelectorAll("[data-story]"));
  const storyPanels = Array.from(document.querySelectorAll("[data-story-panel]"));
  if (storyPhotos.length && storyPanels.length) {
    const setActiveStory = (key, activePhoto) => {
      storyPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.storyPanel === key);
      });
      storyPhotos.forEach((photo) => {
        photo.classList.toggle("is-current", photo === activePhoto);
      });
    };

    const chooseClosestPhoto = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestPhoto = storyPhotos[0];
      let closestDistance = Number.POSITIVE_INFINITY;
      storyPhotos.forEach((photo) => {
        const rect = photo.getBoundingClientRect();
        const photoCenter = rect.top + rect.height / 2;
        const distance = Math.abs(photoCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPhoto = photo;
        }
      });
      setActiveStory(closestPhoto.dataset.story, closestPhoto);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]) {
          const activePhoto = visibleEntries[0].target;
          setActiveStory(activePhoto.dataset.story, activePhoto);
        }
      }, {
        rootMargin: "-34% 0px -34% 0px",
        threshold: [0.25, 0.4, 0.55, 0.7],
      });

      storyPhotos.forEach((photo) => observer.observe(photo));
    } else {
      window.addEventListener("scroll", chooseClosestPhoto, { passive: true });
      window.addEventListener("resize", chooseClosestPhoto);
    }

    chooseClosestPhoto();
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const portfolioItems = document.querySelectorAll("[data-category]");
  const portfolioGrid = document.querySelector("[data-portfolio-grid]");
  const portfolioFilterAliases = {
    wedding: "wedding-elopement",
    elopement: "wedding-elopement",
  };
  const portfolioFilterGroups = {
    "wedding-elopement": ["wedding", "elopement"],
  };

  const normalizePortfolioFilter = (filter) => portfolioFilterAliases[filter] || filter || "all";

  const revealPortfolioGrid = () => {
    if (!portfolioGrid) return;
    portfolioGrid.classList.add("is-ready");
    window.requestAnimationFrame(() => {
      portfolioGrid.classList.remove("is-filtering");
    });
  };

  const applyPortfolioFilter = (filter, options = {}) => {
    if (!filterButtons.length || !portfolioItems.length) return;
    const shouldDefer = options.defer !== false;
    if (portfolioGrid && portfolioGrid.classList.contains("is-ready")) {
      portfolioGrid.classList.add("is-filtering");
    }

    const commitFilter = () => {
      const normalizedFilter = normalizePortfolioFilter(filter);
      const nextFilter = Array.from(filterButtons).some((button) => button.dataset.filter === normalizedFilter) ? normalizedFilter : "all";
      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.filter === nextFilter);
      });

      portfolioItems.forEach((item) => {
        const itemCategories = (item.dataset.category || "").split(/\s+/).filter(Boolean);
        const filterCategories = portfolioFilterGroups[nextFilter] || [nextFilter];
        const shouldShow = nextFilter === "all" || filterCategories.some((category) => itemCategories.includes(category));
        item.classList.toggle("is-hidden", !shouldShow);
      });
      revealPortfolioGrid();
    };

    if (shouldDefer && portfolioGrid) {
      window.requestAnimationFrame(commitFilter);
    } else {
      commitFilter();
    }
  };

  const scrollToPortfolioFilter = (filter) => {
    const normalizedFilter = normalizePortfolioFilter(filter);
    if (!normalizedFilter || normalizedFilter === "all") return;
    const target = document.getElementById(normalizedFilter);
    if (!target) return;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  };

  const applyHashPortfolioFilter = (options = {}) => {
    const hashFilter = window.location.hash.slice(1);
    applyPortfolioFilter(hashFilter || "all", options);
    if (hashFilter) {
      scrollToPortfolioFilter(hashFilter);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      applyPortfolioFilter(filter);
      if (window.location.hash.slice(1) !== filter) {
        history.replaceState(null, "", filter === "all" ? window.location.pathname : `#${filter}`);
      }
    });
  });

  if (filterButtons.length && portfolioItems.length) {
    applyHashPortfolioFilter({ defer: false });
    window.addEventListener("hashchange", () => {
      applyHashPortfolioFilter();
    });
    window.addEventListener("load", () => {
      scrollToPortfolioFilter(window.location.hash.slice(1));
    });
  }

  document.querySelectorAll("[data-date-picker]").forEach((picker) => {
    const field = picker.closest(".date-range-field");
    const trigger = field.querySelector("[data-date-trigger]");
    const hiddenInput = field.querySelector("[data-date-value]");
    const error = field.querySelector("[data-date-error]");
    const label = picker.querySelector("[data-calendar-label]");
    const grid = picker.querySelector("[data-calendar-grid]");
    const previous = picker.querySelector("[data-calendar-prev]");
    const next = picker.querySelector("[data-calendar-next]");
    const placeholder = trigger.dataset.placeholder || copy.datePlaceholder;
    const today = startOfDay(new Date());
    let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let rangeStart = null;
    let rangeEnd = null;
    let previewEnd = null;

    const formatDate = (date) => date.toLocaleDateString(copy.locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formatIso = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const updateValue = () => {
      if (!rangeStart) {
        hiddenInput.value = "";
        trigger.textContent = placeholder;
        trigger.classList.remove("has-value");
        return;
      }

      const finalEnd = rangeEnd || rangeStart;
      if (formatIso(rangeStart) === formatIso(finalEnd)) {
        hiddenInput.value = formatIso(rangeStart);
        trigger.textContent = formatDate(rangeStart);
      } else {
        hiddenInput.value = `${formatIso(rangeStart)}${copy.rangeSeparator}${formatIso(finalEnd)}`;
        trigger.textContent = `${formatDate(rangeStart)}${copy.rangeSeparator}${formatDate(finalEnd)}`;
      }
      trigger.classList.add("has-value");
      if (error) error.hidden = true;
    };

    const openPicker = () => {
      picker.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      render();
    };

    const closePicker = () => {
      picker.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      previewEnd = null;
    };

    const isBetween = (date, start, end) => {
      if (!start || !end) return false;
      const time = date.getTime();
      const min = Math.min(start.getTime(), end.getTime());
      const max = Math.max(start.getTime(), end.getTime());
      return time >= min && time <= max;
    };

    const updateDayClasses = () => {
      grid.querySelectorAll(".date-day").forEach((button) => {
        if (!button.dataset.date || button.classList.contains("is-blank")) return;
        const date = parseIsoDate(button.dataset.date);
        button.classList.remove("is-preview", "is-range", "is-selected", "is-range-start", "is-range-end");

        const finalEnd = rangeEnd || previewEnd;
        if (rangeStart && finalEnd && isBetween(date, rangeStart, finalEnd)) {
          button.classList.add(rangeEnd ? "is-range" : "is-preview");
          const startIso = formatIso(rangeStart < finalEnd ? rangeStart : finalEnd);
          const endIso = formatIso(rangeStart < finalEnd ? finalEnd : rangeStart);
          if (formatIso(date) === startIso) button.classList.add("is-range-start");
          if (formatIso(date) === endIso) button.classList.add("is-range-end");
        }
        if ((rangeStart && formatIso(date) === formatIso(rangeStart)) || (rangeEnd && formatIso(date) === formatIso(rangeEnd))) {
          button.classList.add("is-selected");
        }
      });
    };

    const render = () => {
      label.textContent = viewDate.toLocaleDateString(copy.locale, {
        month: "long",
        year: "numeric",
      });
      grid.innerHTML = "";

      const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
      const startOffset = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
      for (let i = 0; i < startOffset; i += 1) {
        const blank = document.createElement("span");
        blank.className = "date-day is-blank";
        grid.appendChild(blank);
      }

      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "date-day";
        button.textContent = String(day);
        button.dataset.date = formatIso(date);
        button.setAttribute("role", "gridcell");

        const disabled = date < today;
        if (disabled) {
          button.classList.add("is-disabled");
          button.disabled = true;
        }

        button.addEventListener("mouseenter", () => {
          if (rangeStart && !rangeEnd) {
            previewEnd = date;
            updateDayClasses();
          }
        });

        button.addEventListener("click", () => {
          if (!rangeStart || rangeEnd) {
            rangeStart = date;
            rangeEnd = null;
            previewEnd = null;
            updateDayClasses();
            return;
          }

          if (date < rangeStart) {
            rangeEnd = rangeStart;
            rangeStart = date;
          } else {
            rangeEnd = date;
          }
          updateValue();
          updateDayClasses();
          closePicker();
        });

        button.addEventListener("dblclick", () => {
          rangeStart = date;
          rangeEnd = date;
          previewEnd = null;
          updateValue();
          updateDayClasses();
          closePicker();
        });

        grid.appendChild(button);
      }

      updateDayClasses();
    };

    trigger.addEventListener("click", () => {
      if (picker.hidden) {
        openPicker();
      } else {
        closePicker();
      }
    });

    previous.addEventListener("click", () => {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
      render();
    });

    next.addEventListener("click", () => {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
      render();
    });

    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(field)) {
        closePicker();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePicker();
    });

    field.addEventListener("date-range:clear", () => {
      rangeStart = null;
      rangeEnd = null;
      previewEnd = null;
      updateValue();
      if (error) error.hidden = true;
      render();
    });

    render();
  });

  document.querySelectorAll("[data-other-select]").forEach((select) => {
    const fieldId = select.getAttribute("aria-controls");
    const field = fieldId ? document.getElementById(fieldId) : null;
    const input = field ? field.querySelector("input") : null;

    const updateOtherField = () => {
      const shouldShow = select.value === "Other";
      if (!field || !input) return;
      field.hidden = !shouldShow;
      input.disabled = !shouldShow;
      input.required = shouldShow;
      if (!shouldShow) input.value = "";
    };

    select.addEventListener("change", updateOtherField);
    updateOtherField();
  });

  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      const dateValue = form.querySelector("[data-date-value]");
      const dateError = form.querySelector("[data-date-error]");
      const dateTrigger = form.querySelector("[data-date-trigger]");
      if (dateValue && !dateValue.value) {
        event.preventDefault();
        if (dateError) dateError.hidden = false;
        if (dateTrigger) dateTrigger.focus();
        return;
      }

      event.preventDefault();
      const message = form.querySelector("[data-form-message]");
      const submitButton = form.querySelector("button[type='submit']");
      const originalButtonText = submitButton ? submitButton.textContent : "";

      if (message) {
        message.classList.remove("is-visible", "is-error");
        message.textContent = copy.sendingMessage;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = copy.sendingButton;
      }

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) {
          throw new Error(result.message || copy.formError);
        }

        form.reset();
        form.querySelectorAll("[data-other-select]").forEach((select) => {
          select.dispatchEvent(new Event("change"));
        });
        form.querySelectorAll(".date-range-field").forEach((field) => {
          field.dispatchEvent(new CustomEvent("date-range:clear"));
        });

        if (message) {
          message.textContent = copy.formSuccess;
          message.classList.add("is-visible");
          message.focus();
        }
      } catch (error) {
        if (message) {
          message.textContent = copy.formFailure;
          message.classList.add("is-visible", "is-error");
          message.focus();
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  });
});

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseIsoDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
