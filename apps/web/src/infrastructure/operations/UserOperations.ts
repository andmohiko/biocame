import type { CreateUserDto } from '@biocame/common'
import { userCollection } from '@biocame/common'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'

export const existsUserOperation = async (uid: string): Promise<boolean> => {
  const snapshot = await getDoc(doc(db, userCollection, uid))
  return snapshot.exists()
}

export const createUserOperation = async (uid: string, dto: CreateUserDto) => {
  await setDoc(doc(db, userCollection, uid), dto)
}
