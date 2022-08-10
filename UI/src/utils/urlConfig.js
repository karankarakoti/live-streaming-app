export const baseUrl = window.location.hostname === "localhost" ? "http://192.168.1.10:2000" : ""
//Replace BaseUrl with appUrl
export const api = `${baseUrl}/api`

export const generatePublicUrl = (filename) => {
    return `${baseUrl}/public/${filename}`
}