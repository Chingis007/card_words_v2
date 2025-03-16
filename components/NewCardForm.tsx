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
import React, { useState, useActionState, useRef } from "react"
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
import { createNewCard } from "@/lib/queries/createNewCard"
// import { unSaveDeck } from "@/lib/actions"
// import { createPitch } from "@/lib/actions";
// import {
//   Dropzone,
//   DropZoneArea,
//   DropzoneDescription,
//   DropzoneFileList,
//   DropzoneFileListItem,
//   DropzoneMessage,
//   DropzoneRemoveFile,
//   DropzoneTrigger,
//   useDropzone,
// } from "@/components/ui/dropzone"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"
const NewCardForm = (props: { deckId: number }) => {
  // const [value1, setValue1] = useState<string | undefined>(undefined)
  // const [value2, setValue2] = useState<string | undefined>(undefined)
  // const [key, setKey] = useState(+new Date())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()
  // const dropzone = useDropzone({
  //   onDropFile: async (file: File) => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     return {
  //       status: "success",
  //       result: URL.createObjectURL(file),
  //     }
  //   },
  //   validation: {
  //     accept: {
  //       "image/*": [".png", ".jpg", ".jpeg"],
  //     },
  //     maxSize: 10 * 1024 * 1024,
  //     maxFiles: 1,
  //   },
  //   shiftOnMaxFiles: true,
  // })
  const inputRef = useRef(null)

  // const theFile = dropzone.fileStatuses[0]?.file
  // console.log(theFile)
  // const avatarSrc = dropzone.fileStatuses[0]?.result
  // console.log(avatarSrc)
  // const isPending2 = dropzone.fileStatuses[0]?.status === "pending"
  // console.log(isPending2)
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
  const [acceptedFiles, setAcceptedFiles] = useState<File | undefined>(
    undefined
  )
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    // const data: z.infer<typeof formSchema> ={}
    // const actualdata = {
    //   ...data,
    //   ownerId : props.author_id}
    try {
      //   // const formValues = {
      //   //   originalWord: formData.get("originalWord") as string,
      //   //   originalWordDescription: formData.get(
      //   //     "originalWordDescription"
      //   //   ) as string,
      //   //   translation: formData.get("translation") as string,
      //   //   translationDescription: formData.get(
      //   //     "translationDescription"
      //   //   ) as string,
      //   //   category: formData.get("category") as string,
      //   //   link: formData.get("link") as string,
      //   // }
      //   // await formSchema.parseAsync(formValues)

      let result = await createNewCard(
        prevState,
        formData,
        props.deckId,
        acceptedFiles
        // values.image,
        // values.title,
        // values.description,
        // values.primelanguage,
        // values.translate,
        // props.deckId
      )
      //   // const result = await createPitch(prevState, formData, pitch);
      //   // let result: any = await unSaveDeck(_id, deckId)
      if (result?.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your word card has been created successfully",
        })
        // setKey(+new Date())
        // setValue1(undefined)
        // setValue2(undefined)
        router.push(`/deck/${props.deckId}`)
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
        <label htmlFor="image" className="startup-form_label">
          Card Image
        </label>
        {/* <Input
          id="image"
          name="image"
          className="startup-form_input"
          required
          placeholder="URL"
        /> */}
        {/* <Dropzone {...dropzone}>
          <div className="flex flex-row justify-between">
            <DropzoneMessage />
          </div>
          <DropZoneArea className="flex w-full border-[3px] border-black rounded-full">
            <DropzoneTrigger className="flex w-full gap-8 bg-transparent text-sm justify-center items-center hover:bg-gray-200">
              <Avatar className={cn(isPending2 && "animate-pulse")}>
                <AvatarImage
                  className="object-cover max-w-[100px] max-h-[100px]"
                  src={avatarSrc}
                />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 font-semibold">
                <p>Upload a new image</p>
                <p className="text-xs text-muted-foreground">
                  Please select an image smaller than 10MB
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </Dropzone> */}
        <div
          id="drop_zone"
          // className="border-black border-[5px] w-[200px] h-[100px]"
          className="flex w-full border-[3px] border-black rounded-full justify-center items-center h-[120px]"
          onClick={(e) => {
            e.stopPropagation()
            if (inputRef.current) {
              let target = inputRef.current as HTMLInputElement
              target.click()
            }
          }}
          onDrop={(ev) => {
            ev.preventDefault()
            if (ev.dataTransfer.items) {
              if (ev.dataTransfer.items[0].kind === "file") {
                let data = ev.dataTransfer.items[0].getAsFile()
                if (data instanceof File) {
                  new Compressor(data, {
                    quality: 0.6,
                    success(result) {
                      if (result instanceof File) {
                        setAcceptedFiles(result)
                      } else {
                        let file = new File([result], `${data.name}`)
                        setAcceptedFiles(file)
                      }
                    },
                    error(err) {
                      console.log(err.message)
                    },
                  })
                }
              }
              //   ev.dataTransfer.items[0].kind
              //   ;[...ev.dataTransfer.items].forEach((item, i) => {
              //     if (item.kind === "file") {
              //       const file = item.getAsFile()
              //     }
              //   })
              // } else {
              //   ;[...ev.dataTransfer.files].forEach((file, i) => {})
            }
          }}
          onDragOver={(ev) => {
            ev.preventDefault()
          }}
        >
          <input
            type="file"
            id="dropzone_input"
            hidden
            ref={inputRef}
            onChange={(ev) => {
              ev.preventDefault()
              let target = ev.target as HTMLInputElement
              if (target.files) {
                if (target.files[0]) {
                  new Compressor(target.files[0], {
                    quality: 0.6,
                    success(result) {
                      if (result instanceof File) {
                        setAcceptedFiles(result)
                      } else {
                        let file = new File(
                          [result],
                          `${target.files![0].name}`
                        )
                        setAcceptedFiles(file)
                      }
                    },
                    error(err) {
                      console.log(err.message)
                    },
                  })
                }
              }
            }}
          />
          {acceptedFiles ? (
            <img
              className="max-w-[114px] max-h-[114px]"
              src={URL.createObjectURL(acceptedFiles)}
              alt=""
            />
          ) : (
            <p className="flex justify-center items-center h-[114px]">
              SELECT OR DROP IMAGE HERE
            </p>
          )}
        </div>
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="originalword" className="startup-form_label">
          Original Word
        </label>
        <Input
          id="originalword"
          name="originalword"
          className="startup-form_input"
          required
          placeholder="Type Original Word"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="originalworddescription" className="startup-form_label">
          Original Word Description
        </label>
        <Textarea
          id="originalworddescription"
          name="originalworddescription"
          className="startup-form_textarea"
          // required
          placeholder="Description"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="translation" className="startup-form_label">
          Translation
        </label>
        <Input
          id="translation"
          name="translation"
          className="startup-form_input"
          required
          placeholder="Type Translation"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="translationdescription" className="startup-form_label">
          Translation Description
        </label>
        <Textarea
          id="translationdescription"
          name="translationdescription"
          className="startup-form_textarea"
          // required
          placeholder="Translation Description"
        />
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

export default NewCardForm
