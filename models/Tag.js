import firebase from 'firebase';
import { dbTags } from '../plugins/firebase';

class Tag {
	constructor({ colors, texts }) {
		this.colors = colors;
		this.texts = texts;
	}

	static create(data) {
		return new Tag({
			colors: data.colors,
			texts: data.texts
		});
	}

	static async get() {
		const uid = firebase.auth().currentUser.uid;
		const userTags = await dbTags.where('uid', '==', uid).get();
		return userTags.docs.map(element => {
			return element.data();
		});
	}
}

export default Tag;
