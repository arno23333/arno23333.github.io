document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("#primary-nav");

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

  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("is-active");
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const portfolioItems = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      portfolioItems.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  document.querySelectorAll("[data-date-picker]").forEach((picker) => {
    const field = picker.closest(".date-range-field");
    const trigger = field.querySelector("[data-date-trigger]");
    const hiddenInput = field.querySelector("[data-date-value]");
    const error = field.querySelector("[data-date-error]");
    const label = picker.querySelector("[data-calendar-label]");
    const grid = picker.querySelector("[data-calendar-grid]");
    const previous = picker.querySelector("[data-calendar-prev]");
    const next = picker.querySelector("[data-calendar-next]");
    const today = startOfDay(new Date());
    let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let rangeStart = null;
    let rangeEnd = null;
    let previewEnd = null;

    const formatDate = (date) => date.toLocaleDateString("zh-CN", {
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
        trigger.textContent = "选择日期或日期范围";
        trigger.classList.remove("has-value");
        return;
      }

      const finalEnd = rangeEnd || rangeStart;
      if (formatIso(rangeStart) === formatIso(finalEnd)) {
        hiddenInput.value = formatIso(rangeStart);
        trigger.textContent = formatDate(rangeStart);
      } else {
        hiddenInput.value = `${formatIso(rangeStart)} 至 ${formatIso(finalEnd)}`;
        trigger.textContent = `${formatDate(rangeStart)} 至 ${formatDate(finalEnd)}`;
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
      label.textContent = viewDate.toLocaleDateString("zh-CN", {
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
        message.textContent = "正在发送你的咨询...";
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "发送中...";
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
          throw new Error(result.message || "表单暂时无法发送。");
        }

        form.reset();
        form.querySelectorAll("[data-other-select]").forEach((select) => {
          select.dispatchEvent(new Event("change"));
        });
        form.querySelectorAll(".date-range-field").forEach((field) => {
          field.dispatchEvent(new CustomEvent("date-range:clear"));
        });

        if (message) {
          message.textContent = "谢谢，你的咨询已经发送。Fiona 会在 48 小时内回复。";
          message.classList.add("is-visible");
          message.focus();
        }
      } catch (error) {
        if (message) {
          message.textContent = "发送时出现问题。请直接发送邮件到 fionatanggg@gmail.com 联系 Fiona。";
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
