"use client"

import React, { useState } from "react"

import { cn, formatDate } from "../lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
// import { Author, Deck } from "@/sanity/types"
// import { Skeleton } from "./ui/skeleton"

export type PlayCardType = {
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

type AuthorType = { username: string; _id: string; image: string; bio: string }

const PlayCard = ({
  card,
  flipped,
  setFlipped,
  checkedArray,
  setCheckedArray,
  index,
  type,
}: // inputRef,
{
  card: PlayCardType
  flipped: boolean
  setFlipped: (value: React.SetStateAction<boolean>) => void
  checkedArray: boolean[]
  setCheckedArray: React.Dispatch<React.SetStateAction<boolean[]>>
  index: number
  type: "repetition" | "manual" | "writing" | "connect"
  // inputRef: React.MutableRefObject<null>
}) => {
  // const [flipped, setFlipped] = useState(false)
  const [imageShown, setImageShown] = useState(true)
  const {
    id,
    translationDescription,
    translation,
    originalWordDescription,
    originalWord,
    image,
  } = card
  return (
    <div
      className="play-card gap-5 flex justify-center items-center flex-col w-full relative"
      onClick={(e) => {
        setFlipped(!flipped)
        e.stopPropagation()
      }}
    >
      <img
        src="/clickhere.png"
        alt=""
        className="absolute bottom-[12px] right-[10px] w-[25px] h-[25px] opacity-50"
      />
      <div className="flex flex-row justify-start items-center w-full">
        {imageShown ? (
          <img
            src={image}
            alt="placeholder"
            className="w-[75px] h-[75px]
        rounded-[10px] object-cover"
          />
        ) : (
          <div
            className="w-[75px] h-[75px]
          rounded-[10px] object-cover"
          ></div>
        )}
        <h1
          className={`flex justify-center items-center w-[calc(100%-150px)] text-2xl`}
        >
          {originalWord}
        </h1>
        <div className="flex flex-1 justify-center items-center">
          {type === "manual" && (
            <Checkbox
              onCheckedChange={(checkState) => {
                let newarr = [...checkedArray]
                if (typeof checkState === "boolean") {
                  newarr[index] = checkState
                  setCheckedArray(newarr)
                }
              }}
              className='border-black w-[50px] h-[50px] rounded-full bg-gray-300 hover:bg-gray-200 bg-[url("http://www.w3.org/2000/svg")]}'
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
          )}
        </div>
        {/* data-[state=checked]:bg-green-800 */}
      </div>

      {/* <Button
        onClick={(e) => {
          setImageShown(!imageShown)
          e.stopPropagation()
        }}
        className="py-0 px-2 font-medium text-[14px] md:text-[20px]"
      >
        {imageShown ? "Image" : "Image"}
      </Button> */}
      <div
        className={`flip-card-div flex justify-center ${
          flipped && "flip-card-flip"
        }`}
      >
        <div className="flip-card-front flex justify-center">
          <h3 className="text-[20px] font-semibold break-all flex justify-center w-fit">
            {originalWord}
          </h3>
        </div>
        <div className="flip-card-back flex justify-center">
          <h3 className="text-[20px] font-semibold break-all flex justify-center w-fit">
            {translation}
          </h3>
        </div>
      </div>

      {/* <Button
          onClick={() => {
            setFlipped(!flipped)
            }}
            className="py-0 px-2 font-medium text-[14px] md:text-[20px]"
            >
            Flip
            </Button> */}
      {originalWordDescription && (
        <div className={`flip-card-div ${flipped && "flip-card-flip"}`}>
          <div className="flip-card-front flex justify-center">
            <p className="text-[10px] break-all w-fit flex justify-center">
              {originalWordDescription}
            </p>
          </div>
          <div className="flip-card-back flex justify-center">
            <p className="text-[10px] break-all w-fit flex justify-center">
              {translationDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// export const DeckCardSkeleton = () => (
//   <>
//     {[0, 1, 2, 3, 4].map((index: number) => (
//       <li key={cn("skeleton", index)}>
//         <Skeleton className="startup-card_skeleton" />
//       </li>
//     ))}
//   </>
// )

export default PlayCard
