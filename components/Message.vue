<template>
	<v-card class="message">
		<p class="message-text mb-0">{{ time }}時間</p>
		<v-chip
			color="#17204d"
			text-color="yellow"
		>
			<v-icon left>mdi-label</v-icon>
			{{ tag }}
		</v-chip>
		<p class="message-text mb-0">{{ body }}</p>
		<div class="message-date">{{ date }}</div>
	</v-card>
</template>

<script>
	export default {
		props: {
			time: {
				type: Number,
				required: true
			},
			body: {
				type: String,
				required: true
			},
			date: {
				type: String,
				required: true
			},
			tag: {
				type: String,
				required: true
			}
		}
	}
</script>

<style scoped>
	.message {
		min-height: 30px;
		padding: 10px;
		margin: 0 5vw 2vw;
	}
	.message:hover {
		background-color: #eee;
	}
	.message-date {
		font-size: 0.8em;
		color: #777;
		text-align: right;
	}
</style>
