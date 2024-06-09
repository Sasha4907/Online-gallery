import { twMerge } from "tailwind-merge"

export default function Textarea({ className, ...settings }) {
  return (
    <textarea {...settings} className={twMerge("bg-gray-300 px-4 py-2", className)}/>
  )
}