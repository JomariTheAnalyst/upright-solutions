import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export function Heading({
  as: Component = "h2",
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "font-heading font-bold tracking-tight text-foreground",
        {
          "text-4xl sm:text-5xl lg:text-6xl": Component === "h1",
          "text-3xl sm:text-4xl": Component === "h2",
          "text-2xl sm:text-3xl": Component === "h3",
          "text-xl sm:text-2xl": Component === "h4",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Text({
  as: Component = "p",
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("font-body text-base text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
