const screens = Array.from(document.querySelectorAll(".screen"));
const appRoot = document.querySelector(".app");
const setupForm = document.getElementById("setupForm");
const resetGameBtn = document.getElementById("resetGameBtn");
const roleCard = document.getElementById("roleCard");
const roleValue = document.getElementById("roleValue");
const roleProgress = document.getElementById("roleProgress");
const roleNextBtn = document.getElementById("roleNextBtn");
const showResultsBtn = document.getElementById("showResultsBtn");
const resultsSummary = document.getElementById("resultsSummary");
const resultWord = document.getElementById("resultWord");
const resultImposter = document.getElementById("resultImposter");
const reviewCluesBtn = document.getElementById("reviewCluesBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const startingPlayerMessage = document.getElementById("startingPlayerMessage");
const playerInput = document.getElementById("playerInput");
const playerList = document.getElementById("playerList");
const playersField = document.getElementById("playersField");
const themeGrid = document.getElementById("themeGrid");
const categoriesField = document.getElementById("categoriesField");
const createPackBtn = document.getElementById("createPackBtn");
const selectedThemesList = document.getElementById("selectedThemesList");

const themePacks = [
  {
    id: "animals",
    title: "Animales & Naturaleza",
    emoji: "🦊",
    tag: "Relax",
    description: "Fauna, selva y bichos curiosos.",
    gradient: "linear-gradient(135deg, #0f172a, #2dd4bf)",
    words: ["Leon", "Panda", "Camaleon", "Condor", "Nutria", "Orca"],
  },
  {
    id: "world",
    title: "Mundo & Lugares",
    emoji: "🌍",
    tag: "Viajeros",
    description: "Ciudades iconicas y destinos.",
    gradient: "linear-gradient(135deg, #111827, #6366f1)",
    words: ["Kioto", "Berlin", "Cartagena", "Marrakech", "Toronto", "Cusco"],
  },
  {
    id: "food",
    title: "Comida & Bebidas",
    emoji: "🍜",
    tag: "Familiar",
    description: "Platos famosos y antojos.",
    gradient: "linear-gradient(135deg, #ff9966, #ff5e62)",
    words: ["Pizza", "Gazpacho", "Ceviche", "Empanada", "Croissant", "Ramen", "Paella"],
  },
  {
    id: "jobs",
    title: "Profesiones",
    emoji: "💼",
    tag: "Versatil",
    description: "Roles cotidianos y curiosos.",
    gradient: "linear-gradient(135deg, #23a6d5, #23d5ab)",
    words: ["Piloto", "Barista", "Astronauta", "Chef", "Profesor", "Detective"],
  },
  {
    id: "movies",
    title: "Series & Cine",
    emoji: "🎬",
    tag: "Pop",
    description: "Peliculas y sagas memorables.",
    gradient: "linear-gradient(135deg, #7f7cfe, #a084e8)",
    words: ["Inception", "Titanic", "Gladiator", "Amelie", "Avatar", "Matrix", "Coco"],
  },
  {
    id: "sports",
    title: "Deportes",
    emoji: "🏅",
    tag: "Activo",
    description: "Eventos y equipamiento.",
    gradient: "linear-gradient(135deg, #42e695, #3bb2b8)",
    words: ["Baloncesto", "Esgrima", "Surf", "Escalada", "Beisbol", "Rugby"],
  },
  {
    id: "summer",
    title: "Verano & Playa",
    emoji: "🏖️",
    tag: "Fiesta",
    description: "Vacaciones soleadas y relax.",
    gradient: "linear-gradient(135deg, #f83600, #f9d423)",
    words: ["Hamaca", "Coral", "Tiburon", "Catamaran", "Arena", "Ola Gigante"],
  },
  {
    id: "transport",
    title: "Transportes",
    emoji: "🚀",
    tag: "Rapido",
    description: "Medios locos para moverse.",
    gradient: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    words: ["Globo", "Tranvia", "Moto", "Cohete", "Submarino", "Convertible"],
  },
  {
    id: "fantasy",
    title: "Fantasia",
    emoji: "🧙",
    tag: "Geek",
    description: "Criaturas y magia ligera.",
    gradient: "linear-gradient(135deg, #c471f5, #fa71cd)",
    words: ["Dragon", "Hechicero", "Castillo", "Grifo", "Portal", "Sirena"],
  },
];

const wordBank = themePacks.reduce((bank, pack) => {
  bank[pack.id] = pack.words;
  return bank;
}, {});

const initialThemeInput =
  (categoriesField && categoriesField.value) || (themePacks[0] && themePacks[0].id) || "food";

const defaultThemeList = initialThemeInput
  .split(",")
  .map((value) => value.trim())
  .filter((value) => wordBank[value]);

if (!defaultThemeList.length && themePacks[0]) {
  defaultThemeList.push(themePacks[0].id);
}

const state = {
  players: [],
  imposterIndices: [],
  secretWord: "",
  roleCursor: 0,
  selectedThemes: defaultThemeList.slice(),
  startingPlayerIndex: 0,
  impostorCount: 1,
};

let pendingPlayers = [];
let isRoleCardHeld = false;
let hasCurrentPlayerSeenRole = false;

function syncSelectedThemesField() {
  if (!categoriesField) return;
  categoriesField.value = state.selectedThemes.join(",");
}

syncSelectedThemesField();
renderSelectedThemesList();

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  if (appRoot) {
    appRoot.classList.toggle("app--full", id === "screen-setup");
  }
}

function parsePlayers(raw) {
  return raw
    .split(/\n|,/)
    .map((name) => name.trim())
    .filter((name) => name.length);
}

function syncPlayersField() {
  if (!playersField) return;
  playersField.value = pendingPlayers.join("\n");
}

function renderPlayerList() {
  if (!playerList) return;
  playerList.innerHTML = "";

  if (!pendingPlayers.length) {
    const empty = document.createElement("p");
    empty.className = "player-empty";
    empty.textContent = "Añade al menos 3 jugadores.";
    playerList.appendChild(empty);
    syncPlayersField();
    return;
  }

  const fragment = document.createDocumentFragment();
  pendingPlayers.forEach((name, index) => {
    const pill = document.createElement("div");
    pill.className = "player-pill";

    const label = document.createElement("span");
    label.textContent = name;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "player-pill__remove";
    removeBtn.setAttribute("aria-label", `Eliminar ${name}`);
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => removePlayer(index));

    pill.appendChild(label);
    pill.appendChild(removeBtn);
    fragment.appendChild(pill);
  });

  playerList.appendChild(fragment);
  syncPlayersField();
}

function highlightSelectedTheme() {
  if (!themeGrid) return;
  const cards = themeGrid.querySelectorAll(".theme-card");
  cards.forEach((card) => {
    const themeId = card.dataset.theme;
    const isActive = state.selectedThemes.includes(themeId);
    card.classList.toggle("theme-card--active", isActive);
    card.setAttribute("aria-checked", isActive ? "true" : "false");
  });
}

function renderSelectedThemesList() {
  if (!selectedThemesList) return;
  selectedThemesList.innerHTML = "";

  if (!state.selectedThemes.length) {
    const empty = document.createElement("p");
    empty.className = "selected-themes__empty";
    empty.textContent = "Activa al menos un pack.";
    selectedThemesList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  state.selectedThemes.forEach((themeId) => {
    const pack = themePacks.find((item) => item.id === themeId);
    if (!pack) return;

    const card = document.createElement("div");
    card.className = "theme-card theme-card--static";
    card.style.setProperty("--theme-card-bg", pack.gradient);
    card.setAttribute("aria-label", pack.title);

    const icon = document.createElement("span");
    icon.className = "theme-card__icon";
    icon.textContent = pack.emoji;

    const title = document.createElement("p");
    title.className = "theme-card__title";
    title.textContent = pack.title;

    const meta = document.createElement("p");
    meta.className = "theme-card__meta";
    meta.textContent = pack.description;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(meta);

    if (pack.tag) {
      const tag = document.createElement("span");
      tag.className = "theme-card__tag";
      tag.textContent = pack.tag;
      tag.setAttribute("aria-hidden", "true");
      card.appendChild(tag);
    }

    fragment.appendChild(card);
  });

  selectedThemesList.appendChild(fragment);
}

function toggleTheme(themeId) {
  if (!wordBank[themeId]) return;
  const currentIndex = state.selectedThemes.indexOf(themeId);
  if (currentIndex >= 0) {
    if (state.selectedThemes.length === 1) {
      alert("Mantén al menos un pack activo.");
      return;
    }
    state.selectedThemes.splice(currentIndex, 1);
  } else {
    state.selectedThemes.push(themeId);
  }
  syncSelectedThemesField();
  highlightSelectedTheme();
  renderSelectedThemesList();
}

function renderThemeGrid() {
  if (!themeGrid) return;
  themeGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  themePacks.forEach((pack) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "theme-card";
    card.dataset.theme = pack.id;
    card.style.setProperty("--theme-card-bg", pack.gradient);
    card.setAttribute("role", "checkbox");
    card.setAttribute("aria-label", pack.title);
    card.tabIndex = 0;

    const icon = document.createElement("span");
    icon.className = "theme-card__icon";
    icon.textContent = pack.emoji;

    const title = document.createElement("p");
    title.className = "theme-card__title";
    title.textContent = pack.title;

    const meta = document.createElement("p");
    meta.className = "theme-card__meta";
    meta.textContent = pack.description;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(meta);

    if (pack.tag) {
      const tag = document.createElement("span");
      tag.className = "theme-card__tag";
      tag.textContent = pack.tag;
      tag.setAttribute("aria-hidden", "true");
      card.appendChild(tag);
    }

    card.addEventListener("click", () => toggleTheme(pack.id));
    card.addEventListener("keydown", handleThemeCardKeydown);
    fragment.appendChild(card);
  });

  themeGrid.appendChild(fragment);
  highlightSelectedTheme();
}

function handleThemeCardKeydown(event) {
  if (!themeGrid) return;
  const cards = Array.from(themeGrid.querySelectorAll(".theme-card"));
  if (!cards.length) return;
  const currentCard = event.currentTarget;
  const currentIndex = cards.indexOf(currentCard);
  if (currentIndex === -1) return;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    if (currentCard && currentCard.dataset.theme) {
      toggleTheme(currentCard.dataset.theme);
    }
    return;
  }

  let nextIndex = -1;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = (currentIndex + 1) % cards.length;
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = (currentIndex - 1 + cards.length) % cards.length;
  }

  if (nextIndex >= 0) {
    cards[nextIndex].focus();
  }
}

function addPlayersFromInput(raw) {
  const candidates = parsePlayers(raw);
  let added = false;

  candidates.forEach((name) => {
    const normalized = name.replace(/\s+/g, " ");
    if (!normalized) return;
    pendingPlayers.push(normalized);
    added = true;
  });

  if (added) {
    renderPlayerList();
  }
}

function removePlayer(index) {
  if (index < 0 || index >= pendingPlayers.length) return;
  pendingPlayers.splice(index, 1);
  renderPlayerList();
}

function pickSecretWord() {
  const pool = state.selectedThemes.reduce((words, themeId) => {
    const candidates = wordBank[themeId] || [];
    return words.concat(candidates);
  }, []);
  if (!pool.length) {
    return "Palabra";
  }

  let candidate = pool[Math.floor(Math.random() * pool.length)];
  let attempts = 0;
  while (candidate === state.secretWord && attempts < 5 && pool.length > 1) {
    candidate = pool[Math.floor(Math.random() * pool.length)];
    attempts += 1;
  }
  return candidate;
}

function initializeRound() {
  state.secretWord = pickSecretWord();
  state.roleCursor = 0;
  assignImpostors();
  const totalPlayers = state.players.length;
  state.startingPlayerIndex = totalPlayers
    ? Math.floor(Math.random() * totalPlayers)
    : 0;
  updateRolePanel();
  updateStartingPlayerMessage();
}

function assignImpostors() {
  const totalPlayers = state.players.length;
  if (!totalPlayers) {
    state.imposterIndices = [];
    return;
  }

  const allowedCount = Math.min(
    Math.max(1, state.impostorCount),
    Math.max(1, totalPlayers - 1)
  );

  const pool = state.players.map((_, index) => index);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  state.imposterIndices = pool.slice(0, allowedCount).sort((a, b) => a - b);
}

function resetRoleCard() {
  if (!roleCard) return;
  roleCard.dataset.role = "hidden";
  roleCard.classList.remove("role-card--flipped");
  roleCard.setAttribute("aria-pressed", "false");
  isRoleCardHeld = false;
}

function beginRoleReveal() {
  if (!roleCard) return;
  if (state.roleCursor >= state.players.length || isRoleCardHeld) return;
  isRoleCardHeld = true;
  roleCard.classList.add("role-card--flipped");
  roleCard.setAttribute("aria-pressed", "true");
  revealCurrentRole();
  if (!hasCurrentPlayerSeenRole) {
    hasCurrentPlayerSeenRole = true;
    roleNextBtn.disabled = false;
  }
}

function endRoleReveal() {
  if (!roleCard || !isRoleCardHeld) return;
  resetRoleCard();
}

function handleRoleCardPointerDown(event) {
  if (!roleCard) return;
  if (state.roleCursor >= state.players.length) return;
  event.preventDefault();
  if (typeof roleCard.setPointerCapture === "function") {
    try {
      roleCard.setPointerCapture(event.pointerId);
    } catch (error) {
      // Ignore if the browser blocks pointer capture.
    }
  }
  beginRoleReveal();
}

function handleRoleCardPointerEnd(event) {
  if (!roleCard) return;
  if (typeof roleCard.releasePointerCapture === "function") {
    try {
      roleCard.releasePointerCapture(event.pointerId);
    } catch (error) {
      // Ignore if the pointer capture was never set.
    }
  }
  endRoleReveal();
}

function handleRoleCardKeyDown(event) {
  if (event.key !== " " && event.key !== "Enter") return;
  event.preventDefault();
  beginRoleReveal();
}

function handleRoleCardKeyUp(event) {
  if (event.key !== " " && event.key !== "Enter") return;
  event.preventDefault();
  endRoleReveal();
}

function updateRolePanel() {
  const total = state.players.length;
  if (!total) return;

  if (state.roleCursor >= total) {
    roleProgress.textContent = "Roles completos";
    roleValue.textContent = "---";
    roleNextBtn.disabled = true;
    hasCurrentPlayerSeenRole = false;
    resetRoleCard();
    return;
  }

  const currentPlayer = state.players[state.roleCursor];
  roleProgress.textContent = `Jugador ${state.roleCursor + 1} de ${total} – ${currentPlayer}`;
  roleValue.textContent = "---";
  hasCurrentPlayerSeenRole = false;
  roleNextBtn.disabled = true;
  resetRoleCard();
}

function isImpostorIndex(index) {
  return state.imposterIndices.includes(index);
}

function updateStartingPlayerMessage() {
  if (!startingPlayerMessage) return;
  if (!state.players.length) {
    startingPlayerMessage.textContent = "Empieza ...";
    return;
  }
  const starter = state.players[state.startingPlayerIndex];
  startingPlayerMessage.textContent = `Inicia ${starter}. Continuad en sentido horario.`;
}

function handleSetupSubmit(event) {
  event.preventDefault();
  const formData = new FormData(setupForm);
  if (pendingPlayers.length < 3) {
    alert("Necesitas al menos 3 jugadores para empezar.");
    return;
  }

  const categoriesInput = (formData.get("categories") || "")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => wordBank[value]);

  if (categoriesInput.length) {
    state.selectedThemes = Array.from(new Set(categoriesInput));
  }

  if (!state.selectedThemes.length) {
    alert("Activa al menos un pack antes de comenzar.");
    return;
  }

  syncSelectedThemesField();
  highlightSelectedTheme();
  renderSelectedThemesList();
  state.players = pendingPlayers.slice();
  const impostorInput = Number(formData.get("impostors")) || 1;
  state.impostorCount = Math.max(1, Math.floor(impostorInput));

  initializeRound();
  showScreen("screen-roles");
}

function revealCurrentRole() {
  if (!roleCard || state.roleCursor >= state.players.length) return;
  const isImposter = isImpostorIndex(state.roleCursor);
  roleCard.dataset.role = isImposter ? "imposter" : "word";
  roleValue.textContent = isImposter ? "IMPOSTOR" : state.secretWord;
}

function goToNextPlayer() {
  state.roleCursor += 1;
  if (state.roleCursor >= state.players.length) {
    updateStartingPlayerMessage();
    showScreen("screen-clues");
    return;
  }
  updateRolePanel();
}

function revealWordAndImpostors() {
  const imposterNames = getImpostorNames();
  resultsSummary.textContent = "Mostrad la palabra en voz alta y descubrid si acertasteis.";
  resultWord.textContent = state.secretWord;
  resultImposter.textContent = imposterNames.length > 1
    ? `Impostores: ${imposterNames.join(", ")}`
    : `Impostor: ${imposterNames[0]}`;
  showScreen("screen-results");
}

function handleNextRound() {
  showScreen("screen-setup");
}

function getImpostorNames() {
  if (!state.players.length || !state.imposterIndices.length) {
    return ["???"];
  }
  return state.imposterIndices.map((index) => state.players[index]);
}

if (resetGameBtn) {
  resetGameBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

renderPlayerList();
renderThemeGrid();
showScreen("screen-setup");

if (createPackBtn) {
  createPackBtn.addEventListener("click", () => {
    alert("Muy pronto podras crear packs personalizados.");
  });
}

if (playerInput) {
  playerInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addPlayersFromInput(playerInput.value);
    playerInput.value = "";
  });
}

if (roleCard) {
  roleCard.addEventListener("pointerdown", handleRoleCardPointerDown);
  roleCard.addEventListener("pointerup", handleRoleCardPointerEnd);
  roleCard.addEventListener("pointerleave", handleRoleCardPointerEnd);
  roleCard.addEventListener("pointercancel", handleRoleCardPointerEnd);
  roleCard.addEventListener("keydown", handleRoleCardKeyDown);
  roleCard.addEventListener("keyup", handleRoleCardKeyUp);
}

setupForm.addEventListener("submit", handleSetupSubmit);
roleNextBtn.addEventListener("click", goToNextPlayer);
showResultsBtn.addEventListener("click", revealWordAndImpostors);
reviewCluesBtn.addEventListener("click", () => {
  showScreen("screen-clues");
});
nextRoundBtn.addEventListener("click", handleNextRound);
