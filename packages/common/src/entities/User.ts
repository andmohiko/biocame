import type { FieldValue } from 'firebase/firestore'

import type { Uid } from './Auth'
import type { Biography } from './Biography'

export type UserId = Uid

export type User = {
  userId: UserId
  backgroundImagePath: Biography['backgroundImagePath'] | null
  createdAt: Date
  displayName: string
  email: string
  profileImagePath: Biography['profileImagePath'] | null
  updatedAt: Date
  username: string
}

export type UserWithBiography = Biography & {
  userId: User['userId']
  email: User['email']
}

export type CreateUserDto = Omit<User, 'userId' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}
