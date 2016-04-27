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
    www:{
		dist: "dist/**/*",
		main: "dist/",
		scripts: "dist/scripts",
		styles: "dist/styles",
		images: "dist/images",
		audio: "dist/audio"
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
	web: {
		main: "web/Main/index.html",
		images: "web/Main/images/**/*",
		audio: "web/Main/audio/**/*"
	},
	api:[
		"../API/**/*"
	],
	dist: {
		dist: "../dist",
		public: "../dist/public"
	}
};

// Moves the main index.html file
var web = function() {
	gulp.src(path.web.main)
		.pipe(gulp.dest(path.www.main));
	gulp.src(path.web.images)
		.pipe(gulp.dest(path.www.images));
	gulp.src(path.web.audio)
		.pipe(gulp.dest(path.www.audio));
};
var scripts = function() {
	return gulp.src(path.scripts)
		.pipe(concat('app.js'))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(path.www.scripts));
};
var library = function() {
	return gulp.src(path.library)
		.pipe(concat('lib.js'))
		.pipe(rename('lib.min.js'))
		.pipe(gulp.dest(path.www.scripts));
};
var templates = function() {
	return gulp.src(path.templates)
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'Handlebars.templates',
			noRedeclare: true // Avoid duplicate declarations
		}))
		//.pipe(uglify())
		.pipe(concat('templates.js'))
		.pipe(rename('templates.min.js'))
		.pipe(gulp.dest(path.www.scripts));
};
var styles = function() {
	return gulp.src(path.bootstrap)
		.pipe(concat('styles.css'))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest(path.www.styles));
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
		watch_web = gulp.watch(path.web.main, web);

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
    return gulp.src(path.www.main, {read: false})
		.pipe(clean());
});

// Runs a local web server
gulp.task('serve', ['watch'], function() {
    connect.server({
		root: path.www.main,
		host: "localhost",
		port: 3030
	});
});

// Handles compiling the front-end client
gulp.task('www', ['web', 'styles', 'scripts', 'library', 'templates', 'api'], function(){
	return gulp.src(path.www.dist)
		.pipe(gulp.dest(path.dist.public));
});

// Handles compiling the back-end API
gulp.task('api', ['clean'], function(){
	return gulp.src(path.api)
		.pipe(gulp.dest(path.dist.dist));
});

// Default task
gulp.task('default', ['api', 'www']);




