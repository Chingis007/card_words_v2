"use client"
import { auth, signIn } from "../auth"
// import {
//   saveDeck,
//   // unSaveDeck
// } from "@/lib/actions"
import React, { useActionState } from "react"
import { Button } from "./ui/button"
import { Save } from "lucide-react"
const SaveDeckButton = ({
  _id,
  author_id,
  savedDecks,
}: {
  _id: string
  author_id: string
  savedDecks: string[]
}) => {
  const handleFormSubmit = async (prevState?: any, formData?: FormData) => {
    if (savedDecks?.includes(_id)) {
      console.log("unsave in button")
      // await unSaveDeck(_id, author_id)
      return true
    } else {
      console.log("save in button")
      // await saveDeck(_id, author_id)
      return true
    }
  }
  const [state, formAction, isPending] = useActionState<any>(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  })

  return (
    <form action={formAction}>
      <Button disabled={isPending} type="submit">
        <Save
          className={`size-6 ${
            savedDecks?.includes(_id) ? "bg-primary" : "bg-neutral-800"
          }`}
        />
      </Button>
      {/* <Button type="submit" asChild>
        <Save
          className={`size-6 ${savedDecks?.includes(_id) ? "bg-primary" : "bg-neutral-800"}`}
        />
      </Button> */}
    </form>
    // <Button
    //   onClick={() => {
    //     // "use server"
    //     if (savedDecks?.includes(_id)) {
    //       console.log("unsave in button")
    //       unSaveDeck(_id, author_id)
    //     } else {
    //       console.log("save in button")
    //       saveDeck(_id, author_id)
    //     }
    //   }}
    //   asChild
    // >
    //   <Save
    //     className={`size-6 ${savedDecks?.includes(_id) ? "bg-primary" : "bg-neutral-800"}`}
    //   />
    // </Button>
  )
}

export default SaveDeckButton
