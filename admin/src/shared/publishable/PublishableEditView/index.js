import "./style.css"
import { Component, useEffect, useState } from "react"
import { useHistory, withRouter } from "react-router"
import { usePopper } from "react-popper"
import { FiChevronLeft, FiSave, FiShare } from "react-icons/fi"
import { KingsEditor, KingsEditable, KingsToolbar } from "../../../apps/KingsEditor"
import { ImageSelectionUI } from "../../../apps/MediaCenter"
import { LoadingErrorView } from "../../util-elements"
import { PublicationState } from "../PublicationState"
import Publishable from "../Publishable"

import PublishMenu, { PublishingOption } from "./PublishMenu"
import AuthorInput from "./AuthorInput"
import TitleInput from "./TitleInput"
import TagsInput from "./TagsInput"


class EditView extends Component {
    constructor(props) {
        super(props)

        this.onLoad = props.onLoad
        this.onSave = props.onSave
        this.onDelete = props.onDelete
        this.isNewPublishable = props.isNewPublishable
        this.publishableOverviewPath = props.publishableOverviewPath
        this.labels = props.labels

        this.history = props.history
        this.state = {}

        this.imageSizes = {
            xs: "100vw",
            s: "100vw",
            m: "750px",
            l: "750px",
            xl: "750px",
        }
    }


    componentDidMount() {
        this.toggleSidbar()
        if (this.isNewPublishable) this.createPublishable()
        else this.loadPublishable()
        this.startAutosave()
    }

    componentWillUnmount() {
        this.toggleSidbar()
        clearInterval(this.autosaveInterval)
    }


    toggleSidbar() {
        const sidebar = document.getElementById("sidebar")
        if (sidebar) sidebar.classList.toggle("hide")
    }


    createPublishable() {
        const publishable = Publishable.create()
        this.setState(() => ({
            publishable:           publishable,
            author:                publishable.author,
            publishableTitle:      publishable.title,
            publishableTitleImage: publishable.title_image,
            publishableContent:    publishable.content,
            tags:                  publishable.tags,
        }))
    }

    loadPublishable() {
        this.onLoad()
        .then(publishableDict => {
            const publishable = new Publishable(publishableDict)
            this.setState(() => ({
                publishable:           publishable,
                author:                publishable.author,
                publishableTitle:      publishable.title,
                publishableTitleImage: publishable.title_image,
                publishableContent:    publishable.content,
                tags:                  publishable.tags,
            }))
        })
        .catch(() => this.setState(state => ({
                publishable:           null,
                author:                null,
                publishableTitle:      null,
                publishableTitleImage: null,
                publishableContent:    undefined,
                tags:                  null,
            }))
        )
    }


    onSelectPublishOption(option, date) {
        switch (option) {
            case PublishingOption.publishNow:
                this.savePublishable(new Date())
                break
            case PublishingOption.schedule:
                this.savePublishable(date)
                break
            case PublishingOption.update: 
                this.savePublishable()
                break
            case PublishingOption.unpublish:
                this.savePublishable(null)
                break
            default: throw Error("Selected option does not match any PublishOption")
        }
    }


    savePublishable(publicationDate) {
        const publishable = this.state.publishable
        publishable.author      = this.state.author
        publishable.title       = this.state.publishableTitle
        publishable.title_image = this.state.publishableTitleImage
        publishable.content     = this.state.publishableContent
        publishable.tags        = this.state.tags
        if (publicationDate || publicationDate === null) publishable.publication_date = publicationDate

        this.setState(() => ({ peBarMessage: "Speichern …" }))
        return this.onSave(publishable)
        .then(() => {
            this.setState(() => ({ 
                peBarMessage: "Gespeichert",
                publishable: new Publishable(publishable.toJSON()),
            }))
        })
        .catch((error) => this.setState(() => ({ peBarMessage: "Fehler beim Speichern" })))
        .finally(() => setTimeout(() => this.setState(() => ({ peBarMessage: undefined })), 5000))
    }
    
    startAutosave() {
        // Autosave every 30 seconds if unpublished
        this.autosaveInterval = setInterval(() => { if (this.state.publishable && this.state.publishable.publication_state() !== PublicationState.published) this.savePublishable() }, 30000)
    }


    render() {
        return (
            <div className="publishable-edit-view">
                {
                    this.state.publishable
                        ? <KingsEditor value={ this.state.publishableContent } onChange={ value => this.setState(() => ({ publishableContent: value })) }>
                            <div className="pe-bar pe-status-bar">{ this.state.peBarMessage ? ` | ${this.state.peBarMessage}` : this.state.publishable && ` | ${getPublicationStatus(this.state.publishable)}` }</div>
                            
                            <header className="pe-bar pe-toolbar">
                                <button className="header-button back-link" onClick={ () => this.history.push(this.publishableOverviewPath) }><FiChevronLeft/> { this.labels.backButtonLabel }</button>
                                <KingsToolbar/>
                                { this.state.publishable.publication_state() !== PublicationState.published && <button className="header-button publish-menu-button" onClick={ () => this.savePublishable() }><FiSave/></button> }
                                <PublishMenuItem publishable={ this.state.publishable } onSelect={ this.onSelectPublishOption.bind(this) }/>
                            </header>
        
                            <section className="editable-container">
                                <div className="editable">
                                    <TitleInput value={ this.state.publishableTitle } onChange={ value => this.setState(() => ({ publishableTitle: value })) }/>
                                    <div className="publishable-meta-infos">
                                        <AuthorInput author={ this.state.author } onChange={ value => this.setState(() => ({ author: value })) }/>
                                        <FiShare className="publishable-share-options-button"/>
                                    </div>
                                    <ImageSelectionUI imageName={ this.state.publishableTitleImage } onChange={ value => this.setState(() => ({ publishableTitleImage: value })) } imageSizes={ this.imageSizes }/>
                                    <KingsEditable placeholder="Write something beautiful ..."/>
                                    <TagsInput tags={ this.state.tags } onChange={ value => this.setState(() => ({ tags: value })) } />

                                    <DeleteView onDelete={ this.onDelete.bind(this) } labels={ this.labels } publishableOverviewPath={ this.publishableOverviewPath }/>
                                </div>
                            </section>
                        </KingsEditor>
                        : this.state.publishable === null && <LoadingErrorView message={ this.labels.loadingErrorMessage } linkMessage={ this.labels.loadingErrorActionButton } link={ this.labels.loadingErrorActionPath }/>
                }
            </div>
        )
    }
}


export const PublishableEditView = withRouter(EditView)


function PublishMenuItem({ publishable, onSelect }) {
    // Add popperjs to PublishMenu
    const [publishingMenuButton, setPublishingMenuButton] = useState()
    const [publishingMenu, setPublishingMenu]             = useState()
    const { styles, attributes, update } = usePopper(publishingMenuButton, publishingMenu, {
        modifiers: [
            { name: 'preventOverflow', options: { padding: 5 }},
            { name: 'offset', options: { offset: [0, 15] }},
        ]
    })

    const togglePublishingMenu = () => {
        publishingMenu.classList.toggle("show")
        update()
    }

    const onSelectOption = (publishOption, date) => {
        togglePublishingMenu()
        onSelect(publishOption, date)
    }

    return (
        <div>
            <button className="header-button publish-menu-button" ref={ setPublishingMenuButton } onClick={ togglePublishingMenu }><FiShare/></button>
            <PublishMenu publishable={ publishable } elementref={ setPublishingMenu }  style={ styles.popper } {...attributes.popper} onSelect={ onSelectOption } onCancel={ togglePublishingMenu }/>
        </div>
    )
}


function DeleteView({ onDelete, labels, publishableOverviewPath }) {
    const history = useHistory()
    const [deletationState, setDeletationState] = useState(DeletationState.none)

    useEffect(() => {
        switch (deletationState) {
            case DeletationState.deleting:
                onDelete()
                .then(() => history.push(publishableOverviewPath))
                .catch(() => setDeletationState(DeletationState.error))
                break
            case DeletationState.error:
                setTimeout(() => setDeletationState(DeletationState.none), 5000)
                break
            default: break
        }
    }, [onDelete, publishableOverviewPath, history, deletationState])


    const getContent = () => {
        switch (deletationState) {
            case DeletationState.none: return <button className="dp-delete-btn" onClick={() => setDeletationState(DeletationState.confirm)}>{ labels.delete }</button>
            case DeletationState.deleting:
            case DeletationState.confirm: return (
                <div className="dp-confirmation-button-bar">
                    <p>{ labels.deleteConfirmation }</p>
                    <button className="dp-cancel-btn" disabled={ deletationState === DeletationState.deleting } onClick={() => setDeletationState(DeletationState.none)}>Abbrechen</button>
                    <button className="dp-confirm-delete-btn" disabled={ deletationState === DeletationState.deleting } onClick={() => setDeletationState(DeletationState.deleting)}>{ labels.delete }</button>
                </div>
            )
            case DeletationState.error: return labels.deletationError
            default: return <div></div>
        }
    }
    
    return <div className="delete-publishable-view">{ getContent() }</div>
}

const DeletationState = {
    none:     "none",
    confirm:  "confirm",
    deleting: "deleting",
    error:    "error",
}

function getPublicationStatus({ publication_state, publication_date }) {
    const publicationState = publication_state()
    const localizedDateString = new Intl.DateTimeFormat('de', { weekday: "long", year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(publication_date)
    switch(publicationState) {
        case PublicationState.draft: return "Entwurf"
        case PublicationState.scheduled: return `Geplant für ${localizedDateString}`
        case PublicationState.published: return `Veröffentlicht am ${localizedDateString}`
        default: return ""
    }
}