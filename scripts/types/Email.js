(function($) {

  FormDialog.Email = {
    id: 'email',
    fieldFactory: function(options) {
      var group = $('<div class="form-group"></div>');
      group.append($('<label for="' + options.name + '">' + options.label + '</label>'));
      var field = $('<input type="email" class="form-control" name="' + options.name + '"/>');
      if(options.hasOwnProperty('placeholder')) {
        field.attr('placeholder', options.placeholder);
      }
      group.append(field);
      return group;
    }
  }

})(jQuery);
