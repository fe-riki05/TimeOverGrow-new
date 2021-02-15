<template>
	<div>
		<client-only>
			<v-card :elevation="10">
				<v-img :src="image_src" max-width="350px" max-height="350px" style="margin: 0 auto" />
			</v-card>
			<v-card :elevation="10" class="mt-5">
				<div class="totaltime d-flex justify-center mb-3 pb-2">
					<p class="times_text">合計学習時間</p>
					<div class="arrow">
						<p class="times">{{ times }}時間</p>
						<span />
					</div>
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
				image_src: require('@/assets/timeovergrow.png')
			};
		}
	};
</script>

<style scoped>
	.totaltime {
		text-align: center;
	}
	.times_text,
	.times {
		font-size: 20px;
		font-weight: 900;
	}
	.times_text {
		margin: auto 0;
	}
	.times {
		font-size: 30px;
	}
	.arrow {
		margin: 10px 0;
	}
	.arrow p {
		margin: 0;
		padding-left: 5px;
		font-weight: bold;
	}
	.arrow span {
		display: block;
		width: 130px;
		height: 2px;
		background-color: #000;
		position: relative;
		transform: scale(0, 1);
		transform-origin: top left;
		animation: arrow01 5s ease-in-out infinite forwards;
	}
	@keyframes arrow01 {
		0% {
			transform: scale(0, 1);
		}
		30% {
			transform: scale(0, 1);
		}
		40% {
			transform: scale(1, 1);
		}
		85% {
			transform: scale(1, 1);
			opacity: 1;
		}
		90% {
			transform: scale(1, 1);
			opacity: 0;
		}
		100% {
			transform: scale(1, 1);
			opacity: 0;
		}
	}
	.arrow span::after {
		content: '';
		display: block;
		width: 40px;
		height: 15px;
		border-right: 2px solid #000;
		transform: rotate(-45deg) scale(1, 0);
		transform-origin: right bottom;
		position: absolute;
		bottom: 2px;
		right: 1px;
		animation: arrow02 5s ease-in-out infinite forwards;
	}
	@keyframes arrow02 {
		0% {
			transform: rotate(-45deg) scale(1, 0);
		}
		45% {
			transform: rotate(-45deg) scale(1, 0);
		}
		55% {
			transform: rotate(-45deg) scale(1, 1);
		}
		85% {
			transform: rotate(-45deg) scale(1, 1);
			opacity: 1;
		}
		90% {
			transform: rotate(-45deg) scale(1, 1);
			opacity: 0;
		}
		100% {
			transform: rotate(-45deg) scale(1, 1);
			opacity: 0;
		}
	}
</style>
