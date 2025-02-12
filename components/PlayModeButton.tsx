"use client"
import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DeckType } from "./UserDecks"
import { Bookmark } from "lucide-react"

const PlayModeButton = ({ id }: { id: number }) => {
  return (
    <Button
      className="flex rounded-full w-[20px] h-[20px] absolute top-5 right-5 bg-primary justify-center items-center text-sm p-0"
      asChild
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Link href={`/deck/${id}/playmode`}>P</Link>
    </Button>
  )
}

export default PlayModeButton
