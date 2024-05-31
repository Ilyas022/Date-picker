import path from 'path'

import alias from '@rollup/plugin-alias'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import svgr from '@svgr/rollup'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

const isDev = process.env.NODE_ENV === 'development'

const customResolver = resolve({
	extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss'],
	browser: true,
})

export default [
	{
		input: ['src/index.ts'],
		output: [
			{
				dir: 'dist',
				format: 'esm',
				preserveModules: true,
				preserveModulesRoot: 'src',
				exports: 'named',
				sourcemap: isDev,
			},
		],
		plugins: [
			peerDepsExternal(),
			nodeResolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationDir: 'dist',
				sourceMap: isDev,
			}),
			terser(),
			babel({
				configFile: './.babelrc',
				babelHelpers: 'runtime',
				exclude: 'node_modules/**',
				plugins: ['babel-plugin-styled-components'],
			}),
			eslint({
				exclude: 'node_modules/**',
			}),
			svgr(),
			postcss({
				getExportNamed: false,
				extract: 'styles.css',
			}),
			alias({
				entries: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }],
				resolve: customResolver,
			}),
		],
		external: ['react', 'react-dom', 'styled-components'],
	},
]
