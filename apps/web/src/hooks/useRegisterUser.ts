import type { User } from 'firebase/auth'

import { createBiographyOperation } from '~/infrastructure/operations/BiographyOperations'
import { createUserOperation } from '~/infrastructure/operations/UserOperations'
import { serverTimestamp } from '~/lib/firebase'

export const useRegisterUser = (): {
  registerUser: (userData: User) => Promise<void>
} => {
  const registerUser = async (userData: User) => {
    await createUserOperation(userData.uid, {
      backgroundImagePath: null,
      createdAt: serverTimestamp,
      displayName: '',
      email: userData.email!,
      profileImagePath: null,
      updatedAt: serverTimestamp,
      username: getInitialUsername(userData),
    })
    await createBiographyOperation(userData.uid, {
      backgroundImagePath: null,
      catchCopy: '',
      createdAt: serverTimestamp,
      displayName: '',
      profileImagePath: null,
      updatedAt: serverTimestamp,
      username: '',
    })
  }

  return {
    registerUser,
  }
}

export const getInitialUsername = (userData: User) => {
  if (userData.displayName) {
    return userData.displayName
  }
  if (userData.email) {
    return userData.email.split('@')[0]
  }
  return userData.uid
}
