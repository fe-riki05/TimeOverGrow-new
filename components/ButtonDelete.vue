<template>
	<v-btn
		elevation="7"
		large
		outlined
		plain
		raised
		text
		class="button"
		:class="{ disabled: !clickable }"
		:disabled="!clickable"
		@click="onDelete(), onChart()"
	>
		{{ title }}
	</v-btn>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '削除'
			},
			onDelete: {
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
	};
</script>

<style scoped>
	.disabled {
		opacity: 0.3;
	}
</style>
