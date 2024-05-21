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

const isDev = process.env.NODE_ENV === 'development'
// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

const customResolver = resolve({
	extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss'],
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
			isDev && terser(),
			babel({
				configFile: './.babelrc',
				babelHelpers: 'runtime',
				exclude: 'node_modules/**',
			}),
			eslint({
				exclude: 'node_modules/**',
			}),
			svgr(),
			alias({
				// applicationRoot: path.resolve(`${__dirname}/src`),
				entries: [
					{ find: 'src', replacement: path.resolve(__dirname, 'src') },
					// { find: '@', replacement: path.resolve(dirname, 'src') },
					// { find: /^@src\/(.*)/, replacement: 'src/$1' },
				],
				resolve: customResolver,
			}),
		],
	},
]
