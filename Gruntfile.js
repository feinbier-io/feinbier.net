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
					'src/css/styles.css': 'src/sass/style.scss'
				}
			},
			dist: {
				options: {
					sourceMap: false,
					outputStyle: 'compressed'
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
						'bower_components/bootstrap-material-design/scripts/ripples.js',
						'bower_components/bootstrap-material-design/scripts/material.js',
						'src/js/main.js',
					]
				}
			}
		},
		assemble: {
			options: {
				layout: 'src/layouts/feinbier.hbs',
				flatten: true,
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
					{expand: true, flatten: true, src: ['src/images/**'], dest: 'dist/images'},

					//Fonts
					{expand: true, flatten: false, src: ['bower_components/bootstrap-material-design/fonts/*'], dest: 'dist'},
				]
			}
		}

	});

	grunt.registerTask('default', ['watch']);

	grunt.registerTask('dev', ['sass:dev', 'assemble:dev']);
	grunt.registerTask('build', ['clean', 'sass:dist', 'uglify', 'assemble:dist', 'copy']);

}
