import firebase from 'firebase';
import { dbMessages } from '../plugins/firebase';

class Message {
	constructor({ id, times, bodys, date, tags }) {
		this.id = id;
		this.times = times;
		this.bodys = bodys;
		this.date = date;
		this.tags = tags;
	}

	static async save({ times, bodys, tags }) {
		// if (!times) {
		// 	throw new Error('入力欄が空欄です。');
		// }

		// if (!bodys || !bodys.trim()) {
		// 	throw new Error('入力欄が空欄です。');
		// }

		const uid = firebase.auth().currentUser.uid;

		const postData = {
			times,
			bodys,
			date: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			tags
		};

		const docRef = await dbMessages.add(postData);
		const snapShot = await docRef.get();
		const data = snapShot.data();
		const model = this.create(docRef.id, data);

		return model;
	}

	static async clear() {
		const clearId = [];
		const uid = firebase.auth().currentUser.uid;
		const collection = await dbMessages.where('uid', '==', uid).orderBy('date').get();
		try {
			collection.forEach(doc => {
				clearId.unshift(doc.id);
			});
			return clearId;
		} catch (error) {
			console.error(error);
		}
	}

	static async fetchMessages() {
		const uid = firebase.auth().currentUser.uid;
		const collection = await dbMessages.where('uid', '==', uid).orderBy('date').get();
		if (collection.empty) {
			return [];
		}

		return collection.docs.map(doc => {
			return this.create(doc.id, doc.data());
		});
	}

	static create(id, data) {
		return new Message({
			id,
			times: data.times,
			bodys: data.bodys,
			date: data.date.toDate().toLocaleString(),
			tags: data.tags
		});
	}

	static async dbtime() {
		try {
			const uid = firebase.auth().currentUser.uid;
			const querySnapshot = await dbMessages.where('uid', '==', uid).get();
			let totaltime = 0;
			querySnapshot.forEach(postDoc => {
				totaltime += postDoc.data().times;
			});
			return totaltime;
		} catch (error) {
			console.error(error.message);
		}
	}
}

export default Message;
