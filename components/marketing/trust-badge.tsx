import { Shield, Award, Lock } from "lucide-react"

interface TrustBadgeProps {
  variant?: 'iso' | 'security' | 'quality'
  className?: string
}

export function TrustBadge({ variant = 'iso', className = '' }: TrustBadgeProps) {
  const badges = {
    iso: {
      icon: Award,
      title: 'ISO 9001:2015',
      subtitle: 'Certified Quality',
      color: 'text-blue-600',
    },
    security: {
      icon: Lock,
      title: '256-bit Encryption',
      subtitle: 'Secure Upload',
      color: 'text-green-600',
    },
    quality: {
      icon: Shield,
      title: 'Medical Grade',
      subtitle: 'Precision Standards',
      color: 'text-accent',
    },
  }

  const badge = badges[variant]
  const Icon = badge.icon

  return (
    <div className={`inline-flex items-center gap-3 rounded-lg border border-border bg-card p-4 ${className}`}>
      <div className={`rounded-full bg-background p-2 ${badge.color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-left">
        <div className="font-semibold text-sm text-foreground">{badge.title}</div>
        <div className="text-xs text-muted-foreground">{badge.subtitle}</div>
      </div>
    </div>
  )
}
