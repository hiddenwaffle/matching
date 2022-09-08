import { Card } from '../domain/Card'
import CardTile from './CardTile'

type Props = {
  cards: Array<Card>
  flipCardHandler: (card: Card) => void
}

const Grid: React.FC<Props> = ({ cards, flipCardHandler }) => {
  return (
    <div className="grid">
      <table>
        <tbody>
          <tr>
            {cards.slice(0, 6).map(card => (
              <td key={card.key}>
                <CardTile card={card}
                          flipCardHandler={flipCardHandler} />
              </td>)
            )}
          </tr>
          <tr>
            {cards.slice(6, 12).map(card => (
              <td key={card.key}>
                <CardTile card={card}
                          flipCardHandler={flipCardHandler} />
              </td>)
            )}
          </tr>
          <tr>
            {cards.slice(12, 18).map(card => (
              <td key={card.key}>
                <CardTile card={card}
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
