module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'ftp-deploy': {
            main: {
                auth: {
                    host: 'rangelworks.com',
                    port: 21,
                    authKey: 'rangelworks'
                },
                src: 'www/',
                dest: 'tim.rangelworks.com/',
                exclusions: []
            }
        },
        jade : {
            main : {
                options: {
                    data: {
                        debug: true
                    }
                },
                files: {
                    "www/index.html": "src/jade/main.jade"
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('deploy', ['ftp-deploy'])
    grunt.registerTask('default', ['jade']);
};