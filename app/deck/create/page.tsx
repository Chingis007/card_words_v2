import { auth } from "@/auth"
import NewDeckForm from "@/components/NewDeckForm"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await auth()
  if (!session) redirect("/")
  if (!session.user) redirect("/")
  const author_id = await checkUserExistAndReturn(session.user.email!)

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Create Your Deck</h1>
      </section>
      <div className="flex justify-center items-center w-[100%]">
        {session.user?.email && author_id && (
          <NewDeckForm author_id={author_id.id} />
        )}
      </div>
    </div>
  )
}

export default Page
