import "./style.css"
import { useEffect, useState } from "react"
import { usePopper } from "react-popper"
import { FiChevronDown } from "react-icons/fi"
import Cloud from "../../../../apps/Cloud"
import { LoadingSpinner } from "../../../util-elements"
import AuthorImage from "../../../AuthorImage"


export default AuthorInput


function AuthorInput({ author, onChange }) {
    // Add popperjs
    const [chevron, setChevron] = useState()
    const [authorsPane, setAuthorsPane]             = useState()
    const { styles, attributes, update } = usePopper(chevron, authorsPane, {
        modifiers: [
            { name: 'preventOverflow', options: { padding: 5 }},
            { name: 'offset', options: { offset: [0, 5] }},
        ]
    })

    const toggleAuthorsPane = () => {
        authorsPane.classList.toggle("show")
        update()
    }

    const handleSelectAuthor = author => {
        toggleAuthorsPane()
        delete author.first_name
        delete author.surname
        onChange(author)
    }
    
    return (
        <div>
            <div className="author-input" ref={ setChevron } onClick={ toggleAuthorsPane }>
                { author && <AuthorCard author={ author }/> }
                <FiChevronDown/>
            </div>
            <AuthorsPane onSelect={ handleSelectAuthor } elementRef={ setAuthorsPane } style={ styles.popper } {...attributes.popper}/>
        </div>
    )
}


function AuthorsPane({ onSelect: select, elementRef, ...props }) {
    const [authors, setAuthors] = useState()
    const [filteredAuthors, setFilteredAuthors] = useState()
    
    useEffect(() => {
        Cloud.database().getAuthors()
        .then(authors => {
            setAuthors(authors)
            setFilteredAuthors(authors)
        })
        .catch(() => setAuthors(null))
    }, [])

    const handleSearch = event => {
        const searchString = event.target.value.toLowerCase()
        const filteredArray = authors.filter(author => {
            const authorString = author.full_name.toLowerCase()
            return authorString.includes(searchString)
        })
        setFilteredAuthors(filteredArray)
    }

    return (
        <div className="authors-pane" ref={ elementRef } { ...props }>
            { filteredAuthors
                ? <div className="ap-list">
                    <div className="search-input-container">
                        <input type="text" placeholder="Suchen…" onInput={ handleSearch }/>
                    </div>
                    { filteredAuthors.map((author, index) => <AuthorCard author={ author } onClick={() => select(author)} key={ index }/>)}
                  </div>
                  
                : authors === null
                    ? <p>Autoren konnten nicht geladen werden</p> 
                    : <LoadingSpinner className="ap-loading-spinner"/>
            }
        </div>
    )
}


function AuthorCard({ author, onClick, ...props }) {
    return (
        <div className={ `author-card ${onClick ? "clickable" : ""}` } onClick={ onClick } { ...props }>
            <AuthorImage authorID={ author.id } alt={ author.full_name } estimatedWidth="40px"/>
            <small className="author-name">{ author.full_name }</small>
        </div>
    )
}