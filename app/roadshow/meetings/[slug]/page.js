'use client'
import { useEffect, useState } from 'react'
import { userRoadshowServices } from '@/services/roadshowService'
import MonthlyMeetings from '../components/MonthlyMeetings'


export default function Page() {
  const { getMeetings } = userRoadshowServices()
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    getMeetings().then(res => {
      setMeetings(res?.data || [])
    })
  }, [])

  return <MonthlyMeetings meetings={meetings} />
}
