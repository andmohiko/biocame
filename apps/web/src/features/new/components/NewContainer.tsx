import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const NewContainer = (): React.ReactElement => {
  const { loginWithGoogle } = useFirebaseAuthContext()
  return (
    <SimpleLayout>
      <TitleText>びおかめ</TitleText>
      <FlexBox gap={16}>
        <BasicButton onClick={loginWithGoogle}>新規登録</BasicButton>
        <BasicButton onClick={loginWithGoogle} importance="secondary">
          ログイン
        </BasicButton>
      </FlexBox>
    </SimpleLayout>
  )
}
