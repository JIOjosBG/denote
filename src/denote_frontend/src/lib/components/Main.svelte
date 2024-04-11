<script lang="ts">
	import SignUp from '$lib/components/SignUp.svelte';
	import type { Doc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import IconVerified from '$lib/icons/IconVerified.svelte';
	import { toasts } from '../stores/toasts.store';
	import { userStore } from '../stores/user.store';
	import { getDoc } from '@junobuild/core';
	// import {createActor, canisterId} from '../../../../declarations/denote_dbs';
	// async function pullSheets() {
	// 	try {
	// 		const sheets = await createActor(canisterId).getDatasheets();
	// 		console.log({sheets})
	// 		return sheets;
	// 	} catch (error) {
	// 		console.log("WATAFAK")
	// 		console.error("Error fetching ids:", error);
	// 	}
	// }
	// pullSheets();
	let DSTitle: string;
	let DSCreators: string;
	let DSKeyWords: string;
	let DSIsSample: boolean;


	let lookingFor: string =''
	let fileToUpload: any;
	$: filteredItems = items.filter(item => item.name.toLowerCase().includes(lookingFor.toLowerCase()));
	let items = [
		{ id: 1, name: 'Apple' },
		{ id: 2, name: 'Banana' },
		{ id: 3, name: 'Orange' },
		{ id: 4, name: 'Pineapple' }
	];
	function handleInput(event) {
		inputValue = event.target.value;
	}
	function handleSubmit(){
		console.log({fileToUpload})
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

		try {
			const result: Doc<Data> | undefined = await getDoc({
				collection: 'signup',
				key: $userStore.key
			});

			doc =
				doc !== undefined
					? result !== undefined
						? {
								...doc,
								...result
						  }
						: {
								...doc
						  }
					: result !== undefined
					? {
							...result
					  }
					: undefined;
		} catch (err: unknown) {
			toasts.error({
				text: 'Error while loading your data',
				detail: err
			});
		}
	};

	$: $userStore, (async () => await loadData())();

	const done = ({ detail }) => {
		doc = detail?.doc ?? undefined;
		mode = 'insert_done';
	};

	const deleted = () => {
		doc = undefined;
		mode = 'deleted';
	};
</script>

<!-- <SignUp {doc} on:junoSubmitted={done} on:junoDeleted={deleted} /> -->
<!-- <Listing /> -->
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
	on:input={handleInput} />

	<ul>
		{#each filteredItems as item (item.id)}
		  <li>{item.name}</li>
		{/each}
	</ul>
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
