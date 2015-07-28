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
