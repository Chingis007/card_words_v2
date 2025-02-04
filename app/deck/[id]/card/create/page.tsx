import { auth } from "@/auth"
import NewCardForm from "@/components/NewCardForm"
import NewDeckForm from "@/components/NewDeckForm"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { redirect } from "next/navigation"

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; author_id: string } | undefined>
}) => {
  const session = await auth()

  if (!session) redirect("/")
  if (!session.user) redirect("/")

  const deckId = (await params)?.id

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Create Your Card</h1>
      </section>
      <div className="flex justify-center items-center w-[100%]">
        {session.user?.email && deckId && (
          <NewCardForm deckId={Number(deckId)} />
        )}
      </div>
    </div>
  )
}

export default Page
