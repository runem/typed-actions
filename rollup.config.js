import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

const pkg = require("./package.json");
const input = "src/index.ts";
const watch = {include: "src/**"};

export default [
	{
		input,
		output: {
			file: pkg.module,
			format: "esm"
		},
		plugins: [
			typescript()
		],
		watch
	},
	{
		input: "src/index.ts",
		output: {
			file: pkg.main,
			format: "cjs"
		},
		plugins: [
			typescript(),
			commonjs()
		],
		watch
	},
];
