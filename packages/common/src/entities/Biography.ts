import type { FieldValue } from 'firebase/firestore'

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
  updatedAt: FieldValue
}
