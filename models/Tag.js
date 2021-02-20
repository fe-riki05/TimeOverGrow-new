import firebase from 'firebase';
import { dbTags } from '../plugins/firebase';

class Tag {
	constructor({ colors, texts }) {
		this.colors = colors;
		this.texts = texts;
	}

	// static async save() {
	// 	const uid = firebase.auth().currentUser.uid;

	// 	const postData = {
	// 		uid,
	// 		colors: ['purple', 'indigo', 'blue', 'green', 'red', 'orange', 'cyan', 'teal', 'lime', 'navy'],
	// 		texts: [
	// 			'HTML',
	// 			'CSS',
	// 			'JavaScript',
	// 			'Vue.js',
	// 			'React.js',
	// 			'TypeScript',
	// 			'Ruby',
	// 			'ruby on rails',
	// 			'PHP',
	// 			'Laravel'
	// 		]
	// 	};

	// 	const docRef = await dbTags.add(postData);
	// 	const snapShot = await docRef.get();
	// 	const data = snapShot.data();
	// 	const model = this.create(data);

	// 	return model;
	// }

	static create(data) {
		return new Tag({
			colors: data.colors,
			texts: data.texts
		});
	}

	static async get() {
		const uid = firebase.auth().currentUser.uid;
		const userTags = await dbTags.where('uid', '==', uid).get();
		// console.log('userTags' + userTags);
		// 同じuidのドキュメントを取得
		return userTags.docs.map(element => {
			// console.log(element.data());
			// uidと一致したドキュメントのデータを返す
			return element.data();
		});
	}
}

export default Tag;
