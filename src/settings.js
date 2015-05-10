function Settings() {
  'use strict';
  this.version = '@VERSION@';
  this.name = 'InstaSynchP Settings';
  this.fields = [];
  this.SettingsField = SettingsField;
  this.destinations = {
    chat: '#tabs_chat_settings_content',
    playlist: '#tabs_playlist_settings',
    plugin: '#tabs_plugin_list'
  };
  var temp = {
    InstaSync: {
      fields: []
    }
  };
  this.sections = {
    chat: JSON.parse(JSON.stringify(temp)),
    playlist: JSON.parse(JSON.stringify(temp)),
    plugin: JSON.parse(JSON.stringify(temp))
  };
}

Settings.prototype.removeInstaSyncSettings = function () {
  'use strict';
  $('#toggle_greyname_chat').parent().parent().remove();
  $('#toggle_show_joined').parent().parent().remove();
};

Settings.prototype.createResetButton = function () {
  'use strict';
  var _this = this;
  $(_this.destinations.chat).append(
    $('<button>', {
      id: 'instasyncp-settings-reset',
      class: 'btn btn-xs btn-danger btn-primary'
    }).text('Reset InstaSyncP Settings').click(function () {
      _this.reset();
    })
  );
};

Settings.prototype.createFields = function () {
  'use strict';
  var _this = this;
  var newFields = {};
  _this.fields.forEach(function (field) {
    field = new _this.SettingsField(field);
    newFields[field.id] = field;
    _this.addToSection(field);
  });
  _this.sortSections();
  _this.fields = newFields;
};

Settings.prototype.forEachDestination = function (callback) {
  'use strict';
  var _this = this;
  Object.keys(_this.sections).forEach(function (destinationName) {
    callback({
      name: destinationName,
      value: _this.sections[destinationName]
    });
  });
};

Settings.prototype.forEachSection = function (callback) {
  'use strict';
  var _this = this;
  _this.forEachDestination(function (destinationPair) {
    Object.keys(destinationPair.value).forEach(function (sectionName) {
      callback(destinationPair, {
        name: sectionName,
        value: destinationPair.value[sectionName]
      });
    });
  });
};

Settings.prototype.forEachField = function (callback) {
  'use strict';
  var _this = this;
  _this.forEachSection(function (destinationPair, sectionPair) {
    sectionPair.value.fields.forEach(function (field) {
      callback(destinationPair, sectionPair, field);
    });
  });
};

Settings.prototype.sortSections = function () {
  'use strict';
  var _this = this;
  _this.forEachSection(function (destination, section) {
    section.value.fields.sort(function (field, otherField) {
      return field.label.localeCompare(otherField.label);
    });
  });
};

Settings.prototype.addToSection = function (field) {
  'use strict';
  var _this = this;
  if (field.hidden) {
    return;
  }
  var sectionName = field.section[1] || field.section[0];
  var destination = _this.sections[field.destination];
  if (!destination.hasOwnProperty(sectionName)) {
    destination[sectionName] = {
      fields: []
    };
  }
  destination[sectionName].fields.push(field);
};

Settings.prototype.addFieldsToSite = function () {
  'use strict';
  var _this = this;
  _this.forEachField(function (destinationPair, sectionPair, field) {
    var destinationSelector = _this.destinations[destinationPair.name];
    if (!sectionPair.value.isCreated) {
      $(destinationSelector).append(
        $('<div>', {
          class: 'instasync_settings_field'
        }).text(sectionPair.name)
      );
      sectionPair.value.isCreated = true;
    }

    $(destinationSelector).append(field.$div);
  });
};

Settings.prototype.executeOnceCore = function () {
  'use strict';
  var _this = this;
  _this.removeInstaSyncSettings();
  _this.createResetButton();
  _this.createFields();
  _this.addFieldsToSite();

  $('#tabs_playlist_settings').append(
    $('#tabs_playlist_settings .mod-control').detach()
  );
};

Settings.prototype.reset = function () {
  'use strict';
  var _this = this;
  Object.keys(_this.fields).forEach(function (field) {
    field = _this.fields[field];
    if (!field.hidden) {
      field.set(field.default);
    }
  });
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
window.gmc = window.plugins.settings;
