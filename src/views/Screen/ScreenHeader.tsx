import React from 'react';
import { useHistory } from "react-router-dom";


interface Props{
    handleDownloadModal
   }
const ScreenHeader: React.FC<Props> = (props: Props) =>{
  
  const history = useHistory(); 

  
  return (
  
  <div className='screen'>
  <div className='header'>
    <div className='header-left'>
      <div className="logo">
        <button className="mybutton"onClick={history.goBack}><img src={require("src/images/pages/logo.png").default} alt="logo" /></button>
      </div>
    </div>
    <div className='header-center'>
      메가스터디 초등수학 3-1
    </div>
    <div className='header-right'>
    {/* <button className="header-btn" onClick={() =>  props.handleDownloadModal()} >변환하기</button>
    <button className="header-btn" onClick={() =>  props.handleDownloadModal()} >변환하기</button> */}
    </div>
  </div>
 
    
  </div>
  )
  
};
export default ScreenHeader