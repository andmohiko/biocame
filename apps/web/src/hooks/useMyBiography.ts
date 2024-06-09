import type { Biography } from '@biocame/common'
import { useEffect, useState } from 'react'

import { subscribeBiographyByIdOperation } from '~/infrastructure/operations/BiographyOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const useMyBiography = (): Biography | undefined => {
  const [biography, setBiography] = useState<Biography | undefined>(undefined)
  const { uid } = useFirebaseAuthContext()

  useEffect(() => {
    if (!uid) {
      return
    }
    const unsubscribe = subscribeBiographyByIdOperation(uid, setBiography)
    return () => unsubscribe()
  }, [uid])

  return biography
}
