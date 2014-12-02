module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');



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
					'css/styles.css': 'sass/style.scss'
				}
			},
			dist: {
				options: {
					sourceMap: false,
					outputStyle: 'compressed'
				},
				files: {
					'dist/css/styles.css': 'sass/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: ['sass/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false
				}
			},
			assemble: {
				files: ['**/*.hbs', 'data/*.yml'],
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
						'bower_components/bootstrap-material-design/scripts/ripples.js',
						'bower_components/bootstrap-material-design/scripts/material.js',
						'js/main.js',
					]
				}
			}
		},
		assemble: {
			options: {
				layout: 'layouts/feinbier.hbs',
				flatten: true,
				assets: './',
				data: 'data/*.yml',
				production: false
			},
			dist: {
				options: {
					production: true
				},
				files: {
					'dist': ["content/**/*.hbs" ]
				}
			},
			dev: {
				files: {
					'./': ["content/**/*.hbs" ]
				}
			}
		},
		copy: {
			dist: {
				files: [
					//Images
					{expand: true, src: ['images/**'], dest: 'dist'},

					//Fonts
					{expand: true, flatten: false, src: ['bower_components/bootstrap-material-design/fonts/*'], dest: 'dist'},
				]
			}
		}

	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'sass:dist', 'uglify', 'assemble:dist', 'copy']);

}
