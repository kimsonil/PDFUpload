import React,{ useState,useRef,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { pdfjs ,Document, Page} from "react-pdf";
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import {PDFtoIMG} from 'react-pdf-to-image';
import FileModal from 'src/components/FileModal';
import DawnloadModal from "src/components/DownloadModal";
import ScreenHeader from './ScreenHeader';
import DefaultSetting from "./DefaultSetting";
import PartialSetting from './PartialSetting';
import ScreenContainer from './ScreenContainer';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Screen = () => {
  const [isFileOpen, setIsFileOpen] = useState(true);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDefaultSetting, setIsDefaultSetting] = useState(false);
  const [isPartialSetting, setIsPartialSetting] = useState(false);
  const [selectTool, setSelectTool] = useState('select');
  const [transform,setTransform] = useState({x:0,y:0,width:0,height:0})
  const [convertImage, setConvertImage] = useState();
  const [pdfState, setPdfState] = useState({
    file: null,
    numPages: 0,
    pageNumber: 1
  });
  const { pageNumber, numPages } = pdfState;
  const history = useHistory(); 

  const onFileChange = event => {
    console.log(event.target.files[0])
    setPdfState({
      ...pdfState,
      file: event.target.files[0]
    });
    
    handleFileModal();
    
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPdfState({ ...pdfState,numPages:numPages });
    
  };

  const hanldleClickPage = (e,index) => {
    setPdfState({
    ...pdfState,
      pageNumber: index
    });
    const list = e.target.closest('.MovableList').parentElement.children
    for (let sib of list) {
        sib.classList.remove('select')
    }
    e.target.closest('.MovableList').classList.add('select')
    
  };
  const importClicked = () => {
    document.getElementById("ScreenPdf")?.click();
    
  }
  const handleFileModal = () => {
    setIsFileOpen(!isFileOpen);
  }
  const handleDownloadModal = () => {
    setIsDownloadOpen(!isDownloadOpen);
  }
  const handleClickSaveFile = (e:string) => {
    
    saveAs(pdfState.file, `${e}.pdf`)
    handleDownloadModal()
  }

  const downloadHandler = (event) => {
   
 
    saveAs(pdfState.file, `save.pdf`)
    let images : string[] = [];
    
        return images.push();
    
        let zip = new JSZip();
        zip.file('myImage.png', images[0], { binary: true });       
        zip.generateAsync({ type: "blob" })
        .then(function callback(blob) {
        saveAs(blob, "myImage.zip");
        })
    
  }
  
  // const convertPdfToImages = async (file) => {
  //   const images = [];
  //   const data = await readFileData(file);
  //   const pdf = await PDFJS.getDocument(data).promise;
  //   const canvas = document.createElement("canvas");
  //   for (let i = 0; i < pdf.numPages; i++) {
  //     const page = await pdf.getPage(i + 1);
  //     const viewport = page.getViewport({ scale: 1 });
  //     const context = canvas.getContext("2d");
  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;
  //     await page.render({ canvasContext: context, viewport: viewport }).promise;
  //     images.append(canvas.toDataURL());
  //   }
  //   canvas.remove();
  //   return images;
  // }
  
  const handleClickDefaultSetting = ()=>{
    setIsPartialSetting(false)
    setIsDefaultSetting(!isDefaultSetting)
  }
  const handleClickPartialSetting = ()=>{
    setIsDefaultSetting(false)
    setIsPartialSetting(!isPartialSetting)
  }
  return (
  
  <div className='screen'>
    <ScreenHeader handleDownloadModal={handleDownloadModal} />
    <ScreenContainer 
      numPages={numPages} 
      hanldleClickPage={hanldleClickPage} 
      pdfState={pdfState} 
      onDocumentLoadSuccess={onDocumentLoadSuccess} 
      onFileChange={onFileChange} 
      pageNumber={pageNumber} 
      handleClickPartialSetting={handleClickPartialSetting} 
      handleClickDefaultSetting={handleClickDefaultSetting}
      selectTool={selectTool}
      setSelectTool={setSelectTool}
      transform={transform}
      setTransform={setTransform}
     
      />
    <DefaultSetting open={isDefaultSetting} handleClickDefaultSetting={handleClickDefaultSetting}/>
    <PartialSetting open={isPartialSetting} handleClickPartialSetting={handleClickPartialSetting}/>
    <FileModal open={isFileOpen} handleFileModal={handleFileModal} importClicked={importClicked} />
    <DawnloadModal open={isDownloadOpen} handleSaveModal={handleDownloadModal} handleClickSaveFile={e => handleClickSaveFile(e)} numPages={numPages} />
  </div>
  )
  
};
export default Screen