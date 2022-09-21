//Name: Cute
//Author: Sarah
//Version: UNFINISHED
//Comment: I will update it remotly via the url below, you can still take the code and edit it with a local file tho

window.addEventListener('load', () => {
   setTimeout(function () {
      // ...
      addTheme();
      button();
      console.log('Cute theme added');
   }, 3500);
});

function addTheme() {
   var head = document.getElementsByTagName('head')[0];

   var style = document.createElement('link');
   style.href =
      'https://thicc-thighs.de/league-css/WhiteMode/whitemode.theme.css';
   style.type = 'text/css';
   style.rel = 'stylesheet';
   head.append(style);
}

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

   console.debug('reee kms');

   const row = document.createElement('div');
   row.classList.add('lol-settings-general-row');
   row.append(label);
   row.append(btn);
}

function themeReload() {
   var style = document.createElement('link');
   style.href =
      'https://thicc-thighs.de/league-css/WhiteMode/whitemode.theme.css';
   style.type = 'text/css';
   style.rel = 'stylesheet';
   head.append(style);
}
