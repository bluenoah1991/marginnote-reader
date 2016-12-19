var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var eslintFormatter = require('eslint/lib/formatters/stylish');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

var dirs = {
    src: './src',
    dist: './dist',
    js: './src/js',
    jsVendors: './src/js/vendors',
    jsVendorsDist: 'vendors',
    styles: './src/css',
    img: './src/img',
    imgDist: 'img',
    fonts: './src/fonts',
    fontsDist: 'fonts'
};

var files = {
    mainJs: 'main.jsx',
    mainJsDist: 'main.js',
    mainLess: 'main.less',
    mainCssDist: 'main.css',
    index: 'index.html',
    eslintRc: './.eslintrc'
};

// compile tasks

var eslintOverrides = {rules: {}};
var webpackWatch = false;
if(process.env.GULP_ENV === 'development'){
    eslintOverrides.rules['no-console'] = 0;
    webpackWatch = true;
}

var webpackConfig = {
    entry: dirs.js + '/' + files.mainJs,
    eslint: {
        configFile: files.eslintRc,
        formatter: eslintFormatter
    },
    output: {
        path: path.resolve(dirs.dist),
        filename: files.mainJsDist
    },
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader?' + JSON.stringify(eslintOverrides),
                exclude: /node_modules/
            }, {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: /node_modules/
            }, {
                enforce: 'post',
                loader: 'transform-loader/cacheable?envify'
            }
        ],
        resolve: {
            extensions: ['', '.jsx', '.js']
        }
    },
    watch: webpackWatch
};

if(process.env.NOTIFY === 'true'){
    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.push(new WebpackNotifierPlugin({
        alwaysNotify: true,
        title: 'Webpack'
    }));
}

if(process.env.GULP_ENV === 'development' &&
    !process.env.DISABLE_SOURCE_MAP ||
    process.env.DISABLE_SOURCE_MAP === 'false'){
        webpackConfig.devtool = 'source-map';
        webpackConfig.module.loaders.push({
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: /node_modules/
        });
}

gulp.task('webpack', function(callback){
    var isFirstRun = true;

    webpack(webpackConfig, function(err, stats){
        if(err){
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            children: false,
            chunks: false,
            colors: true,
            modules: false,
            timing: true
        }));

        if(isFirstRun){
            isFirstRun = false;
            callback();
        } else {
            browserSync.reload();
        }
    });
});

gulp.task('less', function(){
    return gulp.src(dirs.styles + '/' + files.mainLess)
        .pipe(less({
            paths: [dirs.styles]
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(dirs.dist))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', ['less'], function(){
    return gulp.src(dirs.dist + '/' + files.mainCssDist)
        .pipe(minifyCSS())
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('minify-js', ['webpack'], function(){
    return gulp.src(dirs.dist + '/' + files.mainJs)
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('images', function(){
    return gulp.src(dirs.img + '/**/*.*')
        .pipe(gulp.dest(dirs.dist + '/' + dirs.imgDist));
});

gulp.task('fonts', function(){
    return gulp.src(dirs.fonts + '/**/*.*')
        .pipe(gulp.dest(dirs.dist + '/' + dirs.fontsDist));
});

gulp.task('index', function(){
    return gulp.src(dirs.src + '/' + files.index)
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('replace-js-strings', ['webpack', 'minify-js'], function(){
    return gulp.src(dirs.dist + '/' + files.mainJsDist)
        .pipe(replace('@@ENV', process.env.GULP_ENV))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('vendors', function(){
    return gulp.src(dirs.jsVendors + '/**/*.*')
        .pipe(gulp.dest(dirs.dist + '/' + dirs.jsVendorsDist));
});

// main tasks

gulp.task('connect:server', function(){
    connect.server({
        port: 8080,
        root: dirs.dist
    });
});

gulp.task('browsersync', function(){
    browserSync.init({
        server: {
            baseDir: dirs.dist
        }
    });
});

gulp.task('watch', function(){
    gulp.watch(dirs.src + '/' + files.index, ['index']);
    gulp.watch(dirs.styles + '/**/*', ['less']);
    gulp.watch(dirs.img + '/**/*.*', ['images']);
    gulp.watch(dirs.fonts + '/**/*.*', ['fonts']);
});

gulp.task('serve', ['default', 'connect:server', 'watch']);
gulp.task('livereload', ['default', 'browsersync', 'watch']);

var tasks = [
    'webpack',
    'less',
    'images',
    'fonts',
    'index',
    'vendors'
];

if(process.env.GULP_ENV === 'production'){
    tasks.push('minify-css', 'minify-js', 'replace-js-strings');
}

gulp.task('default', tasks);