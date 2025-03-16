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
import React, { useState, useActionState, useCallback, useRef } from "react"
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
import Dropzone from "react-dropzone"
import { UploadIcon, Trash2Icon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"
import { T } from "unstorage/dist/shared/unstorage.C1TxcX_u"
import Compressor from "compressorjs"

const NewDeckForm = (props: { author_id: number }) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File | undefined>(
    undefined
  )
  const [value1, setValue1] = useState<string | undefined>(undefined)
  const [value2, setValue2] = useState<string | undefined>(undefined)
  const [key, setKey] = useState(0)
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
  function dropHandler(ev: any) {
    console.log("File(s) dropped")

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      ;[...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile()
          console.log(`… file[${i}].name = ${file.name}`)
        }
      })
    } else {
      // Use DataTransfer interface to access the file(s)
      ;[...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`)
      })
    }
  }
  const inputRef = useRef(null)
  function dragOverHandler(ev: any) {
    console.log("File(s) in drop zone")

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
  }
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
        props.author_id,
        acceptedFiles
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
        setKey(key + 1)
        setValue1(undefined)
        setValue2(undefined)
        // console.log("result.returnedDecksId", result.returnedDecksId)
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
        {/* <div className="flex flex-col justify-center items-center text-xl border-1 p-2 rounded-xl border-black"> */}
        {/* <Input
            id="image"
            name="image"
            className="mb-4 border-[3px] border-gray-500  rounded-full px-5 py-7 text-[18px] text-black font-semibold"
            required
            placeholder="URL"
          />
          OR */}
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

        {/* <Dropzone
          onDrop={(newFiles) => {
            setAcceptedFiles(newFiles)
            console.log(newFiles)
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone> */}

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

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
        {/* </div> */}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          // required
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
          // required
          // onValueChange={field.onChange}
          // defaultValue={field.value}
        >
          <SelectTrigger className="w-[180px]" id="primelanguage">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent className="z-10 bg-white">
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
          // required
          // onValueChange={field.onChange}
          // defaultValue={field.value}
        >
          <SelectTrigger className="w-[180px]" id="translate">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent className="z-10 bg-white">
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
