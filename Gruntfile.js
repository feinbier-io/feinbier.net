module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('assemble');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				outputStyle: 'compressed',
				sourceMap: true
			},
			dist: {
				files: {
					'css/styles.css': 'sass/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: ['sass/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},
			assemble: {
				files: ['**/*.hbs'],
				tasks: ['assemble']
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			build: {
				files: {
					'index.js': ['index.js']
				}
			}
		},
		assemble: {
			options: {
				layout: 'layouts/feinbier.hbs',
				flatten: true,
				assets: './'
			},
			build: {
				files: {
					'./': ["content/**/*.hbs" ]
				}
			}
		}

	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass:dist', 'assemble']);

}
