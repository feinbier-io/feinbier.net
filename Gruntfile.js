module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-vulcanize');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'elements/styles.css': 'elements/styles.scss'
				}
			}
		},
		vulcanize: {
			default: {
				options: {
					csp: true,
					strip: true,
					abspath: '/',
					excludes: {
						imports: [
							//"polymer.html"
						]
					}
				},
				files: {
					'index.html': 'content/index.html'
				}
			}
		},
		watch: {
			css: {
				files: ['elements/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
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
		}

	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass:dist', 'vulcanize', 'uglify'])

}
