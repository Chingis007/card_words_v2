"use client"

import React, { useState } from "react"

import { cn, formatDate } from "../lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
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

const PlayCard = ({ post }: { post: PlayCardType }) => {
  const [flipped, setFlipped] = useState(false)
  const [imageShown, setImageShown] = useState(false)
  const {
    id,
    translationDescription,
    translation,
    originalWordDescription,
    originalWord,
    image,
  } = post
  return (
    <div className="play-card gap-5 flex justify-center items-center flex-col w-full">
      <div className="flex flex-between w-full">
        <Button
          onClick={() => {
            setImageShown(!imageShown)
          }}
          className="py-0 px-2 font-medium text-[14px] md:text-[20px]"
        >
          {imageShown ? "Image" : "Image"}
        </Button>

        <div className={`flip-card-div ${flipped && "flip-card-flip"}`}>
          <div className="flip-card-front">
            <h3 className="text-[20px] font-semibold break-all w-[150px] flex justify-center">
              {originalWord}
            </h3>
          </div>
          <div className="flip-card-back">
            <h3 className="text-[20px] font-semibold break-all w-[150px] flex justify-center">
              {translation}
            </h3>
          </div>
        </div>

        <Button
          onClick={() => {
            setFlipped(!flipped)
          }}
          className="py-0 px-2 font-medium text-[14px] md:text-[20px]"
        >
          Flip
        </Button>
      </div>
      {originalWordDescription && (
        <div className={`flip-card-div ${flipped && "flip-card-flip"}`}>
          <div className="flip-card-front">
            <p className="text-[10px] break-all w-full flex justify-center">
              {originalWordDescription}
            </p>
          </div>
          <div className="flip-card-back">
            <p className="text-[10px] break-all w-full flex justify-center">
              {translationDescription}
            </p>
          </div>
        </div>
      )}
      {imageShown && (
        <img
          src={image}
          alt="placeholder"
          className="w-[280px] h-[280px]
        rounded-[10px] object-cover"
        />
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
