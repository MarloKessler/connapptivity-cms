import { useState, useEffect } from "react"
import Cloud from "../../Cloud"

export { Image }

// onLoadingError has no default value, cause it is used in a React hook and thus would cause a circular dependency resulting in an infinite loop of rendering.
function Image({ path, alt, imageSizes, className = "", onClick = () => {}, onLoaded = () => {}, onLoadingError, ...props }) {
    const style = Object.assign((props.style || {}), { width: "100%", height: "100%" })

    const [urlSet, setUrlSet] = useState()
    
    useEffect(() => {
        Cloud.storage().getImageUrlSetFor(path)
        .then(imgUrl => setUrlSet(imgUrl))
        .catch(error => onLoadingError && onLoadingError(error))
    }, [path, onLoadingError])

    const sizesAttributeString = imageSizes
    ? `
        ${imageSizes.xs || "100vw"}, 
        (min-width: 600px) ${imageSizes.s || "100vw"}, 
        (min-width: 900px) ${imageSizes.m || "100vw"}, 
        (min-width: 1200px) ${imageSizes.l || "100vw"}, 
        (min-width: 1800px) ${imageSizes.xl || "100vw"}
    ` 
    : `
        "100vw", 
        (min-width: 600px) "100vw", 
        (min-width: 900px) "100vw", 
        (min-width: 1200px) "100vw", 
        (min-width: 1800px) "100vw"
    `
    // Ab 520px width -> 1200px
    function getSrcSetFor(urls) {
        const srcSetString = `
            ${ urls.xs } 599w, 
            ${ urls.s } 899w, 
            ${ urls.m } 1199w, 
            ${ urls.l } 1799w, 
            ${ urls.xl }
        `
        return srcSetString
    }

    return (
        urlSet 
        ? <picture>
            {/*<source 
                type="image/webp" 
                srcSet={ getSrcSetFor(urlSet.webp) } 
                sizes={ sizesAttributeString } 
            />*/}

            <img 
                className={ "image " + className }
                type="image/jpeg" 
                srcSet={ getSrcSetFor(urlSet.jpeg) }
                sizes={ sizesAttributeString }
                src={ urlSet.jpeg.m }
                alt={ alt } 
                style={ style }
                onClick={ onClick }
                onLoad={ onLoaded }
                onError={ onLoadingError }
            />
          </picture>
        : <div/>
    )
}