import ts from "@wessberg/rollup-plugin-ts";

const pkg = require("./package.json");
const input = "src/index.ts";
const watch = {include: "src/**"};

export default [
	{
		input,
		output: [{
			file: pkg.module,
			format: "esm"
		}, {
			file: pkg.main,
			format: "cjs"
		}],
		plugins: [
			ts()
		],
		watch
	}
];
