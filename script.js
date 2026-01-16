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
const nextRoundBtn = document.getElementById("nextRoundBtn");
const startingPlayerMessage = document.getElementById("startingPlayerMessage");
const playerInput = document.getElementById("playerInput");
const playerList = document.getElementById("playerList");
const playersField = document.getElementById("playersField");
const themeGrid = document.getElementById("themeGrid");
const categoriesField = document.getElementById("categoriesField");
const createPackBtn = document.getElementById("createPackBtn");
const selectedThemesList = document.getElementById("selectedThemesList");

const fallbackThemePacks = [
  {
    id: "animals",
    title: "Animales & Naturaleza",
    emoji: "🦊",
    description: "Fauna, selva y bichos curiosos.",
    gradient: "linear-gradient(135deg, #0f172a, #2dd4bf)",
    words: [
      "Leon",
      "Panda",
      "Camaleon",
      "Condor",
      "Nutria",
      "Orca",
      "Jaguar",
      "Perezoso",
      "Cebra",
      "Koala",
      "Pulpo",
      "Colibri",
      "Bisonte",
      "Lince",
      "Morsa",
      "Flamenco",
      "Caiman",
      "Capibara",
      "Pavo Real",
      "Bufalo",
      "Mono Arana",
      "Gorila",
      "Hiena",
      "Zorro Artico",
      "Tortuga",
      "Alpaca",
      "Erizo",
      "Ballena Azul",
      "Rinoceronte",
      "Tapir",
      "Narval",
      "Halcon",
      "Ardilla",
      "Camello",
      "Guepardo",
      "Delfin",
      "Oso Polar",
      "Iguana",
      "Manati",
      "Carpincho",
      "Tucan",
      "Armadillo",
      "Lobo Marino",
      "Caracol Gigante",
      "Fenix",
      "Gecko",
      "Ciervo",
      "Liebre",
      "Murcielago",
      "Grulla",
      "Avispa",
      "Langosta",
      "Medusa",
      "Barracuda",
    ],
  },
  {
    id: "world",
    title: "Mundo & Lugares",
    emoji: "🌍",
    description: "Ciudades iconicas y destinos.",
    gradient: "linear-gradient(135deg, #111827, #6366f1)",
    words: [
      "Kioto",
      "Berlin",
      "Cartagena",
      "Marrakech",
      "Toronto",
      "Cusco",
      "Lisboa",
      "Seul",
      "Budapest",
      "Reikiavik",
      "Praga",
      "Estambul",
      "Bogota",
      "Dublin",
      "Sidney",
      "Zanzibar",
      "Manila",
      "Oporto",
      "Dubrovnik",
      "Petra",
      "Nairobi",
      "Atenas",
      "Oslo",
      "Tallin",
      "Hanoi",
      "Malaga",
      "Lima",
      "Quito",
      "Granada",
      "Valparaiso",
      "Fez",
      "Edimburgo",
      "Cracovia",
      "Luxor",
      "Hobart",
      "Macau",
      "Seattle",
      "Boston",
      "Reims",
      "Ibiza",
      "Miami",
      "Oahu",
      "Sevilla",
      "La Habana",
      "Busan",
      "Mendoza",
      "Guadalajara",
      "Bruselas",
      "Salzburgo",
      "Mikonos",
      "Santorini",
      "Phuket",
      "Zermatt",
      "Banff",
      "Ushuaia",
    ],
  },
  {
    id: "food",
    title: "Comida & Bebidas",
    emoji: "🍜",
    description: "Platos famosos y antojos.",
    gradient: "linear-gradient(135deg, #ff9966, #ff5e62)",
    words: [
      "Pizza",
      "Gazpacho",
      "Ceviche",
      "Empanada",
      "Croissant",
      "Ramen",
      "Paella",
      "Tacos",
      "Arepa",
      "Gyoza",
      "Falafel",
      "Baklava",
      "Sushi",
      "Bibimbap",
      "Fondue",
      "Tiramisu",
      "Polenta",
      "Chilaquiles",
      "Pozole",
      "Pho",
      "Satay",
      "Pad Thai",
      "Crepe",
      "Hummus",
      "Pupusa",
      "Feijoada",
      "Kimchi",
      "Curry",
      "Shakshuka",
      "Calzone",
      "Mochi",
      "Burrito",
      "Goulash",
      "Milanesa",
      "Churro",
      "Pastel de Choclo",
      "Sopaipilla",
      "Risotto",
      "Cannoli",
      "Jamon Serrano",
      "Causa",
      "Tamales",
      "Mezze",
      "Mole",
      "Arequipe",
      "Coxinha",
      "Laksa",
      "Jollof",
      "Okonomiyaki",
      "Pierogi",
      "Bibingka",
      "Tagine",
      "Banh Mi",
      "Kebab",
      "Khachapuri",
      "Vindaloo",
    ],
  },
  {
    id: "jobs",
    title: "Profesiones",
    emoji: "💼",
    description: "Roles cotidianos y curiosos.",
    gradient: "linear-gradient(135deg, #23a6d5, #23d5ab)",
    words: [
      "Piloto",
      "Barista",
      "Astronauta",
      "Chef",
      "Profesor",
      "Detective",
      "Arquitecto",
      "Bailarin",
      "Periodista",
      "Ingeniero",
      "Paramedico",
      "Psicologo",
      "Biologo",
      "Fotografo",
      "Carpintero",
      "Disenador",
      "Electricista",
      "Cerrajero",
      "Panadero",
      "Programador",
      "Oceanografo",
      "Arqueologo",
      "Actor",
      "Escultor",
      "Agronomo",
      "Jardinero",
      "Soldado",
      "Diplomatico",
      "Contador",
      "Abogado",
      "Oficinista",
      "Animador",
      "Odontologo",
      "Farmaceutico",
      "Veterinario",
      "Herrero",
      "Analista",
      "Chofer",
      "Sommelier",
      "Pastelero",
      "Tatuador",
      "Escritor",
      "Editor",
      "Guia Turistico",
      "Locutor",
      "Topografo",
      "Guardabosques",
      "Matematico",
      "Cientifico de Datos",
      "Entrenador",
      "Geologo",
      "Meteorologo",
      "Maquinista",
      "Barbero",
      "Productor",
      "Recepcionista",
    ],
  },
  {
    id: "movies",
    title: "Series & Cine",
    emoji: "🎬",
    description: "Peliculas y sagas memorables.",
    gradient: "linear-gradient(135deg, #7f7cfe, #a084e8)",
    words: [
      "Inception",
      "Titanic",
      "Gladiator",
      "Amelie",
      "Avatar",
      "Matrix",
      "Coco",
      "Interstellar",
      "Casablanca",
      "Parasite",
      "Frozen",
      "Shrek",
      "Rocky",
      "Joker",
      "Dune",
      "Up",
      "WallE",
      "Terminator",
      "Alien",
      "Pulp Fiction",
      "El Padrino",
      "Forrest Gump",
      "Mad Max",
      "Black Panther",
      "Moana",
      "Toy Story",
      "Finding Nemo",
      "Los Increibles",
      "La La Land",
      "Blade Runner",
      "Jurassic Park",
      "Star Wars",
      "El Hobbit",
      "Harry Potter",
      "El Senor de los Anillos",
      "Stranger Things",
      "Breaking Bad",
      "The Crown",
      "Dark",
      "Narcos",
      "The Witcher",
      "The Mandalorian",
      "Chernobyl",
      "Severance",
      "Friends",
      "The Office",
      "The Boys",
      "Loki",
      "Westworld",
      "Sherlock",
      "House",
      "Better Call Saul",
      "Andor",
      "Arcane",
      "Wednesday",
      "One Piece",
    ],
  },
  {
    id: "sports",
    title: "Deportes",
    emoji: "🏅",
    description: "Eventos y equipamiento.",
    gradient: "linear-gradient(135deg, #42e695, #3bb2b8)",
    words: [
      "Baloncesto",
      "Esgrima",
      "Surf",
      "Escalada",
      "Beisbol",
      "Rugby",
      "Futbol",
      "Tenis",
      "Padel",
      "Natacion",
      "Atletismo",
      "Boxeo",
      "Ciclismo",
      "Maraton",
      "Triatlon",
      "Snowboard",
      "Skate",
      "Patinaje",
      "Remo",
      "Waterpolo",
      "Voleibol",
      "Badminton",
      "Cricket",
      "Hockey",
      "Karate",
      "Judo",
      "Taekwondo",
      "Yoga",
      "Pilates",
      "Crossfit",
      "Parkour",
      "Senderismo",
      "Esqui",
      "Motocross",
      "Karting",
      "Parapente",
      "Tiro con Arco",
      "Kickboxing",
      "Clavados",
      "Boliche",
      "Ping Pong",
      "Ajedrez",
      "Futbol Americano",
      "Buceo",
      "Rafting",
      "Lucha Libre",
      "Pesca Deportiva",
      "Gimnasia Ritmica",
      "Gimnasia Artistica",
      "Danza Urbana",
      "SUP",
      "Kitesurf",
      "Trail Running",
      "BMX",
      "Curling",
      "Polo",
    ],
  },
  {
    id: "summer",
    title: "Verano & Playa",
    emoji: "🏖️",
    description: "Vacaciones soleadas y relax.",
    gradient: "linear-gradient(135deg, #f83600, #f9d423)",
    words: [
      "Hamaca",
      "Coral",
      "Tiburon",
      "Catamaran",
      "Arena",
      "Ola Gigante",
      "Sombrilla",
      "Coco",
      "Snorkel",
      "Chiringuito",
      "Helado",
      "Sandalia",
      "Toalla",
      "Gafas de Sol",
      "Bloqueador",
      "Palmera",
      "Brisa",
      "Pareo",
      "Voleibol Playa",
      "Banana Boat",
      "Paddle Surf",
      "Maracas",
      "Pina Colada",
      "Barbacoa",
      "Fogata",
      "Crucero",
      "Isla",
      "Manglar",
      "Paseo Maritimo",
      "Surfskate",
      "Camino Costero",
      "Piscina Infinita",
      "Flotador",
      "Cabana",
      "Tropicalia",
      "Caracola",
      "Cometa",
      "Kayak",
      "Laguna",
      "Agua de Coco",
      "Tiki",
      "Luau",
      "Ceviche Fresco",
      "Puesta de Sol",
      "Caipirinha",
      "Sombrero Panama",
      "Caminata Descalza",
      "Espuma",
      "Marea Baja",
      "Caleta",
      "Playa Virgen",
      "Festival",
      "Carrito de Helados",
      "Concha",
      "Refresco",
      "Brisa Marina",
    ],
  },
  {
    id: "transport",
    title: "Transportes",
    emoji: "🚀",
    description: "Medios locos para moverse.",
    gradient: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    words: [
      "Globo",
      "Tranvia",
      "Moto",
      "Cohete",
      "Submarino",
      "Convertible",
      "Helicoptero",
      "Avioneta",
      "Velero",
      "Ferry",
      "Tren Bala",
      "Monopatin Electrico",
      "Tractor",
      "Camioneta",
      "Patineta",
      "Dirigible",
      "Teleferico",
      "Funicular",
      "Quad",
      "Trineo",
      "Limusina",
      "Caravana",
      "Bus Escolar",
      "Taxi",
      "Metro",
      "Segway",
      "Scooter",
      "Patines",
      "Jetpack",
      "Dron",
      "Camion",
      "Bicitaxi",
      "Lancha",
      "Yate",
      "Catamaran",
      "Moto de Agua",
      "Motonieve",
      "Sidecar",
      "Transbordador",
      "Gondola",
      "Carroza",
      "Carreta",
      "Vagoneta",
      "Autobus Articulado",
      "Bulldozer",
      "Montana Rusa",
      "Hovercraft",
      "Autobus Urbano",
      "Camion Cisterna",
      "Trineo de Perros",
      "Trolebus",
      "Vela Solar",
      "Capsula Hyperloop",
      "Vehiculo Lunar",
      "Rickshaw",
      "Taxi Acuatico",
    ],
  },
  {
    id: "fantasy",
    title: "Fantasia",
    emoji: "🧙",
    description: "Criaturas y magia ligera.",
    gradient: "linear-gradient(135deg, #c471f5, #fa71cd)",
    words: [
      "Dragon",
      "Hechicero",
      "Castillo",
      "Grifo",
      "Portal",
      "Sirena",
      "Elfo",
      "Duende",
      "Bruja",
      "Varita",
      "Pocion",
      "Caldero",
      "Hada",
      "Pegaso",
      "Reino Perdido",
      "Runas",
      "Cristal Magico",
      "Golem",
      "Necromante",
      "Fenix",
      "Caballero",
      "Taberna",
      "Oraculo",
      "Libro Arcano",
      "Espada Legendaria",
      "Armadura Magica",
      "Bosque Encantado",
      "Bestia Mistica",
      "Dungeon",
      "Wyvern",
      "Paladin",
      "Bardo",
      "Monstruo Marino",
      "Sombras Vivientes",
      "Hombre Lobo",
      "Vampiro",
      "Talisman",
      "Reliquia",
      "Hechizo",
      "Basilisco",
      "Dragona",
      "Orbe",
      "Cetro",
      "Clerigo",
      "Encantador",
      "Quimera",
      "Invocador",
      "Portal Oscuro",
      "Llama Eterna",
      "Cristal Oscuro",
      "Fosa Abisal",
      "Carro Alado",
      "Trono Vacante",
      "Corona Rota",
      "Mapa Secreto",
      "Pergamino",
    ],
  },
];

const RANDOM_THEME_PACK = {
  id: "random",
  title: "Random",
  emoji: "🎲",
  tag: "Sorpresa",
  description: "Puede salir cualquier tema.",
  gradient: "linear-gradient(135deg, #845ec2, #2fd7c4)",
};

const RANDOM_THEME_ID = RANDOM_THEME_PACK.id;

let themePacks = attachRandomThemePack(fallbackThemePacks);

function buildWordBank(packs) {
  return packs.reduce((bank, pack) => {
    bank[pack.id] = pack.words;
    return bank;
  }, {});
}

let wordBank = buildWordBank(themePacks);

function attachRandomThemePack(packs) {
  const safePacks = Array.isArray(packs) ? packs : [];
  const basePacks = safePacks.filter(
    (pack) =>
      pack &&
      typeof pack.id === "string" &&
      pack.id !== RANDOM_THEME_PACK.id &&
      Array.isArray(pack.words) &&
      pack.words.length
  );
  const randomPack = buildRandomThemePack(basePacks);
  return randomPack ? [randomPack, ...basePacks] : basePacks;
}

function buildRandomThemePack(packs) {
  const pool = packs.reduce((acc, pack) => {
    if (!Array.isArray(pack.words)) return acc;
    pack.words.forEach((word) => {
      const normalized = String(word).trim();
      if (normalized) {
        acc.add(normalized);
      }
    });
    return acc;
  }, new Set());

  if (!pool.size) {
    return null;
  }

  return {
    ...RANDOM_THEME_PACK,
    words: Array.from(pool),
  };
}

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

function ensureSelectedThemes() {
  state.selectedThemes = state.selectedThemes.filter((id) => wordBank[id]);
  const hasNonRandom = state.selectedThemes.some((id) => id !== RANDOM_THEME_ID);
  if (hasNonRandom) {
    state.selectedThemes = state.selectedThemes.filter((id) => id !== RANDOM_THEME_ID);
  }
  if (!state.selectedThemes.length) {
    if (wordBank[RANDOM_THEME_ID]) {
      state.selectedThemes = [RANDOM_THEME_ID];
    } else if (themePacks[0]) {
      state.selectedThemes = [themePacks[0].id];
    }
  }
}

function applyThemePacks(packs) {
  if (!Array.isArray(packs) || !packs.length) return;
  themePacks = attachRandomThemePack(packs);
  wordBank = buildWordBank(themePacks);
  ensureSelectedThemes();
  renderThemeGrid();
  renderSelectedThemesList();
  syncSelectedThemesField();
}

async function fetchThemePacks() {
  try {
    const response = await fetch("data/theme-packs.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    const packs = Array.isArray(payload) ? payload : payload.packs;
    if (Array.isArray(packs) && packs.length) {
      applyThemePacks(packs);
    }
  } catch (error) {
    console.warn("No se pudieron cargar los packs externos.", error);
  }
}

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

    fragment.appendChild(card);
  });

  selectedThemesList.appendChild(fragment);
}

function toggleTheme(themeId) {
  if (!wordBank[themeId]) return;
  const isRandom = themeId === RANDOM_THEME_ID;
  const hasRandom = state.selectedThemes.includes(RANDOM_THEME_ID);
  const hasNonRandom = state.selectedThemes.some((id) => id !== RANDOM_THEME_ID);

  if (isRandom) {
    if (hasNonRandom) {
      alert("Desactiva el resto de packs para usar Random.");
      return;
    }
    if (hasRandom) {
      alert("Mantén al menos un pack activo.");
      return;
    }
    state.selectedThemes = [RANDOM_THEME_ID];
  } else {
    const currentIndex = state.selectedThemes.indexOf(themeId);
    if (currentIndex >= 0) {
      state.selectedThemes.splice(currentIndex, 1);
      if (!state.selectedThemes.length) {
        state.selectedThemes = [RANDOM_THEME_ID];
      }
    } else {
      if (hasRandom) {
        state.selectedThemes = state.selectedThemes.filter((id) => id !== RANDOM_THEME_ID);
      }
      state.selectedThemes.push(themeId);
    }
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

function commitPlayerInput() {
  if (!playerInput) return;
  const rawValue = playerInput.value;
  if (!rawValue.trim()) return;
  addPlayersFromInput(rawValue);
  playerInput.value = "";
}

function handlePlayerInputKey(event) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  event.stopPropagation();
  commitPlayerInput();
}

function handlePlayerInputBeforeInput(event) {
  if (event.inputType !== "insertLineBreak") return;
  event.preventDefault();
  commitPlayerInput();
}

function handlePlayerInputChange() {
  commitPlayerInput();
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
fetchThemePacks();

if (createPackBtn) {
  createPackBtn.addEventListener("click", () => {
    alert("Muy pronto podras crear packs personalizados.");
  });
}

if (playerInput) {
  playerInput.addEventListener("keydown", handlePlayerInputKey);
  playerInput.addEventListener("beforeinput", handlePlayerInputBeforeInput);
  playerInput.addEventListener("change", handlePlayerInputChange);
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
nextRoundBtn.addEventListener("click", handleNextRound);
