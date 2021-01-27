<template>
	<div>
		<client-only>
			<v-card max-width="374" style="margin: 0 auto">
				<v-img height="350" :src="image_src"></v-img>
				<div class="totaltime">
					<p class="times_text">これまでのトータル学習時間は</p>
					<span class="times">{{ times }}時間</span>
				</div>
			</v-card>
		</client-only>
	</div>
</template>

<script>
	export default {
		props: {
			times: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				image_src: require('@/assets/Upgrade.png')
			}
		}
	}
</script>

<style scoped>
	.totaltime {
		text-align: center;
	}
	.times_text {
		font-weight: bold;
	}
	.times {
		font-weight: 900;
	}

</style>
