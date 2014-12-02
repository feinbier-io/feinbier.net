module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('assemble');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
				files: ['**/*.hbs','data/*.yml'],
				tasks: ['assemble:dev']
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			build: {
				files: {
					'dist/js/main.js': ['js/main.js']
				}
			}
		},
		assemble: {
			options: {
				layout: 'layouts/feinbier.hbs',
				flatten: true,
				assets: './',
                data: 'data/*.yml'
			},
			dist: {
				files: {
					'dist': ["content/**/*.hbs" ]
				}
			},
			dev: {
				files: {
					'./': ["content/**/*.hbs" ]
				}
			}
		}

	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass:dist', 'assemble:dist']);

}
