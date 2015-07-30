describe("Dialog Tests", function() {
  var dialog = new FormDialog({disableDefaults: true});

  it("Expects showing a dialog to fail", function() {
    expect(dialog.show('example')).toBe(false);
  });

  it("Expects serializing the form to be empty", function() {
    expect(dialog.serializeForm().length).toEqual(0);
  });

  dialog.registerType(FormDialog.Select);
  dialog.registerDialog('SelectExample', {
    fields: [{
      label: 'Select a Programming Language',
      name: 'select',
      type: 'select',
      options: [
        ['Javascript', '1'],
        ['Ruby', '2'],
        ['C++', '3'],
        ['HTML', '4']
      ]
    }],
    dialog_title: 'Select a Language',
    submit_label: 'Select Language'
  });

  it("Should show a form dialog", function() {
    expect(dialog.show('SelectExample')).toBe(true);
  });

  it("Should serialize the form", function() {
    expect(dialog.serializeForm().length).toEqual(1);

  });

  it("Should unregister the dialog", function() {
    expect(dialog.unregisterDialog('SelectExample')).toBe(true);
  });

  it("Expects showing a dialog to fail", function() {
    expect(dialog.show('SelectExample')).toBe(false);
  });

  var dialog2 = new FormDialog();
  dialog2.registerDialog('ComplexExample', {
    fields: [
      {
        label: 'Your Name',
        name: 'name',
        type: 'text'
      },
      {
        label: 'A Number',
        name: 'number',
        type: 'number'
      },
      {
        label: 'Is it True?',
        name: 'checkbox',
        type: 'checkbox'
      },
      {
        label: 'Select a Programming Language',
        name: 'select',
        type: 'select',
        options: [
          ['Javascript', '1'],
          ['Ruby', '2'],
          ['C++', '3'],
          ['HTML', '4']
        ]
      },
      {
        label: 'Select a Color',
        name: 'select',
        type: 'color',
        options: [
          ['Sky Blue', '#0066cc'],
          ['Gray', '#cccccc'],
          ['Red', '#ff0000'],
          ['Maroon', '#800000'],
          ['White', '#ffffff']
        ]
      }
    ],
    dialog_title: 'Select a Language',
    submit_label: 'Select Language'
  });

  it("Should show a complex dialog", function() {
    expect(dialog2.show('ComplexExample')).toBe(true);
  });

});
