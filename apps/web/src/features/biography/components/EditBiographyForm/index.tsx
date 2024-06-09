import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type { Biography } from '@biocame/common'
import { TextInput } from '@mantine/core'

import styles from './style.module.css'

import type { EditBiographyInputType } from '~/features/biography/types'
import { editBiographySchema } from '~/features/biography/types'
import { CircleImageInputWithCropper } from '~/components/Inputs/CircleImageInputWithCropper'
import { SquareImageInputWithCropper } from '~/components/Inputs/SquareImageInputWithCropper'
import { useUpdateBiography } from '~/features/biography/hooks/useUpdateBiography'

type Props = {
  biography: Biography
}

export const EditBiographyForm = ({ biography }: Props): React.ReactNode => {
  const { updateBiography } = useUpdateBiography()
  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<EditBiographyInputType>({
    resolver: zodResolver(editBiographySchema),
    mode: 'all',
    defaultValues: {
      backgroundImagePath: biography.backgroundImagePath || undefined,
      catchCopy: biography.catchCopy,
      displayName: biography.displayName,
      profileImagePath: biography.profileImagePath || undefined,
      username: biography.username,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSave = async (onChange: (...event: Array<any>) => void) => {
    onChange()
    const values = getValues()
    // eslint-disable-next-line no-console
    console.log('values', values)
    await updateBiography(biography.biographyId, values)
  }

  return (
    <div className={styles.form}>
      <div className={styles.background}>
        {/* <img
          src={biography.backgroundImagePath}
          alt=""
          className={styles.backgroundImage}
        /> */}
        <div className={styles.overlay} />
      </div>
      <div className={styles.inputs}>
        <div className={styles.images}>
          <div />
          <Controller
            name="profileImagePath"
            control={control}
            render={({ field }) => (
              <CircleImageInputWithCropper
                value={field.value}
                onChange={(e) => onSave(() => field.onChange(e))}
                error={errors.profileImagePath?.message}
              />
            )}
          />

          <Controller
            name="backgroundImagePath"
            control={control}
            render={({ field }) => (
              <SquareImageInputWithCropper
                value={field.value}
                onChange={(e) => onSave(() => field.onChange(e))}
                error={errors.backgroundImagePath?.message}
              />
            )}
          />
        </div>

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="ユーザーID"
              value={field.value}
              onChange={(e) => onSave(() => field.onChange(e))}
              error={errors.username?.message}
              w={300}
            />
          )}
        />

        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="ユーザー名"
              value={field.value}
              onChange={(e) => onSave(() => field.onChange(e))}
              error={errors.displayName?.message}
              w={300}
            />
          )}
        />

        <Controller
          name="catchCopy"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="このアカウントを一言で表すと"
              value={field.value}
              onChange={(e) => onSave(() => field.onChange(e))}
              error={errors.catchCopy?.message}
              w="100%"
            />
          )}
        />
      </div>
    </div>
  )
}
