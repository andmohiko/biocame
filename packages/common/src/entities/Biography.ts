import type { FieldValue } from 'firebase/firestore'

export type BiographyId = string

export type Biography = {
  biographyId: BiographyId
  backgroundImagePath: string
  catchCopy: string
  createdAt: Date
  displayName: string
  profileImagePath: string
  updatedAt: Date
  username: string
}

export type CreateBiographyDto = Omit<
  Biography,
  'biographyId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}
