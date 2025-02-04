"use client"
import { cn, formatDate } from "../lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { useState } from "react"
// import { Author, Card } from "@/sanity/types"
// import { Skeleton } from "./ui/skeleton"

export type TypeCard = {
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

const WordCard = (params: {
  post: {
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
}) => {
  const { post } = params
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card-div startup-card group ${
        flipped && "flip-card-flip"
      }`}
      onClick={() => {
        setFlipped(!flipped)
      }}
    >
      {/* <h1 className="text-26-semibold line-clamp-1">
          {post.originalWord}-{post.translation}
        </h1> */}
      <div className="flip-card-front">
        <h3 className="text-[20px] font-semibold break-all w-fit flex justify-start">
          {post.originalWord}
        </h3>
      </div>
      <div className="flip-card-back">
        <h3 className="text-[20px] font-semibold break-all w-fit flex justify-start">
          {post.translation}
        </h3>
      </div>
      <div className="flip-card-front mt-6">
        <h3 className="startup-card_desc break-all w-fit flex justify-start">
          {post.originalWordDescription}
        </h3>
      </div>
      <div className="flip-card-back mt-6">
        <h3 className="startup-card_desc break-all w-fit flex justify-start">
          {post.translationDescription}
        </h3>
      </div>
      <div className="flip-card-front mt-20">
        <img src={post.image} alt="placeholder" className="startup-card_img" />
      </div>
      <div className="flip-card-back mt-20">
        <img src={post.image} alt="placeholder" className="startup-card_img" />
      </div>
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

export default WordCard
