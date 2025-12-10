"use client"
import React, { Suspense } from 'react'
import ClientRegisterList from './ClientRegisterList'

export default function RegisterListPage() {
  return (
      <>
          <Suspense fallback={<div>Loading...</div>}>
              <ClientRegisterList />
          </Suspense>
      </>
  )
}