<script>
	import { replace } from 'svelte-spa-router'

	export let feed
	export let getFilteredData

	let formRef

	function filterTable() {
		let filteredData = feed

		function filterData(callback) {
			filteredData = filteredData.filter(x => {
				return callback(x)
			})
		}

		const formArray = Array.from(formRef).filter(el => {
			return el.type !== 'submit'
		})

		formArray.forEach(el => {
			if (!el.value) return

			if (el.type === 'text') {
				filterData(x =>
					x[el.dataset.key].toLowerCase().startsWith(el.value.toLowerCase())
				)
				return
			}

			if (el.dataset.range === 'min') {
				filterData(x => x[el.dataset.key] >= parseFloat(el.value))
				return
			}

			if (el.dataset.range === 'max') {
				filterData(x => x[el.dataset.key] <= parseFloat(el.value))
				return
			}
		})

		getFilteredData = filteredData

		// Returns to first page after each sorting
		replace('/1')
	}
</script>

<style lang="scss">
	@import 'styles';

	$GRID_GAP: 3px;

	form {
		display: grid;
		grid-auto-flow: row;
		grid-gap: $GRID_GAP;

		div {
			display: grid;
			grid-auto-flow: column;
			grid-gap: $GRID_GAP;
		}
	}

	input {
		display: block;
		height: 50px;
		color: black;
		font-family: os_bold;
		text-indent: 3px;
		font-size: 16px;
		background: $SECONDARY;

		@media #{$MOBILE} {
			font-size: 13px;
		}

		&:focus {
			background: $ACTIVE;
		}

		&[type='submit'] {
			font-size: 20px;
			background: $PRIMARY;
			cursor: pointer;

			&:hover {
				@media #{$HOVER_SUPPORT} {
					background: $ACTIVE;
				}
			}
		}
	}
</style>

<form bind:this={formRef}>
	{#each Object.entries(feed[0]) as [title, value]}
		{#if isNaN(value)}
			<input
				data-key={title}
				type="text"
				name={title}
				placeholder={`${title.toUpperCase()}...`}
				maxLength={75}
				autoComplete="off"
				autoCorrect="off"
				spellCheck={false} />
		{:else}
			<div>
				<input
					data-range="min"
					data-key={title}
					type="number"
					name={`${title} min`}
					placeholder={`${title.toUpperCase()} MIN...`}
					maxLength={75}
					min="0"
					step="10" />
				<input
					data-range="max"
					data-key={title}
					type="number"
					name={`${title} max`}
					placeholder={`${title.toUpperCase()} MAX...`}
					maxLength={75}
					min="0"
					step="10" />
			</div>
		{/if}
	{/each}
	<input type="submit" on:click|preventDefault={filterTable} value="SUBMIT" />
</form>
