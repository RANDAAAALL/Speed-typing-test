const LandingPageBtn = document.querySelector(".btn");
const LandingPageContainer = document.querySelector(".landing-page-container");
const Loader = document.querySelector(".loader-container");
const body = document.body;

// it will navigate to the secondPage.html
LandingPageBtn.addEventListener("click", () => {
  Loader.style.display = "block"
  body.classList.add("overflow");

  
  setTimeout(() => {
    Loader.style.display = "none";
    body.classList.remove("overflow");
    window.location.href = "secondPage.html";
  }, 2000)
});

