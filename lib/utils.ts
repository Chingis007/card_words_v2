import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response))
}
export async function uploadImageAndReturnUrl(oneFile: File) {
  let formData = new FormData()
  formData.append("file", oneFile)
  formData.append("upload_preset", `${process.env.CLOUDINARY_UPLOAD_PRESET}`)
  let url = new URL(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
  )
  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const resText = await response.json()
      return resText
    })
    .catch((error) => {
      console.log(error)
    })
}
