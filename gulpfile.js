import Gulp from 'gulp';
import gulpReplace from 'gulp-replace';

const REPO_RAW_URL = 'https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/test-component';

function buildSrc() {
	const tagFlagIndex = process.argv.indexOf('--tag');
	const tag = tagFlagIndex === -1 ? false : process.argv[tagFlagIndex + 1];
	const dist = `${!tag  ? '' : `${REPO_RAW_URL}@${tag}`}/dist`;
	return Gulp.src(['src/**/*.html', 'src/**/*.css', 'src/**/*.js'])
		.pipe(gulpReplace('{{dist}}', dist))
		.pipe(Gulp.dest('dist/'));
}

function buildOther() {
	return Gulp.src(['src/**/*', '!src/**/*.html', '!src/**/*.css', '!src/**/*.js'], { since: Gulp.lastRun(buildOther) })
		.pipe(Gulp.dest('dist/'));
}

export const build = Gulp.parallel(buildSrc, buildOther);
