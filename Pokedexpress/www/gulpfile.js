// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var connect = require('gulp-connect');


var path = {
    dist:{
		main: "dist/",
		scripts: "dist/scripts",
		styles: "dist/styles"
	},
	scripts:[
		"web/App/App.js",
		"web/App/utilities/**/*.js",
		"web/App/entities/**/*.js",
		"web/App/app/**/*.js",
		"web/Main/scripts/main.js"
    ],
	templates:[
		"web/App/app/**/*.hbs"
	],
	bootstrap:[
		"node_modules/bootstrap/dist/css/bootstrap.min.css"
	],
	library: [
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/bootstrap/dist/js/bootstrap.min.js",
		"node_modules/backbone.marionette/node_modules/underscore/underscore-min.js",
		"node_modules/backbone.marionette/node_modules/backbone/backbone-min.js",
		"node_modules/backbone.marionette/node_modules/backbone.babysitter/lib/backbone.babysitter.min.js",
		"node_modules/backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.min.js",
		"node_modules/backbone.marionette/lib/backbone.marionette.min.js",
		"node_modules/handlebars/dist/handlebars.runtime.min.js"
	],
	web:[
		"web/Main/index.html"
	]
};

// Moves the main index.html file
var web = function() {
	return gulp.src(path.web)
		.pipe(gulp.dest(path.dist.main))
};
var scripts = function() {
	return gulp.src(path.scripts)
		.pipe(concat('app.js'))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(path.dist.scripts))
};
var library = function() {
	return gulp.src(path.library)
		.pipe(concat('lib.js'))
		.pipe(rename('lib.min.js'))
		.pipe(gulp.dest(path.dist.scripts))
};
var templates = function() {
	return gulp.src(path.templates)
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'Handlebars.templates',
			noRedeclare: true, // Avoid duplicate declarations
		}))
		//.pipe(uglify())
		.pipe(concat('templates.js'))
		.pipe(rename('templates.min.js'))
		.pipe(gulp.dest(path.dist.scripts))
};
var styles = function() {
	return gulp.src(path.bootstrap)
		.pipe(concat('styles.css'))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest(path.dist.styles))
};

gulp.task('web', ['clean'], web);

// Concatenate & Minify Application JS files
gulp.task('scripts', ['clean'], scripts);

// Concatenate & Minify library JS files
gulp.task('library', ['clean'], library);

// Concatenate & Minify handlebars templates
gulp.task('templates', ['clean'], templates);

// Concatenate & Minify css style files
gulp.task('styles', ['clean'], styles);

// Watches files for changes and update as necessary
gulp.task('watch', function() {
	var watch_scripts = gulp.watch(path.scripts, scripts),
		watch_templates = gulp.watch(path.templates, templates),
		watch_web = gulp.watch(path.web, web);

	watch_scripts.on('change', function(event){
		console.log('File ' + event.path + ' was ' + event.type + '.\n');
	});

	watch_templates.on('change', function(event){
		console.log('File ' + event.path + ' was ' + event.type + '.\n');
	});

	watch_web.on('change', function(event){
		console.log('File ' + event.path + ' was ' + event.type + '.\n');
	});
});


// Cleans the directories
gulp.task('clean', function() {
    return gulp.src(path.dist.main, {read: false})
		.pipe(clean());
});

// Runs a local web server
gulp.task('serve', ['watch'], function() {
    connect.server({
		root: path.dist.main,
		host: "localhost",
		port: 3030
	});
});

// Default Task
gulp.task('default', ['web', 'styles', 'scripts', 'library', 'templates']);