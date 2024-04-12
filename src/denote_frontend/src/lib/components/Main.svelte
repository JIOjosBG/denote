<script lang="ts">
	import type { Doc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import { userStore } from '../stores/user.store';
	import DatasetBox from './DatasetBox.svelte';
	import { createActor as create_denote_orchestrator, canisterId} from "../../../../declarations/denote_orchestrator";
	let denote_orchestrator: any;
	let currentUser = localStorage.getItem('user') || ""
	async function pullSheets() {
		let host = process.env.DFX_NETWORK === "ic"
		? "https://icp-api.io"
		: "http://localhost:4943"
		
		denote_orchestrator = create_denote_orchestrator(canisterId, {agentOptions:{host}})

		try {
			return await denote_orchestrator.getAllDatasheets() || [];
		} catch (error) {
			console.log("Error pulling")
			console.log(error)
			return [];
		}
	}
	let allRecords: any = []
	pullSheets().then(r=>allRecords=r);
	let DSTitle: string;
	let DSCreator: string = localStorage.getItem('user') || '';
	let DSKeyWords: string;
	let DSIsSample: string;	


	let lookingFor: string = ''
	let fileToUpload: any;
	$: filteredItems = allRecords.filter((item:any) => item.datasheet.title.toLowerCase().includes(lookingFor.toLowerCase()));
	function handleSubmit(){
		if (fileToUpload) {
			const reader = new FileReader();
			reader.onload = (event) => {
				let fileContent = event?.target?.result;
				denote_orchestrator.uploadDataset(fileContent, {
					version: "1",
					title: DSTitle,
					creator: DSCreator,
					organization:["AZTUES"],
					fund: "AZTUES",
					comments: "This dataset is uploaded to denote to test the frontend",
					keywords: DSKeyWords.split(' ').map(i=> i.split(', ')).flat().map(i=>i.split(',')).flat().filter(i=>i !== ''),
					size: 2,
					isSubset: DSIsSample === "true"
				})
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

	function login(){
		localStorage.setItem('user',DSCreator);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h3>Upload a new dataset!</h3>
	{#if !currentUser}
		<h3>
			You are not logged in. Add creator and click login.
		</h3>
		{:else}
		<h3>
			Logged in as {currentUser}
		</h3>	
		{/if}
	<input type="file" 
		on:change={handleFileInputChange}
	/>

	<h5>Give us more information about the dataset -> Provide it with a datasheet!:)</h5>
	<label for="DSTitle">Dataset Title:</label>
	<input id="DSTitle" type="text" name="DSTitle" placeholder="Dataset Title" bind:value={DSTitle} />

	<label for="DSCreator">Creator:</label>
	<input id="DSCreator" type="text" name="DSCreator" placeholder="Dataset Creator" bind:value={DSCreator} />

	<label for="DSKeyWords">Key Words:</label>
	<input id="DSKeyWords" type="text" name="DSKeyWords" placeholder="Dataset Key words" bind:value={DSKeyWords} />

	<label for="DSIsSample">Is the dataset a subset of a larger instance?</label>
	<input id="DSTDSIsSampleitle" type="text" name="DSIsSample" placeholder="Dataset is sample" bind:value={DSIsSample} />
	<div class='container'>
		<button type="submit">Submit</button>
		<button type="button" on:click={login}>Login as creator</button>
	</div>
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
	<DatasetBox {item} orchestrator={denote_orchestrator}/>
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
  .container {
    display: flex;
    /* Adjust flex container properties as needed */
    flex-direction: row; /* or column, row-reverse, column-reverse */
    align-items: center; /* or flex-start, flex-end, center, baseline, stretch */
    flex-wrap: wrap; /* or nowrap, wrap, wrap-reverse */
  }

  .item {
    /* Adjust flex item properties as needed */
    flex: 1 1 auto; /* flex-grow, flex-shrink, flex-basis */
    /* Other CSS properties */
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

</style>
