import { Suspense } from "react"
// import { client } from "@/sanity/lib/client"
// import { DECK_QUERY_BY_ID } from "@/sanity/lib/queries"
import { notFound, redirect } from "next/navigation"
import { formatDate } from "../../../lib/utils"
import Link from "next/link"
import Image from "next/image"

// import markdownit from "markdown-it"
// import { Skeleton } from "../../../components/ui/skeleton"
import Card, { TypeCard } from "../../../components/WordCard"
import { Button } from "../../../components/ui/button"
import { getDeckById } from "@/lib/queries/getDeckById"
import { getAuthorById } from "@/lib/queries/getAuthorById"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { auth } from "@/auth"
import DeckCover from "@/components/DeckCover"
import DeckCards from "@/components/DeckCards"
import { getCardsByDeckId } from "@/lib/queries/getCardsByDeckId"

import AlertComponent from "@/components/AlertComponent"
// const md = markdownit()

export const experimental_ppr = true

const Page = async ({
  params,
}: {
  params: Promise<{ id: string } | undefined>
}) => {
  const session = await auth()
  if (!session) redirect("/")
  if (!session.user) redirect("/")
  const author_id = session.user.id

  const id = (await params)?.id
  const deck = await getDeckById(Number(id))
  if (!deck) return notFound()
  const cards = await getCardsByDeckId(deck.id)
  // Number((await params).author_id)
  const author = await getAuthorById(Number(author_id))
  // const [
  //   deck,
  //   // { select: editordecks }
  // ] = await Promise.all([
  //   client.fetch(DECK_QUERY_BY_ID, { id }),
  //   // client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //   //   slug: "editor-picks-new",
  //   // }),
  // ])
  const _updatedAt = deck?.updatedAt
  // const parsedContent = md.render(deck?.pitch || "");
  return (
    <>
      <div className="flex w-full flex-row justify-center items-center ">
        <Link
          href={`/user/${author.id}`}
          className="group flex flex-row gap-2 border-black border-b-2 p-2 hover:border-primary transition-all duration-500 hover:shadow"
        >
          <Image
            src={author.image}
            alt="Author"
            width={50}
            height={50}
            className="border-black border-2 rounded-full group-hover:border-primary transition-all duration-500 hover:shadow"
          />{" "}
          <h1 className="text-4xl">{author.username}</h1>
        </Link>
      </div>
      <section className="profile_container">
        {/* <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.username}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.username}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div> */}
        <div className="flex flex-col justify-start items-center gap-3 relative ">
          <div className="flex justify-between items-center w-full h-fit">
            <Button asChild className="text-xl py-6 px-8 w-fit">
              <Link
                href={`/deck/${id}/playmode`}
                className="flex gap-2 items-center"
              >
                Play
              </Link>
            </Button>
            <AlertComponent id={Number(id)} deckId={Number(deck.id)} />
          </div>
          <DeckCover deck={deck} />
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">Cards</p>
          <ul className="card_grid-sm">
            <DeckCards
              cards={cards}
              deckId={Number(id)}
              userId={Number(author_id)}
              ownerId={deck.ownerId}
            />
          </ul>
        </div>
      </section>
      {/* <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(deck?._createdAt)}</p>

        <h1 className="heading">{deck.title}</h1>
        <p className="sub-heading !max-w-5xl">{deck.description}</p>
      </section> */}
      {/* <section className="section_container flex flex-col justify-center items-center">
        <p className="w-fit h-fit text-4xl font-bold">{deck.name}</p>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto flex flex-col justify-center items-center">
          <div className="flex-between gap-5 flex flex-col md:flex-row">
            <Link
              href={`/user/${author.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={author.image ? author.image : ""}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{author.username}</p>
              </div>
            </Link>
            <p className="">{formatDate(deck?.updatedAt)}</p>
          </div>
          <img
            src={deck.image}
            alt="Image"
            className="w-[150px] max-h-[150px] h-auto rounded-xl"
          />
          <Button>
            <Link
              href={`/deck/${id}/card/create`}
              className="flex gap-2 items-center mb-3"
            >
              Add Card to Deck
            </Link>
          </Button>
          <Button asChild>
            <Link
              href={`/deck/${id}/playmode`}
              className="flex gap-2 items-center mb-3"
            >
              Play words
            </Link>
          </Button>
        </div>
        <hr className="divider" />
      </section> */}
    </>
  )
}

export default Page
