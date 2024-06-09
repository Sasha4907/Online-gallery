import { twMerge } from "tailwind-merge"

export default function Input({ className, ...settings }) {
  return (
    <input {...settings} className={twMerge("bg-gray-300 rounded-full px-4 py-2", className)}/>
  )
}