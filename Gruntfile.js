module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: 'dist'
		},
		sass: {
			dev: {
				options: {
					sourceMap: true
				},
				files: {
					'src/css/styles.css': 'src/sass/style.scss'
				}
			},
			dist: {
				options: {
					sourceMap: false,
					//outputStyle: 'compressed'
				},
				files: {
					'dist/css/styles.css': 'src/sass/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: ['src/sass/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false
				}
			},
			assemble: {
				files: ['**/*.hbs', 'src/data/*.yml'],
				tasks: ['assemble:dev']
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			build: {
				files: {
					'dist/js/main.min.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
						'bower_components/bootstrap-material-design/scripts/ripples.js',
						'bower_components/bootstrap-material-design/scripts/material.js',
						'src/js/main.js',
					]
				}
			}
		},
		cssmin: {
			options: {
				banner: "/** Compiled by sass/grunt \n @see https://github.com/michaelfeinbier/feinbier.net */"
			},
			build: {
				files: {'dist/css/styles.css': 'dist/css/styles.css'}
			}
		},
		assemble: {
			options: {
				layout: 'src/layouts/feinbier.hbs',
				flatten: true,
				partials: ['src/partials/*.hbs'],
				assets: './',
				data: 'src/data/*.yml',
				production: false
			},
			dist: {
				options: {
					production: true
				},
				files: {
					'dist': ["src/content/**/*.hbs" ]
				}
			},
			dev: {
				files: {
					'src': ["src/content/**/*.hbs" ]
				}
			}
		},
		copy: {
			dist: {
				files: [
					//Images
					{expand: true, flatten: false, cwd: 'src', src: ['images/**'], dest: 'dist'},

					//Fonts
					{expand: true, flatten: false, src: ['bower_components/bootstrap-material-design/fonts/*'], dest: 'dist'},

					//.htaccess
					{src: '.htaccess', dest: 'dist/.htaccess'}
				]
			}
		}

	});

	grunt.registerTask('default', ['watch']);

	grunt.registerTask('dev', ['sass:dev', 'assemble:dev']);
	grunt.registerTask('build', ['clean', 'sass:dist', 'uglify','cssmin', 'assemble:dist', 'copy']);

}
