import firebase from 'firebase';
import { dbTags } from '../plugins/firebase';

class Tag {
	constructor({ color, text }) {
		// this.tags = tags;
		this.color = color;
		this.text = text;
	}

	static async save() {
		const uid = firebase.auth().currentUser.uid;

		const postData = {
			uid,
			tags: {
				//   {
				//     color: 'purple',
				//     text: 'HTML'
				//   },
				//   {
				//     color: 'indigo',
				//     text: 'CSS'
				//   },
				//   {
				//     color: 'blue',
				//     text: 'JavaScript'
				//   },
				//   {
				//     color: 'green',
				//     text: 'Vue.js'
				//   },
				//   {
				//     color: 'red',
				//     text: 'React.js'
				//   },
				//   {
				//     color: 'orange',
				//     text: 'TypeScript'
				//   }
				color: ['purple', 'indigo', 'blue', 'green', 'red', 'orange', 'cyan', 'teal', 'lime', 'navy'],
				text: [
					'HTML',
					'CSS',
					'JavaScript',
					'Vue.js',
					'React.js',
					'TypeScript',
					'Ruby',
					'ruby on rails',
					'PHP',
					'Laravel'
				]
			}
		};
		// : {
		// 	color: ['purple', 'indigo', 'blue', 'green', 'red', 'orange'],
		// 	text: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React.js', 'TypeScript']
		// }

		const docRef = await dbTags.add(postData);
		const snapShot = await docRef.get();
		const data = snapShot.data();
		const model = this.create(data);

		return model;
	}

	static create(data) {
		return new Tag({
			color: data.tags.color,
			text: data.tags.text
		});
	}
}

export default Tag;
