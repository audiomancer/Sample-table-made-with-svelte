<script>
	import { onMount } from 'svelte'
	import Table from './Table.svelte'
	import Spinner from './Spinner.svelte'
	import axios from 'axios'

	const API = axios.create({
		baseURL: 'https://recruitment.hal.skygate.io/'
	})

	let finalData

	onMount(async () => {
		const { data: companies } = await API.get('companies')

		finalData = await Promise.all(
			companies.map(async el => {
				const {
					data: { incomes }
				} = await API.get(`incomes/${el.id}`)

				const { value: rawTotalIncome } = incomes.reduce((a, b) => ({
					value: parseFloat(a.value) + parseFloat(b.value)
				}))

				const totalIncome = rawTotalIncome.toFixed(2)
				const averageIncome = (totalIncome / incomes.length).toFixed(2)

				const computedDates = incomes.map(el => Date.parse(el.date))
				const lastMonthIndex = computedDates.indexOf(Math.max(...computedDates))
				const lastMonthIncome = incomes[lastMonthIndex].value

				return {
					...el,
					'total income': totalIncome,
					'average income': averageIncome,
					"last month's income": lastMonthIncome
				}
			})
		)
	})
</script>

<style lang="scss">
	@import 'styles';

	:global(*) {
		outline: none;
		border: none;
		margin: 0px;
		padding: 0px;
		list-style: none;
		text-decoration: none;
		color: black;
	}

	:global(body) {
		background: white;
		background: url(../img/background.jpg);
		background-attachment: fixed;
		width: 100%;
		height: 100%;
	}
</style>

{#if finalData}
	<Table data={finalData} />
{:else}
	<Spinner />
{/if}
