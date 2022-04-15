import React,{ useState, useEffect,useRef} from 'react';

interface Props{
  handleClickDefaultSetting
  handleClickPartialSetting
  selectTool
  setSelectTool
  transform
  setTransform
 }
 
const SideNavigation: React.FC<Props> = (props: Props) =>{
  const [isInputState, setIsInputState] = useState(false);
  const [islistItem, setIslistItem] = useState(false);
  const itemInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if(props.transform.x !== 0){
      setIslistItem(true);
      setIsInputState(true);
      itemInputRef.current?.focus();
    }else{
      setIslistItem(false);
    }
    console.log(props.transform.x);
  },[props.transform])
  
  return (
  
    <div className="screen-right-sideBar">
     <div className="screen-right-sideBar-btn">
            <button  className={props.selectTool === "select" ? "mybutton selected" : "mybutton"} onClick={() => props.setSelectTool('select')}>
                <div className="select-btn"/>
            </button>
            <button className={props.selectTool === "square_draw" ? "mybutton selected" : "mybutton"} onClick={() => props.setSelectTool('square_draw')}>
                <div className="square_draw_btn" />
            </button>
        </div>
     <div className="transform">  
          <div className="transform-title">트랜스폼</div>
          <div className="transform-axis">
              <div className="transform-X-axis"><span>X</span><input type="number" value={props.transform.x} disabled/></div>
              <div className="transform-Y-axis"><span>Y</span><input type="number" value={props.transform.y} disabled/></div>
              <div className="transform-width"><span>W</span><input type="number" value={props.transform.width} disabled/></div>
              <div className="transform-height"><span>H</span><input type="number" value={props.transform.height} disabled/></div>
          </div>
      </div>
      <div className="default-setting-btn" ><div>기본 설정</div><button className="setting-open-btn" onClick={props.handleClickDefaultSetting}>・・・</button></div>
      <button className="registration" disabled={!(islistItem && (props.selectTool === "square_draw"))}>등록하기</button>
      <div className='labCode-list'>
        {/* <div className='labCode-list-item'>
        <div onDoubleClick={() => setIsInputState(true)}>
          <span style={{display:isInputState?'none':'inline'}}>1번 문제</span>
          <input style={{display:isInputState?'inherit':'none'}} defaultValue="1번 문제" />
        </div>
          <div className='labCode-list-item-icon'><button><img src={require("src/images/pages/icon-link.png").default} alt="icon-link" /></button><button><img src={require("src/images/pages/trash.png").default} alt="trash"/></button><button className="setting-open-btn" onClick={props.handleClickPartialSetting}>・・・</button></div></div> */}
          { islistItem  ? 
          <div className='labCode-list-item'>
          <div onDoubleClick={() => setIsInputState(true)}>
            
            <input ref={itemInputRef} defaultValue="영역" />
          </div>
            <div className='labCode-list-item-icon'><button><img src={require("src/images/pages/icon-link.png").default} alt="icon-link" /></button><button><img src={require("src/images/pages/trash.png").default} alt="trash"/></button><button className="setting-open-btn" onClick={props.handleClickPartialSetting}>・・・</button></div></div>
            : <div></div>
          }
          
      </div>
      <div className='setting-apply'><div className='setting-apply-btn'>적용하기</div></div>
    </div>
  )
  
};
export default SideNavigation