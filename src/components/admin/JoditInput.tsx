import { useInput } from 'ra-core';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const JoditInput = (props: any) => {
    const {
        field,
    } = useInput(props);

    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={field.value}
            onChange={newContent => field.onChange(newContent)}
        />
    );
};

export default JoditInput;
