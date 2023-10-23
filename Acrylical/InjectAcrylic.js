//Name: Acrylical
//Author: Sarah | â™¡Sarah~#0004
//Version: 0.1 Alpha

async function acrylicMagic() {
  window.Effect.apply('unified', { color: '#6001' });
  //window.Effect.apply('unified', { color: '#fff00' });
  // btw the color is blue green red alpha
}

var module = { exports: {} };

var fam = 'none';

const UI = {
  Row: (childs) => {
    const row = document.createElement('div');
    row.classList.add('lol-settings-general-row');
    if (Array.isArray(childs)) childs.forEach((el) => row.appendChild(el));
    return row;
  },
  Label: (text) => {
    const label = document.createElement('p');
    label.classList.add('lol-settings-window-size-text');
    label.innerText = text;
    return label;
  },
  Link: (text, href, onClick) => {
    const link = document.createElement('p');
    link.classList.add('lol-settings-code-of-conduct-link');
    link.classList.add('lol-settings-window-size-text');

    const a = document.createElement('a');
    a.innerText = text;
    a.target = '_blank';
    a.href = href;
    a.onclick = onClick || null;

    link.append(a);
    return link;
  },
  Button: (text, onClick) => {
    const btn = document.createElement('lol-uikit-flat-button-secondary');
    btn.innerText = text;
    btn.onclick = onClick;
    btn.style.display = 'flex';
    return btn;
  },
  Input: (placeholder, onChange) => {
    const origIn = document.createElement('lol-uikit-flat-input');
    origIn.style.marginBottom = '12px';
    const searchbox = document.createElement('input');
    searchbox.type = 'url';
    searchbox.placeholder = '(GoogleFont);(Font Weight)';
    searchbox.style.width = '200px';
    searchbox.name = 'name';
    searchbox.oninput = onChange;
    let input = {
      get value() {
        //console.log(searchbox.value);
        // if value does not include ; and is short than 3 or bigger than 3 letters after the ;, do nothing
        if (
          !searchbox.value.includes(';') ||
          searchbox.value.split(';')[1].length !== 3
        ) {
          //console.log('NONE');
          return;
        } else {
          //console.log('TEST');
          return searchbox.value;
        }
      },
    };
    module.exports.search = () => input;
    origIn.appendChild(searchbox);
    return origIn;
  },
};

// Add controls to settings panel
const injectSettings = (panel) => {
  panel.prepend(
    UI.Row([
      UI.Link(
        'Acrylical',
        'https://github.com/PrincessAkira/league-launcher-theme',
        () => {
          // why is this here? :wtf:
        },
        UI.Button('Open plugins folder', () => window.openPluginsFolder())
      ),
      UI.Input(backgroundCheck(), () => {
        let val = module.exports.search().value;
        accessCSS(getFontURL(val, fam));
      }),
      document.createElement('br'),
      UI.Button('Reload theme', () => reloadTheme()),
      document.createElement('br'),
    ])
  );
};

function getFontURL(val) {
  // create url from the input
  // e.g  https://fonts.googleapis.com/css2?family={fontfamily}:wght@{weight}&display=swap
  // return the url
  let input = val;
  let split = input.split(';');
  let family = split[0];
  //console.log(family) + ' is the family';
  fam = family;
  DataStore.set('fontfam', family);
  let weight = split[1];

  // if weight is not 3 letters long, return;
  if (weight.length !== 3) {
    return 'error';
  }

  let url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;
  DataStore.set('font', url);
  return url;
}

function accessCSS(value) {
  if (value === 'error') {
    //console.log('ERROR');
    return;
  }
  // if value is empty return
  if (value === '') {
    return;
  } else {
    //console.log(DataStore.get('font') + ' is the font');

    if (DataStore.get('AcrylStatus') === 'false') {
      document.getElementsByTagName('body')[0].insertAdjacentHTML(
        'afterbegin',
        `<link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
      );
      DataStore.set('AcrylStatus', 'true');
    }

    // remove old font
    // check all <link href= for the font
    // if it exists remove it
    // if it doesnt exist, do nothing
    let links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes('googleapis')) {
        links[i].remove();
      }
    }

    document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
        'afterbegin',
        `<link href="${value}" rel="stylesheet">`
      );

    //console.log(fam + ' is the fo 2nt');
    document.documentElement.style.setProperty(
      '--font',
      `${DataStore.get('fontfam')}, sans-serif`
    );
  }
}

function backgroundCheck() {
  if (checkIfPopulated()) {
    return DataStore.get('font');
  } else {
    return 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap';
  }
}

function checkIfPopulated() {
  if (DataStore.has('font')) {
    return true;
  } else {
    return false;
  }
}

window.addEventListener('load', async () => {
  await acrylicMagic();
  DataStore.set('AcrylStatus', 'false');
  await backgroundCheck();
  // Wait for manager layer
  document
    .getElementsByTagName('body')[0]
    .insertAdjacentHTML(
      'afterbegin',
      '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Acrylical/Acrylic.theme.min.css" />'
    );
  if (checkIfPopulated()) {
    fam = DataStore.get('fontfam');
    let val = DataStore.get('font');
    //console.log(val);
    try {
      accessCSS(val);
    } catch (e) {
      //console.log(e);
    }
  }
  const interval = setInterval(() => {
    const manager = document.getElementById('lol-uikit-layer-manager-wrapper');
    if (manager) {
      clearInterval(interval);
      // Observe settings panel
      new MutationObserver((mutations) => {
        const panel = document.querySelector(
          'div.lol-settings-options > lol-uikit-scrollable'
        );
        if (
          panel &&
          mutations.some((record) =>
            Array.from(record.addedNodes).includes(panel)
          )
        ) {
          // Inject settings
          injectSettings(panel);
        }
      }).observe(manager, {
        childList: true,
        subtree: true,
      });
    }
  }, 500);
  console.log('We injected bois');
});

exports.UI = UI;
