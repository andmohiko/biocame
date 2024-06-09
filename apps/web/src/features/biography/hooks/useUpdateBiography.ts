import type { BiographyId } from '@biocame/common'

import { updateBioGraphyOperation } from '~/infrastructure/operations/BiographyOperations'
import { serverTimestamp } from '~/lib/firebase'
import type { EditBiographyInputType } from '~/features/biography/types'

export const useUpdateBiography = (): {
  updateBiography: (
    biography: BiographyId,
    inputs: EditBiographyInputType,
  ) => Promise<void>
} => {
  const updateBiography = async (
    biographyId: BiographyId,
    inputs: EditBiographyInputType,
  ) => {
    await updateBioGraphyOperation(biographyId, {
      backgroundImagePath: inputs.backgroundImagePath || null,
      catchCopy: inputs.catchCopy,
      displayName: inputs.displayName,
      profileImagePath: inputs.profileImagePath || null,
      updatedAt: serverTimestamp,
      username: inputs.username,
    })
  }

  return {
    updateBiography,
  }
}
