<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { authSubscribe, initJuno, type User } from '@junobuild/core';
	import Logo from '$lib/assets/denote_logo.png'
	import Main from '$lib/components/Main.svelte';
	import { userStore } from '$lib/stores/user.store';

	let unsubscribe: (() => void) | undefined = undefined;

	onMount(async () => {
		unsubscribe = authSubscribe((user: User | null) => userStore.set(user));

		await initJuno({
			satelliteId: 'jx5yt-yyaaa-aaaal-abzbq-cai'
		});
	});

	onDestroy(() => unsubscribe?.());
</script>

<main>
	<h1><img src={Logo} role="presentation" loading="lazy" decoding="async" alt="Juno" /></h1>
	<p>
		Welcome to Denote.
	</p>

	<section>
		<Main />
	</section>
</main>

<style lang="scss">
	@use '../lib/styles/mixins/media';
	@use '../lib/styles/mixins/shadow';

	main {
		max-width: media.$breakpoint-large;
		padding: var(--padding-4x) var(--padding-2x);

		@include media.min-width(large) {
			margin: var(--padding-8x) auto 0;
		}
	}

	h1 {
		font-size: 3rem;
		width: 50%;
	}

	p {
		margin: 0 0 var(--padding-2x);
	}

	section {
		margin: var(--padding-4x) 0;
		padding: var(--padding-2x);

		@include shadow.card;

		@include media.min-width(large) {
			padding: var(--padding-4x);
		}
	}
</style>
