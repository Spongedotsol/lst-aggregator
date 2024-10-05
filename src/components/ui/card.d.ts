declare module "@/components/ui/card" {
    export const Card: React.FC<{ className?: string; children: React.ReactNode }>
    export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }>
    export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }>
    export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }>
    export const CardContent: React.FC<{ className?: string; children: React.ReactNode }>
    export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }>
  }
  