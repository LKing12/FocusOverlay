import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { version, homepage, author, license } from './package.json';

const dist = './dist/';
const name = 'focusoverlay';
const production = !process.env.ROLLUP_WATCH;
const sourcemap = !production ? 'inline' : false;
const preamble = `/* Focus Overlay - v${version}
* ${homepage}
* Copyright (c) ${new Date().getFullYear()} ${author}. Licensed ${license} */`;

export default {
  input: './src/index.js',
  output: [
    {
      file: `${dist}${name}.cjs.js`,
      format: 'cjs',
      sourcemap
    },
    {
      file: `${dist}${name}.esm.js`,
      format: 'esm',
      sourcemap
    },
    {
      name: 'FocusOverlay',
      file: `${dist}${name}.js`,
      format: 'umd',
      sourcemap
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    production &&
      terser({
        output: {
          preamble
        }
      }),
    postcss({
      extract: `${dist}${name}.css`,
      minimize: true
    })
  ]
};
