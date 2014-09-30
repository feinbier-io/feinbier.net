module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {},
			dist: {
				files: {
					'elements/styles.css': 'elements/styles.scss'
				}
			}
		}

	});

	grunt.registerTask('default', ['sass']);

}
