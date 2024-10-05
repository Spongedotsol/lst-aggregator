import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "danger"
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const variantClasses = {
      primary: "bg-purple-600 text-white hover:bg-purple-700",
      outline: "border border-white text-white hover:bg-white hover:text-purple-900",
      secondary: "bg-gray-700 text-white hover:bg-gray-800",
      danger: "bg-red-600 text-white hover:bg-red-700",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
