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
  var _this = this;

  function getStorage() {
    return window.localStorage.getItem(_this.id);
  }

  switch (this.type) {
  case 'checkbox':
    return Boolean(getStorage());
  default:
    return getStorage();
  }
};

SettingsField.prototype.set = function (val) {
  'use strict';
  var _this = this;

  function setStorage(v) {
    window.localStorage.setItem(_this.id, v);
  }

  switch (this.type) {
  case 'checkbox':
    setStorage(!!val);
    break;
  default:
    setStorage(val);
    break;
  }
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
  _this.$div.addClass('checkbox');
  return $('<input>', {
    id: 'instasyncp-settings-checkbox-' + _this.id,
    type: 'checkbox'
  }).prop('checked', _this.get());
};

SettingsField.prototype.buildDiv = function () {
  'use strict';
  var _this = this;
  var $tooltip = _this.createTooltip();
  var $input = _this.createInput();

  _this.$div.append($tooltip.append($input).append(_this.label));
};
