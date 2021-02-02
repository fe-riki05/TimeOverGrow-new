import { firebase, auth , dbMessages } from '~/plugins/firebase.js'


export default context => {
	const { store } = context

	return new Promise(resolve => {
		auth().onAuthStateChanged(user => {
			store.commit('setUser', user)
			resolve()
		})
	})

	// async function getAllData(limit, pagingToken) {
    // let nextToken = "";
    // let query = dbMessages.orderBy('createdAt', 'desc').limit(limit);

    // if (pagingToken !== "") {
    //     const [seconds, nanoseconds] = pagingToken.split(':');
    //     const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
    //     query = query.startAfter(timestamp);
    // }

    // const result = await query.get().then((snapshot) => {
    //     if (snapshot.docs.length >= limit) {
    //         const last = snapshot.docs[snapshot.docs.length - 1];
    //         const lastData = last.data();
    //         const time = lastData.createdAt;
    //         nextToken = `${time.seconds}:${time.nanoseconds}`;
    //     }
    //     return { "BuffData": snapshot, "nextPageToken": nextToken };
    // }).catch(() => {
    //     alert("エラーが発見されました：データ取得時");
    // });
    // return result;
	// }

	// async function getSearchData(limit, searchWord, searchUser, pagingToken) {
    // let nextToken = "";
    // let query = dbMessages.orderBy('createdAt')
    // if (pagingToken !== "") {
    //     const [seconds, nanoseconds] = pagingToken.split(':');
    //     const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
    //     query = query.startAfter(timestamp);
    // }
    // if (searchUser === "" && searchWord !== "") {
    //     query = query.where('title', '==', searchWord).limit(limit);
    // }
    // else if (searchUser !== "" && searchWord === "") {
    //     query = query.where('displayName', '==', searchUser).limit(limit);
    // }
    // else if (searchUser !== "" && searchWord !== "") {
    //     query = query.where('displayName', '==', searchUser).where('title', '==', searchWord).limit(limit);
    // }

    // const result = await query.get().then((snapshot) => {
    //     if (snapshot.docs.length >= limit) {
    //         const last = snapshot.docs[snapshot.docs.length - 1];
    //         const lastData = last.data();
    //         const time = lastData.createdAt;
    //         nextToken = `${time.seconds}:${time.nanoseconds}`;
    //     }
    //     return { "BuffData": snapshot, "nextPageToken": nextToken };
    // }).catch(() => {
    //     alert("エラーが発見されました：データ取得時");
    // });
    // return result;
    // }
}
