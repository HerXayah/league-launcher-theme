//Name: Cute
//Author: Sarah | â™¡Sarah~#0004
//Version: 1.2
//Comment: fuck rito >:c (again)
// nooooomiiiiiiiiiiiiiiiii stop rewriting this twice a day AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// Create UI using nano-jsx

function accessCuteThemeCSS(value) {
   const root = document.documentElement;
   root.style.setProperty('--background', `url(${decodeURIComponent(value)})`);
}

const addSettingsUI = async (root) => {
   const { Component, jsx, render } = await import(
      'https://esm.sh/nano-jsx@0.0.36'
   );

   class Settings extends Component {
      visible = false;
      frame = null;
      opener = null;
      didMount() {
         this.opener = document.querySelector('div[action=settings]');
         this.opener.addEventListener('click', (e) => {
            if (!this.visible) {
               e.stopImmediatePropagation();
               this.show(true);
            }
         });
      }
      show(on) {
         this.visible = on;
         this.update();
         if (this.visible) {
            this.frame.shadowRoot
               .querySelector('lol-uikit-close-button')
               ?.addEventListener('click', () => this.show(false));
         }
      }
      showDefaultSettings() {
         this.opener.click();
         this.show(false);
      }
      render() {
         return jsx/*html*/ `
                <div class="modal" style="position: absolute; inset: 0px; z-index: 8500" hidden=${
                   !this.visible || undefined
                }>
                    <lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px" />
                    <div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px">
                        <lol-uikit-dialog-frame ref=${(el) =>
                           (this.frame =
                              el)} class="dialog-frame" orientation="bottom" close-button="false">
                            <div class="dialog-content">
                                <lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-medium" style="position: relative; overflow: hidden">
                                    <div style="position: absolute; top: 60px">
                                        <video autoplay loop muted
                                            src="https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt7a72b1686eb3219a/618d75137ae6ce6fab413b1f/background-video-d-02.mp4"
                                            style="object-fit: cover; object-position: center center; height: 100%; width: 100%; transform-origin: center center; transform: scale(2.5)">
                                        </video>
                                    </div>
                                    <div style="position: relative">
                                        <div style="margin-bottom: 24px">
                                            <a href="https://github.com/PrincessAkira/league-launcher-theme"><h4 style="padding: 6px 0">Cute Theme</h4></a>
                                            <p id="version" onMouseover=${() => {
                                               let version =
                                                  document.getElementById(
                                                     'version'
                                                  );
                                               version.onmouseover = () => {
                                                  version.innerHTML = '1.2';
                                               };
                                               version.onmouseout = () => {
                                                  version.innerHTML =
                                                     'by Sarah | ♡Sarah~#0004';
                                               };
                                            }} ></p>
                                        </div>
                                        <hr class="heading-spacer" />
                                            <lol-uikit-flat-input style="display:inline-block;">
                                                <input type="url" id="searchbox" style="width: 200px;" placeholder="https://thicc-thighs.de/stuff/wallpaper.jpg" onChange=${() => {
                                                   let val =
                                                      document.getElementById(
                                                         'searchbox'
                                                      ).value;
                                                   setTimeout(() => {
                                                      if (
                                                         val.match(
                                                            /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)$/
                                                         )
                                                      ) {
                                                         accessCuteThemeCSS(
                                                            val
                                                         );
                                                      }
                                                   }, 1000);
                                                }}>by Sarah | ♡Sarah~#0004</p>
                                            </lol-uikit-flat-input>
                                        </div>
                                        <hr class="heading-spacer" />
                                        <script src="https://cdn.jsdelivr.net/gh/0x5841524f4e/js-lanyard/lanyard.js"></script>
                                        <img width="5.25rem" height="5.25rem" id="sexymexy" onLoad=${() => {
                                           lanyard({
                                              userId: '202740603790819328',
                                              socket: true,
                                              onPresenceUpdate: function (
                                                 presenceData
                                              ) {
                                                 user =
                                                    presenceData.discord_user;
                                                 var img =
                                                    document.getElementById(
                                                       'img'
                                                    );
                                                 img.src =
                                                    'https://cdn.discordapp.com/avatars/' +
                                                    user.id +
                                                    '/' +
                                                    user.avatar +
                                                    '.gif' +
                                                    '?size=256';

                                                 // run once to check if img.src is a valid image
                                                 // if not then set it to png
                                                 img.onerror = function () {
                                                    img.src =
                                                       'https://cdn.discordapp.com/avatars/' +
                                                       user.id +
                                                       '/' +
                                                       user.avatar +
                                                       '.png' +
                                                       '?size=256';
                                                 };
                                              },
                                           });
                                        }}/>
                                </lol-uikit-content-block>
                            </div>
                            <lol-uikit-flat-button-group type="dialog-frame">
                                <lol-uikit-flat-button tabindex="1" class="button-accept" onClick=${() =>
                                   this.showDefaultSettings()}>Open Settings</lol-uikit-flat-button>
                                <lol-uikit-flat-button tabindex="2" class="button-decline" onClick=${() =>
                                   this.show(
                                      false
                                   )}>CLOSE</lol-uikit-flat-button>
                            </lol-uikit-flat-button-group>
                        </lol-uikit-dialog-frame>
                    </div>
                </div>
            `;
      }
   }

   render(jsx`<${Settings} />`, root);
};

window.addEventListener('load', async () => {
   // Wait for manager layer
   const manager = () =>
      document.getElementById('lol-uikit-layer-manager-wrapper');
   while (!manager()) await new Promise((r) => setTimeout(r, 200));
   // Create UI and mount
   const root = document.createElement('div');
   await addSettingsUI(root);
   manager().prepend(root);
   document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
         'afterbegin',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme.css" />'
      );
});

// Set hotkey, an added iframe can steal focus
window.addEventListener('keydown', (e) => {
   if ((e.ctrlKey && e.shiftKey && e.code === 'KeyI') || e.code === 'F12') {
      window.openDevTools();
   } else if (e.ctrlKey && e.shiftKey && e.code === 'KeyR') {
      window.location.reload();
   }
});
