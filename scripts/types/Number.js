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
