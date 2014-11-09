module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-vulcanize');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {},
			dist: {
				files: {
					'elements/styles.css': 'elements/styles.scss'
				}
			}
		},
		vulcanize: {
			options: {
				csp: true,
				excludes: {
					imports: [
						"polymer.html"
					]
				}
			},
			files: {
				'build-csp.html': 'index.php'
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

	});

	grunt.registerTask('default', ['watch']);

}
