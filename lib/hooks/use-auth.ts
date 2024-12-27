import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserProgress } from "../store/user-progress"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userProgress = useUserProgress()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    progress: userProgress,
  }
}