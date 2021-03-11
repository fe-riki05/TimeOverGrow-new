import firebase from 'firebase'
import { dbTags } from '../plugins/firebase'

class Tag {
	constructor({ text, time }) {
		// this.color = color;
		this.text = text
		this.time = time
	}

	static create(data) {
		return new Tag({
			// color: data.color,
			text: data.text,
			time: data.time,
		})
	}

	static async get() {
		const uid = firebase.auth().currentUser.uid
		const userTags = await dbTags.where('uid', '==', uid).get()
		return userTags.docs.map((element) => {
			return element.data()
		})
	}
}

export default Tag
