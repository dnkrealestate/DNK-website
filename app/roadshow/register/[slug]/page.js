"use client"
import { Suspense } from 'react'
import RegisterList from './RegisterList'

export default function AttendanceListPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterList />
      </Suspense>
    </>
  )
}