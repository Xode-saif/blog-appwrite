import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

export default function RTE({name,control,label,
defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller 
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
            <Editor 
            initialValue={defaultValue}
            init={{
                initialValue:defaultValue,
                height:500,
                menubar:true,
                plugins:[
                    "image","advlist","autolink","lists","link","image",
                    "charmap","preview",
                ],
                toolbar:
                'undo redo | fromatselect |bold italic underline|',
                content_style:"body{font-family:Helvetice,Arial,sans-serif;font-size:14px}"
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}