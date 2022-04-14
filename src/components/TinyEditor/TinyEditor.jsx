import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

export default function TinyEditor({ initialValue, limit, handleGetDataFromEditor }) {
    const sizeLimit = limit ?? 50;
    const [value, setValue] = useState(initialValue);
    const [length, setLength] = useState(0);

    const handleInit = (evt, editor) => {
        setLength(editor.getContent({ format: 'text' }).length);
    };

    const handleUpdate = (value, editor) => {
        const length = editor.getContent({ format: 'text' }).length;
        if (length <= sizeLimit) {
            setValue(value);
            setLength(length);
            handleGetDataFromEditor(value);
        }
    };

    const handleBeforeAddUndo = (evt, editor) => {
        const length = editor.getContent({ format: 'text' }).length;
        // note that this is the opposite test as in handleUpdate
        // because we are determining when to deny adding an undo level
        if (length > sizeLimit) {
            evt.preventDefault();
        }
    };

    return (
        <>
            <Editor
                apiKey="jvnq0huwvxzja1sev6byqabo1g6qc276no4top15pw2m6odd"
                initialValue={initialValue}
                value={value}
                onInit={handleInit}
                onEditorChange={handleUpdate}
                onBeforeAddUndo={handleBeforeAddUndo}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    selector: '#tinymce-div',
                    branding: false
                }}
            />
            <p>Remaining: {sizeLimit - length}</p>
        </>
    );
};
