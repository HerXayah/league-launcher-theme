//Name: Cute
//Author: Sarah | ♡Sarah~#0004
//Version: 1.0
//Comment: fuck rito >:c

const observer = new MutationObserver((mutations) => {
   const panel = document.querySelector(
      'div.lol-settings-options > lol-uikit-scrollable'
   );
   if (
      panel &&
      mutations.find((record) => Array.from(record.addedNodes).includes(panel))
   ) {
      const row = document.createElement('div');
      row.classList.add('lol-settings-general-row');

      const label = document.createElement('p');
      label.classList.add('lol-settings-window-size-text');
      label.textContent = 'Reload Theme';
      label.style.marginBottom = '12px';

      const searchdiv = document.createElement('searchbox-container');
      searchdiv.style.marginBottom = '12px';
      searchdiv.style.display = 'inline-block';

      // create a text field
      const input = document.createElement('lol-uikit-flat-input');

      const searchbox = document.createElement('input');
      searchbox.type = 'url';
      searchbox.placeholder = 'https://thicc-thighs.de/stuff/wallpaper.jpg';
      searchbox.style.width = '200px';
      searchbox.name = 'name';

      const btn = document.createElement('lol-uikit-flat-button-secondary');
      btn.style.display = 'flex';
      btn.textContent = 'Reload theme';
      btn.style.marginBottom = '12px';
      btn.onclick = () => {
         location.reload();
         themeReload();
      };

      // if input of searchbox changes wait for 1 second
      // and check if the value is a valid url
      // if it is valid change the root values
      searchbox.oninput = () => {
         setTimeout(() => {
            if (
               searchbox.value.match(
                  /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)/g
               )
            ) {
               accessCuteThemeCSS(searchbox.value);
               // console.log('valid url');
            } else {
               //console.log('invalid url');
            }
         }, 1000);
      };

      searchdiv.append(input);
      input.append(searchbox);

      row.append(label);
      row.append(btn);
      row.append(input);

      panel.prepend(row);
   }
});

function accessCuteThemeCSS(value) {
   const root = document.documentElement;
   // remove formatting from the url
   // set the root values
   // decode url to get the original url
   root.style.setProperty('--background', `url(${decodeURIComponent(value)})`);

   // ** This part doesnt work. Blame riot. i Have yet to find a way to save stuff in the client **

   // check if the cookie already exists
   // if it does see if the value is the same as the new value
   // if it is not the same change the cookie value
   // if it does not exist create a new cookie
   if (document.cookie.indexOf('background') >= 0) {
      if (document.cookie.indexOf(value) < 0) {
         document.cookie = `background=${value}; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/`;
      }
   } else {
      document.cookie = `background=${value}; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/`;
   }

   //console.log('changed background');
   //console.log(decodeURIComponent(value));
}

function themeReload() {
   var style = document.createElement('link');
   style.href = 'https://thicc-thighs.de/league-css/Cute/cute.theme.css';
   style.type = 'text/css';
   style.rel = 'stylesheet';
   head.append(style);
}

window.addEventListener('load', () => {
   const interval = setInterval(() => {
      const manager = document.getElementById(
         'lol-uikit-layer-manager-wrapper'
      );
      if (manager) {
         clearInterval(interval);
         observer.observe(manager, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
         });
      }
   }, 500);
   document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
         'afterbegin',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.css" />'
      );
   console.clear();
   console.log('We injected bois');
});
