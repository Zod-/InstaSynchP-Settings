function Settings() {
  'use strict';
  this.version = '@VERSION@';
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
    _this.log({
      event: 'getting a setting that does not exist ' + id,
      type: 'warn'
    });
    return fallback;
  }
  return _this.fields[id].get();
};

Settings.prototype.set = function (id, newVal) {
  'use strict';
  var _this = this;
  if (_this.fields.hasOwnProperty(id)) {
    _this.fields[id].set(newVal);
  } else {
    _this.log({
      event: 'setting a setting that does not exist ' + id,
      type: 'warn'
    });
  }
};

Settings.prototype.save = function () {
  'use strict';
};

window.plugins = window.plugins || {};
window.plugins.settings = new Settings();
