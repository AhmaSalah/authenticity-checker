import { toast } from "sonner"

interface RequestOptions extends RequestInit {
    retries?: number
    timeout?: number
    useMockFallback?: boolean
}

const DEFAULT_RETRIES = 3
const DEFAULT_TIMEOUT = 10000 // 10 seconds

async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function apiClient<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const {
        retries = DEFAULT_RETRIES,
        timeout = DEFAULT_TIMEOUT,
        useMockFallback = true,
        ...fetchOptions
    } = options

    let attempt = 0

    while (attempt < retries) {
        try {
            const controller = new AbortController()
            const id = setTimeout(() => controller.abort(), timeout)

            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            })

            clearTimeout(id)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return await response.json()
        } catch (error: any) {
            attempt++
            console.warn(`Attempt ${attempt} failed:`, error)

            if (attempt === retries) {
                if (useMockFallback && process.env.NEXT_PUBLIC_USE_MOCK === "true") {
                    console.info("Falling back to mock response due to failure")
                    // In a real scenario, you might want to return a specific mock structure here
                    // For now, we'll re-throw to let the component handle it or return a generic error
                    throw error
                }
                throw error
            }

            // Exponential backoff
            await wait(Math.pow(2, attempt) * 1000)
        }
    }

    throw new Error("Max retries reached")
}
