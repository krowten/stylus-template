

var nib = require('nib');
var jeet = require('jeet');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();

var stylesPath = './styles/**/*.styl';
var otherFiles = './**/*.html';

gulp.task('css', function () {
    gulp.src('./styles/main.styl')
        .pipe(stylus({
            use: [nib(), jeet()],
            import: ['nib', 'jeet'],
            sourcemap: {
                inline: true,
                //sourceRoot: '.',
                basePath: 'styles/'
            },
            compress: true
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['.']
        },
        open: false
    });
});

gulp.task('watch', function() {
    gulp.watch(otherFiles).on('change', browserSync.reload);
    gulp.watch(stylesPath, ['css']);
});

gulp.task('default', ['browser-sync', 'css', 'watch']);
