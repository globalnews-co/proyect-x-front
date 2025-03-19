import React from 'react'
import { DataProvider } from './Context/DataContext'
import Calendar from './Components/Calendar'

export default function Agenda() {
  return (
    <DataProvider>
        <Calendar/>
    </DataProvider>
  )
}

