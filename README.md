InstaSynchP-Settings
====================

Provides the ability to store settings for the plugins

Framework
------
Fields need to be set up according to [GM_config](https://github.com/sizzlemctwizzle/GM_config/wiki) by adding them to `this.settings` as an array so they can be read when the core loads.

e.g.

```javascript
this.settings = [{
    'label': 'Make chat visible on message',
    'id': 'make-chat-visible',
    'type': 'checkbox',
    'default': true,
    'section': ['General', 'Fullscreen']
}];
```

Settings are stored in the `gmc` object

#### `gmc.get`
Get the stored value
```javascript
gmc.get('make-chat-visible')
```
#### `gmc.set`
Set the stored value from code.


```javascript
gmc.set('make-chat-visible', false)
```
<b>Note: Setting the value does not save it. Use `window.plugins.settings.save()` to save it.

Events
------
```javascript
'SettingsOpen': []
'SettingsSave': []
'SettingsReset': []
'SettingsClose': []
'SettingChange[FieldId]': [newValue, oldValue]
```

Public Variables
---------
* `settings.fields` Array containing all the settings, is only used to initialize GM_config

License
-----------
<InstaSynch - Watch Videos with friends.>
Copyright (C) 2013  InstaSynch

<Bibbytube - Modified InstaSynch client code>
Copyright (C) 2014  Zod-

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

http://opensource.org/licenses/GPL-3.0
