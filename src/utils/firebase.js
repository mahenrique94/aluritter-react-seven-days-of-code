import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebase.config.json'

const connect = () => initializeApp(firebaseConfig);

export { connect }
