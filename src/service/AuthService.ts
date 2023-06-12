import { auth } from '@/config/firebase'
import UserModel from '@/models/UserModel'
import { FormattedUserState, userStateFormatter } from '@/utils/authUserHelper'
import {
   User as FirebaseUser,
   createUserWithEmailAndPassword,
   sendEmailVerification,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signOut,
} from 'firebase/auth'
//import * as admin from 'firebase-admin'

interface SignUpData {
   firstName: string
   lastName: string
   email: string
   password: string
   confirmPassword: string
}

class AuthService {
   public static async signIn(email: string, password: string) {
      try {
         return await signInWithEmailAndPassword(auth, email, password).then((credentials) => {
            const user = credentials.user
            if (!user.emailVerified) {
               throw new Error('User does not exist')
            }
            return user as FirebaseUser
         })
      } catch (error) {
         alert(error)
      }
   }

   public static async signUpValidation({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
   }: SignUpData) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

      try {
         if (!emailRegex.test(email)) throw new Error('Invalid email')
         AuthService.checkPassword({ password, confirmPassword })

         const credentials = await createUserWithEmailAndPassword(auth, email[0], password[0])
         const firebaseUser = credentials.user
         const user = new UserModel({
            id: firebaseUser.uid,
            firstName: firstName[0],
            lastName: lastName[0],
            email: firebaseUser.email as string,
         })
         await sendEmailVerification(firebaseUser)
         await user.save()

         await signOut(auth)

         return true
      } catch (error) {
         alert(error)
      }
   }

   public static async signOut() {
      try {
         await signOut(auth)
      } catch (error) {
         alert(error)
      }
   }

   public static async requestResetPassword(email: string) {
      try {
         await sendPasswordResetEmail(auth, email)
         return true
      } catch (error) {
         alert(error)
      }
   }

   public static authStateListener(func: (newUserState: FormattedUserState) => void) {
      return auth.onAuthStateChanged(
         (currentUser) => {
            func(userStateFormatter(currentUser))
         },
         (error) => {
            console.log(error)
            alert(error)
         }
      )
   }

   public static checkPassword({
      password,
      confirmPassword,
   }: {
      password: string
      confirmPassword: string
   }) {
      const passRegex =
         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$/

      try {
         if (!passRegex.test(password))
            throw new Error(
               'Password must contain at least 8 characters and:\n\u00A0\u00A01 upper case letter A-Z\n\u00A0\u00A01 lower case letter a-z\n\u00A0\u00A01 number\n\u00A0\u00A01 special character: !@#$%^&*()_+-=[ ]{};\':"\\|,.<>/?'
            )
         if (password[0] !== confirmPassword[0]) throw new Error('Passwords must match')

         return true
      } catch (error) {
         alert('Erro em AuthService')
         alert(error)
      }
   }
}

export default AuthService
