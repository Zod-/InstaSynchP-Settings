InstaSynchP-Settings [![Build Status](https://travis-ci.org/Zod-/InstaSynchP-Settings.svg?branch=master)](https://travis-ci.org/Zod-/InstaSynchP-Settings)
====================

Provides the ability to store settings for the plugins

Framework
------
Fields will be collected from `plugin.settings` which is an array containing all the defined settings for the plugin.

e.g.

```javascript
this.settings = [{
    label: 'Make chat visible on message',
    id: 'make-chat-visible',
    type: 'checkbox',
    'default: true,
    section: ['Fullscreen']
}];
```

Field types and options
------

The current supported types of fields are
* checkbox (boolean)
* text (string input field)
* int (integer input field)
* select (dropdown menu)

The possible parameters are:
```javascript
this.settings = [{
    label: 'label', //Label shown on the setting in the GUI
    id: 'id', //Id to retrieve and save settings
    type: 'select', //Type of the setting
    options: ['value1', 'value2'], //Options for the select type
    'default': 'value1', //Default value of the setting
    title: 'title', //Tooltip of the setting
    tooltipPlacement: 'top', //Placement of the tooltip (top(default), bottom, left, right)
    section: ['General'], //Section that the setting gets moved into in the GUI
    disabled: false, //Wether or not the input should be disabled
    size: 2, //Size of the input fields (size attribute)
    destination: 'chat', //Into which tab the setting should be moved into (chat(default), playlist, plugin)
    hidden: false //Wether or not the setting should be hidden
}];
```



The settings can be accessed through the `gmc` object and are stored in the [localStorage](http://www.w3schools.com/html/html5_webstorage.asp)

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

Events
------
```javascript
'SettingChange[FieldId]': [oldValue, newValue]
```

License
-----------
The MIT License (MIT)<br>

&lt;InstaSynch - Watch Videos with friends.&gt;<br>
Copyright (c) 2014 InstaSynch

&lt;Bibbytube - Modified InstaSynch client code&gt;<br>
Copyright (C) 2014  Zod-

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
