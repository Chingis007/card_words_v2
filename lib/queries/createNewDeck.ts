"use server"
import { eq, asc } from "drizzle-orm"
import { db } from "@/db"
import { decks } from "@/db/schema"

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
  ownerId: number
) {
  // image: string | undefined,
  // username: string | undefined,
  // description: string | undefined,
  // primeLanguage: string | undefined,
  // secondaryLanguge: string | undefined,
  // ownerId: number

  // const { image, title, primelanguage, translate, ownerId, description } = data
  // Object.fromEntries(Array.from(form))
  const { title, image, description, primelanguage, translate } =
    Object.fromEntries(Array.from(formData)) as {
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
          image: image ? image : "undefined",
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
