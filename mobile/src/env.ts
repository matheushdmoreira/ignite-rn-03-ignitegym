import { z } from 'zod'

const objectEnv = {
  EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS: process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS,
  EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID: process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID
}

const envSchema = z.object({
  EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS: z.string(),
  EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID: z.string(),
})

export const env = envSchema.parse(objectEnv)