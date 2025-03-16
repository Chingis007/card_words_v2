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

const ConnectTest = (props: {
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
  //   imageState: boolean
  //   shuffleState: boolean
  //   flipped: boolean
  //   setFlipped: (value: React.SetStateAction<boolean>) => void
  //   type: "repetition" | "manual" | "writing" | "connect"
  //   setAllowFinish: React.Dispatch<React.SetStateAction<boolean>>
  //   attempts: number
}) => {
  const [writingTest, setWritingTest] = useState<"Right" | "Wrong" | "Waiting">(
    "Waiting"
  )
  const [selectedOriginal, setSelectedOriginal] = useState<{
    word: string | undefined
    index: number | undefined
  }>({ word: undefined, index: undefined })
  const [selectedTranslation, setSelectedTranslation] = useState<{
    word: string | undefined
    index: number | undefined
  }>({ word: undefined, index: undefined })
  const [canCheck, setCanCheck] = useState(false)
  const [currentAttempt, setCurrentAtempt] = useState(0)
  const [suggestions, setSuggestions] = useState<
    {
      originalWord: string
      translation?: string
      image: string
    }[]
  >(makeArr(props.cards))

  function makeArr(
    array_input: {
      originalWord: string
      translation?: string
      image: string
    }[]
  ) {
    let array = structuredClone(array_input)

    for (let index = 0; index < props.cards.length; index++) {
      array[index].originalWord = props.cards[index].originalWord
      array[index].image = props.cards[index].image
      array[index].translation = undefined
    }
    return array
  }
  // const [cardsArrayState, setCardsArrayState] = useState(props.cards)
  // const [checkedArray, setCheckedArray] = useState<boolean[]>(
  //   new Array(props.cards.length).fill(false)
  // )
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
  // useEffect(() => {
  //   if (checkedArray.every((v) => v === true)) {
  //     props.setAllowFinish(true)
  //   } else {
  //     props.setAllowFinish(false)
  //   }
  // }, [checkedArray])
  const inputRef = useRef(null)
  return (
    <div className="flex flex-col w-full h-full gap-15">
      <div className="grid sm:grid-cols-2 gap-4">
        {suggestions.map((element, index) => {
          return (
            <div
              className="flex flex-row gap-2 justify-center items-center"
              key={index}
            >
              <div
                className={`flex w-[100px] h-[50px] justify-center items-center select-none cursor-pointer`}
                // className={`flex w-[100px] h-[50px]
                //   border-1
                //    rounded-xl justify-center items-center select-none cursor-pointer ${
                //   selectedOriginal.index === index
                //     ? "border-red-700"
                //     : "border-black "
                // }`}
                // onClick={() => {
                //   if (selectedOriginal.index != undefined) {
                //     if (selectedOriginal.index == index) {
                //       setSelectedOriginal({ word: undefined, index: undefined })
                //     } else {
                //       setSelectedOriginal({
                //         word: element.originalWord,
                //         index: index,
                //       })
                //     }
                //   } else {
                //     setSelectedOriginal({
                //       word: element.originalWord,
                //       index: index,
                //     })
                //   }
                // }}
              >
                {element.originalWord}
              </div>
              <div
                className={`flex w-[100px] h-[50px] border-black border-1 rounded-xl justify-center items-center ${
                  selectedTranslation.index != undefined &&
                  element.translation != ""
                    ? "bg-red-200"
                    : ""
                }`}
              >
                {/* {element.translation} */}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-row gap-30 justify-center items-center">
        <div className="grid sm:grid-cols-5 gap-5 w-fit">
          {props.cards.map((element, index) => {
            return (
              <div
                key={index}
                className={`flex w-[100px] h-[50px] border-1 rounded-xl justify-center items-center select-none cursor-pointer ${
                  selectedTranslation.index === index
                    ? "border-red-700 bg-red-300"
                    : "border-black "
                }`}
                onClick={() => {
                  if (selectedTranslation.index != undefined) {
                    if (selectedTranslation.index == index) {
                      setSelectedTranslation({
                        word: undefined,
                        index: undefined,
                      })
                    } else {
                      setSelectedTranslation({
                        word: element.translation,
                        index: index,
                      })
                    }
                  } else {
                    setSelectedTranslation({
                      word: element.translation,
                      index: index,
                    })
                  }
                }}
              >
                {element.translation}
              </div>
            )
          })}
        </div>
      </div>
      <Button className="select-none" disabled={!canCheck}>
        Check
      </Button>
    </div>
  )
}

export default ConnectTest
