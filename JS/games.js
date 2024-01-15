let cardDiv = document.querySelector(".cardDiv");
let navLinks = document.querySelectorAll(".nav-link");
let loading = document.querySelector(".loading");

export class DisplayGames {
  constructor(category) {
    this.category = category;
  }

  async displayAllGames() {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7b39ffb0camsh9374e56e615f7f6p148a2ejsn1d6a1e59026a",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      let cardsDiv = "";
      for (let i = 0; i < result.length; i++) {
        let game = result[i];
        cardsDiv += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4 card-container" data-game-id="${game.id}">
          <div class="card p-3 h-100">
            <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}" />
            <div class="card-body d-flex justify-content-between align-items-baseline">
              <h3 class="card-title">${game.title}</h3>
              <span class="card-span p-2 rounded-2 bg-primary bg-gradient">Free</span>
            </div>
            <div class="card-body">
              <p class="card-text">${game.short_description}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-baseline ">
              <small class="text-body-white small-txt mt-1">${game.genre}</small>
              <small class="text-body-white small-txt mt-1">${game.platform}</small>
            </div>
          </div>
        </div>`;
      }

      cardDiv.innerHTML = cardsDiv;
      loading.style.display = "none";
    } catch (error) {
      console.error(error);
      loading.style.display = "none";
    }

    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", () => {
        for (let j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove("active");
        }
        navLinks[i].classList.add("active");

        this.category = navLinks[i].textContent.toLowerCase();
        loading.style.display = "block";
        this.displayAllGames();
      });
    }
  }
}
