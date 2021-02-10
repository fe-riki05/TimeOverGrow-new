<template>
	<div class="message-list">
		<template v-for="(message, index) in messages">
			<Message
				:key="index"
				:time="message.time"
				:body="message.body"
				:date="message.date"
				:tag="message.tag"
				:i="index"
			/>
		</template>
	</div>
</template>

<script>
	import Message from './Message'

	export default {
		components: {
			Message
		},
		props: {
			messages: {
				type: Array,
				required: true,
				validator(messages) {
					return messages.every(message => {
						if (typeof message.time !== 'number') {
							return false
						}
						if (typeof message.date !== 'string') {
							return false
						}
						if (typeof message.body !== 'string') {
							return false
						}
						return true
					})
				}
			}
		},
		methods: {
			reload() {
				this.$emit('reload') // Main.vueのreloadで設定した関数の呼び出し
			}
		}
		// mounted() {
		// console.log(message.tag);
		// }
	}
</script>
