"use client"
import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DeckType } from "./UserDecks"
import { Bookmark } from "lucide-react"
import { CardType } from "./DeckCards"
import { useState } from "react"

const CardCover = ({
  card,
  deckId,
  userId,
  ownerId,
}: {
  card: CardType
  deckId: number
  userId: number
  ownerId: number
}) => {
  const {
    id,
    image,
    originalWord,
    originalWordDescription,
    translation,
    translationDescription,
    createdAt,
    updatedAt,
  } = card
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card-div startup-card group relative ${
        flipped && "flip-card-flip"
      }`}
      onClick={() => {
        setFlipped(!flipped)
      }}
    >
      {userId === ownerId && (
        <>
          <div className="flip-card-front z-10">
            <Button
              className="absolute top-0 right-0 z-10"
              asChild
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Link href={`/deck/${deckId}/card/${id}`}>Edit</Link>
            </Button>
          </div>
          <div className="flip-card-back z-10">
            <Button
              className="absolute top-0 right-0 z-10"
              asChild
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Link href={`/deck/${deckId}/card/${id}`}>Edit</Link>
            </Button>
          </div>
        </>
      )}
      <div className="flip-card-front">
        <h3 className="text-[20px] font-semibold break-all w-fit flex justify-start">
          {originalWord}
        </h3>
      </div>
      <div className="flip-card-back">
        <h3 className="text-[20px] font-semibold break-all w-fit flex justify-start">
          {translation}
        </h3>
      </div>
      <div className="flip-card-front mt-6">
        <h3 className="startup-card_desc break-all w-fit flex justify-start">
          {originalWordDescription}
        </h3>
      </div>
      <div className="flip-card-back mt-6">
        <h3 className="startup-card_desc break-all w-fit flex justify-start">
          {translationDescription}
        </h3>
      </div>
      <div className="flip-card-front mt-20 flex justify-center items-center">
        <img src={image} alt="placeholder" className="startup-card_img" />
      </div>
      <div className="flip-card-back mt-20 flex justify-center items-center">
        <img src={image} alt="placeholder" className="startup-card_img" />
      </div>
    </div>
  )
}

export default CardCover
