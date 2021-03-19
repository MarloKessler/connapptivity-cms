import "./style.css"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { IoIosPeople } from "react-icons/io"
import { CgWebsite } from "react-icons/cg"
import { IoHomeOutline, IoNewspaperOutline } from "react-icons/io5"
import { FiExternalLink, FiPlus } from "react-icons/fi"
import { HiOutlineViewGrid } from "react-icons/hi"


export default Sidebar


function Sidebar() {
    const [currentPage, setCurrentPage] = useState()
    const history = useHistory()

    useEffect(() => {
        const updateCurrentPage = () => {
            const path = window.location.pathname
            if (path === process.env.REACT_APP_PATH_HOME) setCurrentPage(SidebarPages.viewSite)
            else if (path.startsWith(process.env.REACT_APP_PATH_POSTSOVERVIEW)) setCurrentPage(SidebarPages.postsOverview)
            else if (path.startsWith(process.env.REACT_APP_PATH_PAGESOVERVIEW)) setCurrentPage(SidebarPages.pagesOverview)
            else if (path.startsWith(process.env.REACT_APP_PATH_MEDIA_CENTER)) setCurrentPage(SidebarPages.mediaCenter)
            else if (path.startsWith(process.env.REACT_APP_PATH_AUTHORSOVERVIEW)) setCurrentPage(SidebarPages.authors)
        }
        history.listen(updateCurrentPage)
        updateCurrentPage()
    }, [history])

    return (
        <div id="sidebar">
            <MenuGroup>
                <ItemElement 
                    link={ process.env.REACT_APP_PATH_VIEW_SITE } 
                    linkLabel="Seite anzeigen" 
                    linkIcon={ <IoHomeOutline/> } 
                    secondaryLink={ process.env.REACT_APP_FRONTEND_URL } 
                    secondaryLinkIcon={ <FiExternalLink/> } 
                    secondaryLinkTitle="Seite in neuem Tab öffnen"
                    secondaryIsExternal={ true }
                    isSelected={ currentPage === SidebarPages.viewSite }
                />
            </MenuGroup>
            <MenuGroup title="Content">
                <ItemElement 
                    link={ process.env.REACT_APP_PATH_POSTSOVERVIEW } 
                    linkLabel="Posts" 
                    linkIcon={ <IoNewspaperOutline/> }
                    secondaryLink={ `${process.env.REACT_APP_PATH_POSTSOVERVIEW}${process.env.REACT_APP_PATH_CREATE_POST}` }
                    secondaryLinkIcon={ <FiPlus/> }
                    secondaryLinkTitle="Neuen Post erstellen"
                    isSelected={ currentPage === SidebarPages.postsOverview }
                />
                <ItemElement 
                    link={ process.env.REACT_APP_PATH_PAGESOVERVIEW } 
                    linkLabel="Seiten" 
                    linkIcon={ <CgWebsite/> }
                    isSelected={ currentPage === SidebarPages.pagesOverview }
                />
                <ItemElement 
                    link={ process.env.REACT_APP_PATH_MEDIA_CENTER } 
                    linkLabel="Media Center" 
                    linkIcon={ <HiOutlineViewGrid/> }
                    isSelected={ currentPage === SidebarPages.mediaCenter }
                />
                <ItemElement 
                    link={ process.env.REACT_APP_PATH_AUTHORSOVERVIEW } 
                    linkLabel="Authoren" 
                    linkIcon={ <IoIosPeople/> }
                    isSelected={ currentPage === SidebarPages.authors }
                />
            </MenuGroup>
        </div>
    )
}


function MenuGroup({ title, children }) {
    return (
        <div className="menu-group">
            { title && <div className="mg-title">{ title }</div> }
            <div className="mg-items">{ children }</div>
        </div>
    )
}


function ItemElement({ link, linkLabel, linkIcon, isExternal, secondaryLink, secondaryLinkIcon, secondaryLinkTitle, secondaryIsExternal, isSelected }) {
    return (
        <div className={`item-element ${isSelected ? "selected" : ""}`}>
            { isExternal
                ? <a href={ link } className="primary-link" title={ linkLabel }>
                    <div className="primary-icon">{ linkIcon }</div>
                    <div className="primary-label">{ linkLabel }</div>
                </a>
                : <Link className="primary-link" title={ linkLabel } to={ link }>
                    <div className="primary-icon">{ linkIcon }</div>
                    <div className="primary-label">{ linkLabel }</div>
                </Link>
            }
            
            { (secondaryLink && secondaryLinkIcon) &&
                (secondaryIsExternal
                    ? <a href={ secondaryLink } className="secondary-link" title={ secondaryLinkTitle } target="blank">{ secondaryLinkIcon }</a>
                    : <Link className="secondary-link" title={ secondaryLinkTitle } to={ secondaryLink }>{ secondaryLinkIcon }</Link>
                )
            }
        </div>
    )
}


const SidebarPages = {
    viewSite:      "viewSite",
    postsOverview: "posts",
    pagesOverview: "pages",
    mediaCenter:   "mediaCenter",
    authors:       "authors",
}