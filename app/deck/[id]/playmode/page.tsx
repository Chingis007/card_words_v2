import { Suspense, useState } from "react"
// import { client } from "@/sanity/lib/client"
// import { DECK_QUERY_BY_ID } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { formatDate } from "../../../../lib/utils"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../../../../components/ui/button"
// import markdownit from "markdown-it"
// import { Skeleton } from "../../../../components/ui/skeleton"
import View from "../../../../components/View"
import Card, { TypeCard } from "../../../../components/WordCard"
import { start } from "repl"
import CardPlayer from "../../../../components/CardPlayer"
import { getDeckById } from "@/lib/queries/getDeckById"
import { getCardsByDeckId } from "@/lib/queries/getCardsByDeckId"

// const md = markdownit()

export const experimental_ppr = true

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const post = await getDeckById(Number(id))
  const cards = await getCardsByDeckId(Number(id))
  if (!post) return notFound()

  // const parsedContent = md.render(post?.pitch || "");

  return (
    <div className="flex flex-col justify-center items-center gap-3 pb-5">
      <Link href={`/deck/${id}`}>
        <p className="w-fit h-fit text-4xl font-bold cursor-pointer">
          {post.name}
        </p>
      </Link>
      <img
        src={post.image}
        alt="thumbnail"
        className="w-[150px] max-h-[150px] h-auto rounded-xl"
      />
      <CardPlayer cards={cards} />
      {/*
      <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image ?post.author.image:undefined}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.username}</p>
              </div>
            </Link>
          </div>
      <p>last Update: {post._updatedAt}</p> */}
      {/* <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense> */}
    </div>
  )
}

export default Page
