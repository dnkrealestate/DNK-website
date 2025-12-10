"use client"
import { Suspense } from 'react'
import RegisterList from './register/[slug]/RegisterList'
import RoadshowView from './component/RoadshowView'

export default function RoadshowPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RoadshowView />
      </Suspense>
      </>
  )
}