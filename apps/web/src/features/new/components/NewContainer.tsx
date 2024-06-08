import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TitleText } from '~/components/Typography/TitleText'

export const NewContainer = (): React.ReactElement => {
  return (
    <SimpleLayout>
      <TitleText>びおかめ</TitleText>
      <FlexBox gap={16}>
        <BasicButton href="/signup">新規登録</BasicButton>
        <BasicButton href="/login" importance="secondary">
          ログイン
        </BasicButton>
      </FlexBox>
    </SimpleLayout>
  )
}
