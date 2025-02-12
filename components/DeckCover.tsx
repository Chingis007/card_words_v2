import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DeckType } from "./UserDecks"
import { Bookmark } from "lucide-react"
import PlayModeButton from "./PlayModeButton"

const DeckCover = ({ deck }: { deck: DeckType }) => {
  const {
    id,
    image,
    name,
    description,
    primeLanguage,
    secondaryLanguge,
    saved,
    ownerId,
    createdAt,
    updatedAt,
  } = deck

  return (
    <div className="startup-card group relative min-w-[250px]">
      <PlayModeButton id={id} />
      <Link href={`/deck/${id}`} className="flex w-full h-full flex-col">
        <div className="flex-between">
          <p className="startup_card_date">{formatDate(createdAt)}</p>
          {/* <div className="flex gap-1.5">
            <Bookmark
              className={`size-6 ${saved ? "text-black" : "text-primary"}`}
            />
            <span className="text-16-medium">{saved}</span>
          </div> */}
        </div>
        <h3 className="text-26-semibold line-clamp-1">{name}</h3>
        <p className="startup-card_desc">{description}</p>
        {image ? (
          <img src={image} alt="" className="startup-card_img" />
        ) : (
          <div className="w-[400px] h-[200px]"></div>
        )}
      </Link>
    </div>
  )
}

export default DeckCover
