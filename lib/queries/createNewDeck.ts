"use server"
import { eq, asc } from "drizzle-orm"
import { db } from "@/db"
import { decks } from "@/db/schema"
import { uploadImageAndReturnUrl } from "../utils"
import { T } from "unstorage/dist/shared/unstorage.C1TxcX_u"

export async function createNewDeck(
  state: any,
  formData: FormData,
  // data: {
  //   ownerId: number
  //   title: string
  //   description: string
  //   primelanguage: string
  //   translate: string
  //   image?: string | undefined
  // },
  ownerId: number,
  theFile: File | undefined
) {
  let imageUrl = undefined
  if (theFile) {
    if (
      theFile.type !== "image/png" &&
      theFile.type !== "image/jpeg" &&
      theFile.type !== "image/svg"
    )
      return
    let resText = await uploadImageAndReturnUrl(theFile)
    imageUrl = resText.secure_url
  }
  // image: string | undefined,
  // username: string | undefined,
  // description: string | undefined,
  // primeLanguage: string | undefined,
  // secondaryLanguge: string | undefined,
  // ownerId: number

  // const { image, title, primelanguage, translate, ownerId, description } = data
  // Object.fromEntries(Array.from(form))

  const { title, description, primelanguage, translate } = Object.fromEntries(
    Array.from(formData)
  ) as {
    title: string
    image: string
    description: string
    primelanguage: string
    translate: string
  }

  // console.log(title, image, description, primelanguage, translate)
  try {
    let response: {
      returnedDecksId: number
    }[]
    if (
      (response = await db
        .insert(decks)
        .values({
          image: imageUrl ? imageUrl : "undefined",
          name: title ? title : "undefined",
          description: description ? description : "undefined",
          primeLanguage: primelanguage ? primelanguage : "undefined",
          secondaryLanguge: translate ? translate : "undefined",
          saved: "",
          ownerId: ownerId,
        })
        .returning({ returnedDecksId: decks.id }))
    ) {
      return { returnedDecksId: response[0].returnedDecksId, status: "SUCCESS" }
    }
  } catch (error) {
    console.log(error)
    return { status: "ERROR" }
  }
}
