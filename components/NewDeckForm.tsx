"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import React, { useState, useActionState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
// import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
// import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createNewDeck } from "@/lib/queries/createNewDeck"
// import { unSaveDeck } from "@/lib/actions"
// import { createPitch } from "@/lib/actions";

const NewDeckForm = (props: { author_id: number }) => {
  const [value1, setValue1] = useState<string | undefined>(undefined)
  const [value2, setValue2] = useState<string | undefined>(undefined)
  const [key, setKey] = useState(+new Date())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    image: z.string().min(4, "Please enter a valid value").optional(),
    description: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    primelanguage: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    translate: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    // const data: z.infer<typeof formSchema> ={}
    // const actualdata = {
    //   ...data,
    //   ownerId : props.author_id}
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
      // }
      // await formSchema.parseAsync(formValues)

      let result = await createNewDeck(
        prevState,
        formData,
        props.author_id
        // values.image,
        // values.title,
        // values.description,
        // values.primelanguage,
        // values.translate,
        // props.author_id
      )
      // const result = await createPitch(prevState, formData, pitch);
      // let result: any = await unSaveDeck(_id, author_id)
      if (result?.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your word card has been created successfully",
        })
        setKey(+new Date())
        setValue1(undefined)
        setValue2(undefined)
        console.log("result.returnedDecksId", result.returnedDecksId)
        router.push(`/deck/${result.returnedDecksId}`)
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
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: "",
  //   },
  // })
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   let result = await createNewDeck(
  //     values.image,
  //     values.title,
  //     values.description,
  //     values.primelanguage,
  //     values.translate,
  //     props.author_id
  //   )
  // }
  return (
    // <Form {...form}>
    <form
      action={formAction}
      // onSubmit={formAction}
      className="flex w-[70%] gap-2 flex-col"
    >
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Deck Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="image" className="startup-form_label">
          Deck Main Image
        </label>
        <Input
          id="image"
          name="image"
          className="startup-form_input"
          required
          placeholder="URL"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Description"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="primelanguage" className="startup-form_label">
          Prime Language
        </label>
        <Select
          key={key}
          name="primelanguage"
          value={value1}
          // onValueChange={field.onChange}
          // defaultValue={field.value}
        >
          <SelectTrigger className="w-[180px]" id="primelanguage">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ua">UA</SelectItem>
            <SelectItem value="usa">USA</SelectItem>
          </SelectContent>
        </Select>

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="translate" className="startup-form_label">
          Translate To
        </label>
        <Select
          value={value2}
          key={key}
          name="translate"
          // onValueChange={field.onChange}
          // defaultValue={field.value}
        >
          <SelectTrigger className="w-[180px]" id="translate">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ua">UA</SelectItem>
            <SelectItem value="usa">USA</SelectItem>
          </SelectContent>
        </Select>

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
    // </Form>
  )
}

export default NewDeckForm
