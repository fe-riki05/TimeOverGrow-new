<template>
	<v-app>
		<div class="header">
			<v-btn text absolute right class="auth text-right">
				<!-- <nuxt-link to="/register" class="auth__register"> 新規登録 </nuxt-link> -->
				<nuxt-link to="/login" class="auth__login"> ログイン </nuxt-link>
			</v-btn>
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
		background: #70c2fd;
	}
	.auth {
		text-decoration: none;
		color: inherit;
	}
</style>
