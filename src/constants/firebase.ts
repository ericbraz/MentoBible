import { User } from '@/models/interfaces'

export const USER_ROLE_ID = 'KM9Y4QxySFAsjuxgBgwQ'

export const DEFAULT_ROLE_ID = 'KM9Y4QxySFAsjuxgBgwQ'

export const DEFAULT_SYSTEM_ID = '14Df4995gAJcmG0GgZqA'

export const EMPTY_USER_OBJECT: User = {
   id: '',
   firstName: '',
   lastName: '',
   email: '',
   active: false,
}

export const DEFAULT_PROFILE_IMAGE = '/standard-avatar.png'

// Must be moved to config constants
export const DEFAULT_COURSE_THUMBNAIL =
   'https://firebasestorage.googleapis.com/v0/b/mentobible.appspot.com/o/thumbnails%2Fchristian-life-crisis-prayer-god-thumbnail.jpg?alt=media&token=e6cbaa55-c3d4-4c0c-8d1e-ada6193a8e5c'
