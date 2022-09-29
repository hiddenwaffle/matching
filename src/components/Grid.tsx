import React, { useEffect, useState } from 'react'
import { OUTCOME_FLIP_BACK_DELAY, OUTCOME_SOUND_DELAY } from '../constants'
import { Card } from '../domain/Card'
import { createCards, patterns } from '../domain/cards-factory'
import { playMatchCorrectSound, playMatchIncorrectSound, playSelectSound } from '../SoundSystem'
import CardTile from './CardTile'

// TODO: DRY
function markCardsAsMatched(cards: Card[], key1: number, key2: number) {
  return cards.map(card => (card.key === key1 || card.key === key2) ? { ...card, matched: true } : card)
}

// TODO: DRY
function hideCards(cards: Card[], key1: number, key2: number) {
  return cards.map(card => (card.key === key1 || card.key === key2) ? { ...card, visible: false }: card)
}

// TODO: DRY
/**
 * Call this to prevent clicks while a card is flipping back.
 * Should be called:
 *    1) Before setTimeout()
 *    2) During the timeout's callback
 */
function setCardFlipping(flippingBack: boolean, cards: Card[], key1: number, key2: number) {
  return cards.map(card => (card.key === key1 || card.key === key2) ? { ...card, flippingBack } : card)
}

type Props = {
  iwin: number
}

const Grid: React.FC<Props> = ({ iwin }) => {
  const [cards, setCards] = useState(createCards(patterns[0]))
  const [otherCardKey, setOtherCardKey] = useState<number | null>(null)
  const [pairToHide, setPairToHide] = useState<[number | null, number | null]>([null, null])
  // Have to do this here so that the setTimeout() callback can get the latest cards array
  useEffect(() => {
    if (pairToHide[0] === null || pairToHide[1] === null) {
      return
    }
    let cardsNext = cards.slice()
    cardsNext = hideCards(cards, pairToHide[0], pairToHide[1])
    cardsNext = setCardFlipping(false, cardsNext, pairToHide[0], pairToHide[1])
    setCards(cardsNext)
  }, [pairToHide])
  useEffect(() => {
    if (iwin < 1) return // Prevent iwin on app start
    const cardsNext = cards.map(card => ({ ...card, visible: true, matched: true }))
    setCards(cardsNext)
  }, [iwin])
  const flipCardHandler = (key: number) => {
    let cardsNext = cards.slice()
    cardsNext = cardsNext.map(card => card.key === key ? { ...card, visible: true } : card)
    if (otherCardKey === null) {
      setOtherCardKey(key)
    } else {
      const cardA = cards[otherCardKey]
      const cardB = cards[key]
      if (cardA.cardType === cardB.cardType) {
        cardsNext = markCardsAsMatched(cardsNext, cardA.key, cardB.key)
        setTimeout(() => playMatchCorrectSound(cardA.cardType), OUTCOME_SOUND_DELAY)
      } else {
        cardsNext = setCardFlipping(true, cardsNext, cardA.key, cardB.key)
        setTimeout(() => playMatchIncorrectSound(), OUTCOME_SOUND_DELAY)
        setTimeout(() => setPairToHide([cardA.key, cardB.key]), OUTCOME_FLIP_BACK_DELAY)
      }
      setOtherCardKey(null)
    }
    setCards(cardsNext)
    playSelectSound()
  }
  return (
    <div className="grid">
      <table>
        <tbody>
          <tr>
            {cards.slice(0, 6).map(card => (
              <td key={card.key}>
                <CardTile
                  card={card}
                  flipCardHandler={flipCardHandler} />
              </td>)
            )}
          </tr>
          <tr>
            {cards.slice(6, 12).map(card => (
              <td key={card.key}>
                <CardTile
                  card={card}
                  flipCardHandler={flipCardHandler} />
              </td>)
            )}
          </tr>
          <tr>
            {cards.slice(12, 18).map(card => (
              <td key={card.key}>
                <CardTile
                  card={card}
                  flipCardHandler={flipCardHandler} />
              </td>)
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Grid
