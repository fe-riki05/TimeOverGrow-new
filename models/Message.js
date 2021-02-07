import firebase from 'firebase'
import { dbMessages } from '../plugins/firebase'

class Message {
	constructor({ id, time, body, date, tag }) {
		this.id = id
		this.time = time
		this.body = body
		this.date = date
		this.tag = tag
	}

	static async save({ time, body, tag }) {
		if (!time) {
			throw new Error('入力欄が空欄です。')
		}

		if (!body || !body.trim()) {
			throw new Error('入力欄が空欄です。')
		}

		const uid = firebase.auth().currentUser.uid

		const postData = {
			time,
			body,
			date: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			tag
		}

		const docRef = await dbMessages.add(postData)
		const snapShot = await docRef.get()
		const data = snapShot.data()
		const model = this.create(docRef.id, data)

		return model
	}

	static async clear() {
		const clearId = []
		const uid = firebase.auth().currentUser.uid
		const collection = await dbMessages.where('uid', '==', uid).orderBy('date').get()
    try {
			await collection.forEach(doc => {
				clearId.push(doc.id)
			})
				return clearId
		} catch (error) {
      console.error(error);
		}
	}

	static async fetchMessages() {
		const uid = firebase.auth().currentUser.uid
		const collection = await dbMessages.where('uid', '==', uid).orderBy('date').get()
		if (collection.empty) {
			return []
		}

		return collection.docs.map(doc => {
			return this.create(doc.id, doc.data())
		})
	}

	static create(id, data) {
		return new Message({
			id,
			time: data.time,
			body: data.body,
			date: data.date.toDate().toLocaleString(),
			tag: data.tag
		})
	}

	static async dbtime() {
		try {
			const uid = firebase.auth().currentUser.uid
			const querySnapshot = await dbMessages.where('uid', '==', uid).get()
			let totaltime = 0
			querySnapshot.forEach(postDoc => {
				totaltime += postDoc.data().time
			})
			return totaltime
		} catch (error) {
			console.error(error.message)
		}
	}
}

export default Message
