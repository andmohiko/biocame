import { z } from 'zod'

export const editBiographySchema = z.object({
  catchCopy: z
    .string()
    .trim()
    .min(1, { message: '必須項目です' })
    .max(50, { message: '20文字以内で入力してください' }),
  displayName: z
    .string()
    .trim()
    .min(1, { message: '必須項目です' })
    .max(50, { message: '20文字以内で入力してください' }),
  profileImagePath: z.string().url({ message: '画像を選択してください' }),
  username: z
    .string()
    .trim()
    .min(1, { message: '必須項目です' })
    .max(20, { message: '20文字以内で入力してください' }),
})

export type EditBiographyInputType = z.infer<typeof editBiographySchema>
