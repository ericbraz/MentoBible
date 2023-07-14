import { System, User } from '@/models/interfaces'
import { User as FbUser } from 'firebase/auth'

export interface FormattedUserState {
   userId: string | null
   email: string | null
}

export function userStateFormatter(user: FbUser | null): FormattedUserState {
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

export function userStateData(user: User | null): User {
   return user
      ? user
      : {
           id: '',
           firstName: '',
           lastName: '',
           email: '',
           active: false,
           userRoleIds: undefined,
           photoURL: undefined,
           signUpDate: undefined,
           courseIds: undefined,
           lessonCompletionIds: undefined,
        }
}

export function systemStateData(systems?: System[] | null | undefined) {
   if (!systems || systems?.length === 0)
      return [
         {
            id: '',
            systemName: '',
            systemPath: '',
         },
      ]

   return systems
}

export function standardErrorMessage(error: unknown) {
   return {
      title: 'Opa!',
      description:
         `Tire o print desta tela com essa mensagem de erro e envie para o seu desenvolvedor:<br />${error}` as string,
      type: 'error' as 'error',
   }
}
