export type SWIResponse = {
    status: 'OK' | 'FAILED'
    data?: any | null
    error?: string | unknown
}