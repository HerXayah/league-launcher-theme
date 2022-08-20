//Name: Cute
//Author: Sarah
//Version: UNFINISHED
//Comment: I will update it remotly via the url below, you can still take the code and edit it with a local file tho

window.addEventListener('load', () => {
    setTimeout(function () {
        // ...
    addTheme();
    console.log('Cute theme added');
        }, 4500);
})

function addTheme() {
    
 var head = document.getElementsByTagName('head')[0];

 var style = document.createElement('link');
 style.href = 'https://thicc-thighs.de/league-css/Cute/cute.theme.css';
 style.type = 'text/css';
 style.rel = 'stylesheet';
 head.append(style);

}

var bg = document.querySelector(".lol-uikit-background-switcher-image");
bg.src = "https://i.imgur.com/FTQM8n3.png";