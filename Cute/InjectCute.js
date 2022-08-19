//Name: Cute
//Author: Sarah
//Version: UNFINISHED
//Comment: I will update it remotly via the url below, you can still take the code and edit it with a local file tho

addTheme('https://thicc-thighs.de/league-css/Cute/cute.theme.css');
changeBackground();
changeIcons();



// Just including the theme into the client
function addTheme(filename){
 var head = document.getElementsByTagName('head')[0];

 var style = document.createElement('link');
 style.href = filename;
 style.type = 'text/css';
 style.rel = 'stylesheet';
 head.append(style);
}

function changeBackground() {

    var background = document.querySelector('.sc-bczRLJ');
    background.src = 'https://i.imgur.com/FTQM8n3.png';

    var style = document.createElement('link');
    style.href = 'https://thicc-thighs.de/league-css/Cute/background.css';
    style.type = 'text/css';
    style.rel = 'stylesheet';
    background.append(style);

    var starguardian = document.querySelector('.hold-leave');
    starguardian.style.backgroundImage = 'url(https://i.imgur.com/FTQM8n3.png)';

}

// doesnt work yet

function changeButton() {

    var button = document.querySelector('.play-button-container');
    // remove background image
    button.style.backgroundImage = 'none';

    var ticker = document.querySelector('.ticker-toggle');
    ticker.style.backgroundImage = 'url(https://i.imgur.com/FTQM8n3.png)';

}

function changeIcons() {

    var BE = document.querySelector('.currency-be-icon-static');
    BE.style.backgroundImage = 'url(https://thicc-thighs.de/stuff/mow.jpg)';
    var RP = document.querySelector('.currency-rp');
    RP.style.backgroundImage = 'url(https://thicc-thighs.de/stuff/old_icon.png)';


}

