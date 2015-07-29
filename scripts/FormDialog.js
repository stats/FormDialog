var FormDialog = {};
(function($) {

  FormDialog = function(config) {
    if( !config ) {
      this._config = {};
    } else {
      this._config = config
    }
    this._dialog = null;

    this._title = null;
    this._fields = null;
    this._accept_label = null;

    this._dialogs = {};
    this._field_types = {};
    this._setup();
  }

  FormDialog.prototype = {
    _setup: function() {
      if(!this._config.hasOwnProperty('disableDefaults') || this._config['disableDefaults'] === false ){
        this._registerDefaultTypes();
      }
      this._dialog = this._createDialog();
    },
    registerType: function(type) {
      this._field_types[type.id] = type;
    },
    registerDialog: function(type, options) {
      if(this._dialogs.hasOwnProperty(type) && this._dialogs[type] != null) {
        this._dialogs[type].remove();
      }
      this._dialogs[type] = options;for 
    },
    unregisterDialog: function(type) {
      if( ! this._dialogs.hasOwnProperty(type) ){
        return false;
      }

      this._dialogs[type] = null;
      delete this._dialogs[type];
      return true;
    },
    show: function(type) {
      if( !this._dialogs.hasOwnProperty(type) || this._dialogs[type] == null){
        return false;
      }

      this._updateDialog(this._dialogs[type]);

      var self = this;
      this._accept_label.off('click tap');
      this._accept_label.on('click tap', function() {
        $(document).trigger('formdialog:' + type + ':submit', [self.serializeForm()]);
        self.hide(type);
      });
      this._dialog.modal('show');
      return true;
    },
    hide: function(type) {
      if( !this._dialogs.hasOwnProperty(type)  || this._dialogs[type] == null){
        return false;
      }
      this._dialog.modal('hide');
      return true;
    },
    serializeForm: function(type) {
      return this._dialog.find('form').serializeArray();
    },
    _registerDefaultTypes: function(){
      this.registerType(FormDialog.Select);
      this.registerType(FormDialog.Text);
      this.registerType(FormDialog.Color);
      this.registerType(FormDialog.Number);
      this.registerType(FormDialog.Checkbox);
    },
    _updateDialog: function(options) {
      this._fields.html('');
      var opts;
      for(var i = 0, len = options.fields.length; i < len; i++) {
        opts = options.fields[i];
        if(!this._field_types.hasOwnProperty(opts.type) ){
          throw new Error("The data type [" + opts.type + "] has not been registered.")
        }
        this._fields.append(this._field_types[opts.type].fieldFactory(opts));
        this._title.html(options.dialog_title);
        this._accept_label.html(options.submit_label);

      }
    },
    _createDialog: function() {
      var modal = $('<div class="modal fade"></div>');
      var dialog = $('<div class="modal-dialog"></div>');
      var content = $('<div class="modal-content"></div>');
      var header = $('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
      this._title = $('<h4 class="modal-title"></h4>');
      var body = $('<div class="modal-body"></div>');
      var footer = $('<div class="modal-footer"></div>');

      this._accept_label = $('<button type="button" class="btn btn-primary"></button>');
      var close = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');

      footer.append(this._accept_label);
      footer.append(close);

      this._fields = $('<form class="field"></form>');
      body.append(this._fields);
      header.append(this._title);

      content.append(header);
      content.append(body);
      content.append(footer);
      dialog.append(content);
      modal.append(dialog);
      $(document.body).append(modal);
      return modal;
    }
  }

})(jQuery);

(function($) {

  FormDialog.Checkbox = {
    id: 'checkbox',
    fieldFactory: function(options) {
      var group = $('<div class="checkbox"></div>');
      var label = $('<label for="' + options.name + '"></label>');
      var field = $('<input type="checkbox" name="' + options.name + '"/>');
      label.append(field);
      label.append($('<span>' + options.label + '</span>'));
      group.append(label);
      return group;
    }
  }

})(jQuery);

(function($) {

  FormDialog.Color = {
    id: 'color',
    fieldFactory: function(options) {
      var group = $('<div class="form-group"></div>');
      group.append($('<label for="' + options.name + '">' + options.label + '</label>'));
      var field = $('<select class="form-control" name="' + options.name + '"></select>');
      for(var j = 0, l = options.options.length; j < l; j++) {
        field.append($('<option value="' + options.options[j][1] + '">' + options.options[j][0] + '</option>'));
      }
      group.append(field);
      field.simplecolorpicker({theme: 'glyphicons'});
      return group;
    }
  }

})(jQuery);

(function($) {

  FormDialog.Number = {
    id: 'number',
    fieldFactory: function(options) {
      var group = $('<div class="form-group"></div>');
      group.append($('<label for="' + options.name + '">' + options.label + '</label>'));
      var field = $('<input type="number" class="form-control" name="' + options.name + '"/>');
      group.append(field);
      return group;
    }
  }

})(jQuery);

(function($) {

  FormDialog.Select = {
    id: 'select',
    fieldFactory: function(options) {
      var group = $('<div class="form-group"></div>');
      group.append($('<label for="' + options.name + '">' + options.label + '</label>'));
      var field = $('<select class="form-control" name="' + options.name + '"></select>');
      for(var j = 0, l = options.options.length; j < l; j++) {
        field.append($('<option value="' + options.options[j][1] + '">' + options.options[j][0] + '</option>'));
      }
      group.append(field);
      return group;
    }
  }

})(jQuery);

(function($) {

  FormDialog.Text = {
    id: 'text',
    fieldFactory: function(options) {
      var group = $('<div class="form-group"></div>');
      group.append($('<label for="' + options.name + '">' + options.label + '</label>'));
      var field = $('<input type="text" class="form-control" name="' + options.name + '"/>');
      group.append(field);
      return group;
    }
  }

})(jQuery);
