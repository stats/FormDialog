module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['scripts/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jasmine: {
      src: 'scripts/**/*.js',
      options: {
        specs: 'specs/**/*Spec.js',
        vendor: [
          "https://code.jquery.com/jquery-2.1.4.min.js",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
          "bower_components/jquery-simplecolorpicker/jquery.simplecolorpicker.js"
        ],
        styles: [
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
          "bower_components/jquery-simplecolorpicker/jquery.simplecolorpicker.css"
        ],
        keepRunner: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['concat']);
};
