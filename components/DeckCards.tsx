import React from "react"
import { decksByAuthorId } from "@/lib/queries/decksByAuthorId"
import DeckCover from "./DeckCover"
import Link from "next/link"
import PlayCard from "./PlayCard"
import CardCover from "./CardCover"
export type CardType = {
  id: number
  originalWord: string
  originalWordDescription: string
  translation: string
  translationDescription: string
  image: string
  deckId: number
  createdAt: string
  updatedAt: string
}
const DeckCards = async ({
  cards,
  deckId,
  userId,
  ownerId,
}: {
  cards: CardType[]
  deckId: number
  userId: number
  ownerId: number
}) => {
  return (
    <>
      <Link href={`/deck/${deckId}/card/create`}>
        <div className="startup-card group flex justify-center items-center min-h-[331px]">
          <div className="w-[100px] h-[100px] bg-white border-[10px] border-black rounded-full group-hover:border-primary transition-all duration-500 hover:shadow relative">
            <div className="absolute top-[45%] w-[80%] h-0 border-[5px] border-black rounded-full left-[10%] group-hover:border-primary transition-all duration-500 hover:shadow "></div>
            <div className="absolute top-[10%] w-0 h-[80%] border-[5px] border-black rounded-full left-[45%] group-hover:border-primary transition-all duration-500 hover:shadow "></div>
          </div>
        </div>
      </Link>
      {cards.length > 0
        ? cards.map((card: CardType) => (
            <CardCover
              key={card.id}
              card={card}
              deckId={deckId}
              userId={userId}
              ownerId={ownerId}
            />
          ))
        : undefined}
    </>
  )
}
export default DeckCards
