import { auth } from '~/plugins/firebase.js';

export default (context) => {
  const { store } = context;

  return new Promise((resolve,reject) => {
    auth().onAuthStateChanged((user) => {
      store.commit('setUser', user);
      let userObject = {}

      console.log(user);
      userObject.uid = user.uid
      userObject.isAnonymous = user.isAnonymous

      console.log(userObject);
      resolve(userObject);
    });
  });
};
