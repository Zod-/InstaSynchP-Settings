// ==UserScript==
// @name         InstaSynchP Settings
// @namespace    InstaSynchP
// @description  Provides the ability to store settings for the plugins
// @version      1.0.9
// @author       Zod-
// @source       https://github.com/Zod-/InstaSynchP-Settings
// @license      MIT
// @require      https://greasyfork.org/scripts/5647-instasynchp-library/code/code.js?version=49210
// @include      *://instasync.com/r/*
// @include      *://*.instasync.com/r/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

function SettingsField(opts) {
  'use strict';
  this.type = opts.type;
  this.label = opts.label;
  this.id = opts.id;
  this.default = opts.default;
  this.title = opts.title || '';
  this.tooltipPlacement = opts.tooltipPlacement;
  this.destination = opts.destination || '#tabs_chat_settings_content';
  this.$div = $('<div>');
  this.init();
  this.buildDiv();
}

SettingsField.prototype.init = function () {
  'use strict';
  var _this = this;
  if (_this.get() === null) {
    _this.set(_this.default);
  }
};

SettingsField.prototype.get = function () {
  'use strict';
  return window.localStorage.getItem(this.id);
};

SettingsField.prototype.set = function (val) {
  'use strict';
  window.localStorage.setItem(this.id, val);
};

SettingsField.prototype.createTooltip = function () {
  'use strict';
  var _this = this;
  return $('<label>', {
    class: 'active_toolip',
    'data-original-title': _this.title || '',
    'data-placement': _this.tooltipPlacement || 'bottom'
  }).tooltip();
};

SettingsField.prototype.createInput = function () {
  'use strict';
  var _this = this;
  switch (_this.type) {
  case 'checkbox':
    return _this.createCheckboxInput();
  }
};

SettingsField.prototype.createCheckboxInput = function () {
  'use strict';
  var _this = this;
  //TODO set checked/unchecked from the stored value
  _this.$div.addClass('checkbox');
  return $('<input>', {
    id: 'instasyncp-settings-checkbox-' + _this.id,
    type: 'checkbox'
  });
  //$("#checkbox").attr("checked", true);
};

SettingsField.prototype.buildDiv = function () {
  'use strict';
  var _this = this;
  var $tooltip = _this.createTooltip();
  var $input = _this.createInput();

  _this.$div.append($tooltip.append($input).append(_this.label));
};

function Settings() {
  'use strict';
  this.version = '1.0.9';
  this.name = 'InstaSynchP Settings';
  this.fields = [];
  this.SettingsField = SettingsField;
}

Settings.prototype.removeInstaSyncSettings = function () {
  'use strict';
  $('#toggle_greyname_chat').parent().parent().remove();
  $('#toggle_show_joined').parent().parent().remove();
};

Settings.prototype.preConnect = function () {
  'use strict';
  //TODO move into css file
  $('#tabs_chat_settings_content').css('overflow-y', 'auto');
};

Settings.prototype.executeOnceCore = function () {
  'use strict';
  var _this = this;
  var newFields = {};
  _this.removeInstaSyncSettings();
  _this.fields.forEach(function (field) {
    field = new _this.SettingsField(field);
    newFields[field.id] = field;
    $(field.destination).append(field.$div);
  });
  _this.fields = newFields;
  window.gmc = _this;
};


Settings.prototype.log = function (opts) {
  'use strict';
  var args = [];
  opts.type = opts.type || 'debug';
  args.push(this.name);
  args.push(opts.event);
  logger()[opts.type].apply(logger(), args);
};

Settings.prototype.get = function (id, fallback) {
  'use strict';
  var _this = this;
  if (!_this.fields.hasOwnProperty(id)) {
    return fallback;
  }
  _this.log({
    event: 'getting a setting that does not exist ' + id,
    type: 'warn'
  });
  return _this.fields[id].get();
};

Settings.prototype.set = function (id, newVal) {
  'use strict';
  var _this = this;
  var field = _this.fields[id];
  var oldVal;
  if (_this.fields.hasOwnProperty(id)) {
    oldVal = field.get();
    field.set(newVal);
    events.fire('SettingChange[{0}]'.format(field.id), [oldVal, newVal]);
  } else {
    _this.log({
      event: 'setting a setting that does not exist ' + id,
      type: 'warn'
    });
  }
};

window.plugins = window.plugins || {};
window.plugins.settings = new Settings();
