import type {
  Biography,
  BiographyId,
  CreateBiographyDto,
  UpdateBiographyDto,
  UserId,
} from '@biocame/common'
import { biographyCollection } from '@biocame/common'
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt', 'birthday']

export const subscribeBiographyByIdOperation = (
  userId: UserId,
  setter: (biography: Biography | undefined) => void,
) => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, biographyCollection),
      where('userId', '==', userId),
      limit(1),
    ),
    (snapshot) => {
      if (snapshot.empty) {
        return setter(undefined)
      }

      const docSnapshot = snapshot.docs[0]
      const data = docSnapshot.data()
      const biography = {
        biographyId: docSnapshot.id,
        ...convertDate(data, dateColumns),
      } as Biography
      setter(biography)
    },
  )
  return unsubscribe
}

export const createBiographyOperation = async (
  dto: CreateBiographyDto,
): Promise<void> => {
  await addDoc(collection(db, biographyCollection), dto)
}

export const updateBioGraphyOperation = async (
  biographyId: BiographyId,
  dto: UpdateBiographyDto,
): Promise<void> => {
  updateDoc(doc(db, biographyCollection, biographyId), dto)
}
