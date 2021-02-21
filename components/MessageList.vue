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
				@clear="clear"
				@edit="edit"
			/>
		</template>
	</div>
</template>

<script>
	import Message from './Message';

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
							return false;
						}
						if (typeof message.date !== 'string') {
							return false;
						}
						if (typeof message.body !== 'string') {
							return false;
						}
						return true;
					});
				}
			}
		},
		methods: {
			clear() {
				this.$emit('pop');
			},
			edit(docId) {
				this.$emit('update', docId);
			}
		}
	};
</script>

<style scoped>
	.message-list {
		margin: 0;
	}
</style>
