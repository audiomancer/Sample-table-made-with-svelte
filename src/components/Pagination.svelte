<script>
	import { location } from 'svelte-spa-router'
	export let feed
	export let paginationStart
	export let paginationEnd

	const perPage = 20
	
	$: getCurrentPage = parseInt($location.replace(/^\/+/, ''))
	$: pagesTotal = Math.ceil(feed.length / perPage)

	$: currentPage =
		(getCurrentPage <= pagesTotal && getCurrentPage > 0
			? getCurrentPage
			: currentPage) || 1

	$: paginationStart = perPage * (currentPage - 1)
	$: paginationEnd = perPage * currentPage

	$: isFirstPage = currentPage === 1
	$: isLastPage = currentPage === pagesTotal
	$: previousPage = currentPage - 1
	$: nextPage = currentPage + 1

	$: offsetLength = (isFirstPage || isLastPage) && pagesTotal > 2 ? 2 : 1
	$: linkToFirst = pagesTotal > 3 && currentPage > 2
	$: linkToLast = pagesTotal > 3 && pagesTotal - currentPage >= 2

	$: offset = {
		getOffsetBase: () => Array(offsetLength).fill(0),
		next: function() {
			return this.getOffsetBase().map((_, i) => currentPage + 1 + i)
		},
		previous: function() {
			return this.getOffsetBase()
				.map((_, i) => currentPage - 1 - i)
				.reverse()
		}
	}
</script>

<style lang="scss">
	@import 'styles';

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 70px;
		background: black;
		font-family: os_bold;

		* {
			width: 40px;
			height: 34px;
			line-height: 34px;
			border-radius: 5px;
			background: $SECONDARY;
			text-align: center;
			font-size: 17px;
			margin-right: 15px;

			&:last-child {
				margin-right: 0px;
			}

			@media #{$MOBILE} {
				width: 30px;
				margin-right: 12px;
				font-size: 16px;
			}
		}

		a {
			cursor: pointer;
		}

		.currentPage,
		a:hover {
			background: $ACTIVE;
		}
	}
</style>

{#if pagesTotal > 1}
	<div>
		{#if !isFirstPage}
			<a href="#/{previousPage}">&#x276E;</a>
		{/if}

		{#if linkToFirst}
			<a href="#/{1}">1</a>
			<span>...</span>
		{/if}

		{#if !isFirstPage}
			{#each offset.previous() as n}
				<a href="#/{n}">{n}</a>
			{/each}
		{/if}

		<span class="currentPage">{currentPage}</span>

		{#if !isLastPage}
			{#each offset.next() as n}
				<a href="#/{n}">{n}</a>
			{/each}
		{/if}

		{#if linkToLast}
			<span>...</span>
			<a href="#/{pagesTotal}">{pagesTotal}</a>
		{/if}

		{#if !isLastPage}
			<a href="#/{nextPage}">&#x276F;</a>
		{/if}
	</div>
{/if}
