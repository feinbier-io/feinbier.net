module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-vulcanize');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('assemble');


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
					csp: false,
					strip: false,
					//abspath: '/',
					excludes: {
						imports: [
							//"polymer.html"
                            "feinbier-footer.html",
                            "core-header-panel.html"
						]
					}
				},
				files: {
					'index.html': 'compiled/index.html',
					'impressum.html': 'compiled/impressum.html',
					'datenschutz.html': 'compiled/datenschutz.html'
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
