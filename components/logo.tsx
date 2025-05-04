import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { width: 24, height: 24, textClass: "text-lg" },
    md: { width: 32, height: 32, textClass: "text-xl" },
    lg: { width: 40, height: 40, textClass: "text-2xl" },
  }

  const { width, height, textClass } = sizes[size]

  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <Image src="/logo.png" alt="Lunexa IA" width={width} height={height} className="rounded-full" />
      {showText && (
        <span className={`font-semibold ${textClass}`}>
          Lunexa <span className="text-lunexa-blue">IA</span>
        </span>
      )}
    </Link>
  )
}
