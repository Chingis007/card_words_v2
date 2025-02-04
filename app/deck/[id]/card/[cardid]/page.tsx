import { Suspense } from "react"
// import { client } from "@/sanity/lib/client"
// import { DECK_QUERY_BY_ID } from "@/sanity/lib/queries"
import { notFound, redirect } from "next/navigation"
import { formatDate } from "../../../../../lib/utils"
import Link from "next/link"
import Image from "next/image"

// import markdownit from "markdown-it"
// import { Skeleton } from "../../../components/ui/skeleton"
import View from "../../../../../components/View"
import Card, { TypeCard } from "../../../../../components/WordCard"
import { Button } from "../../../../../components/ui/button"
import { getDeckById } from "@/lib/queries/getDeckById"
import { getAuthorById } from "@/lib/queries/getAuthorById"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { auth } from "@/auth"
import { getCardById } from "@/lib/queries/getCardById"
import EditCard from "@/components/EditCard"

// const md = markdownit()

export const experimental_ppr = true

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; cardid: string } | undefined>
}) => {
  const session = await auth()
  if (!session) redirect("/")
  if (!session.user) redirect("/")
  const author_id = (await checkUserExistAndReturn(session.user.email!)).id

  const id = (await params)?.id
  const cardid = (await params)?.cardid
  const post = await getCardById(Number(cardid))

  // Number((await params).author_id)
  const author = await getAuthorById(author_id)
  // const [
  //   post,
  //   // { select: editorPosts }
  // ] = await Promise.all([
  //   client.fetch(DECK_QUERY_BY_ID, { id }),
  //   // client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //   //   slug: "editor-picks-new",
  //   // }),
  // ])
  const _updatedAt = post?.updatedAt
  if (!post) return notFound()
  // const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <EditCard post={post} author={author} />

      {/* <Card post={post} /> */}
      {/* <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section> */}

      {/* <section className="section_container flex flex-col justify-center items-center">
        <p className="w-fit h-fit text-4xl font-bold">{post.originalWord}</p>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto flex flex-col justify-center">
          <div className="flex-between gap-5 flex flex-col md:flex-row">
            <img
              src={post.image}
              alt="thumbnail"
              className="w-[150px] max-h-[150px] h-auto rounded-xl"
            />
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
            <p className="">{formatDate(post?.updatedAt)}</p>
          </div>
        </div>
        <hr className="divider" />
      </section> */}
    </>
  )
}

export default Page
