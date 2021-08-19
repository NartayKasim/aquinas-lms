import React from 'react';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
// renameCourseTitle,
// renameCourseDescription,
// renameUnitTitle,
// renameUnitDescription,
// deleteUnit
// } from '../../../redux/course/actions';
import renderHTML from 'react-render-html';
// import TextEditor from './TextEditor';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';


const ShowBlock = props => {
    const { type, title, description, courseParam, idx } = props;
    // const [editMode, setEditMode] = useState(null);
    // const [titleChange, setTitleChange] = useState(title);
    // const [descriptionChange, setDescriptionChange] = useState(description);
    // const dispatch = useDispatch();

    // const toggleEditMode = editCommand => {
    //     if (editCommand === "cancel") {
    //         setEditMode(null);
    //         editMode === "title" ? setTitleChange(title) : setDescriptionChange(description)
    //     }
    //     else if (editCommand === "title") {
    //         setEditMode("title")
    //     }
    //     else if (editCommand === "description") {
    //         setEditMode("description")
    //     }
    // }
    // const onTitleChange = e => {
    //     setTitleChange(e);
    // }

    // const onDescriptionChange = e => {
    //     setDescriptionChange(e)
    // }

    // const saveTitle = () => {
    //     if (type === "COURSE") {
    //         const courseTitle = titleChange;
    //         dispatch(renameCourseTitle({ courseParam, courseTitle }))
    //         setEditMode("cancel")
    //     }
    //     else if (type === "UNIT") {
    //         const unitTitle = titleChange;
    //         dispatch(renameUnitTitle({ courseParam, title, unitTitle }))
    //         setEditMode("cancel")
    //     }
    // }

    // const saveDescription = () => {
    //     if (type === "COURSE") {
    //         const courseDescription = descriptionChange;
    //         dispatch(renameCourseDescription({ courseParam, courseDescription }))
    //         setEditMode("cancel")
    //     }
    //     else if (type === "UNIT") {
    //         const unitDescription = descriptionChange;
    //         dispatch(renameUnitDescription({ courseParam, description, unitDescription }))
    //         setEditMode("cancel")
    //     }
    // }

    // const onDeleteUnitClick = () => {
    //     const unitTitle = titleChange;
    //     dispatch(deleteUnit({ courseParam, unitTitle }))
    //     setEditMode("cancel")
    //     if (props.match.path !== "/dashboard/courses/:courseID") {
    //         props.history.goBack();
    //     }

    // }

    const courseHeight = "edit-block course-height";
    const unitHeight = "edit-block unit-height"

    return (
        <div className={type === "COURSE" ? courseHeight : unitHeight}>
            <div className="edit-block--left">
                <div className="edit-block--left__flare">{type}</div>
                {props.match.path !== "/dashboard/courses/:courseID"
                    ?
                    <div className="back-to-course" onClick={() => props.history.goBack()}> BACK TO COURSE</div>
                    :
                    null
                }

                <div className="edit-block--left__inner">
                    <div className="edit-block--left__inner__title">
                        <span>{title}</span>

                        {/* {
                            editMode === "title"
                                ?
                                <div className="edit-block--left__inner__title--change">
                                    <div className="input-form--default">
                                        <input
                                            onChange={e => onTitleChange(e.target.value)}
                                            type="text"
                                            className="input-form--default__input"
                                            id="title"
                                            placeholder=" " />
                                        <label
                                            className="input-form--default__label"
                                            htmlFor="title">
                                            Type new course title here...
                                        </label>
                                    </div>
                                    <div className="save-cancel">
                                        <div className="cancel" onClick={() => toggleEditMode("cancel")}>
                                            Cancel Title Change
                                        </div>
                                        <div className="save" onClick={() => saveTitle()}>
                                            Save Title Change
                                        </div>
                                    </div>
                                </div>
                                :
                                <span>{title}</span>
                        } */}
                    </div>

                    {/* <div className="edit-this">
                        <div className="edit-this--edit" onClick={() => toggleEditMode("title")}>EDIT TITLE</div>
                        {
                            type === "UNIT"
                                ?
                                <div className="edit-this--edit" onClick={() => onDeleteUnitClick()}>
                                    DELETE UNIT
                                </div>
                                :
                                null
                        }
                    </div> */}
                </div>
            </div>

            <div className="edit-block--right">
                <div className="edit-block--right__flare">{type} DESCRIPTION</div>
                <div className="edit-block--right__inner">
                    <div className="edit-block--right__inner__description">
                        <span>{description ? renderHTML(description) : null}</span>

                        {/* {description.length === 0 && <div className="empty-description"> It looks like this unit doesn't have a description, yet. To create a description for this unit, click on "EDIT UNIT DESCRIPTION" below.</div>}
                        {
                            editMode === "description"
                                ?
                                <div className="edit-block--right__inner__description--change">
                                    <TextEditor
                                        value={descriptionChange}
                                        onChangeFunction={onDescriptionChange} />

                                    <div className="save-cancel">
                                        <div className="cancel" onClick={() => toggleEditMode("cancel")}>
                                            Cancel Description Change
                                        </div>
                                        <div className="save" onClick={() => saveDescription()}>
                                            Save Description Change
                                        </div>
                                    </div>
                                </div>
                                :
                                <span>{description ? renderHTML(description) : null}</span>
                        } */}
                        {
                            type === "UNIT" && props.match.path === "/dashboard/courses/:courseID"
                                ?
                                props.content.map(moduleObj => <ViewModule key={uuidv4()} moduleObj={moduleObj} />)
                                :
                                null
                        }
                    </div>


                    <div className="edit-this" >
                        {/* <div className="edit-this--edit" onClick={() => toggleEditMode("description")}>EDIT {type} DESCRIPTION</div> */}
                        {
                            type === "UNIT" && props.match.path === "/dashboard/courses/:courseID"
                                ?
                                <div className="edit-this--edit" onClick={() => props.history.push(`/dashboard/courses/${courseParam}/${idx}`)}>VIEW UNIT / MODULES</div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ShowBlock);


function ViewModule(props) {
    const { title, description } = props.moduleObj;

    return (
        <div className="view-module">
            <span className="view-module--module">MODULE - {title}: {description}</span>
        </div>
    )
}