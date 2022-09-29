import React, { useEffect, useState } from 'react'
import { ENV_REVEAL_MUSIC_DELAY } from '../constants'
import { Puzzle } from '../domain/Puzzle'
import { playClearSound, stopClearSound } from '../SoundSystem'

type Props = {
  puzzle: Puzzle
  visible: boolean
  onContinue: () => void
}

const EndScreen: React.FC<Props> = ({ puzzle, visible, onContinue }) => {
  const [animationClass, setAnimationClass] = useState('')
  useEffect(() => {
    if (visible) {
      setAnimationClass('end-frame-reveal')
      setTimeout(() => playClearSound(), ENV_REVEAL_MUSIC_DELAY)
    } else {
      setAnimationClass('')
    }
    console.log(visible)
  }, [visible])
  if (!visible) return null
  const handleOnClick = () => {
    stopClearSound()
    onContinue()
  }
  return (
    <div className={`end-screen ${animationClass}`}>
      <div className="end-screen-header">
        pattern
        <span
          style={{
            marginLeft: '6px',
            marginRight: '6px',
            color: puzzle.pattern.cardBackgroundColor
          }}
        >
          {puzzle.pattern.name}
        </span>
        complete
      </div>
      <div className="end-screen-detail">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>current</th>
              <th>best</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>moves</td>
              <td>{puzzle.moves}</td>
              <td>TBD</td>
            </tr>
            <tr>
              <td>time</td>
              <td>{puzzle.time}</td>
              <td>TBD</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={handleOnClick}
          style={{
            color: '#3fbfff',
            fontFamily: 'inherit',
            fontSize: '1em',
            marginTop: '11px'
          }}
        >
          continue
        </button>
      </div>
    </div>
  )
}

export default EndScreen
