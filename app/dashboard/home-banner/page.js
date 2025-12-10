"use client"
import { Suspense } from 'react'
import AddHomeBanner from './components/AddHomeBanner'

export default function HomeBannerpage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
          <AddHomeBanner />
      </Suspense>
    </>
  )
}