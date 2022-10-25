import { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
import useOrders from '../../hooks/useOrders'

const SongAlarm = () => {
  const [play, setPlay] = useState(false)

  const { startAlarm } = useOrders()

  const history = useHistory()
  const location = useLocation()
  const buttonRef = useRef(null)

  useEffect(() => {
    if (startAlarm) {
      buttonRef.current.click()
    } else {
      setPlay(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAlarm])

  const handleClick = () => {
    setPlay(true)
    if (location.pathname === '/') {
      history.push('/neworders')
    } else if (location.pathname === '/neworders') {
      history.push('/')
    }
  }

  return (
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
  )
}

export default SongAlarm
