<script lang="ts">
	import SignUp from '$lib/components/SignUp.svelte';
	import type { Doc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import IconVerified from '$lib/icons/IconVerified.svelte';
	import { toasts } from '../stores/toasts.store';
	import { userStore } from '../stores/user.store';
	import { getDoc } from '@junobuild/core';
	
	
	let lookingFor: string =''
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

<SignUp {doc} on:junoSubmitted={done} on:junoDeleted={deleted} />
<!-- <Listing /> -->

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
