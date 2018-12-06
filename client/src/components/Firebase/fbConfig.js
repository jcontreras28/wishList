import firebase from 'firebase/app'
import 'firebase/auth'
import keys from './keys.json'

var config = {
    apiKey: keys.FIREBASE.apiKey,
    authDomain: keys.FIREBASE.authDomain,
    databaseURL: keys.FIREBASE.databaseURL,
    projectId: keys.FIREBASE.projectId,
    storageBucket: keys.FIREBASE.storageBucket,
    messagingSenderId: keys.FIREBASE.messagingSenderId
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);

        this.auth = firebase.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase
