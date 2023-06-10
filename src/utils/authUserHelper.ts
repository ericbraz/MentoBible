import { User } from 'firebase/auth'

export interface FormattedUserState {
   userId: string | null
   email: string | null
}

export function userStateFormatter(user: User | null): FormattedUserState {
   return user
      ? {
           userId: user.uid,
           email: user.email as string,
        }
      : {
           userId: null,
           email: null,
        }
}
