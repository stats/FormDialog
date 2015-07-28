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
