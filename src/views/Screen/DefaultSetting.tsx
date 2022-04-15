import React,{ useState} from 'react';

interface Props{
  open
  handleClickDefaultSetting
 }
 
const DefaultSetting: React.FC<Props> = (props: Props) =>{
  const [sliderValue, setSliderValue] = useState(12)
  const [sliderSizeValue, setSliderSizeValue] = useState(10) 
  return (
      <div className='setting' style={{display: props.open ? "block" : "none"}}>
        <div className='setting-title'><div>기본 설정</div> <div onClick={props.handleClickDefaultSetting} style={{cursor:'pointer'}}>X</div></div>
        <div className='setting-content'>
          <div className="setting-text">페이지 이름</div>
          <div className="setting-item"><input type="text" defaultValue="기초 수학"/></div>
          <div className="setting-text">링크</div>
          <div className="setting-item"><input type="text" defaultValue="https://www.naver.com"/><div><img src={require("src/images/pages/url.png").default} alt="url" /></div></div>
          <div className="setting-text">임베딩 버전</div>
          <div className="setting-item">
            <select name="" id="" defaultValue={0.5}>
              <option value="0.0">v 0.0</option>
              <option value="0.5">v 0.5</option>
              <option value="1.0">v 1.0</option>
              <option value="1.5">v 1.5</option>
              <option value="2.0">v 2.0</option>
              <option value="2.5">v 2.5</option>
              <option value="1.1">v 1.1</option>
              <option value="20_W">v 20_W</option>
              <option value="20_b">v 20_b</option>
              <option value="1.0_b">v 0.5</option>
              <option value="0.5">v 0.5</option>
              <option value="0.5">v 0.5</option>
              <option value="0.5">v 0.5</option>
            </select>
          </div>
          <div className="setting-text">적용기술</div>
          <div className="setting-item">
            <select name="" id="" defaultValue={0.5}>
              <option value="0.5">컬러 (lab_rgb)</option>
            </select>
          </div>
          <div className="setting-code"> <div className="setting-text">코드크기 </div><input type="number" value={sliderValue} onChange={e => setSliderValue(Number(e.target.value))} /></div>
          <div className="setting-value">
            <div className={sliderValue === 2 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderValue(2)}>매우 작게 2</div>
            <div className={sliderValue === 4 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderValue(4)}>작게 4</div>
            <div className={sliderValue === 8 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderValue(8)}>중간 8</div>
            <div className={sliderValue === 12 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderValue(12)}>크게 12</div>
            <div className={sliderValue === 20 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderValue(20)}>매우 크게 20</div>
          </div>
          <div className="setting-code"> <div className="setting-text">코드세기 </div><input type="text" value={sliderSizeValue} onChange={e => setSliderSizeValue(Number(e.target.value))}/></div>
          <div className="setting-value">
            <div className={sliderSizeValue === 6 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderSizeValue(6)}>매우 약하게 6</div>
            <div className={sliderSizeValue === 8 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderSizeValue(8)}>약하게 8</div>
            <div className={sliderSizeValue === 10 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderSizeValue(10)}>중간 10</div>
            <div className={sliderSizeValue === 12 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderSizeValue(12)}>세게 12</div>
            <div className={sliderSizeValue === 16 ? "setting-btn selected" :  "setting-btn"} onClick={() => setSliderSizeValue(16)}>매우 새게 16</div>
          </div>
        </div>
      </div>
    
  )
  
};
export default DefaultSetting