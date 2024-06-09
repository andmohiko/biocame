import type { FieldValue } from 'firebase/firestore'

import type { UserId } from './User'

export const biographyCollection = 'biographies'

export type BiographyId = string

export type Biography = {
  biographyId: BiographyId
  backgroundImagePath: string | null
  catchCopy: string
  createdAt: Date
  displayName: string
  profileImagePath: string | null
  updatedAt: Date
  userId: UserId
  username: string
}

export type CreateBiographyDto = Omit<
  Biography,
  'biographyId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateBiographyDto = {
  backgroundImagePath?: Biography['backgroundImagePath']
  catchCopy?: Biography['catchCopy']
  displayName?: Biography['displayName']
  profileImagePath?: Biography['profileImagePath']
  updatedAt: FieldValue
  username?: Biography['username']
}
