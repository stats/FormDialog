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
