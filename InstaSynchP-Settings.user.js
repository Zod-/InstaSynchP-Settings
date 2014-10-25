// ==UserScript==
// @name        InstaSynchP Settings
// @namespace   InstaSynchP
// @description Provides the ability to store settings for the plugins

// @version     1.0.7
// @author      Zod-
// @source      https://github.com/Zod-/InstaSynchP-Settings
// @license     GPL-3.0

// @include     http://*.instasynch.com/*
// @include     http://instasynch.com/*
// @include     http://*.instasync.com/*
// @include     http://instasync.com/*
// @grant       none
// @run-at      document-start

// @require     https://greasyfork.org/scripts/5647-instasynchp-library/code/InstaSynchP%20Library.js
// ==/UserScript==

function Settings(version) {
    "use strict";
    this.version = version;
    this.name = 'InstaSynchP Settings';
    this.fields = [];
}

Settings.prototype.executeOnceCore = function () {
    "use strict";
    var th = this;
    th.fields = th.fields.length === 0 ? undefined : th.fields;
    cssLoader.add({
        'name': 'settings',
        'url': 'https://cdn.rawgit.com/Zod-/InstaSynchP-Settings/7dfd1923ab7fff4ef9b201864249d2e1d2ae44ce/settings.css',
        'autoload': true
    });
    //add the button
    $('#loginfrm > :first-child').before(
        $('<div>', {
            'id': 'plugin-settings'
        }).append(
            $('<ul>').append(
                $('<li>').append(
                    $('<a>', {
                        'class': 'clicker'
                    }).append(
                        $('<img>', {
                            'src': 'http://i.imgur.com/V3vOIkS.png'
                        })
                    ).append('Settings').click(function () {
                        if (gmc.isOpen) {
                            th.save(true);
                        } else {
                            gmc.open();
                        }
                    })
                )
            ).addClass('js')
        ).addClass('click-nav')
    );
    $('.friendsList').detach().appendTo('#loginfrm');
    window.gmc = new GM_configStruct({
        'id': 'GM_config',
        'title': 'InstaSynchP Settings',
        'fields': th.fields,
        'events': {
            'open': function (args) {
                //load GM_config css
                $('#GM_config').each(function () {
                    //context of the iframe
                    $('head', this.contentWindow.document || this.contentDocument).append(
                        $('<link>', {
                            'type': 'text/css',
                            'rel': 'stylesheet',
                            'href': 'https://cdn.rawgit.com/Zod-/InstaSynchP-Settings/b4b071565266669398f54051ee97c9bc9391a13b/GMconfig.css'
                        })
                    );
                });
                $('#GM_config').css('height', '90%').css('top', '55px').css('left', '5px').css('width', '375px');

                //collapse items in sections when clicking the header
                $('#GM_config').each(function () {
                    $('#GM_config .section_header', this.contentWindow.document || this.contentDocument).click(function () {
                        $(this).parent().children().filter(":not(:first-child)").slideToggle(250);
                        if (!$(this).parent().children().eq(0).hasClass('section_desc')) {
                            var next = $(this).parent().next();
                            while (next.children().eq(0).hasClass('section_desc')) {
                                next.slideToggle(250);
                                next = next.next();
                            }
                        }
                    });
                });
                //Add a "save and close" button
                $('#GM_config').each(function () {
                    var saveAndCloseButton = $('#GM_config_closeBtn', this.contentWindow.document || this.contentDocument).clone(false);
                    saveAndCloseButton.attr({
                        id: 'GM_config_save_closeBtn',
                        title: 'Save and close window'
                    }).text("Save and Close").click(function () {
                        th.save(true);
                    });

                    $('#GM_config_buttons_holder > :last-child', this.contentWindow.document || this.contentDocument).before(saveAndCloseButton);
                });

                events.fire('SettingsOpen');
            },
            'save': function () {
                events.fire('SettingsSave');
            },
            'reset': function () {
                events.fire('SettingsReset');
            },
            'close': function () {
                events.fire('SettingsClose');
            },
            'change': function (args) {
                var setting;
                //fire an event for each setting that changed
                for (setting in args) {
                    if (args.hasOwnProperty(setting)) {
                        events.fire('SettingChange[{0}]'.format(setting), [args[setting].old, args[setting].new]);
                    }
                }
            }

        }
    });
    events.on(th, 'SettingsSaveInternal', function (data) {
        gmc.save();
        if (data.close) {
            gmc.close();
        }
    });
};

Settings.prototype.save = function (close) {
    "use strict";
    //post message to site and catch in the script scope fix for #21
    window.postMessage(JSON.stringify({
        action: 'SettingsSaveInternal',
        data: {
            close: close
        }
    }), "*");
};

window.plugins = window.plugins || {};
window.plugins.settings = new Settings('1.0.7');
