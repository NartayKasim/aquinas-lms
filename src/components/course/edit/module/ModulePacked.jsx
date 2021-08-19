import React from 'react';


export default function ModulePacked(props) {
    const { title, description, onMoveModuleDownClick, onMoveModuleUpClick, viewUnpackedModule, onDeleteModuleClick } = props;

    return (
        <div className="detailed-module">
            <div className="detailed-module__title-description" onClick={() => viewUnpackedModule(title)}>
                {title} : {description}
            </div>
            <div className="detailed-module__arrows">
                {onMoveModuleUpClick
                    ?
                    <div className="detailed-module__arrows__move-up engrave-click" onClick={() => onMoveModuleUpClick(title)}>/\</div>
                    :
                    null}

                {onMoveModuleDownClick
                    ?
                    <div className="detailed-module__arrows__move-down engrave-click" onClick={() => onMoveModuleDownClick(title)}>\/</div>
                    :
                    null}
                <div className="detailed-module__arrows__edit engrave-click" onClick={() => viewUnpackedModule(title)}>Edit</div>
                <div className="detailed-module__arrows__delete engrave-click" onClick={() => onDeleteModuleClick(title)}>X</div>
            </div>
        </div>
    )
}
