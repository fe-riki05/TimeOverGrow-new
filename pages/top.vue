<template>
	<v-app>
		<div class="header">
			<div class="auth">
				<nuxt-link to="/register" class="auth__register">
新規登録
</nuxt-link>
				<nuxt-link to="/login" class="auth__login">
ログイン
</nuxt-link>
			</div>
			<nuxt-link to="/top" />
			<!-- <v-img /> -->
		</div>
	</v-app>
</template>

<script>
	export default {};
</script>

<style scoped>
	.header {
		height: 100px;
		background: #3b90e9;
	}

	.auth {
	}
</style>
