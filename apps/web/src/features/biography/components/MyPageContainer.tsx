import { EditBiographyForm } from '~/features/biography/components/EditBiographyForm'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { FlexBox } from '~/components/Base/FlexBox'
import { useMyBiography } from '~/hooks/useMyBiography'

export const MyPageContainer = (): React.ReactNode => {
  const biography = useMyBiography()

  return (
    <SimpleLayout>
      <FlexBox align="stretch" px={16} py={16}>
        <EditBiographyForm biography={biography} />
      </FlexBox>
    </SimpleLayout>
  )
}
