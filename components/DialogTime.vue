<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2"> Privacy Policy </v-card-title>

				<v-card-text> </v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<Button color="primary" text @click="dialog = false">
						<p>決定</p>
					</Button>
					<!-- <v-btn color="primary" text @click="dialog = false"> I accept </v-btn> -->
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import Button from '../components/Button';

	export default {
		components: {
			Button
		},
		data() {
			return {
				dialog: false
			};
		}
		// methods: {
		// 	dialogTime() {
		// 		this.$emit('dialog');
		// 	}
		// }
	};
</script>

<style scoped></style>
