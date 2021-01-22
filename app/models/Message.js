import firebase from 'firebase'
import { dbMessages } from '../plugins/firebase'

class Message {
  constructor({ time, body, date }) {
    this.time = time
    this.body = body
    this.date = date
  }

  static async save({ time, body }) {
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
      uid
    }

    const docRef = await dbMessages.add(postData)
    const snapShot = await docRef.get()
    const data = snapShot.data()
    const model = this.create(data)

    return model
  }

  static async fetchMessages() {
    const uid = firebase.auth().currentUser.uid
    const collection = await dbMessages.where('uid', '==', uid).orderBy('date').get()
    if (collection.empty) {
      return []
    }

    return collection.docs.map(doc => {
      return this.create(doc.data())
    })
  }

  static create(data) {
    return new Message({
      time: data.time,
      body: data.body,
      date: data.date.toDate().toLocaleString()
    })
  }

  static async dbtime() {
    const uid = firebase.auth().currentUser.uid
    try {
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
