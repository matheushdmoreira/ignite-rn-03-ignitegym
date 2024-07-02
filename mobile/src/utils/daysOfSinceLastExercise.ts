import { differenceInCalendarDays, parseISO } from 'date-fns'
import { AxiosResponse } from 'axios';

import { api } from "@services/api";

import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

import { tagDaysNothingWorkout } from '@notifications/notificationsTags';

export async function daysOfSinceLastExercise() {
  const { data }: AxiosResponse<HistoryByDayDTO[]> = await api.get('/history')

  const dateOfLastExercise = parseISO(data[0].data[0].created_at)
  const currentDate = new Date()

  tagDaysNothingWorkout(differenceInCalendarDays(currentDate,dateOfLastExercise).toString())
}