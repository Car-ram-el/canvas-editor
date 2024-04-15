export default class Canvas {
  constructor(id, template_data) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.template_data = template_data;

    this.caption = this.template_data.caption;
    this.cta = this.template_data.cta;
    this.image_mask = this.template_data.image_mask;

    this.image = new Image();
    this.image.onload = () => this.draw_canvas();
    this.image.src = this.template_data.urls.mask;

    this.pattern=new Image();
    this.pattern.onload=()=>this.draw_canvas();
    this.pattern.src=this.template_data.urls.design_pattern;
  }

  draw_canvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Background layer
    this.ctx.fillStyle=this.template_data.background_color;
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    // 2. Design pattern
    this.ctx.drawImage(this.pattern,0,0,this.canvas.width, this.canvas.height);

    // 3. Mask
    this.ctx.drawImage(this.image,this.image_mask.x,this.image_mask.y,this.image_mask.width,this.image_mask.height);

    // 4. Stroke
    if(this.template_data.urls.stroke){
      const stroke_img=new Image();
      stroke_img.onload=()=>this.ctx.drawImage(stroke_img,this.image_mask.x,this.image_mask.y,this.image_mask.width,this.image_mask.height);
      stroke_img.src=this.template_data.urls.stroke;
    }

    // 5. Texts    
    // caption
    this.ctx.fillStyle = this.caption.text_color;
    this.ctx.font = `bold ${this.caption.font_size}px Comme`;
    this.ctx.textAlign = this.caption.alignment;
    this.draw_text(this.caption.text, this.caption.position.x, this.caption.position.y, this.caption.max_characters_per_line);

    // cta
    this.ctx.fillStyle = this.cta.background_color;
    this.rounded_rect(this.cta.position.x, this.cta.position.y, 150, 50,10);
    this.ctx.fillStyle = this.cta.text_color;
    this.ctx.font = 'bold 20px Arial';
    this.ctx.textAlign = 'center';
    this.draw_text(this.cta.text, this.cta.position.x + 75, this.cta.position.y+30,20);
  }

  draw_text(text, x, y, max_char) {
    if(typeof text!='string'){console.log("Text should be string."); return;}
    
    let words=text.split(" ");
    let y_pos=y; let line_height=this.caption.font_size*1.2;
    let line='';
    for(let i=0; i<words.length; ++i){
      if(line.length+words[i].length+1<=max_char){
        line+=words[i]+' ';
      } else{
        this.ctx.fillText(line.trim(),x,y_pos);
        line=words[i]+' '; y_pos+=line_height;
      }
    }
    if(line.trim()) {
      this.ctx.fillText(line.trim(),x,y_pos); 
      y_pos+=line_height;
    }
  }

  rounded_rect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update_caption(t){
    this.caption.text=t;
    this.draw_canvas();
  }

  update_cta(t){
    this.cta.text=t;
    this.draw_canvas();
  }

  update_masking_img(i){
    this.image.src=i;
  }

  set_bg_color(color) {
    this.canvas.style.backgroundColor = color;
  }
}