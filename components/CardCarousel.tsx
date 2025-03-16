"use client"
import React, { use, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import PlayCard from "./PlayCard"
import { CardType } from "./DeckCards"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Switch } from "@/components/ui/switch"
import { cards } from "@/db/schema"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Input } from "./ui/input"

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
  type: "repetition" | "manual" | "writing" | "connect"
  setAllowFinish: React.Dispatch<React.SetStateAction<boolean>>
  attempts: number
}) => {
  const [writingTest, setWritingTest] = useState<"Right" | "Wrong" | "Waiting">(
    "Waiting"
  )
  const [currentAttempt, setCurrentAtempt] = useState(0)
  const [cardsArrayState, setCardsArrayState] = useState(props.cards)
  const [checkedArray, setCheckedArray] = useState<boolean[]>(
    new Array(props.cards.length).fill(false)
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)

  const shuffle = (array: CardType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setWritingTest("Waiting")
      if (inputRef.current) {
        let target = inputRef.current as HTMLInputElement
        target.value = ""
      }
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  useEffect(() => {
    if (checkedArray.every((v) => v === true)) {
      props.setAllowFinish(true)
    } else {
      props.setAllowFinish(false)
    }
  }, [checkedArray])
  const inputRef = useRef(null)
  return (
    <div className="flex flex-col w-full h-full gap-5">
      <Carousel
        className="select-none"
        opts={{ watchDrag: false }}
        setApi={setApi}
      >
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`inline-block w-3 h-3 rounded-full bg-gray-400 mx-2 ${
              index + 1 === current ? "bg-primary" : ""
            }`}
            // onClick={() => api && api.scrollTo(index)}
          />
        ))}
        <CarouselContent>
          {props.cards?.length > 0 ? (
            cardsArrayState?.map((card: CardType, index) => (
              <CarouselItem key={card.id}>
                <PlayCard
                  card={card}
                  flipped={props.flipped}
                  setFlipped={props.setFlipped}
                  checkedArray={checkedArray}
                  setCheckedArray={setCheckedArray}
                  index={index}
                  type={props.type}
                  // inputRef={inputRef}
                />
              </CarouselItem>
            ))
          ) : (
            <p className="w-fit">There are no Cards in Deck</p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext
          disabled={
            props.type === "manual"
              ? props.cards.length === current
                ? true
                : checkedArray[current - 1]
                ? false
                : true
              : false
          }
        />
      </Carousel>
      {props.type === "writing" && currentAttempt < props.attempts ? (
        <div className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            type="text"
            className={`all-unset border-2 ${
              writingTest === "Right"
                ? "border-green-700 focus-visible:ring-green-700"
                : ""
            } ${
              writingTest === "Wrong"
                ? "border-red-700 focus-visible:ring-red-700"
                : ""
            } ${
              writingTest === "Waiting"
                ? "border-gray-700 focus-visible:ring-gray-700"
                : ""
            }`}
            onChange={(e) => {
              let target = e.target as HTMLInputElement
              let value = target.value
              if (value === "") {
                setWritingTest("Waiting")
              }
              // if (value === cardsArrayState[current - 1].translation) {
              //   // do something
              // }
            }}
            onKeyDown={(e) => {
              let target = e.target as HTMLInputElement
              let value = target.value
              if (e.key === "Enter") {
                if (
                  cardsArrayState[
                    current - 1
                  ].translation.toLocaleLowerCase() ===
                  value.toLocaleLowerCase()
                ) {
                  setWritingTest("Right")
                } else {
                  setWritingTest("Wrong")
                  setCurrentAtempt(currentAttempt + 1)
                  value = ""
                }
              }
            }}
          />
          <Button
            onClick={() => {
              if (inputRef.current) {
                let target = inputRef.current as HTMLInputElement
                let value = target.value
                if (value) {
                  if (
                    cardsArrayState[
                      current - 1
                    ].translation.toLocaleLowerCase() ===
                    value.toLocaleLowerCase()
                  ) {
                    setWritingTest("Right")
                  } else {
                    setWritingTest("Wrong")
                    setCurrentAtempt(currentAttempt + 1)
                    value = ""
                  }
                }
              }
            }}
          >
            Check
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 justify-center items-center">
          Out of attempts
          <Button>Retry</Button>
        </div>
      )}
    </div>
  )
}

export default CardCarousel
