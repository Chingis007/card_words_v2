"use client"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import PlayCard from "./PlayCard"
import { CardType } from "./DeckCards"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Switch } from "@/components/ui/switch"
import { cards } from "@/db/schema"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@radix-ui/react-checkbox"

const CardCarousel = (props: {
  cards: {
    id: number
    originalWord: string
    originalWordDescription: string
    translation: string
    translationDescription: string
    image: string
    deckId: number
    createdAt: string
    updatedAt: string
  }[]
  imageState: boolean
  shuffleState: boolean
  flipped: boolean
  setFlipped: (value: React.SetStateAction<boolean>) => void
}) => {
  const [cardsArrayState, setCardsArrayState] = useState(props.cards)
  const shuffle = (array: CardType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    <div className="w-full h-full">
      <Carousel className="select-none">
        <CarouselContent>
          {props.cards?.length > 0 ? (
            cardsArrayState?.map((card: CardType) => (
              <CarouselItem key={card.id}>
                <PlayCard
                  card={card}
                  flipped={props.flipped}
                  setFlipped={props.setFlipped}
                />
              </CarouselItem>
            ))
          ) : (
            <p className="w-fit">There are no Cards in Deck</p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CardCarousel
