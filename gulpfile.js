var gulp = require("gulp");
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var pug = require("gulp-pug");
var data = require("gulp-data");
var csscomb = require("gulp-csscomb");
var minify = require("gulp-minify");

gulp.task("styles", function () {
    gulp.src("app/sass/style.sass")
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest("app/css"))
});

gulp.task("comb", function () {
    return gulp.src("./app/css/style.css")
        .pipe(csscomb())
        .pipe(gulp.dest("./app/css"))
});

gulp.task("views", function () {
    gulp.src("app/templates/*.pug")
    .pipe(data(function (file) {
        return require("./app/templates/data/data.json")
    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest("app/"))
});

gulp.task("scripts", function () {
    gulp.src(["app/js/*.js", "!app/js/*min.js"])
    .pipe(minify())
    .pipe(gulp.dest("app/js"))
});

gulp.task("watch", function () {
    gulp.watch("app/sass/**/*.sass", ["styles"]);
    gulp.watch("app/templates/**/*.pug", ["views"]);
    gulp.watch("app/js/*.js", ["scripts"]);

});

gulp.task("default", ["styles", "views", "comb", "watch", "scripts"]);