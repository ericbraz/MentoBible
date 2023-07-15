import { initializeApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAnalytics, Analytics } from 'firebase/analytics'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

let auth: Auth, db: Firestore, analytics: Analytics, storage: FirebaseStorage
if (typeof window !== 'undefined') {
   auth = getAuth(app)
   db = getFirestore(app)
   analytics = getAnalytics(app)
   storage = getStorage(app)
}

export { auth, db, analytics, storage }
