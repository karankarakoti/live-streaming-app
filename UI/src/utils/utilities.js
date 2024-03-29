import { config } from "./config";

export const isMobile = () => (typeof window !== "undefined" ? window.innerWidth <= 600 : false);
export const isTab = () => (typeof window !== "undefined" ? window.innerWidth <= 1024 : false);

export const scrollToTop = (window) =>{
  window.scrollTo({top: 0, left: 0, behavior: "smooth" })
}    

export const generatePublicUrl = (filename) => {  
  return `${config.BASE_URL}/public/${filename}`
}