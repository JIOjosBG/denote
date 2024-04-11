<script>
	import Footer from '$lib/components/Footer.svelte';
	import Toasts from '$lib/components/Toasts.svelte';
</script>

<slot />

<Footer />

<Toasts />

<style lang="scss" global>
	@import '../lib/styles/global.scss';
</style>
