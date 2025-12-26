import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	getAuth,
	GithubAuthProvider,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth'
import {
	doc,
	getDoc,
	getDocs,
	getFirestore,
	onSnapshot,
	query,
	setDoc,
	where,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCCd5iszK6Bmfa5TLTSozW7vVL_RcArPaM',
	authDomain: 'hnfc-5f6af.firebaseapp.com',
	projectId: 'hnfc-5f6af',
	storageBucket: 'hnfc-5f6af.firebasestorage.app',
	messagingSenderId: '156929794806',
	appId: '1:156929794806:web:252442fc9af1b94af502d7',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()

export {
	auth,
	createUserWithEmailAndPassword,
	db,
	doc,
	facebookProvider,
	getDoc,
	getDocs,
	githubProvider,
	googleProvider,
	onAuthStateChanged,
	onSnapshot,
	query,
	setDoc,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	where,
}
