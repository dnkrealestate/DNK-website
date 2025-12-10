'use client'
import { Suspense } from 'react'
import TeamViewList from './components/TeamViewList'

export default function TeamViewPage() {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <TeamViewList />
        </Suspense>
      </>
  )
}