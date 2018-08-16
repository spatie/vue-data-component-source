import pkg from './package.json';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';

export default [
	{
		input: 'src/index.ts',
        plugins: [
            typescript(),
        ],
        output: [
            {
                file: pkg.module,
                format: 'es',
            },
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'named',
            },
            {
                file: pkg.browser,
                format: 'umd', name: 'DataResource', exports: 'named',
            },
        ],
	},
	{
		input: 'src/index.ts',
        plugins: [
            typescript(),
            uglify(),
        ],
        output: [
            {
                file: pkg.browser.replace('.js', '.min.js'),
                format: 'umd',
                name: 'DataResource',
                exports: 'named',
            },
        ],
	},
];
