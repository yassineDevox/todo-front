import { useEffect } from "react"
const useCdn = (cssCDN)=>{

    useEffect(() => {
        let _headContent = document.querySelector("head").innerHTML
    
        document.querySelector("head").innerHTML =
            `<link  rel="stylesheet" href=${cssCDN} />` + _headContent
    
        return () => document.querySelector("head link:first-child").remove()
    
    }, [])
}
export default useCdn
