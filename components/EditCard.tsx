"use client"
import { Suspense, useState } from "react"
// import { client } from "@/sanity/lib/client"
// import { DECK_QUERY_BY_ID } from "@/sanity/lib/queries"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"

// import markdownit from "markdown-it"
// import { Skeleton } from "../../../components/ui/skeleton"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { auth } from "@/auth"
import { getCardById } from "@/lib/queries/getCardById"
import WordCard from "./WordCard"
import PlayCard from "./PlayCard"

// const md = markdownit()

export const experimental_ppr = true

const EditCard = (params: {
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
  author: {
    id: number
    image: string
    username: string
    email: string
    bio: string
    savedDecks: string[]
    createdAt: string
    updatedAt: string
  }
}) => {
  const { post, author } = params
  const [wordTurned, setWordTurned] = useState(false)
  const [descriptionTurned, setDescriptionTurned] = useState(false)
  const [wordTurnedCard, setWordTurnedCard] = useState(false)
  const [descriptionTurnedCard, setDescriptionTurnedCard] = useState(false)
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="flex flex-col justify-start items-center gap-3 max-w-[300px] w-full">
        <div className="flex flex-row w-full justify-start items-center">
          <div className="flex w-[80%] flex-row justify-center items-center">
            <Image src={author.image} alt="Author" width={30} height={30} />{" "}
            <h1>{author.username}</h1>
          </div>
        </div>
        <div className="flex flex-row w-full justify-start items-center">
          <div className="flex w-[80%] flex-row justify-center items-center relative">
            <h1>{wordTurned ? post.translation : post.originalWord}</h1>
            <Image
              className="flex absolute right-0 bottom-0"
              src="/clickable.jpg"
              alt="cl"
              onClick={() => {
                return
              }}
              width={10}
              height={10}
            />
          </div>{" "}
          <div className="flex flex-col w-[20%] justify-center items-center">
            <Image
              src="/edit.jpg"
              alt="Edit"
              onClick={() => {
                return
              }}
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-start items-center">
          <div className="flex w-[80%] flex-row justify-center items-center relative">
            <h1>
              {descriptionTurned
                ? post.translationDescription
                : post.originalWordDescription}
            </h1>
            <Image
              className="flex absolute right-0 bottom-0"
              src="/clickable.jpg"
              alt="cl"
              onClick={() => {
                return
              }}
              width={10}
              height={10}
            />
            <div className=""></div>
          </div>{" "}
          <div className="flex flex-col w-[20%] justify-center items-center">
            <Image
              src="/edit.jpg"
              alt="Edit"
              onClick={() => {
                return
              }}
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-start items-start mt-10">
          <WordCard post={post} />
          {/* <div className="flex w-[80%] flex-col justify-center items-center relative p-5 border border-amber-600">
            <Image src={post.image} alt="Image" width={150} height={150} />
            <h1>{wordTurnedCard ? post.translation : post.originalWord}</h1>
            <h3>
              {descriptionTurnedCard
                ? post.translationDescription
                : post.originalWordDescription}
            </h3>

            <Image
              className="flex absolute right-0 bottom-0"
              src="/clickable.jpg"
              alt="cl"
              onClick={() => {
                return
              }}
              width={10}
              height={10}
            />
          </div> */}
          <div className="flex flex-col w-[20%] justify-start items-center gap-10 h-fit">
            <Image
              src="/picture.png"
              alt="Edit"
              onClick={() => {
                return
              }}
              width={30}
              height={30}
            />{" "}
            <Image
              src="/drop.png"
              alt="Edit"
              onClick={() => {
                return
              }}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCard
