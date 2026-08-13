'use client';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { CalendarRef } from './calendar-data';

export function generateDaysInMonth(daysInMonth: number) {
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({
      value: String(day),
      label: String(day)
    });
  }

  return daysArray;
}

export function goPrev(calendarRef: CalendarRef) {
  const calendarApi = calendarRef.current!.getApi();
  calendarApi.prev();
}

export function goNext(calendarRef: CalendarRef) {
  const calendarApi = calendarRef.current!.getApi();
  calendarApi.next();
}

export function goToday(calendarRef: CalendarRef) {
  const calendarApi = calendarRef.current!.getApi();
  calendarApi.today();
}

export function handleDayChange(
  calendarRef: CalendarRef,
  currentDate: Date,
  day: string
) {
  const calendarApi = calendarRef.current!.getApi();
  const newDate = currentDate.setDate(Number(day));
  calendarApi.gotoDate(newDate);
}

export function handleMonthChange(
  calendarRef: CalendarRef,
  currentDate: Date,
  month: string
) {
  const calendarApi = calendarRef.current!.getApi();
  const newDate = new Date(currentDate);
  newDate.setMonth(Number(month) - 1);
  calendarApi.gotoDate(newDate);
}

export function handleYearChange(
  calendarRef: CalendarRef,
  currentDate: Date,
  e: ChangeEvent<HTMLInputElement>
) {
  const calendarApi = calendarRef.current!.getApi();
  const newDate = currentDate.setFullYear(Number(e.target.value));
  calendarApi.gotoDate(newDate);
}

export function setView(
  calendarRef: CalendarRef,
  viewName: string,
  setCurrentView: Dispatch<SetStateAction<string>>
) {
  const calendarApi = calendarRef.current!.getApi();
  setCurrentView(viewName);
  calendarApi.changeView(viewName);
}

// Convert minutes since midnight to Date object
export function getDateFromMinutes(minutes: number): Date {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const date = new Date();
  date.setHours(hours, mins, 0, 0);
  return date;
}
