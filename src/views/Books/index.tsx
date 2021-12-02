import React, {useRef,useState,useEffect,useCallback,useMemo} from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import 'src/assets/scss/reset.scss'
import 'src/assets/scss/Books.scss'
import Container from './Container';
import { RootReducerType } from 'src/modules';
import { bookPageInit,bookCreateInit,bookUpdateInit,bookDeleteInit } from 'src/modules/Books';
import Loading from 'src/components/Loading';
import DeleteModal from 'src/components/DeleteModal';
import ErrorModal from 'src/components/ErrorModal'

const Books = () => {
  const history = useHistory();  
  const dispatch = useDispatch();
  const CreateFileRef = useRef<HTMLInputElement | null>(null);
  const UpdataFileRef = useRef<HTMLInputElement | null>(null);
  const [workBooksListId, setWorkBooksListId] = useState<string | null>();
  const BookState = useSelector((state: RootReducerType) => state.contents);
  const [DeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [BookTitle, setBookTitle] = useState<string | null>();
  const [errorModal, setErrorModal] = useState({
    open:false,
    title:"",
    content:""
  });
  
  useEffect(() => {
    dispatch(bookPageInit());
  }, [dispatch]); 
  
  const { loading, data, error } = BookState;
  // console.log(state.data?.results);

  //TODO 서버에러
  useEffect(()=>{
    if(error){
      setErrorModal({
        ...errorModal,
        open:true,
        title:`${error.message}`,
      })
    };
  },[]);

  //TODO BOOK 생성 
  const handleClickCreateFile = () =>{
    if(!CreateFileRef.current) return;
    CreateFileRef.current.click();
  }
  
  const CreateBook = (event) => {
    if(!event.target.files[0]) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
    const newBooks = {
        category:"WORKBOOK",
        image_cover:reader.result
      };
      dispatch(bookCreateInit(newBooks));
    }
    
  };

  //TODO BOOK 이미지 변경
  const handleClickUpdataFile = useCallback((e: any, id:any) =>{
    e.stopPropagation();
     setWorkBooksListId(id)
     if(!UpdataFileRef.current) return;
     UpdataFileRef.current.click();
  },[]);
  
  const UpdateBookImage = (event: any) => {
    if(!event.target.files[0]) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
    const updateBook = {
        id:workBooksListId,
        image_cover:reader.result
      };
      dispatch(bookUpdateInit(updateBook));
    }
  };

    //TODO BOOK 제목 변경
    const ChangeBooksTitle =(e: any) => {
      setBookTitle(e.target.value);
  }
  
  const KeyPressBooksTitle= (e:any, id:any)=>{
    const updateBook={
      id:id,
      title:BookTitle
    }
    console.log(e.key)
    if(e.key === "Enter"){
      dispatch(bookUpdateInit(updateBook));
    }
  }
  
  //TODO BOOK DELETE
  const bookDeeteModal = (e:any, id:any) =>{
    e.stopPropagation();
    handleDeleteModal();
    setWorkBooksListId(id);
  }

  const bookDeete = (id:any) =>{
    handleDeleteModal();
    const deleteId = {
      id:workBooksListId
    }
    dispatch(bookDeleteInit(deleteId));
  }



  //TODO Books 클릭시 페이지 이동
  const handleClickBook = (id:any) => {
    history.push(`/books/pages/${id}`);
  }

  const handleDeleteModal = () => {
    setDeleteModalOpen(!DeleteModalOpen);
  }
  const handleErrorModal = () =>{
    setErrorModal({
      ...errorModal,
      open:false,
    })
  }

  if(loading) return ( 
  <div className="Main">
    <div className="sideBar">
      <div className="list activate"><div className="img"></div>문제집</div>
      <div className="list"> <div className="img"></div>문제집</div>
    </div>
    <div className="container"></div>
    <Loading />
    </div>
    )
  return (
    <div className="Main">
      <div className="sideBar">
          <div className="list activate"><div className="img"></div>문제집</div>
          <div className="list"> <div className="img"></div>문제집</div>
      </div>
     
       <div className="container">
        <div className="container-card"><div className="plus" onClick={handleClickCreateFile}></div>
        <input type="file" name="CreateFile" ref={CreateFileRef}  accept=" .jpg, .jpeg, .png" onChange={CreateBook}/>
        </div>
            {data?.results?.map((item,index) =>{
                return(
                    <Container 
                    item={item}
                    index={index}
                    handleClickBook={(e) => handleClickBook(e)}
                    handleClickUpdataFile={handleClickUpdataFile} 
                    UpdataFileRef={UpdataFileRef}
                    bookDeeteModal={bookDeeteModal}
                    key={index}
                    ChangeBooksTitle={ChangeBooksTitle}
                    KeyPressBooksTitle={KeyPressBooksTitle}
                    />
                    
                ) 
            }
            )}
           <input type="file" name="UpdateFile" ref={UpdataFileRef}  accept=".jpg, .jpeg, .png" onChange={UpdateBookImage}/>
       </div>
       <DeleteModal 
          title="문제집 삭제" 
          content="데이터가 모두 삭제 됩니다." 
          isOpen={DeleteModalOpen} 
          handleDeleteModal={handleDeleteModal} 
          bookDeete={bookDeete} 
        />
       <ErrorModal 
          title={errorModal.title} 
          errorModalOpen={errorModal.open} 
          handleErrorModal={handleErrorModal}  />
    </div>
  );
};

export default (Books)