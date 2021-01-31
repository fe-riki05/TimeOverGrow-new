<template>
	<div class="message-list">
		<client-only>
			<template v-for="(message, index) in messages">
				<Message :key="index" :time="message.time" :body="message.body" :date="message.date" />
			</template>
		</client-only>
	</div>
</template>

<script>
	import Message from './Message'


	export default {
		components: {
			Message,
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
				},
			}
		}
	}
</script>
