export const getPublicPath = (path: string): string => {
    const baseUrl:string = import.meta.env.BASE_URL || '/'
    const cleanPath:string = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
}