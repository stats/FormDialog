var FormDialog = {};
(function($) {

  FormDialog = function(config) {
    if( !config ) {
      this.config = {};
    } else {
      this.config = config
    }
    this.dialog = null;

    this.title = null;
    this.fields = null;
    this.accept_label = null;

    this.dialogs = {};
    this.field_types = {};
    this.setup();
  }

  FormDialog.prototype = {
    setup: function() {
      if(!this.config.hasOwnProperty('disableDefaults') || this.config['disableDefaults'] === false ){
        this.registerDefaultTypes();
      }
      this.dialog = this._createDialog();
    },
    registerDefaultTypes: function(){
      this.registerType(FormDialog.Select);
      this.registerType(FormDialog.Text);
      this.registerType(FormDialog.Color);
      this.registerType(FormDialog.Number);
      this.registerType(FormDialog.Checkbox);
    },
    registerType: function(type) {
      this.field_types[type.id] = type;
    },
    registerDialog: function(type, options) {
      if(this.dialogs.hasOwnProperty(type) && this.dialogs[type] != null) {
        this.dialogs[type].remove();
      }
      this.dialogs[type] = options;
    },
    unregisterDialog: function(type) {
      if( ! this.dialogs.hasOwnProperty(type) ){
        return false;
      }
      this.dialogs[type].remove();
      this.dialogs[type] = null;

      return true;
    },
    show: function(type) {
      if( !this.dialogs.hasOwnProperty(type) || this.dialogs[type] == null){
        return false;
      }

      this.updateDialog(this.dialogs[type]);

      var self = this;
      this.accept.off('click tap');
      this.accept.on('click tap', function() {
        $(document).trigger('formdialog:' + type + ':submit', [self.serializeForm()]);
        self.hide(type);
      });

      this.dialog.modal('show');
      return true;
    },
    hide: function(type) {
      if( !this.dialogs.hasOwnProperty(type)  || this.dialogs[type] == null){
        return false;
      }
      this.dialog.modal('hide');
      return true;
    },
    serializeForm: function(type) {
      return this.dialog.find('form').serializeArray();
    },
    updateDialog: function(options) {
      this.fields.html('');
      var opts;
      for(var i = 0, len = options.fields.length; i < len; i++) {
        opts = options.fields[i];
        if(!this.field_types.hasOwnProperty(opts.type) ){
          throw new Error("The data type [" + opts.type + "] has not been registered.")
        }
        this.fields.append(this.field_types[opts.type].fieldFactory(opts));
        this.title.html(options.dialog_title);
        this.accept.html(options.submit_label);

      }
    },
    _createDialog: function() {
      var modal = $('<div class="modal fade"></div>');
      var dialog = $('<div class="modal-dialog"></div>');
      var content = $('<div class="modal-content"></div>');
      var header = $('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
      this.title = $('<h4 class="modal-title"></h4>');
      var body = $('<div class="modal-body"></div>');
      var footer = $('<div class="modal-footer"></div>');

      this.accept = $('<button type="button" class="btn btn-primary"></button>');
      var close = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');

      footer.append(this.accept);
      footer.append(close);

      this.fields = $('<form class="field"></form>');
      body.append(this.fields);
      header.append(this.title);

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
