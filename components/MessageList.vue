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
<<<<<<< HEAD
	import Message from './Message'
=======
	import Message from './Message';
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2

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
<<<<<<< HEAD
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
=======
						return true;
					});
				}
			}
		}
	};
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2
</script>
