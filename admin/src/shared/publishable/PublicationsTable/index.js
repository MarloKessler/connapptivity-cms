import "./style.css"
import { CATable } from "../../util-elements"
import { PublicationState } from "../PublicationState"

export default PublicationsTable 


function PublicationsTable({publications, onClickRow = () => {}, ...props}) {

    return (
        <CATable className="publications-table">
            <thead>
                <tr>
                    <th>Titel</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    publications.map( publication => {
                        return (
                            <tr key={ publication.id } onClick={ () => onClickRow(publication) }>
                                <td><RowTitle publication={ publication }/></td>
                                <td><RowStatus publication={ publication }/></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </CATable>
    )
}


function RowTitle({ publication, ...props }) {
    const { title, author, publication_date, creation_date } = publication

    const dateToShow = (publication_date && publication_date < new Date()) && publication_date
    const getLocalizedDateString =  () => new Intl.DateTimeFormat('de', { year: 'numeric', month: 'short', day: 'numeric' }).format(dateToShow)
    return (
        <div className="row-title">
            <h3>{ title }</h3>
            <p><small>Von { author.full_name }{ dateToShow && ` • ${getLocalizedDateString()}` }</small></p>
        </div>
    )
}


function RowStatus({ publication }) {
    const { publication_date, publication_state } = publication
    switch (publication_state()) {
        case PublicationState.published:
            var status = "Veröffentlicht"
            break

        case PublicationState.scheduled:
            const localizedDateString = new Intl.DateTimeFormat('de', { year: 'numeric', month: 'short', day: 'numeric' }).format(publication_date)
            var status = `Geplant am ${localizedDateString}`
            break

        case PublicationState.draft:
            var status = "Entwurf"
            break
    
        default:
            var status = ""
            break
    }

    return <div className={ `status-tag ${publication_state()}` }>{ status }</div>
}