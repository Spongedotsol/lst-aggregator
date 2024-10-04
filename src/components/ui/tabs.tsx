import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue?: string
  children: React.ReactNode
}

interface TabsContextProps {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = React.createContext<TabsContextProps | undefined>(undefined)

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "")

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("tabs-list flex space-x-2", className)}>
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)!

  const isActive = activeTab === value

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg focus:outline-none",
        isActive ? "bg-white text-purple-900" : "bg-gray-800 text-white",
        className
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext)!

  if (activeTab !== value) return null

  return <div className="tabs-content mt-4">{children}</div>
}

// export { Tabs, TabsList, TabsTrigger, TabsContent }
