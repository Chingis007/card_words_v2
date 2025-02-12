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
import CardCarousel from "./CardCarousel"

const CardPlayer = (props: {
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
}) => {
  const [started, setStarted] = useState({ arr: [...props.cards], bool: false })
  const [shuffleState, setShuffleState] = useState(false)
  const [imageState, setImageState] = useState(false)
  const [cardsArrayState, setCardsArrayState] = useState(props.cards)
  const shuffle = (array: CardType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  const [flipped, setFlipped] = useState(false)
  // useEffect(() => {
  //   if(cardsArrayState)
  //   setStarted(true)
  // }, [cardsArrayState])
  // window.addEventListener("click", () => {
  //   console.log("window click")
  //   setFlipped(false)
  // })
  return (
    <>
      <div
        className="flex flex-col justify-start items-center w-full gap-5 pt-[50px] md:pt-[100px] h-[calc(100vh-107px)] md:h-[calc(100vh-157px)]"
        onClick={() => {
          setFlipped(false)
        }}
      >
        {started.bool ? (
          <div className="w-[60%]  py-6 px-15  flex justify-start items-end gap-5 flex-col">
            <Button
              className=""
              onClick={() => {
                setStarted({ arr: [...props.cards], bool: false })
              }}
            >
              Stop
            </Button>
            <CardCarousel
              imageState={imageState}
              shuffleState={shuffleState}
              cards={started.arr}
              flipped={flipped}
              setFlipped={setFlipped}
            />
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center border-black border-1 p-5 bg-secondary gap-10">
            <div className="flex flex-col justify-start items-start">
              <div className="flex flex-row justify-start items-center">
                <img src="/shuffle.png" alt="" className="w-[30px] h-[30px]" />
                <input
                  type="checkbox"
                  id="shuffle"
                  onChange={() => {
                    setShuffleState(!shuffleState)
                  }}
                />
                {/* <Checkbox
                className="w-[40px] h-[40px] data-[state=checked]:bg-primary data-[state=unchecked]:bg-black"
                onCheckedChange={(checked: boolean | "indeterminate") => {
                  if (checked === true) setShuffleState(true)
                  if (checked === false) setShuffleState(false)
                }}
                id="shuffle"
              /> */}
                {/* <Switch
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-black"
                onCheckedChange={(checked) => {
                  setShuffleState(checked)
                }}
                id="shuffle"
              /> */}
                <Label htmlFor="shuffle">Shuffle</Label>
              </div>
              <div className="flex flex-row justify-start items-center">
                <img src="/shuffle.png" alt="" className="w-[30px] h-[30px]" />
                <input
                  type="checkbox"
                  id="images"
                  onChange={() => {
                    setImageState(!imageState)
                  }}
                />
                <Label htmlFor="images">Show all images</Label>
              </div>
              {/* <div
              className=" w-[30px] h-[30px] flex bg-primary rounded-full p-1 cursor-pointer"
              onClick={() => {
                setCardsArrayState(shuffle([...cardsArrayState]))
              }}
            >
            </div> */}
              {/* <Button
              onClick={() => {
                setCardsArrayState(props.cards)
              }}
            >
              Default
            </Button> */}
            </div>
            <div className="flex flex-col justify-end items-end">
              <Button
                className=""
                onClick={() => {
                  if (shuffleState) {
                    let newArrr = shuffle([...props.cards])
                    setStarted({ arr: [...newArrr], bool: true })
                  } else {
                    setStarted({ arr: [...props.cards], bool: true })
                  }
                }}
              >
                Start
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CardPlayer
