export default ({ store, route, redirect }) => {
  if (
    !store.getters.isAuthenticated &&
    route.name !== 'top' &&
    route.name !== 'login' &&
    route.name !== 'register' &&
    route.name !== 'DialogEdit' &&
    route.name !== 'MyPage'
  ) {
    redirect('/top');
  }
  if (store.getters.isAuthenticated && (route.name === 'login' || route.name === 'register')) {
    redirect('/');
  }
};
