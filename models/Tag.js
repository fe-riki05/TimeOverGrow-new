import firebase from 'firebase';
import { dbTags } from '../plugins/firebase';

class Tag {
	constructor({ color, text }) {
		this.color = color;
		this.text = text;
	}

	static async save() {
		const uid = firebase.auth().currentUser.uid;

		const postData = {
			uid,
			color: ['purple', 'indigo', 'blue', 'green', 'red', 'orange', 'cyan', 'teal', 'lime', 'navy'],
			text: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React.js', 'TypeScript', 'Ruby', 'ruby on rails', 'PHP', 'Laravel']
		};

		const docRef = await dbTags.add(postData);
		const snapShot = await docRef.get();
		const data = snapShot.data();
		const model = this.create(data);

		return model;
	}

	static create(data) {
		return new Tag({
			color: data.color,
			text: data.text
		});
	}
}

export default Tag;
