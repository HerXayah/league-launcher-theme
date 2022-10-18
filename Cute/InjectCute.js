//Name: Cute
//Author: Sarah
//Version: UNFINISHED
//Comment: I will update it remotly via the url below, you can still take the code and edit it with a local file tho

window.addEventListener('load', () => {
   const css = document
      .getElementsByTagName('head')[0]
      .insertAdjacentHTML(
         'beforeend',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.css" />'
      );
   addTheme(css);
   button();
});

function addTheme(css) {
   const style = document.createElement('style');
   style.textContent = css;
   document
      .getElementsByTagName('head')[0]
      .insertAdjacentHTML(
         'beforeend',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.css" />'
      );
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

   const row = document.createElement('div');
   row.classList.add('lol-settings-general-row');
   row.append(label);
   row.append(btn);
}
