<template>
	<v-btn
		elevation="7"
		large
		outlined
		plain
		raised
		rounded
		text
		x-large
		class="button"
		:class="{ disabled: !clickable }"
		:disabled="!clickable"
		@click="onClick(), onGet(), onChart()"
	>
		{{ title }}
	</v-btn>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '今日の学習内容送信！！！'
			},
			onClick: {
				type: Function,
				required: true
			},
			onGet: {
				type: Function,
				required: true
			},
			onChart: {
				type: Function,
				required: true
			},
			clickable: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style scoped>
	.disabled {
		opacity: 0.3;
	}
</style>
