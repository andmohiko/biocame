import type { MantineColor, MantineSize } from '@mantine/core'
import { Text } from '@mantine/core'

type Props = {
  children: React.ReactNode
  size?: MantineSize
  color?: MantineColor
  fontWeight?: number
}

export const BaseText = ({
  children,
  size = 'sm',
  color = 'black',
  fontWeight = 400,
}: Props): React.ReactNode => {
  return (
    <Text size={size} fw={fontWeight} c={color}>
      {children}
    </Text>
  )
}
