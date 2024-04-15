import React, { useCallback, useEffect, useRef, useState } from 'react'

import template_data from './templateData.json';
import Canvas from './Canvas';
import '../index.css';
import Color_picker from './Color_picker';

const Editor = () => {
  const canvas_ref=useRef();
  const [bg_color, setBg_color] = useState(() => localStorage.getItem('bg_color') || '#0369a1');
  const [caption_text, setCaption_text] = useState(() => localStorage.getItem('caption_text') || template_data.caption.text);
  const [cta_text, setCta_text] = useState(() => localStorage.getItem('cta_text') || template_data.cta.text);
  const [masking_img, setMasking_img] = useState(()=>localStorage.getItem('masking_img')||null);
  const [canvas_editor, setCanvas_editor] = useState(null);

  useEffect(()=>{
    if(canvas_ref.current){
      const editor=new Canvas('canvas',template_data);
      editor.draw_canvas();
      editor.set_bg_color(bg_color);
      setCanvas_editor(editor);
    }
  },[bg_color])

  useEffect(()=>{
    if(canvas_editor){ 
      canvas_editor.update_caption(caption_text);
      localStorage.setItem('caption_text', caption_text);
    }
  },[caption_text])
  
  useEffect(()=>{
    if(canvas_editor){ 
      canvas_editor.update_cta(cta_text)
      localStorage.setItem('cta_text', cta_text);
    }
  },[cta_text])

  useEffect(()=>{
    if(canvas_editor){ 
      canvas_editor.update_masking_img(masking_img)
      localStorage.setItem('masking_img', masking_img);
    }
  })

  const handle_image_change=useCallback(e=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=i=>setMasking_img(i.target.result);
      reader.readAsDataURL(file);
    }
  },[]);

  return (
    <div className=" flex flex-col md:flex-row justify-between items-center max-w-6xl h-full bg-gray-100">
      <canvas ref={canvas_ref} id="canvas" width={1080} height={1080} className=' scale-x-[.95] scale-y-[0.55] md:scale-[.7] w-2/3 h-2/3 bg-white p-4 rounded shadow-lg '></canvas>

      <div className=' flex flex-col items-center gap-2 mr-4 text-[0.85rem] '>
        <p className=' text-2xl font-bold'>Customizations</p>
        <p className=' text-gray-500'>Customize and get your template ready</p>

        <div className='custom_div' >
          <form htmlFor="picture">Image</form>
          <input id="picture" type='file' accept='image/*'
          onChange={handle_image_change}/>
        </div>

        <div className="custom_div ">
          <form htmlFor="caption">Caption text</form>
          <input type='text' id='caption' value={caption_text} 
          className=' bg-gray-100 text-base font-semibold'
          onChange={e=>setCaption_text(e.target.value)} 
          placeholder = 'Enter caption text'/>
        </div>

        <div className="custom_div ">
        <form>CTA text</form>
        <input type='text' value={cta_text} 
        className=' bg-gray-100 text-base font-semibold'
        onChange={e=>setCta_text(e.target.value)} 
        placeholder='Enter the Call to Action Text'/>
        </div>  

       <Color_picker bg_color={bg_color} setBg_color={setBg_color}/>
      </div>
  </div>
  )
}

export default Editor