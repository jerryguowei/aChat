import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import React, { useState } from 'react';
import Icon from '../Icons';
import './index.css';

interface InputAreaProps {
    handleSubmit: Function
    handleAlert: Function
}

const InputArea = (props: InputAreaProps) => {
    let myRef = React.createRef<any>();
    let fileRef = React.createRef<any>();

    const [value, setvalue] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (value : string)  => {
        setvalue(value);
    }
    const handleSubmit = () => {
        props.handleSubmit(value);
        setvalue('');
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) =>{
        var code = event.key;
        if(code === "Enter") {
           handleSubmit();
            event.preventDefault();
        }
    }

    const onEmojiClick = (event: any, emojiObject: any)=> {
        setvalue(value + emojiObject.emoji);
        handleToggleClick();
        myRef.current?.focus();
    }
    const handleToggleClick = () => {
       setShowPicker(!showPicker);
    }

    const handleFileChange = (event: any)=> {
        let file:File = event.target.files[0];
        if(!file) return;
        if(file.size > 1024* 1024 * 5){
            props.handleAlert('file size must less than 5MB');
            fileRef.current.value = '';
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            props.handleSubmit(fileReader.result, file.name + ':');
            fileRef.current.value = '';
        }
    }
    return (<div className="input-wrapper">
        {showPicker && <div className="picker-base" onClick={() => handleToggleClick()} ></div>}
        <div className="icon-wrapper p-relative">
            <Icon name="emoji-smile" size="20" onClick={() => handleToggleClick()} />
            {showPicker &&
                <Picker
                    onEmojiClick={onEmojiClick}
                    disableAutoFocus={true}
                    disableSearchBar={true}
                    skinTone={SKIN_TONE_MEDIUM_DARK}
                    groupNames={{ smileys_people: "PEOPLE" }}
                    pickerStyle={{ top: '-325px', position: 'absolute', 'zIndex': '100' }}
                    native
                />}
        </div>
        <label className='file-Icon'>
        <Icon name="folder" size="20"/>
        <input type="file" ref={fileRef} name="filename" onChange={ e => handleFileChange(e)} style={{display:'none'}}/>
        </label>
      
        <textarea
            className="input-textarea"
            placeholder="text"
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={onKeyDown}
            ref={myRef}
        >
        </textarea>
        <button className="btn btn-primary" type="button"
            disabled={!value}
            onClick={handleSubmit}>
            Send
        </button>
    </div>)    
}
export default InputArea;