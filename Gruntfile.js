module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';' 
      }, 
      dist: {
        src: ['public/client/*.js'], 
        dest: 'public/dist/<%= pkg.name %>.js'  
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['public/client/**/*.js']
        }
      }

    },

    eslint: {
      target: {
        files: ['Gruntfile.js', 'public/client/**/*.js', 'app/**/*.js', 'lib/*.js', 'test/*.js']
      }
    },

    cssmin: {
        // Add list of files to lint here
      target: {
        files: {
          'public/dist/<%= pkg.name %>.min.css': ['public/*.css']
        }
      }

    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        //script for building production server
        command: 'git push live master'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      //Invoke shell somehow
      // add your production server task here
      grunt.task.run([ 'build', 'shell' ]);
      //Call grunt build
      //call git push live master??

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
    'upload'
  ]);


};
