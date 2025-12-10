"use client"
import React, { Suspense } from 'react'
import RegisterView from '../component/RegisterView'

export default function ClientRegisterListPage() {
  return (
      <>
          <Suspense fallback={<div>Loading...</div>}>
              <RegisterView />
          </Suspense>
      </>
  )
}