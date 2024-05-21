import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { babel } from "@rollup/plugin-babel";

const isDev = process.env.NODE_ENV === 'development'

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: 'named',
        sourcemap: isDev
      }
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        sourceMap: isDev
      }),
      isDev && terser(),
      babel({
        configFile: './.babelrc',
        babelHelpers: 'runtime',
        exclude: 'node_modules/**'
      })
    ]
  }
]
