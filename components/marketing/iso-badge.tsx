import { Shield } from "lucide-react"

export function ISOBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm">
      <Shield className="h-4 w-4 text-accent" />
      <span className="font-medium text-foreground">ISO 9001:2015</span>
      <span className="text-muted-foreground">Certified</span>
    </div>
  )
}
