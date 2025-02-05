import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DeckType } from "./UserDecks"
import { Bookmark } from "lucide-react"

const DeckCover = ({ post }: { post: DeckType }) => {
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
  } = post

  return (
    <li className="startup-card group">
      <Link href={`/deck/${id}`}>
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
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>
    </li>
  )
}

export default DeckCover
