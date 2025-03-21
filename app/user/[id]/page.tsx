import { auth } from "../../../auth"
// import { client } from "@/sanity/lib/client"
// import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"
import { getAuthorById } from "@/lib/queries/getAuthorById"
import UserDecks from "@/components/UserDecks"
// import { StartupCardSkeleton } from "../../../components/DeckCard"

export const experimental_ppr = true

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const theparams = await params
  const id = theparams.id
  const session = await auth()
  if (!id) {
    return notFound()
  }
  const user = await getAuthorById(Number(id))
  if (!user) return notFound()
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
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
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.user?.email === user?.email ? "Your" : "All"} Decks
          </p>
          <ul className="card_grid-sm">
            {/* <Suspense fallback={<DeckCardSkeleton />}> */}
            <UserDecks id={id} myid={session?.user?.id} />
            {/* </Suspense> */}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Page
