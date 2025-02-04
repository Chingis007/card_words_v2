import { Suspense } from "react"
// import { client } from "@/sanity/lib/client"
// import { DECK_QUERY_BY_ID } from "@/sanity/lib/queries"
import { notFound, redirect } from "next/navigation"
import { formatDate } from "../../../lib/utils"
import Link from "next/link"
import Image from "next/image"

// import markdownit from "markdown-it"
// import { Skeleton } from "../../../components/ui/skeleton"
import View from "../../../components/View"
import Card, { TypeCard } from "../../../components/WordCard"
import { Button } from "../../../components/ui/button"
import { getDeckById } from "@/lib/queries/getDeckById"
import { getAuthorById } from "@/lib/queries/getAuthorById"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { auth } from "@/auth"

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
  const author_id = (await checkUserExistAndReturn(session.user.email!)).id

  const id = (await params)?.id
  const post = await getDeckById(Number(id))

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
      {/* <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section> */}

      <section className="section_container flex flex-col justify-center items-center">
        <p className="w-fit h-fit text-4xl font-bold">{post.name}</p>
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
            <p className="">{formatDate(post?.updatedAt)}</p>
          </div>
          <img
            src={post.image}
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
        {/* {post.cards?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Word Cards</p>

            <ul className="mt-7 card_grid-sm">
              {post.cards.map((post: TypeCard, i: number) => (
                <Card key={i} post={post} updatedAt={_updatedAt} />
              ))}
            </ul>
          </div>
        )} */}

        {/* <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense> */}
      </section>
    </>
  )
}

export default Page
