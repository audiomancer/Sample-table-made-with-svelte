<script>
	import { onMount } from 'svelte'
	import Search from './Search.svelte'
	import Pagination from './Pagination.svelte'
	export let data

	// Handle visibility of the form
	let isSearchVisible = false

	function searchVisibilityHandler() {
		isSearchVisible = isSearchVisible ? false : true
	}

	// MAKE BINDING FOR FILTERING PART
	let getFilteredData = data

	// SORTING PART
	$: sortedData = getFilteredData

	function sortTable(key) {
		// Do not sort empty array
		if (!sortedData.length) return

		// Checks if data is already sorted in ascending order
		function isAscending() {
			for (let i = 0; i < sortedData.length - 1; i++) {
				if (sortedData[i][key] > sortedData[i + 1][key]) {
					return false
				}
			}
			return true
		}

		const sortAscending = () =>
			sortedData.sort((p, n) => (p[key] > n[key] ? 1 : -1))
		const sortDescending = () =>
			sortedData.sort((p, n) => (p[key] < n[key] ? 1 : -1))

		sortedData = isAscending() ? sortDescending() : sortAscending()
	}

	// GRAPHICAL PROCESSING

	// Handle positioning of the search container
	let sectionRef

	let leftMarg
	let width

	function posHandler() {
		leftMarg = sectionRef.scrollLeft
		width = sectionRef.clientWidth
	}

	onMount(() => {
		// Sort by id on the beginning
		sortTable('id')

		// Initial center of the search container
		posHandler()
	})

	// Pagination data binding
	let paginationStart
	let paginationEnd
</script>

<style lang="scss">
	@import 'styles';

	$TABLE_BORDER: 2px solid black;

	main {
		position: relative;
		width: 80%;
		margin: 20px 0px;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid black;
		border-radius: 10px;

		@media #{$MOBILE} {
			width: 92%;
		}
	}

	section {
		overflow-x: auto;
		background: black;
	}

	table {
		width: 100%;
		border-spacing: 0;
		text-align: center;
		font-size: 20px;

		@media #{$MOBILE} {
			font-size: 16px;
		}

		thead,
		tbody {
			td,
			th {
				padding: 7px;

				@media #{$MOBILE} {
					padding: 4px;
				}
			}
		}

		thead {
			tr {
				background: black;
			}

			th {
				position: relative;

				&:not(:last-child):after {
					content: '';
					position: absolute;
					right: 0px;
					top: 30%;
					height: 40%;
					border-left: 2px dotted white;
				}
			}
		}

		tbody {
			tr {
				background: $SECONDARY;

				&:nth-child(even) {
					background: $PRIMARY;
				}

				&:hover:not(#noResults) {
					background: $ACTIVE;
				}
			}

			td {
				&:not(:last-child) {
					border-right: $TABLE_BORDER;
				}

				border-top: $TABLE_BORDER;
			}
		}

		td {
			padding: 0px;
			font-family: os_semibold;
		}

		th {
			color: white;
			cursor: pointer;
			font-family: os_bold;

			&:hover {
				color: $ACTIVE;
			}
		}

		#noResults {
			td {
				padding: 20px;
				font-size: 22px;
				font-family: os_bold;
			}
		}
	}

	#chevron {
		cursor: pointer;
		padding: 4px;
		text-align: center;

		&:hover div {
			&:before,
			&:after {
				background: $ACTIVE;
			}
		}

		div {
			$THICKNESS: 6px;

			display: inline-block;
			width: 120px;
			height: $THICKNESS;
			margin: $THICKNESS 0px;
			position: relative;
			text-align: center;

			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 51%;
				background: white;
			}

			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
				width: 50%;
				background: white;
			}
		}

		.pointDown {
			&:before {
				transform: skew(0deg, 6deg);
			}

			&:after {
				transform: skew(0deg, -6deg);
			}
		}

		.pointUp {
			&:before {
				transform: skew(0deg, -6deg);
			}

			&:after {
				transform: skew(0deg, 6deg);
			}
		}
	}

	// This fixes randomly appearing scrollbar when it's not needed
	#searchContainer {
		overflow: hidden;
	}
</style>

<svelte:window on:resize={posHandler} />

<main>
	<section on:scroll={posHandler} bind:this={sectionRef}>
		<table>
			<thead>
				<tr>
					{#each Object.keys(data[0]) as title}
						<th on:click={() => sortTable(title)}>{title.toUpperCase()}</th>
					{/each}
				</tr>
			</thead>

			<tr>
				<td colspan="100">
					<div
						style="margin-left: {leftMarg}px; width: {width}px;"
						id="searchContainer">
						<div style="display: {isSearchVisible ? 'block' : 'none'}">
							<Search feed={data} bind:getFilteredData />
						</div>
						<div id="chevron" on:click={searchVisibilityHandler}>
							<div class={isSearchVisible ? 'pointUp' : 'pointDown'} />
						</div>
					</div>
				</td>
			</tr>

			<tbody>
				{#if sortedData.length}
					{#each sortedData.slice(paginationStart, paginationEnd) as row}
						<tr>
							{#each Object.values(row) as item}
								<td>{item}</td>
							{/each}
						</tr>
					{/each}
				{:else}
					<tr id="noResults">
						<td colspan="100">
							<div>NO SEARCH RESULTS</div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</section>
	<Pagination feed={sortedData} bind:paginationStart bind:paginationEnd />
</main>
