import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import { v4 as uuidv4 } from 'uuid';
import EditBlock from '../components/course/edit/EditBlock';
import { moveModuleUp, moveModuleDown, deleteModule } from '../redux/course/actions';
import CreateNewModule from '../components/course/edit/module/CreateNewModule';
import ModulePacked from '../components/course/edit/module/ModulePacked';
import ModuleUnpacked from '../components/course/edit/module/ModuleUnpacked';
import ShowUnit from '../components/course/view/ShowUnit';


const UnitPage = props => {
    const isInstructor = useSelector(state => state.user.isInstructor)
    const courseParam = props.match.params.courseID;
    const unitIdx = props.match.params.idx;
    const unit = useSelector(state => state.courses[courseParam].content)[unitIdx];
    const oldContent = unit.content.map(unt => unt);
    const { title, description, content } = unit;
    const dispatch = useDispatch();

    const [displayState, setDisplayState] = useState(null);
    const [unpackModuleTarget, setUnpackModuleTarget] = useState('');
    const [confirmMoveDelete, setConfirmMoveDelete] = useState(null);
    const [editTarget, setEditTarget] = useState(null);

    const scrollBottom = () => {
        window.scroll({
            top: document.body.offsetHeight,
            bottom: 0,
            behavior: 'smooth',
        });
    }

    const scrollTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }

    const onMoveModuleUpClick = title => {
        const moduleIndex = content.findIndex(module => module.title === title);
        const extractedModule = content.splice(moduleIndex, 1)[0];
        content.splice(moduleIndex - 1, 0, extractedModule);
        const unitContent = content;
        dispatch(moveModuleUp({ courseParam, oldContent, unitContent }))
        setConfirmMoveDelete("module moved!")
    }

    const onMoveModuleDownClick = title => {
        const moduleIndex = content.findIndex(module => module.title === title);
        const extractedModule = content.splice(moduleIndex, 1)[0];
        content.splice(moduleIndex + 1, 0, extractedModule);
        const unitContent = content;
        dispatch(moveModuleDown({ courseParam, oldContent, unitContent }));
        setConfirmMoveDelete("module moved!")
    }

    const onDeleteModuleClick = title => {
        const moduleIndex = content.findIndex(module => module.title === title);
        content.splice(moduleIndex, 1)
        const unitContent = content;
        dispatch(deleteModule({ courseParam, oldContent, unitContent }))
        setConfirmMoveDelete("module deleted!")
        setDisplayState(null)
    }

    const viewUnpackedModule = title => {
        const targetModule = unit.content.filter(mod => mod.title === title)[0];
        setUnpackModuleTarget(targetModule)
        setDisplayState("unpacked");
        setTimeout(() => scrollBottom(), 500);
    }

    const onDisplayStateChangeClick = (displayState, title) => {
        if (displayState === "edit") {
            setEditTarget(title)
            setDisplayState("edit")
            setTimeout(() => scrollBottom(), 500);
        }
        if (displayState === "new") {
            setDisplayState("new");
            setTimeout(() => scrollBottom(), 500);
        }
        if (displayState === null) {
            setDisplayState(null);
            scrollTop();
        }
    }

    return (
        <> {
            isInstructor
                ?
                <div className="unit-page">
                    <div className="unit-module" >
                        <EditBlock id="reduce-margin" type={"UNIT"} title={title} description={description} courseParam={props.match.params.courseID} content={content} key={uuidv4()} />
                    </div >
                    <div className="unit-module--units">
                        <div className="edit-block--right__flare"> MODULES</div>
                        <span className="unit-module--units__title">MODULES IN {title.toUpperCase()}</span>
                        {content.length === 0 ? null : <span className="unit-module--units__hint">(click on "EDIT" to see module contents)</span>}

                        {
                            content.length === 0
                                ?
                                <div className="no-modules-message">
                                    <span>It looks like there are no modules in this unit. Create a new module here!</span>
                                </div>
                                :
                                content.map((mdl, mIdx) => {
                                    if (mIdx === 0 && mIdx + 1 !== content.length) {
                                        return <ModulePacked
                                            key={uuidv4()}
                                            title={mdl.title}
                                            description={mdl.description}
                                            onMoveModuleDownClick={onMoveModuleDownClick}
                                            viewUnpackedModule={viewUnpackedModule}
                                            onDeleteModuleClick={onDeleteModuleClick}
                                        />
                                    }
                                    else if (mIdx === 0 && mIdx + 1 === content.length) {
                                        return <ModulePacked
                                            key={uuidv4()}
                                            title={mdl.title}
                                            description={mdl.description}
                                            viewUnpackedModule={viewUnpackedModule}
                                            onDeleteModuleClick={onDeleteModuleClick}
                                        />
                                    }
                                    else if (mIdx + 1 === content.length) {
                                        return <ModulePacked
                                            key={uuidv4()}
                                            title={mdl.title}
                                            description={mdl.description}
                                            onMoveModuleUpClick={onMoveModuleUpClick}
                                            viewUnpackedModule={viewUnpackedModule}
                                            onDeleteModuleClick={onDeleteModuleClick}
                                        />
                                    }
                                    else {
                                        return <ModulePacked
                                            key={uuidv4()}
                                            title={mdl.title}
                                            description={mdl.description}
                                            onMoveModuleDownClick={onMoveModuleDownClick}
                                            onMoveModuleUpClick={onMoveModuleUpClick}
                                            viewUnpackedModule={viewUnpackedModule}
                                            onDeleteModuleClick={onDeleteModuleClick}
                                        />
                                    }
                                })
                        }

                        <div className="move-delete-confirmation">{confirmMoveDelete}</div>
                        <div className="add-module-button" onClick={() => onDisplayStateChangeClick("new")}>
                            <span>Create New Module</span>
                            <div className="options-circle extra-large">+</div>
                        </div>
                    </div>
                    {
                        displayState !== "unpacked"
                            ?
                            null
                            :
                            <>
                                {unpackModuleTarget.length === 0
                                    ?
                                    null
                                    :
                                    <ModuleUnpacked
                                        title={unpackModuleTarget.title}
                                        description={unpackModuleTarget.description}
                                        content={unpackModuleTarget.content}
                                        onDisplayStateChangeClick={onDisplayStateChangeClick}
                                    />}
                            </>
                    }
                    {displayState === "new"
                        ?
                        <CreateNewModule
                            unit={unit}
                            courseParam={props.match.params.courseID}
                            onDisplayStateChangeClick={onDisplayStateChangeClick}
                        />
                        :
                        null
                    }
                    {
                        displayState === "edit"
                            ?
                            <CreateNewModule
                                unit={unit}
                                courseParam={props.match.params.courseID}
                                onDisplayStateChangeClick={onDisplayStateChangeClick}
                                title={editTarget}
                                existing="existing"
                            />
                            :
                            null
                    }
                </div >
                :
                <ShowUnit />
        }</>

    )
}

export default requireAuth(UnitPage);
