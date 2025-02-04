"use client"

import React, { useState, useActionState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { unSaveDeck } from "@/lib/actions"
// import { createPitch } from "@/lib/actions";

const StartupForm = ({
  _id,
  author_id,
  savedDecks,
}: {
  _id: string
  author_id: string
  savedDecks: string[]
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    console.log("unsave in form")
    try {
      // const formValues = {
      //   originalWord: formData.get("originalWord") as string,
      //   originalWordDescription: formData.get(
      //     "originalWordDescription"
      //   ) as string,
      //   translation: formData.get("translation") as string,
      //   translationDescription: formData.get(
      //     "translationDescription"
      //   ) as string,
      //   category: formData.get("category") as string,
      //   link: formData.get("link") as string,
      //   // pitch,
      // }
      // await formSchema.parseAsync(formValues)
      // let result: any = await unSaveDeck(_id, author_id)
      let result = { status: "SUCCESSsss", _id: "0" }
      result.status == "SUCCESS"
      result._id = "123"
      // const result = await createPitch(prevState, formData, pitch);
      // const result = { status: "SUCCESS", _id: "123" }
      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your word card has been created successfully",
        })

        // router.push(`/Card/${result._id}`)
      }

      return result
    } catch (error) {
      console.log("error", error)
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors

        setErrors(fieldErorrs as unknown as Record<string, string>)

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        })

        return { ...prevState, error: "Validation failed", status: "ERROR" }
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      })

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  })

  return (
    <form action={formAction} className="startup-form">
      {/* <div>
        <label htmlFor="originalWord" className="startup-form_label">
          Original Word
        </label>
        <Input
          id="originalWord"
          name="originalWord"
          className="startup-form_input"
          required
          placeholder="Original Word"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="originalWordDescription" className="startup-form_label">
        Original Word Description
        </label>
        <Textarea
          id="originalWordDescription"
          name="originalWordDescription"
          className="startup-form_textarea"
          required
          placeholder="Original Word Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="translation" className="startup-form_label">
        Translation
        </label>
        <Textarea
          id="translation"
          name="translation"
          className="startup-form_textarea"
          required
          placeholder="Translation"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="translation" className="startup-form_label">
        Translation Description
        </label>
        <Textarea
          id="translation"
          name="translation"
          className="startup-form_textarea"
          required
          placeholder="Translation Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="Word image URL" className="startup-form_label">
        Word image URL
        </label>
        <Input
          id="Word image URL"
          name="Word image URL"
          className="startup-form_input"
          required
          placeholder="Word image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div> */}

      {/* <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div> */}

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StartupForm
