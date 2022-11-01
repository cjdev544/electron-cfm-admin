import { useEffect, useRef, useState } from 'react'
import { useResolvedPath, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'

import useOrders from '../../hooks/useOrders'

export default function SongAlarm() {
  const navigate = useNavigate()
  const [windowObj, setWindowObj] = useState(false)
  const [play, setPlay] = useState(false)

  const { startAlarm } = useOrders()

  const { pathname } = useResolvedPath()
  const buttonRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') setWindowObj(true)
  }, [])

  useEffect(() => {
    if (startAlarm && windowObj) {
      buttonRef.current.click()
    } else {
      setPlay(false)
    }
  }, [startAlarm, windowObj])

  const handleClick = () => {
    setPlay(true)
    if (!pathname?.includes('order')) {
      navigate('/neworders')
    }
  }

  return (
    <>
      {windowObj && (
        <>
          <div>
            <div ref={buttonRef} onClick={handleClick}></div>
          </div>
          <ReactPlayer
            className='player'
            url='https://firebasestorage.googleapis.com/v0/b/centralfood-f43c1.appspot.com/o/alert%2Falarma.mp3?alt=media&token=69d21d2a-4706-4f69-b6a8-f9ba573c4ad3'
            playing={play}
            loop={true}
          />
        </>
      )}
    </>
  )
}
