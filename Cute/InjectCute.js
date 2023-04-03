//Name: Cute
//Author: Sarah | â™¡Sarah~#0004
//Version: 1.2
//Comment: fuck rito >:c

var module = { exports: {} };

let backgroundImg = DataStore.get('background');
let root = document.documentElement;

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
      searchbox.placeholder = placeholder;
      searchbox.style.width = '200px';
      searchbox.name = 'name';
      searchbox.oninput = onChange;
      let input = {
         get value() {
            return searchbox.value;
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
            'Cute-Theme',
            'https://github.com/PrincessAkira/league-launcher-theme',
            () => {
               // why is this here? :wtf:
            },
            UI.Button('Open plugins folder', () => window.openPluginsFolder())
         ),
         UI.Input(backgroundCheck(), () => {
            let val = module.exports.search().value;
            if (
               val.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)$/)
            ) {
               accessCuteThemeCSS(val);
            }
         }),
         UI.Button('Reset background', () => {
            DataStore.remove('background');
            root.style.setProperty(
               '--background',
               `linear-gradient(rgba(22, 22, 22, 0.6), rgba(22, 22, 22, 0.2)), url(https://thicc-thighs.de/stuff/League/wallpaper.webp)`
            );
         }),
         document.createElement('br'),
         UI.Button('Reload theme', () => reloadTheme()),
         document.createElement('br'),
      ])
   );
};

function backgroundCheck() {
   if (checkIfPopulated()) {
      return DataStore.get('background');
   } else {
      return 'https://thicc-thighs.de/stuff/wallpaper.jpg';
   }
}

function checkIfPopulated() {
   if (DataStore.has('background')) {
      return true;
   } else {
      return false;
   }
}

///^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/

function accessCuteThemeCSS(value) {
   // remove formatting from the url
   // set the root values
   // decode url to get the original url
   if (value == 'https://thicc-thighs.de/stuff/wallpaper.webp') {
      DataStore.remove('background');
   } else {
      DataStore.set('background', decodeURIComponent(value));
      root.style.setProperty(
         '--background',
         `linear-gradient(rgba(22, 22, 22, 0.6), rgba(22, 22, 22, 0.2)), url(${decodeURIComponent(
            value
         )})`
      );
   }

   root.style.setProperty(
      '--background',
      `linear-gradient(rgba(22, 22, 22, 0.6), rgba(22, 22, 22, 0.2)), url(${decodeURIComponent(
         value
      )})`
   );

   // ** This part doesnt work. Blame riot. i Have yet to find a way to save stuff in the client **

   // check if the cookie already exists
   // if it does see if the value is the same as the new value
   // if it is not the same change the cookie value
   // if it does not exist create a new cookie
   /* if (document.cookie.indexOf('background') >= 0) {
      if (document.cookie.indexOf(value) < 0) {
         document.cookie = `background=${value}; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/`;
      }
   } else {
      document.cookie = `background=${value}; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/`;
   }
   */
   //console.log('changed background');
   //console.log(decodeURIComponent(value));
}

function reloadTheme() {
   let searchRegEx = /thicc-thighs.de*/;
   for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].href.search(searchRegEx) != -1) {
         document.styleSheets[i].disabled = true;
      }
      //
      document
         .getElementsByTagName('body')[0]
         .insertAdjacentHTML(
            'afterbegin',
            '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.min.css" />'
         );
      location.reload();
   }
}

window.addEventListener('load', async () => {
   // Wait for manager layer
   document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
         'afterbegin',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.min.css" />'
      );
   if (checkIfPopulated()) {
      accessCuteThemeCSS(backgroundImg);
   }
   const interval = setInterval(() => {
      const manager = document.getElementById(
         'lol-uikit-layer-manager-wrapper'
      );
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

   console.clear();
   console.log('We injected bois');
});

exports.UI = UI;
