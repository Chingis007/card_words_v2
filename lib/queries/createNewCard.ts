"use server"
import { eq, asc } from "drizzle-orm"
import { db } from "@/db"
import { cards } from "@/db/schema"
import { uploadImageAndReturnUrl } from "../utils"

export async function createNewCard(
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
  deckId: number,
  theFile: File
) {
  let imageUrl = undefined
  if (theFile) {
    if (
      theFile.type !== "image/png" &&
      theFile.type !== "image/jpeg" &&
      theFile.type !== "image/svg"
    )
      return
    imageUrl = await uploadImageAndReturnUrl(theFile)
  }
  // image: string | undefined,
  // username: string | undefined,
  // description: string | undefined,
  // primeLanguage: string | undefined,
  // secondaryLanguge: string | undefined,
  // ownerId: number

  // const { image, title, primelanguage, translate, ownerId, description } = data
  // Object.fromEntries(Array.from(form))
  const {
    image,
    originalword,
    originalworddescription,
    translation,
    translationdescription,
  } = Object.fromEntries(Array.from(formData)) as {
    image: string
    originalword: string
    originalworddescription: string
    translation: string
    translationdescription: string
  }
  try {
    let response: {
      returnedCardsId: number
    }[]
    if (
      (response = await db
        .insert(cards)
        .values({
          image: imageUrl ? imageUrl : "undefined",
          originalWord: originalword ? originalword : "undefined",
          originalWordDescription: originalworddescription
            ? originalworddescription
            : "undefined",
          translation: translation ? translation : "undefined",
          translationDescription: translationdescription
            ? translationdescription
            : "undefined",
          deckId: deckId,
        })
        .returning({ returnedCardsId: cards.id }))
    ) {
      return { returnedCardsId: response[0].returnedCardsId, status: "SUCCESS" }
    }
  } catch (error) {
    console.log(error)
    return { status: "ERROR" }
  }
}
