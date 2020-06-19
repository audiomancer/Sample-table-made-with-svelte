<script>
	import Router from 'svelte-spa-router'
	import Index from './components/Index.svelte'

	const routes = {
		'/*': Index
	}
</script>

<Router {routes} />
