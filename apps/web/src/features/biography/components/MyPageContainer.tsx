import type { UserWithBiography } from '@biocame/common'

import { EditBiographyForm } from '~/features/biography/components/EditBiographyForm'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { FlexBox } from '~/components/Base/FlexBox'

export const MyPageContainer = (): React.ReactElement => {
  const userWithBiography: UserWithBiography = {
    biographyId: 'biographyId',
    backgroundImagePath:
      'https://pbs.twimg.com/profile_banners/1026692981112201216/1697023037/1500x500',
    catchCopy: 'エンジニア',
    createdAt: new Date(),
    displayName: 'もひこ',
    email: 'example@test.com',
    profileImagePath:
      'https://pbs.twimg.com/profile_images/1346561069779623936/3tYi4dz5_400x400.jpg',
    updatedAt: new Date(),
    userId: 'userId',
    username: 'testUser',
  }

  return (
    <SimpleLayout>
      <FlexBox align="stretch" px={16} py={16}>
        <EditBiographyForm defaultValues={userWithBiography} />
      </FlexBox>
    </SimpleLayout>
  )
}
