function SettingsField(opts) {
  'use strict';
  this.type = opts.type;
  this.label = opts.label || '';
  this.id = opts.id;
  this.default = opts.default;
  this.title = opts.title || '';
  this.size = opts.size || 2;
  this.section = opts.section || ['General'];
  this.tooltipPlacement = opts.tooltipPlacement || 'bottom';
  this.destination = opts.destination || 'chat';
  this.hidden = opts.hidden || false;
  this.$div = $('<div>');
  this.$input = undefined;
  this.oldVal = undefined;
  this.val = undefined;
  this.init();
  this.buildDiv();
}

SettingsField.prototype.init = function () {
  'use strict';
  var _this = this;
  if (!window.localStorage.hasOwnProperty(_this.id)) {
    _this.setStorage(_this.default);
  }
  _this.getFromStorage();
  _this.oldVal = _this.val;
};

SettingsField.prototype.getFromStorage = function () {
  'use strict';
  var _this = this;
  var val = window.localStorage.getItem(_this.id);

  switch (_this.type) {
  case 'checkbox':
    val = (val === 'true');
    break;
  case 'int':
    val = Number(val);
    break;
  }

  _this.val = val;
};

SettingsField.prototype.updateDisplay = function (fromGUI) {
  'use strict';
  var _this = this;
  if (fromGUI) {
    return;
  }
  switch (_this.type) {
  case 'checkbox':
    _this.$input.prop('checked', _this.get());
    break;
  case 'int':
  case 'text':
    _this.$input.val(_this.get());
    break;
  }
};

SettingsField.prototype.get = function () {
  'use strict';
  return this.val;
};

SettingsField.prototype.setStorage = function (val) {
  'use strict';
  var _this = this;

  switch (_this.type) {
  case 'checkbox':
    val = !!val;
    break;
  }

  window.localStorage.setItem(_this.id, val);
};

SettingsField.prototype.set = function (val, fromGUI) {
  'use strict';
  var _this = this;
  _this.oldVal = _this.val;
  _this.setStorage(val);
  _this.getFromStorage();
  _this.updateDisplay(fromGUI);
  if (_this.oldVal !== _this.val) {
    _this.onChange();
  }
};

SettingsField.prototype.onChange = function () {
  'use strict';
  events.fire('SettingChange[{0}]'.format(this.id), [this.oldVal, this.val]);
};

SettingsField.prototype.createTooltip = function () {
  'use strict';
  var _this = this;
  return $('<label>', {
    class: 'active_toolip',
    'data-original-title': _this.title,
    'data-placement': _this.tooltipPlacement
  }).tooltip();
};

SettingsField.prototype.createInput = function () {
  'use strict';
  var _this = this;
  switch (_this.type) {
  case 'checkbox':
    return _this.createCheckboxInput();
  case 'text':
  case 'int':
    return _this.createStringInput();
    //TODO remove when all types are implemented
  default:
    logger().warn(_this.name, 'settingtype not implemented yet ' + _this.type);
    _this.hidden = true;
  }
};

SettingsField.prototype.createStringInput = function () {
  'use strict';
  var _this = this;
  _this.$div.addClass('instasync_settings_text');
  return $('<input>', {
    id: 'instasyncp-settings-text-' + _this.id,
    type: 'text'
  }).val(_this.get()).attr('size', _this.size).bind('input', function () {
    _this.set($(this).val(), true);
  });
};

SettingsField.prototype.createCheckboxInput = function () {
  'use strict';
  var _this = this;
  _this.$div.addClass('checkbox');
  return $('<input>', {
    id: 'instasyncp-settings-checkbox-' + _this.id,
    type: 'checkbox'
  }).prop('checked', _this.get()).change(function () {
    _this.set($(this).is(':checked'), true);
  });
};

SettingsField.prototype.buildDiv = function () {
  'use strict';
  var _this = this;
  var $tooltip = _this.createTooltip();
  _this.$input = _this.createInput();

  _this.$div.append($tooltip.append(_this.$input).append(_this.label));
  if (_this.hidden) {
    _this.$div.hide();
  }
};
