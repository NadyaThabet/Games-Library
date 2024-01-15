import { DisplayGames } from "./games.js";

let detailsCard = document.querySelector(".details-card");
let loading = document.querySelector(".loading");

export class Details {
  constructor(cards, gamesDisplay, detailsDisplay, closeBtn) {
    this.cards = cards;
    this.gamesDisplay = gamesDisplay;
    this.detailsDisplay = detailsDisplay;
    this.closeBtn = closeBtn;

    this.displayGames = new DisplayGames("mmorpg");

    document.addEventListener("click", (e) => {
      const cardContainer = e.target.closest(".card-container");

      if (cardContainer) {
        const gameId = cardContainer.getAttribute("data-game-id");
        this.showGameDetails();
        this.gameDetails(gameId);
      }

      if (e.target.closest("#closeBtn")) {
        this.showGameList();
      }
    });
  }

  showGameDetails() {
    this.gamesDisplay.style.display = "none";
    this.detailsDisplay.style.display = "block";
    loading.style.display = "block";
  }

  showGameList() {
    this.gamesDisplay.style.display = "block";
    this.detailsDisplay.style.display = "none";
  }

  async gameDetails(gameId) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
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

      let displayDetails = "";

      displayDetails += `<div class="col-md-4">
          <img src="${result.thumbnail}" alt="${result.title}" class="w-100"/>
        </div>
        <div class="col-md-8">
          <h3 class="text-warning title mb-4">Title: <span class="text-white ms-1">${result.title}</span></h3>
          <p class="text-warning details-txt">Category:<span class="text-white ms-1"> ${result.genre}</span></p>
          <p class="text-warning details-txt my-4">Platform:<span class="text-white ms-1"> ${result.platform}</span></p>
          <p class="text-warning details-txt mb-4">Status:<span class="text-white ms-1"> ${result.status}</span></p>
          <p class="text-white mb-4 desc">${result.description}</p>
          <button type="button" class="btn btn-outline-warning show-btn mb-5">
          <a href="${result.game_url}" class="text-decoration-none show text-white" target="_blank">Show Game</a>
        </button>
        </div>`;

      detailsCard.innerHTML = displayDetails;
      loading.style.display = "none";
    } catch (error) {
      console.error(error);
      loading.style.display = "none";
    }
  }
}
