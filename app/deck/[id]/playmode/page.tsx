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

  return <CardPlayer cards={cards} />
}

export default Page
