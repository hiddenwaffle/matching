import React, { useState } from 'react'
import cardsUrl from '../assets/cards.png'
import { Card } from '../domain/Card'

type Props = {
  card: Card
  flipCardHandler: (card: Card) => boolean
  checkMatch: (key: number) => void
}

const CardTile: React.FC<Props> = ({ card, flipCardHandler, checkMatch }) => {
  const [animationClass, setAnimationClass] = useState('card-tile-hidden')
  const clickHandler = () => {
    if (!card.visible) {
      if (flipCardHandler(card)) {
        console.log('TODO: Something')
      }
      setAnimationClass('card-tile-flip-forward')
    }
  }
  const animationEndHandler = () => {
    setAnimationClass(`card-tile-${card.cardType}`)
  }
  return (
    <div>
      <img
        draggable="false"
        className={`card-tile ${animationClass}`}
        src={cardsUrl}
        onClick={clickHandler}
        onAnimationEnd={animationEndHandler}
      />
    </div>
  )
}

export default CardTile
