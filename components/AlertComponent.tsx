"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import { deleteDeck } from "@/lib/queries/deleteDeck"
import { redirect } from "next/navigation"
const AlertComponent = (props: { id: number | undefined; deckId: number }) => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className=" bg-red-600 hover:bg-red-700">Delete Deck</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this deck?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            deck.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <form
            onSubmit={(event) => {
              ;(async () => {
                deleteDeck(props.deckId)
              })().then(() => {
                setOpen(false)
                redirect(`/user/${props.id}`)
              })
              event.preventDefault()
            }}
          >
            {/** some inputs */}
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Submit
            </Button>
          </form>
          {/* <AlertDialogAction className="bg-red-600 hover:bg-red-700">
          Continue
        </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default AlertComponent
