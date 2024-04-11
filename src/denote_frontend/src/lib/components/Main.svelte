<script lang="ts">
	import type { Doc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import { userStore } from '../stores/user.store';
	import DatasetBox from './DatasetBox.svelte';
	import { createActor as create_denote_orchestrator, canisterId} from "../../../../declarations/denote_orchestrator";
	async function pullSheets() {
		let host = process.env.DFX_NETWORK === "ic"
		? "https://icp-api.io"
		: "http://localhost:4943"
		
		console.log("in pull sheets")
		console.log('making instance')
		console.log({canisterId, host})
		let denote_dbs = create_denote_orchestrator(canisterId, {agentOptions:{host}})

		try {
			console.log("pulling sheets in try")
			const allRecords = await denote_dbs.getAllDatasheets();
			return allRecords || [];
		} catch (error) {
			console.log("Error pulling")
			console.log(error)
			return [];
		}
	}
	let allRecords: any = []
	pullSheets().then(r=>allRecords=r);
	let DSTitle: string;
	let DSCreators: string;
	let DSKeyWords: string;
	let DSIsSample: boolean;	


	let lookingFor: string = ''
	let fileToUpload: any;
	$: filteredItems = allRecords.filter((item:any) => item.datasheet.title.toLowerCase().includes(lookingFor.toLowerCase()));
	function handleSubmit(){
		if (fileToUpload) {
			const reader = new FileReader();
			reader.onload = () => {
				const fileContent = reader.result;
				console.log(fileContent);
			};
			reader.readAsText(fileToUpload);
		}
		// @TODO: upload to canister
	}

	function handleFileInputChange(event) {
    	fileToUpload = event.target.files[0];
  	}
	let mode: 'insert' | 'insert_done' | 'deleted' = 'insert';

	let doc: Doc<Data> | undefined = undefined;

	const loadData = async () => {
		if ($userStore === null || $userStore === undefined || $userStore.key === undefined) {
			doc = undefined;
			mode = 'insert';
			return;
		}
	};

	$: $userStore, (async () => await loadData())();


</script>

<form on:submit|preventDefault={handleSubmit}>
	<h3>Upload a new database!</h3>
	<input type="file" 
		on:change={handleFileInputChange}
	/>

	<h5>Give us more information about the dataset -> Provide it with a datasheet!:)</h5>
	<label for="DSTitle">Dataset Title:</label>
	<input id="DSTitle" type="text" name="DSTitle" placeholder="Dataset Title" bind:value={DSTitle} />

	<label for="DSCreators">Creators:</label>
	<input id="DSCreators" type="text" name="DSCreators" placeholder="Dataset Creators" bind:value={DSCreators} />

	<label for="DSKeyWords">Key Words:</label>
	<input id="DSKeyWords" type="text" name="DSKeyWords" placeholder="Dataset Key words" bind:value={DSKeyWords} />

	<label for="DSIsSample">Is the dataset a subset of a larger instance?</label>
	<input id="DSTDSIsSampleitle" type="text" name="DSIsSample" placeholder="Dataset is sample" bind:value={DSIsSample} />

	<button type="submit">Submit</button>
</form>

<hr>

<h3>Look for an existing database!</h3>

<input type="text" 
	id="search-field" 
	placeholder="Enter Search Term" 
	autocomplete="off"
	bind:value={lookingFor} 
/>

{#each filteredItems as item (item.id)}
	<DatasetBox {item}/>
{/each}

<style lang="scss">
	.done {
		display: flex;
		align-items: center;
		gap: var(--padding-2x);

		p {
			margin: 0;
		}
	}
</style>
