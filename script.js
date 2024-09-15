document.getElementById('testForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Verzamelen van antwoorden
  const antwoorden = {};
  const vragen = document.querySelectorAll('.question');
  vragen.forEach((vraag, index) => {
      const geselecteerdeOptie = vraag.querySelector('input[type="radio"]:checked');     
      if (geselecteerdeOptie) {
          antwoorden[index + 1] = geselecteerdeOptie.value;
      }
  });
  console.log(antwoorden);

  // Scoren berekenen
  let score = {
    'wedijveren': 0,
    'samenwerken': 0,
    'compromis': 0,
    'vermijden': 0,
    'aanpassen': 0
  };

  // Voor elke vraag de score berekenen
  const vraagScoreMapping = {
    1: { A: 'vermijden', B: 'aanpassen' },
    2: { A: 'compromis', B: 'samenwerken' },
    3: { A: 'wedijveren', B: 'aanpassen' },
    4: { A: 'compromis', B: 'aanpassen' },
    5: { A: 'vermijden', B: 'vermijden' },
    6: { A: 'vermijden', B: 'wedijveren' },
    7: { A: 'vermijden', B: 'compromis' },
    8: { A: 'wedijveren', B: 'samenwerken' },
    9: { A: 'vermijden', B: 'wedijveren' },
    10: { A: 'wedijveren', B: 'compromis' },
    11: { A: 'vermijden', B: 'samenwerken' },
    12: { A: 'vermijden', B: 'compromis' },
    13: { A: 'compromis', B: 'wedijveren' },
    14: { A: 'vermijden', B: 'samenwerken' },
    15: { A: 'vermijden', B: 'aanpassen' },
    16: { A: 'vermijden', B: 'wedijveren' },
    17: { A: 'wedijveren', B: 'aanpassen' },
    18: { A: 'vermijden', B: 'compromis' },
    19: { A: 'samenwerken', B: 'samenwerken' },
    20: { A: 'samenwerken', B: 'compromis' },
    21: { A: 'vermijden', B: 'samenwerken' },
    22: { A: 'compromis', B: 'wedijveren' },
    23: { A: 'samenwerken', B: 'aanpassen' },
    24: { A: 'vermijden', B: 'compromis' },
    25: { A: 'wedijveren', B: 'aanpassen' },
    26: { A: 'compromis', B: 'samenwerken' },
    27: { A: 'vermijden', B: 'aanpassen' },
    28: { A: 'wedijveren', B: 'samenwerken' },
    29: { A: 'compromis', B: 'aanpassen' },
    30: { A: 'vermijden', B: 'samenwerken' }
  };

  // Score berekenen op basis van de antwoorden
  for (let vraagNummer in antwoorden) {
    const antwoord = antwoorden[vraagNummer];
    if (vraagScoreMapping[vraagNummer]) {
      score[vraagScoreMapping[vraagNummer][antwoord]] += 1;
    }
  }

  console.log(score);

  // Selecteren welke eigenschappen gezien worden
  const drempels = {
    'wedijveren': 8,
    'samenwerken': 9,
    'compromis': 9,
    'vermijden': 8,
    'aanpassen': 7
  };
  
  for (let key in drempels) {
    if (score[key] < drempels[key]) {
      document.getElementById(key).style.display = 'none';
    }
  }

  // Resultaten weergeven
  const instructies = document.getElementById('instructies');
  const testForm = document.getElementById('testForm');
  const resultaat = document.getElementById('resultaat');

  instructies.style.transition = 'opacity 2s ease-in-out';
  testForm.style.transition = 'opacity 2s ease-in-out';
  resultaat.style.transition = 'opacity 2s ease-in-out';

  instructies.style.opacity = '0';
  testForm.style.opacity = '0';

  // Wacht tot de overgang klaar is voordat de weergave wordt gewijzigd
  setTimeout(() => {
    instructies.style.display = 'none';
    testForm.style.display = 'none';
    resultaat.style.display = 'block';
    resultaat.style.opacity = '0';

    // Begin de overgang voor de resultaten
    setTimeout(() => {
      resultaat.style.opacity = '1';
    }, 20); // Korte vertraging om de overgang goed te laten starten

  }, 2000); // Tijd gelijk aan de overgangsduur
});
