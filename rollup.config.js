import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import preprocess from 'svelte-preprocess'
import del from 'rollup-plugin-delete'

const production = !process.env.ROLLUP_WATCH

function serve() {
	let started = false

	return {
		writeBundle() {
			if (!started) {
				started = true

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				})
			}
		}
	}
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: production ? false : true,
		format: 'iife',
		name: 'app',
		file: 'docs/build/bundle.js'
	},
	plugins: [
		del({ targets: 'docs/build/*', runOnce: true }),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance

			preprocess: preprocess({
				scss: {
					includePaths: ['src'] // absolute imports paths
				},
				postcss: {
					plugins: [require('autoprefixer')]
				}
			}),

			css: (css) => {
				css.write('docs/build/bundle.css', production ? false : true)
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs

		resolve({
			browser: true,
			dedupe: (importee) =>
				importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `docs` directory and refresh the
		// browser on changes when not in production
		!production && livereload('docs'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}
