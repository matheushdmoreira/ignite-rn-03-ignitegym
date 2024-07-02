import { AxiosResponse } from 'axios';

import { api } from "@services/api";

import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

import { tagDaysNothingWorkout, tagExercisesDoneLastWeek } from '@notifications/notificationsTags';
import { endOfISOWeek, parseISO, startOfISOWeek, sub, isAfter, isBefore } from 'date-fns';

export async function exercisesDoneLastWeek() {
  const { data }: AxiosResponse<HistoryByDayDTO[]> = await api.get('/history')

  const currentDate = new Date()
  const startOfPastWeek = sub(startOfISOWeek(currentDate), { weeks: 1 })
  const endOfPastWeek = sub(endOfISOWeek(currentDate), { weeks: 1 })

  const allExercisesDates = data.map(
    (day) => day.data.map(
      (exerciseDay) => exerciseDay.created_at)
  ).flat()

  const filteredExercisesBeetweenDate = allExercisesDates
    .map((date) => parseISO(date))
    .filter(
      (dateOfExercise) => 
        isAfter(dateOfExercise, startOfPastWeek) && isBefore(dateOfExercise, endOfPastWeek)
    )

  tagExercisesDoneLastWeek(filteredExercisesBeetweenDate.length.toString())
}