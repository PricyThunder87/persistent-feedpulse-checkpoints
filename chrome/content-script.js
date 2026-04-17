(function () {
  "use strict";

  var STORAGE_PREFIX = "feedpulse-textarea:";
  var STORAGE_TTL_MS = 2 * 24 * 60 * 60 * 1000;

  function getPageKey() {
    return location.origin + location.pathname;
  }

  function getElementLocator(element) {
    var parts = [];
    var current = element;

    while (current && current.nodeType === 1 && current !== document.body) {
      var tag = current.tagName.toLowerCase();
      var part = tag;
      var checkpointId = current.getAttribute("data-checkpoint-id");

      if (current.id) {
        part += "#" + current.id;
        parts.unshift(part);
        break;
      }

      if (checkpointId) {
        part += "[data-checkpoint-id=\"" + checkpointId + "\"]";
      }

      var siblingIndex = 1;
      var sibling = current;

      while (sibling.previousElementSibling) {
        sibling = sibling.previousElementSibling;
        if (sibling.tagName === current.tagName) {
          siblingIndex += 1;
        }
      }

      part += ":nth-of-type(" + siblingIndex + ")";
      parts.unshift(part);
      current = current.parentElement;
    }

    return parts.join(">");
  }

  function getStorage() {
    try {
      return window.top.localStorage;
    } catch (error) {
      return window.localStorage;
    }
  }

  function getTextareaKey(textarea) {
    var pageKey = getPageKey();
    var locator = getElementLocator(textarea);
    var id = textarea.id || "";
    var name = textarea.name || "";
    var placeholder = textarea.placeholder || "";
    var label = textarea.getAttribute("aria-label") || "";
    var className = textarea.className || "";

    return [STORAGE_PREFIX, pageKey, locator, id, name, placeholder, label, className].join("|");
  }

  function getSavedEntry(storage, key) {
    var raw = storage.getItem(key);
    if (raw === null) {
      return null;
    }

    try {
      var parsed = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed === "object" &&
        typeof parsed.value === "string" &&
        typeof parsed.savedAt === "number"
      ) {
        return parsed;
      }
    } catch (error) {
      return {
        value: raw,
        savedAt: Date.now()
      };
    }

    return {
      value: raw,
      savedAt: Date.now()
    };
  }

  function isExpired(savedAt) {
    return Date.now() - savedAt > STORAGE_TTL_MS;
  }

  function applyValue(textarea, value) {
    if (textarea.value === value) {
      return;
    }

    textarea.value = value;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function restoreTextarea(storage, textarea) {
    var key = getTextareaKey(textarea);
    var entry = getSavedEntry(storage, key);

    if (entry === null) {
      return;
    }

    if (isExpired(entry.savedAt)) {
      storage.removeItem(key);
      return;
    }

    applyValue(textarea, entry.value);

    setTimeout(function () {
      applyValue(textarea, entry.value);
    }, 150);

    setTimeout(function () {
      applyValue(textarea, entry.value);
    }, 500);
  }

  function saveTextarea(storage, textarea) {
    var key = getTextareaKey(textarea);
    if (textarea.value) {
      storage.setItem(
        key,
        JSON.stringify({
          value: textarea.value,
          savedAt: Date.now()
        })
      );
    } else {
      storage.removeItem(key);
    }
  }

  function bindTextarea(storage, textarea) {
    if (textarea.dataset.feedpulseTextareaBound === "1") {
      return;
    }

    textarea.dataset.feedpulseTextareaBound = "1";
    restoreTextarea(storage, textarea);

    textarea.addEventListener("input", function () {
      saveTextarea(storage, textarea);
    });

    textarea.addEventListener("change", function () {
      saveTextarea(storage, textarea);
    });
  }

  function bindAllTextareas(storage) {
    var textareas = document.querySelectorAll("textarea");
    for (var i = 0; i < textareas.length; i += 1) {
      bindTextarea(storage, textareas[i]);
    }
  }

  function init() {
    var storage = getStorage();
    bindAllTextareas(storage);

    var observer = new MutationObserver(function () {
      bindAllTextareas(storage);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
