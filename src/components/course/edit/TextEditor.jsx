import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor(props) {
    const { value, onChangeFunction } = props;

    return (
        <ReactQuill
            modules={TextEditor.modules}
            formats={TextEditor.formats}
            className="react-quill"
            theme="snow"
            value={value}
            onChange={onChangeFunction} />
    );
}

TextEditor.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'unordered' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['blockquote']
    ]
}


TextEditor.formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'unordered', 'link', 'image', 'video'
]