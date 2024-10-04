import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
}

function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg shadow-md p-4", className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h2 className={cn("text-xl font-bold", className)}>
      {children}
    </h2>
  )
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-gray-500", className)}>
      {children}
    </p>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4", className)}>
      {children}
    </div>
  )
}
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
