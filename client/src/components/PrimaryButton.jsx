import { twMerge } from "tailwind-merge"

export default function PrimaryButton({ className, children }) {
  return (
    <button className={twMerge("w-[200px] px-4 py-3 text-xl text-white font-caladea rounded-full hover:bg-orange-700", className)}>{children}</button>
  )
}