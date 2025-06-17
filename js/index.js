require("../styles/styles.css");

const basePath = process.env.NODE_ENV === "production" ? "AIBY-test" : "";

async function loadLocale(lang) {
  try {
    const response = await fetch(`${basePath}/assets/lang/${lang}.json`);
    if (!response.ok) throw new Error("Language file not found");
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${lang} locale:`, error);
    const enResponse = await fetch(`${basePath}/assets/lang/${lang}.json`);
    return await enResponse.json();
  }
}

function applyTranslation(translations) {
  document.querySelectorAll("[data-translate-key]").forEach((element) => {
    const key = element.getAttribute("data-translate-key");
    if (translations[key]) {
      element.innerHTML = translations[key];
    }
  });

  document
    .querySelectorAll("[data-translate-week-price]")
    .forEach((element) => {
      const key = element.getAttribute("data-translate-week-price");
      const price = element.getAttribute("data-week-price-value");
      if (translations[key] && price) {
        element.innerHTML = translations[key].replace("{{price}}", price);
      }
    });

  document
    .querySelectorAll("[data-translate-year-price]")
    .forEach((element) => {
      const key = element.getAttribute("data-translate-year-price");
      const price = element.getAttribute("data-year-price-value");
      if (translations[key] && price) {
        element.innerHTML = translations[key].replace("{{price}}", price);
      }
    });
}

function getLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");

  const supportedLangs = ["en", "de", "fr", "es", "ja", "pt"];

  if (langParam && supportedLangs.includes(langParam)) {
    return langParam;
  }

  const browserLang = navigator.language.split("-")[0];
  return supportedLangs.includes(browserLang) ? browserLang : "en";
}

async function initLocalization() {
  const lang = getLanguage();
  const translations = await loadLocale(lang);

  if (translations) {
    applyTranslation(translations);
  }
}

document.addEventListener("DOMContentLoaded", initLocalization);

function updateLanguage(newLang) {
  loadLocale(newLang).then(applyTranslation);
}

const continueBtn = document.getElementById("continue-btn");
continueBtn.addEventListener("click", () => {
  const selectedRadio = document.querySelector(
    'input[name="accessoption"]:checked'
  );
  window.location.href = selectedRadio.value;
});

const textResizer = async () => {
  const lang = getLanguage();
  const title = document.getElementsByClassName("title")[0];
  const footerLinks = document.getElementsByClassName("footer-link");
  const accessDescription =
    document.getElementsByClassName("access-description")[0];
  switch (lang) {
    case "de":
      title.classList.add("title__de");
      for (let link of footerLinks) {
        link.classList.remove("footer-link__es");
        link.classList.remove("footer-link__pt");
        link.classList.add("footer-link__de");
        link.classList.remove("footer-link__fr");
      }
      accessDescription.classList.remove("access-description__fr");
      accessDescription.classList.remove("access-description__pt");

      break;
    case "es":
      title.classList.remove("title__de");
      for (let link of footerLinks) {
        link.classList.add("footer-link__es");
        link.classList.remove("footer-link__pt");
        link.classList.remove("footer-link__de");
        link.classList.remove("footer-link__fr");
      }
      accessDescription.classList.remove("access-description__fr");
      accessDescription.classList.remove("access-description__pt");

      break;
    case "pt":
      title.classList.remove("title__de");
      for (let link of footerLinks) {
        link.classList.remove("footer-link__es");
        link.classList.add("footer-link__pt");
        link.classList.remove("footer-link__de");
        link.classList.remove("footer-link__fr");
      }
      accessDescription.classList.remove("access-description__fr");
      accessDescription.classList.add("access-description__pt");
      break;
    case "fr":
      title.classList.remove("title__de");
      for (let link of footerLinks) {
        link.classList.remove("footer-link__es");
        link.classList.remove("footer-link__pt");
        link.classList.remove("footer-link__de");
        link.classList.add("footer-link__fr");
      }
      accessDescription.classList.add("access-description__fr");
      accessDescription.classList.remove("access-description__pt");

      break;
    default:
      title.classList.remove("title__de");
      for (let link of footerLinks) {
        link.classList.remove("footer-link__es");
        link.classList.remove("footer-link__pt");
        link.classList.remove("footer-link__de");
        link.classList.remove("footer-link__fr");
      }
      accessDescription.classList.remove("access-description__fr");
      accessDescription.classList.remove("access-description__pt");

      break;
  }
};

document.addEventListener("DOMContentLoaded", textResizer);
