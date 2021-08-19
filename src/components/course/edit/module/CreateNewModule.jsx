import React from 'react';
import TextEditor from '../TextEditor';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNewModule } from '../../../../redux/course/actions';
import { scroller } from 'react-scroll';


import app from './FireBase';
import { v4 as uuidv4 } from 'uuid';


export default function CreateNewModule(props) {
    const dispatch = useDispatch();
    const unit = props.unit;
    const content = props.unit.content;
    const courseParam = props.courseParam;
    const oldContent = unit.content.map(unt => unt);
    let existingFiles = [];
    let existingMarkdown = [];

    // used to check if any modules in the unit have matching names:
    const [duplicateName, setDuplicateName] = useState(false);

    // all module onchanges: TITLE, DESCRIPTION, CONTENT, FILES:
    const [newTitle, setNewTitle] = useState(props.title || '');
    const [newDescription, setNewDescription] = useState('');
    const [newModuleContent, setNewModuleContent] = useState('');
    const [files, setFiles] = useState([]);
    const [fileTarget, setFileTarget] = useState(null);
    const [fileNameDisplay, setFileNameDisplay] = useState([]);

    useEffect(() => {
        if (props.existing) {
            const targetEditModule = content.filter(cnt => cnt.title === props.title)[0]

            targetEditModule.content.map(ele => ele.body ? existingMarkdown.push(ele) : existingFiles.push(ele))
            setNewDescription(targetEditModule.description)

            if (existingFiles.length > 0) {
                setFileNameDisplay(existingFiles.map(fle => fle.name))
                setFiles(existingFiles.map(fle => fle))
            }

            if (existingMarkdown.length > 0) {
                setNewModuleContent(existingMarkdown[0].body)
            }
        }
    }, [])

    const scrollTop = () => {
        scroller.scrollTo("unit-page", {
            duration: 200,
            delay: 100,
            smooth: "easeInOutQuart"
        })
    }

    const onFileChange = e => {
        // tracks current file in the input field
        if (e.target.files[0]) {
            setFileTarget(e.target.files[0])
        }
    }

    const onFileUploadClick = async () => {
        const uniqueID = uuidv4();
        const uniqueName = uniqueID.concat('', fileTarget.name)
        const file = fileTarget;
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(uniqueName)
        await fileRef.put(file)
        const url = await fileRef.getDownloadURL()

        // update the display of all the files user has uploaded (displayed)
        setFileNameDisplay(existingList => [...existingList, fileTarget.name])
        // clear the input field in case it confuses user, if they have another file to download:
        setFileTarget(null);
        // push retrieved file URL into the list which will be compiled with the new module:
        setFiles(existingURLs => [...existingURLs, { "source": url, "name": fileTarget.name }])
    }

    const onSaveNewModuleClick = () => {
        // primary module compiler:
        // check and reject duplicates:
        if (props.existing) {
            const newModule = {
                "title": newTitle,
                "description": newDescription,
                "content": [{
                    "body": newModuleContent,
                    "type": "markdown"
                }, ...files],
                "type": "module"
            }
            unit.content.splice(unit.content.indexOf(cnt => cnt.title === props.title), 1);
            unit.content.push(newModule);
            const unitContent = content;
            dispatch(createNewModule({ courseParam, oldContent, unitContent }))
            props.onDisplayStateChangeClick(null)
            scrollTop()

        }

        else {
            const checkDuplicateModuleNames = content.filter(mdl => mdl.title === newTitle)

            if (checkDuplicateModuleNames.length !== 0) {
                return setDuplicateName(true);
            }
            else {
                setDuplicateName(false);
                const newModule = {
                    "title": newTitle,
                    "description": newDescription,
                    "content": [{
                        "body": newModuleContent,
                        "type": "markdown"
                    }, ...files],
                    "type": "module"
                }
                unit.content.push(newModule);
                const unitContent = content;
                dispatch(createNewModule({ courseParam, oldContent, unitContent }))
                props.onDisplayStateChangeClick(null)
                scrollTop()
            }
        }
    }

    const onNewTitleChange = e => {
        setNewTitle(e)
    }

    const onNewDescriptionChange = e => {
        setNewDescription(e)
    }

    return (
        <div className="new-module--text-editor">
            <div className="new-module--text-editor__section_title">
                CREATE NEW MODULE
            </div>
            <div className="new-module--text-editor__title">
                <div className="input-form--extra-long">
                    <input
                        onChange={e => onNewTitleChange(e.target.value)}
                        type="text"
                        className="input-form--extra-long__input"
                        id="title"
                        placeholder=" "
                        value={newTitle}
                    />
                    <label
                        className="input-form--extra-long__label"
                        htmlFor="title">
                        Type new module title here...
                    </label>
                </div>
            </div>
            <div className="new-module--text-editor__description">
                <div className="input-form--extra-long">
                    <input
                        onChange={e => onNewDescriptionChange(e.target.value)}
                        type="text"
                        className="input-form--extra-long__input"
                        id="description"
                        placeholder=" "
                        value={newDescription} />
                    <label
                        className="input-form--extra-long__label"
                        htmlFor="description">
                        Type new module description here (optional)...
                    </label>
                </div>
            </div>
            <TextEditor value={newModuleContent} onChangeFunction={setNewModuleContent} className="module-editor" />

            <div className="new-module--text-editor__file-upload">
                <div className="upload-files__list-upload">
                    <div className="upload-files__list-upload__right">
                        <input className="upload-input" type="file" onChange={e => onFileChange(e)} />
                        <div className="upload-button" onClick={() => onFileUploadClick()}>Upload</div>
                    </div>
                    <div className="upload-files__list-upload__left">
                        <div className="upload-files__list-upload__left--title">Files Attached to This Module:</div>
                        {fileNameDisplay.map(fileName => <span key={uuidv4()}>{fileName}</span>)}
                    </div>
                </div>
            </div>

            <div className="new-module--text-editor__options">
                {duplicateName ? <span className="duplicate-module-name">It looks like there is already a module with that name. Please select a unique name</span> : null}
                {props.title
                    ?
                    <div className="new-module--text-editor__options__option" onClick={() => onSaveNewModuleClick()}>SAVE MODULE</div>
                    :
                    <div className="new-module--text-editor__options__option" onClick={() => onSaveNewModuleClick()}>SAVE NEW MODULE</div>
                }

                <div className="new-module--text-editor__options__option" onClick={() => props.onDisplayStateChangeClick(null)}>CANCEL</div>
            </div>
        </div>
    )
}
