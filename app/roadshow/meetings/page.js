'use client'
import { useEffect, useState } from 'react'
import { userRoadshowServices } from '@/services/roadshowService'
import MeetingsMonthList from './components/MeetingsMonthList'

export default function Page() {
  const { getMeetings } = userRoadshowServices()
  const [meetings, setMeetings] = useState([])

useEffect(() => {
  getMeetings()
    .then(res => {
      setMeetings(res?.data || []);
    })
    .catch(() => {
      setMeetings([]);
    });
}, []);

  return <MeetingsMonthList meetings={meetings} />
}
