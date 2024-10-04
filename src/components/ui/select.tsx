import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps {
  children: React.ReactNode
}

export function Select({ children }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)
  const closeSelect = () => setIsOpen(false)

  return (
    <div className="relative">
      <SelectContext.Provider value={{ isOpen, toggleOpen, closeSelect }}>
        {children}
      </SelectContext.Provider>
    </div>
  )
}

const SelectContext = React.createContext<{
  isOpen: boolean
  toggleOpen: () => void
  closeSelect: () => void
} | null>(null)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select provider.")
  }
  return context
}

interface SelectTriggerProps {
  children: React.ReactNode
  id: string
  className?: string
}

export function SelectTrigger({ children, id, className }: SelectTriggerProps) {
  const { toggleOpen } = useSelectContext()
  return (
    <button
      id={id}
      type="button"
      onClick={toggleOpen}
      className={cn(
        "inline-flex items-center justify-between w-full px-3 py-2 rounded-md border focus:outline-none",
        className
      )}
    >
      {children}
    </button>
  )
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

export function SelectContent({ children, className }: SelectContentProps) {
  const { isOpen } = useSelectContext()

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "absolute z-10 mt-2 w-full bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5",
        className
      )}
    >
      {children}
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export function SelectItem({ value, children }: SelectItemProps) {
  const { closeSelect } = useSelectContext()

  const handleClick = () => {
    console.log(value)
    closeSelect()
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-700 text-white"
    >
      {children}
    </div>
  )
}

interface SelectValueProps {
  placeholder?: string
  className?: string
}

export function SelectValue({ placeholder, className }: SelectValueProps) {
  // Example placeholder value, ideally you would store the selected value in state
  const selectedValue = placeholder

  return (
    <span className={cn("text-sm", className)}>
      {selectedValue}
    </span>
  )
}
