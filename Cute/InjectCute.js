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

      const btn = document.createElement('lol-uikit-flat-button-secondary');
      btn.style.display = 'flex';
      btn.textContent = 'Reload theme';
      btn.onclick = () => {
         location.reload();
         themeReload();
      };

      row.append(label);
      row.append(btn);

      panel.prepend(row);
   }
});

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
   button();
   Console.clear();
   Console.log('We injected bois');
});
