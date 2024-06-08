import type { UserWithBiography } from '@biocame/common'

import { EditBiographyForm } from '~/features/biography/components/EditBiographyForm'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'

export const MyPageContainer = (): React.ReactElement => {
  const userWithBiography: UserWithBiography = {
    biographyId: 'biographyId',
    backgroundImagePath:
      'https://pbs.twimg.com/profile_banners/1026692981112201216/1697023037/1500x500',
    catchCopy: 'エンジニア',
    createdAt: new Date(),
    displayName: 'もひこ',
    email: 'andmohiko@gmail.com',
    profileImagePath:
      'https://pbs.twimg.com/profile_images/1346561069779623936/3tYi4dz5_400x400.jpg',
    updatedAt: new Date(),
    userId: 'userId',
    username: 'andmohiko',
  }

  return (
    <SimpleLayout>
      <EditBiographyForm defaultValues={userWithBiography} />
    </SimpleLayout>
  )
}
