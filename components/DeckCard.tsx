import { cn, formatDate } from "@/lib/utils"
import { Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
// import { Author, Deck } from "@/sanity/types"
// import { useActionState, useState } from "react"
// import router from "next/router"
// import { saveDeck } from "@/lib/actions"
// import SaveDeckForm from "@/components/SaveDeckForm"
import SaveDeckButton from "./SaveDeckButton"
export type DeckTypeCard = {
  createdAt: string
  name: string
  saved: number
  cards: string
  description: string
  id: number
  image: string
}
type AuthorType =
  | { username: string; id: string; image: string; bio: string }
  | undefined
const DeckCard = async ({
  post,
  author,
  savedDecks,
}: {
  post: {
    createdAt: string
    name: string
    saved: number
    cards: string
    description: string
    id: number
    image: string
  }
  author: AuthorType
  savedDecks: string[]
}) => {
  const {
    createdAt,
    name,
    saved,
    cards,
    description,
    id,
    // ,image
  } = post
  author = {
    username: "username",
    id: "id",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/T-64_Lutsk.jpg/150px-T-64_Lutsk.jpg",
    bio: "bio",
  }
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/T-64_Lutsk.jpg/150px-T-64_Lutsk.jpg"
  const username = author.username
  const author_id = author.id
  const authorImage = author.image
  const bio = author.bio
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(createdAt)}</p>
        <div className="flex gap-1.5">
          {/* <SaveDeckButton
            id={id}
            author_id={author_id}
            savedDecks={savedDecks}
          /> */}
          {/* <StartupForm
            _id={_id}
            author_id={author_id}
            savedDecks={savedDecks}
          /> */}
          {/* 
          <SaveDeckForm id={_id} asChild className="cursor-pointer">

          </SaveDeckForm> */}

          <span className="text-16-medium">{saved}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author_id}`}>
            <p className="text-16-medium line-clamp-1">{username}</p>
          </Link>
          <Link href={`/deck/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{name}</h3>
          </Link>
        </div>
        <Link href={`/user/${author_id}`}>
          <Image
            src={authorImage !== null ? authorImage : "/avatar.jpg"}
            alt={username}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/deck/${id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        {/* <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link> */}
        <Button className="startup-card_btn" asChild>
          <Link href={`/deck/${id}`}>Details</Link>
        </Button>
      </div>
    </li>
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

export default DeckCard
