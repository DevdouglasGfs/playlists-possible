const playlistForm = document.querySelector(".data-playlist__form");
const playListInput = document.getElementById("number-songs");
const playlistPossibilities = document.getElementById("number-possibilities");
const playListInputPlaceholder = playListInput.placeholder;
let acumulator;

if (typeof Intl === 'object') {
  const brandName = {
    'pt-BR': "Playlists possíveis",
    'en': "Playlists possible"
  }

  const texts = {
    'pt-BR': {
      placeholder: 'Digite o número de músicas',
      number_possibilities: 'Aqui será mostrado o número de possíveis playlists',
      number_possibilities_result: 'Número de possibilidades:'
    },
    'en': {
      placeholder: 'Enter the number of songs',
      number_possibilities: 'Here will be shown the number of possible playlists',
      number_possibilities_result: 'Number of possibilities:'
    }
  }

  const navigatorLang = checkNavigatorLang();
  const entries = Object.entries(texts);
  for ([k, v] of entries) {
    if (k === navigatorLang) {
      const { placeholder, number_possibilities: numberOfPossibilities, number_possibilities_result: numberOfPossibilitiesResult } = v;
      const playlistSubmit = document.getElementById("see-possibilities");
      const headerTitle = document.querySelector("header>h1");

      document.title = brandName[k];
      headerTitle.textContent = brandName[k];
      playlistPossibilities.textContent = `${numberOfPossibilities}`;

      playlistSubmit.addEventListener("click", e => {
        e.preventDefault();
        playListInputPlaceholder.value = placeholder;
        if (!playListInput.value === "" || !playListInput.value <= 0) {
          playlistPossibilities.textContent = `${numberOfPossibilitiesResult} ${getNumberOfPossibilities(playListInput.value)}`;
        }
      })
    }
  }
} else {
  const playlistSubmit = document.getElementById("see-possibilities");
  playlistSubmit.addEventListener("click", e => {
    e.preventDefault();

    if (!playListInput.value === "" || !playListInput.value <= 0) {
      playlistPossibilities.textContent = `Número de possibilidades: ${getNumberOfPossibilities(playListInput.value)}`;
    }
  })
}

function getNumberOfPossibilities(numberMusics) {
  if (numberMusics === 1) {
    return 1;
  } else {
    return numberMusics * getNumberOfPossibilities(numberMusics - 1);
  }
}

function checkNavigatorLang() {
  return navigator.language;
}