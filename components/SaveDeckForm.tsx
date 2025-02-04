// "use client"
// import { auth, signIn } from "@/auth"
// import { toast } from "@/hooks/use-toast"
// import { saveDeck } from "@/lib/actions"
// // import { formSchemaDeck } from "@/lib/validation"
// import { useActionState, useState } from "react"
// import { z } from "zod"

// const SaveDeckForm = (prevState: any, id: string) => {
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   const handleFormSubmit = async () => {
//     // "use server"

//     try {
//       const result = await saveDeck(id)
//       if (result.status == "SUCCESS") {
//         toast({
//           title: "Success",
//           description: "Deck added successfully",
//         })

//         // router.push(`/Card/${result._id}`);
//       }

//       return result
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const fieldErorrs = error.flatten().fieldErrors
//         setErrors(fieldErorrs as unknown as Record<string, string>)
//         toast({
//           title: "Error",
//           description: "Some error",
//           variant: "destructive",
//         })

//         return { ...prevState, error: "Validation failed", status: "ERROR" }
//       }

//       toast({
//         title: "Error",
//         description: "An unexpected error has occurred",
//         variant: "destructive",
//       })

//       return {
//         ...prevState,
//         error: "An unexpected error has occurred",
//         status: "ERROR",
//       }
//     }
//   }
//   const [state, formAction, isPending] = useActionState(handleFormSubmit, {
//     error: "",
//     status: "INITIAL",
//   })
//   return (
//     <form action={formAction}>
//       <button type="submit">
//         {isPending ? "Submitting..." : "SAVE TO 'MY DECKS'"}{" "}
//       </button>
//     </form>
//   )
// }
// export default SaveDeckForm
