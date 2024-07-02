import { OneSignal } from 'react-native-onesignal';

export function tagUserLoggedIn(logged: string) {
  OneSignal.User.addTag('user_logged_in', logged)
}

export function tagDaysNothingWorkout(days: string) {
  OneSignal.User.addTag('days_since_last_workout', days)
}

export function tagExercisesDoneLastWeek(exercises: string) {
  OneSignal.User.addTag('exercises_done_last_week', exercises)
}