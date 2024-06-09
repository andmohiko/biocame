import type { Biography, CreateBiographyDto, UserId } from '@biocame/common'
import { biographyCollection, userCollection } from '@biocame/common'
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
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
      collection(db, userCollection, userId, biographyCollection),
      orderBy('createdAt', 'desc'),
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
  uid: UserId,
  dto: CreateBiographyDto,
): Promise<void> => {
  await addDoc(collection(db, userCollection, uid, biographyCollection), dto)
}
