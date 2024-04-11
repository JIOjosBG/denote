import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import fs from "fs";
let canisterIds
const isDev = process.env["DFX_NETWORK"] === "local";
const networkName = process.env["DFX_NETWORK"] || "local";
try {
	canisterIds = JSON.parse(
	  fs
		.readFileSync(
		  isDev ? "../../.dfx/local/canister_ids.json" : "../../canister_ids.json",
		)
		.toString(),
	);
  } catch (e) {
	console.error("\n⚠️  Before starting the dev server run: dfx deploy\n\n");
  }

const canisterDefinitions = Object.entries(canisterIds).reduce(
(acc, [key, val]:[any,any]) => ({
	...acc,
	/* [`process.env.${key.toUpperCase()}_CANISTER_ID`]: isDev
	? JSON.stringify(val.local)
	: JSON.stringify(val.ic), */
	[`process.env.CANISTER_ID_${key.toUpperCase()}`]: JSON.stringify(val[networkName]),
}),
{},
);

const config: UserConfig = {
	plugins: [sveltekit()],
	// @TODO: configure for production
	define: {
		...canisterDefinitions,
		"process.env.DFX_NETWORK": JSON.stringify(process.env["DFX_NETWORK"]),
		'process.env.IS_LOCAL': process.env["DFX_NETWORK"] === 'local'
		// 'process.env.DFX_NETWORK': localCanisterIds.denote_dbs.local,
	},
};

export default config;
