export default ({ store, route, redirect }) => {
	if (!store.getters.isAuthenticated && route.name !== 'top' && route.name !== 'login' && route.name !== 'register') {
		redirect('/top');
	}
	if (store.getters.isAuthenticated && (route.name === 'login' || route.name === 'register')) {
		redirect('/');
	}
};
// export default ({ store, route, redirect }) => {
// 	if (!store.getters.isAuthenticated && route.name !== 'login' && route.name !== 'register') {
// 		redirect('/login')
// 	}
// 	if (store.getters.isAuthenticated && (route.name === 'login' || route.name === 'register')) {
// 		redirect('/')
// 	}
// }
