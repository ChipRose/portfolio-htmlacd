import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import webpCss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: true })
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "SCSS",
      message: "Error: <%= error.message %>"
    })
  ))
  .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(groupCssMediaQueries())
    .pipe(webpCss({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    }))
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 3 versions"],
      cascade: true
    }))
    .pipe(cleanCss())
    .pipe(app.plugins.rename({
      extname:".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}