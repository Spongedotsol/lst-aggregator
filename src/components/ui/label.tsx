import * as React from "react"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  htmlFor?: string
  className?: string
}

export function Label({ children, htmlFor, className, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-medium text-gray-300", className)}
      {...props}
    >
      {children}
    </label>
  )
}
