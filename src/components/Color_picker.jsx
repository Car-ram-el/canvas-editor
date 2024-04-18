import React,{useState,useEffect,useRef} from 'react'
import {ChromePicker} from 'react-color';

const Color_picker = ({bg_color,setBg_color}) => {
  
  const color_picker_ref=useRef();
  const [color_picker, setColor_picker] = useState(false);
  const [recent_colors, setRecent_colors] = useState([]);

  useEffect(()=>{
    const handle_body_click=e=>{
      if(color_picker_ref.current && !color_picker_ref.current.contains(e.target)) setColor_picker(false);
    };
    document.body.addEventListener('click', handle_body_click);
    return ()=>document.body.removeEventListener('click', handle_body_click);
  },[])

  const handle_change=c=>{
    const color=c.hex;
    setBg_color(color);
    update_recent(color);
  }

  const update_recent=color=>{
    const updated_colors=[color,...recent_colors.filter(c=>c!==color)].slice(0,5);
    setRecent_colors(updated_colors);
  };


  return (
    <div className=" flex flex-col items-start w-full max-w-sm text-gray-700 gap-1 " ref={color_picker_ref}>
      Choose your color
      <div className=' flex items-center gap-1'>
        {recent_colors.map((color,i)=>(
          <div key={i} 
          className=' w-6 h-6 rounded-full cursor-pointer' style={{backgroundColor:color}} 
          onClick={()=>{
            setBg_color(color);
            update_recent(color);
          }}></div>
        ))}
        {recent_colors.length<6 && (
          <div className=' w-6 h-6 rounded-full cursor-pointer border border-black text-2xl flex justify-center items-center transition duration-100 ease-in-out transform hover:shadow-md hover:animate-ping'
          onClick={e=>{
            // prevents toggling color picker
            e.stopPropagation();
            setColor_picker(true);
          }}>+</div>
        )}
      </div>
      {color_picker && (
        <div className=' absolute z-10'>
          <ChromePicker color={bg_color} onChange={handle_change}/>
        </div>
      )}
    </div>
  )
}

export default Color_picker