import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

// 새 일기 데이터를 '작성완료' 버튼 누르면 일기 데이터가 추가되어야 함
// App 함수의 onCreate를 호출해서 추가해야 하므로
// 함수 onCreate를 DiaryDispatchContext에서 불러옴

const New = () => {
    // 리액트 훅을 사용해서 DiaryDispatchContext를 인수로 받아 onCreate 함수 소환
    // 중괄호 사용 이유는 일기 데이터의 구조가 json 파일 형식의 객체 데이터 형태이므로
    const {onCreate} = useContext(DiaryDispatchContext); 
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        const {date, content, emotionId} = data;
        onCreate(date, content, emotionId);
        navigate('/', {replace: true});
    };
    
    const goBack = () => {
        navigate(-1);
    };

    return (
    <div>
        <Header title={'새 일기 쓰기'} leftChild={<Button onClick={goBack} text={'< 뒤로가기'} />} />
        <Editor onSubmit={onSubmit}/>
    </div>
    )
}
export default New;