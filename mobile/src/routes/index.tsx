import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import { useEffect, useState } from 'react';
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from 'react-native-onesignal'

import { useAuth } from '@hooks/useAuth';

import { Loading } from '@components/Loading';
import { Notification } from '@components/Notification';

import { tagUserLoggedIn } from '@notifications/notificationsTags';

import { daysOfSinceLastExercise } from '@utils/daysOfSinceLastExercise';
import { exercisesDoneLastWeek } from '@utils/exercisesDoneLastWeek';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const linking = {
  prefixes: ['com.imarkt.ignitegym://', 'exp+ignitegym://', 'ignitegym://'],
  config: {
    screens: {
      exercise: {
        path: 'exercise/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId,
        },
      },
      notFound: '*',
    },
  },
}

export function Routes() {
  const [ notification, setNotification ] = useState<OSNotification>()

  const { isLoadingUserStorageData, user } = useAuth();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    tagUserLoggedIn(user.id ? 'true' : 'false')

    if(user.id){
      daysOfSinceLastExercise()
      exercisesDoneLastWeek()
    }
  }, [user])

  useEffect(() => {
    const handleNotification = ((notificationReceivedEvent: NotificationWillDisplayEvent) => {
      notificationReceivedEvent.preventDefault()
      
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay", 
      handleNotification
    )

    return () => OneSignal.Notifications.removeEventListener(
      "foregroundWillDisplay", 
      handleNotification
    )
  }, [])

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}

        {notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </NavigationContainer>
    </Box>
  );
}
