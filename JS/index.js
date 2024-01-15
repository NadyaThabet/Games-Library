import { DisplayGames } from "./games.js";
import { Details } from "./details.js";

document.addEventListener("DOMContentLoaded", () => {
  let cards = document.querySelectorAll(".card-container");
  let gamesDisplay = document.querySelector(".games");
  let detailsDisplay = document.querySelector(".details");
  let closeBtn = document.querySelector("#closeBtn");

  let $displayGames = new DisplayGames("mmorpg");
  $displayGames.displayAllGames();

  let details = new Details(cards, gamesDisplay, detailsDisplay, closeBtn);
});
