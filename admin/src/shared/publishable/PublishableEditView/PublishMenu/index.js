import "./style.css"
import { useEffect, useState } from "react"
import { DateTimePicker } from 'react-rainbow-components'
import { PublicationState } from "../../PublicationState"


export default PublishMenu


function PublishMenu({ publishable, elementref, className = "", onSelect, onCancel, ...props }) {
    const [publishingOption, setPublishingOption] = useState()
    const [publishingDate, setPublishingDate]     = useState()

    // Set publishingDate when publishable changes
    useEffect(() => setPublishingDate(publishable.publication_date || new Date()), [ publishable ])
    // Set publishingOption when publishable changes
    useEffect(() => setPublishingOption(getInitialPublishingOptionFor(publishable)), [ publishable ])

    const executePublishOption = () => onSelect(publishingOption, publishingOption === PublishingOption.schedule ? publishingDate : undefined)

    return (
        <div ref={ elementref } className={ `publish-menu ${className}`  } { ...props }>
            <table>
                <tbody>
                    { publishable.publication_state() !== PublicationState.published && <PublishNowTR publishingOption={ publishingOption } onSelect={ setPublishingOption }/> }
                    { publishable.publication_state() !== PublicationState.published && <ScheduleTR publishingOption={ publishingOption } onSelect={ setPublishingOption } publishingDate={ publishingDate } onChangePublishingDate={ setPublishingDate }/>}

                    { publishable.publication_state() === PublicationState.published && <UpdateTR publishingOption={ publishingOption } onSelect={ setPublishingOption }/> }
                    { publishable.publication_state() === PublicationState.published && <UnpublishTR publishingOption={ publishingOption } onSelect={ setPublishingOption }/>}
                </tbody>
            </table>                
            <div><button className="confirm-button" onClick={ executePublishOption }>{ (publishingOption && publishingDate) && getButtonLabelFor(publishingOption, publishingDate) }</button></div>
            <div><button className="cancel-button" onClick={ onCancel }>Abbrechen</button></div>
        </div>
    )
}


const getInitialPublishingOptionFor = publishable => {
    const publicationState = publishable.publication_state()
    switch(publicationState) {
        case PublicationState.draft: return PublishingOption.publishNow
        case PublicationState.scheduled: return PublishingOption.schedule
        case PublicationState.published: return PublishingOption.update
        default: throw Error("Publication state not assigned to an initial PublishingOption.")
    }
}


const getButtonLabelFor = option => {
    switch (option) {
        case PublishingOption.publishNow: return "Jetzt Veröffentlichen"
        case PublishingOption.schedule: return "Veröffentlichung planen"
        case PublishingOption.update: return "Update"
        case PublishingOption.unpublish: return "Veröffentlichung rückgängig machen"
        default: throw Error("Unknown PublishingOption.")
    }
}


const PublishNowTR = ({publishingOption, onSelect}) => {
    const onSelectOption = () => onSelect(PublishingOption.publishNow)
    return (
        <tr>
            <td className="radio-cell">
                <input type="radio" name="publish-option" value={ PublishingOption.publishNow } checked={ PublishingOption.publishNow === publishingOption } onChange={ onSelectOption }/>
            </td>
            <td className="option-cell">
                <span onClick={ onSelectOption }>Jetzt Veröffentlichen</span>
            </td>
        </tr>
    )
}


const ScheduleTR = ({publishingOption, onSelect, publishingDate, onChangePublishingDate}) => {
    const onSelectOption = () => onSelect(PublishingOption.schedule)
    
    return (
        <tr>
            <td className="radio-cell">
                <input type="radio" name="publish-option" value={ PublishingOption.schedule } checked={ PublishingOption.schedule === publishingOption } onChange={ onSelectOption }/>
            </td>
            <td className="option-cell">
                <span onClick={ onSelectOption }>Veröffentlichen am:</span>
                <DateTimePicker
                    className="dt-picker"
                    value={ publishingDate }
                    minDate={ new Date() }
                    hour24={ true }
                    locale={ "de" }
                    disabled={ PublishingOption.schedule !== publishingOption }
                    onChange={ onChangePublishingDate }
                />
            </td>
        </tr>
    )
}


const UpdateTR = ({publishingOption, onSelect}) => {
    const onSelectOption = () => onSelect(PublishingOption.update)
    return (
        <tr>
            <td className="radio-cell">
                <input type="radio" name="publish-option" value={ PublishingOption.update } checked={ PublishingOption.update === publishingOption } onChange={ onSelectOption }/>
            </td>
            <td className="option-cell">
                <span onClick={ onSelectOption }>Update veröffentlichen</span>
            </td>
        </tr>
    )
}


const UnpublishTR = ({publishingOption, onSelect}) => {
    const onSelectOption = () => onSelect(PublishingOption.unpublish)
    return (
        <tr>
            <td className="radio-cell">
                <input type="radio" name="publish-option" value={ PublishingOption.unpublish } checked={ PublishingOption.unpublish === publishingOption } onChange={ onSelectOption }/>
            </td>
            <td className="option-cell">
                <span onClick={ onSelectOption }>Veröffentlichung rückgängig machen</span>
            </td>
        </tr>
    )
}


export const PublishingOption = {
    publishNow: "publishNow",
    schedule: "schedule",
    update: "update",
    unpublish: "unpublish",
}