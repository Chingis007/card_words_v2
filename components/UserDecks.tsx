import React from "react"
import { decksByAuthorId } from "@/lib/queries/decksByAuthorId"
import DeckCover from "./DeckCover"
import Link from "next/link"
export type DeckType = {
  id: number
  image: string
  name: string
  description: string
  primeLanguage: string
  secondaryLanguge: string
  saved: string
  ownerId: number
  createdAt: string
  updatedAt: string
}
const UserDecks = async ({
  id,
  myid,
}: {
  id: string
  myid: string | undefined
}) => {
  const decks = await decksByAuthorId(Number(id))
  return (
    <>
      <Link href={`/deck/create`}>
        <div className="startup-card group flex justify-center items-center min-h-[331px]">
          <div className="w-[100px] h-[100px] bg-white border-[10px] border-black rounded-full group-hover:border-primary transition-all duration-500 hover:shadow relative">
            <div className="absolute top-[45%] w-[80%] h-0 border-[5px] border-black rounded-full left-[10%] group-hover:border-primary transition-all duration-500 hover:shadow "></div>
            <div className="absolute top-[10%] w-0 h-[80%] border-[5px] border-black rounded-full left-[45%] group-hover:border-primary transition-all duration-500 hover:shadow "></div>
          </div>
        </div>
      </Link>
      {decks.length > 0 ? (
        decks.map((deck: DeckType) => <DeckCover key={deck.id} post={deck} />)
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  )
}
export default UserDecks
