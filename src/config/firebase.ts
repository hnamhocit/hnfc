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
	signInWithRedirect,
	signOut,
	updateProfile,
} from 'firebase/auth'
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	Timestamp,
	updateDoc,
	where,
	writeBatch,
	type QueryConstraint,
	type QueryDocumentSnapshot,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD9xtFC0aLePQo6NUFqX0ju2Cy01Pil2iM',
	authDomain: 'hnfc-16985.firebaseapp.com',
	projectId: 'hnfc-16985',
	storageBucket: 'hnfc-16985.firebasestorage.app',
	messagingSenderId: '540391501176',
	appId: '1:540391501176:web:4a84f2f3ce92c118f2ac8d',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()

export {
	auth,
	collection,
	createUserWithEmailAndPassword,
	db,
	deleteDoc,
	doc,
	facebookProvider,
	getDoc,
	getDocs,
	githubProvider,
	googleProvider,
	limit,
	onAuthStateChanged,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	startAfter,
	Timestamp,
	updateDoc,
	updateProfile,
	where,
	writeBatch,
	type DocumentData,
	type QueryConstraint,
	type QueryDocumentSnapshot,
}
