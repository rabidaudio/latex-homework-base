'use strict';

var fs   = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-latex");
  grunt.loadNpmTasks("grunt-open");
  grunt.loadNpmTasks("grunt-editor");

  grunt.initConfig({

    workingDir: '.', //updated by watch
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options:{
        spawn: false
      },
      latex: {
        files: ['./**/*.tex'],
        tasks: ['build'],
      }
    },

    open: {
      pdf:{}
    },
    latex: {
      options: {
        haltOnError: true
      },
      src: ['<%= workingDir %>/*.tex']
    },
    copy: {
      "new": {
        src: ['<%= pkg.template || process.env.TEMPLATE || "template.tex" %>'],
      }
    },
    editor: {
      options: {
        editor: '<%= pkg.editor || process.env.VISUAL || process.env.EDITOR %>'
      },
      src: []
    },
    clean: ['<%= workingDir %>/*.log', '<%= workingDir %>/*.aux']
  });


  grunt.event.on('watch', function(action, filepath) {
    grunt.config('workingDir', path.dirname(filepath));
    grunt.config('open.pdf.path', filepath.replace(/\.tex$/,'.pdf'));
    console.log(grunt.config('open.pdf.path'));
  });

  grunt.registerTask('build', ['latex', 'clean', 'open']);

  grunt.registerTask('go', 'Start a new assignment', function(name) {
    var output = name+"/"+name+".tex";
    console.log(output);
    if(!fs.existsSync(output)){
      grunt.config('copy.new.dest', output);
      grunt.task.run('copy:new');
    }
    grunt.config('editor.src', [output]);
    grunt.task.run('editor');
    grunt.task.run('watch');
  });

};
