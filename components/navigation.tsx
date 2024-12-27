'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home,
  BookOpen,
  Library,
  Settings,
  Music2,
  Brain,
  MessageSquare,
  User,
  Sparkles,
  GraduationCap
} from "lucide-react"

const routes = [
  {
    href: "/dashboard",
    label: "Home",
    icon: Home
  },
  {
    href: "/library",
    label: "Library",
    icon: Library
  },
  {
    href: "/practice",
    label: "Practice",
    icon: Sparkles
  },
  {
    href: "/courses",
    label: "Courses",
    icon: GraduationCap
  },
  {
    href: "/community",
    label: "Community",
    icon: MessageSquare
  }
]

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-purple-500/20">
      <div className="flex items-center justify-between h-16 px-4 max-w-md mx-auto">
        <Link href="/landing" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Music2 className="h-5 w-5 text-purple-400" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            The Schumann
          </span>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-purple-400">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-purple-500/20">
      <div className="flex items-center justify-around h-16 px-4 max-w-md mx-auto">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full",
              pathname === route.href 
                ? "text-purple-400" 
                : "text-zinc-400 hover:text-purple-400 transition-colors"
            )}
          >
            {route.href === "/practice" ? (
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 -mt-8 shadow-lg shadow-purple-500/20">
                <route.icon className="h-7 w-7 text-white animate-pulse" />
              </div>
            ) : (
              <>
                <route.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{route.label}</span>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}