//Name: Cute
//Author: Sarah | ♡Sarah~#0004
//Version: 1.0
//Comment: fuck rito >:c

window.addEventListener('load', () => {
   document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
         'afterbegin',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.css" />'
      );
   button();
});

function button() {
   const label = document.createElement('p');
   label.classList.add('lol-settings-window-size-text');
   label.textContent = 'Reload Theme';

   const btn = document.createElement('lol-uikit-flat-button-secondary');
   btn.style.display = 'flex';
   btn.textContent = 'Reload Theme';
   btn.onclick = () => {
      themeReload();
   };

   const row = document.createElement('div');
   row.classList.add('lol-settings-general-row');
   row.append(label);
   row.append(btn);
}

function themeReload() {
   document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
         'afterbegin',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.css" />'
      );
   location.reload();
}
