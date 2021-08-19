import React from 'react';
import renderHTML from 'react-render-html';
import { v4 as uuidv4 } from 'uuid';

export default function ShowModuleUnpacked(props) {
    const { title, description, content } = props;
    let markdownDoc = []
    let files = []

    content.map(item => {
        if (item.body) {
            return markdownDoc.push(item)
        }
        else {
            return files.push(item)
        }
    })


    const onFileNameClick = src => {
        window.open(src, "_blank")
    }

    return (
        <div className="view-module-unpacked">
            <div className="edit-block--right__flare"> MODULE CONTENT</div>
            <div className="view-module-unpacked__title">
                <span>
                    {title}
                </span>
            </div>
            <div className="view-module-unpacked__flare"></div>

            <div className="view-module-unpacked__description">
                <span>{description}</span>
            </div>

            <div className="view-module-unpacked__flare"></div>

            {markdownDoc.length !== 0
                ?
                <div className="view-module-unpacked__content">
                    {markdownDoc.map(doc => {
                        return (<DocumentCard key={uuidv4()} body={doc.body} />)
                    })}
                </div>
                :
                null
            }

            <div className="view-module-unpacked__files">
                {
                    files.length !== 0
                        ?
                        <div className="view-module-unpacked__files__file">
                            {files.map(file => {
                                return (<div className="files__file" key={uuidv4()} onClick={() => onFileNameClick(file.source)}> {file.name}</div>)
                            })}
                        </div>
                        :
                        null
                }
            </div>

            {/* <div className="add-module-button" onClick={() => onDisplayStateChangeClick('edit', title)}>
                <span>Edit This Module</span>
                <div className="options-circle extra-large">E</div>
            </div> */}
        </div>
    )
}


const DocumentCard = props => {
    const { body } = props
    return (
        <div className="markdown-document">
            {renderHTML(body)}
        </div>
    )
}