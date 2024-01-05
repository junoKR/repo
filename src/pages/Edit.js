import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";

// 커스텀 훅스의 기능 사용 경우는 일반 함수에서 훅스가 안먹는 경우 (특히 useNavigate)도 있지만
// 리액트 훅스의 조합으로 내가 필요한 기능을 '맞춤 커스텀'으로 맞춤 함수를 만드는 목적도 있음
// (내가 자주 쓰는 기능을 사전에 함수로 미리 만드는 목적)

const Edit = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);

    const onClickDelete = () => {
        if(window.confirm('일기를 삭제할까요? 삭제된 일기는 복구되지 않습니다.')){
            onDelete(id);
            navigate('/', {replace: true});
        };
    };

    const onSubmit = (data) => {
        if(window.confirm('일기를 수정할까요?')){
            const {date, content, emotionId} = data;
            onUpdate(id, date, content, emotionId);
            navigate('/', {replace: true});
        };
    };

    if(!data){
        return <div>일기를 불러오고 있습니다.</div>
    } else {
        return (
        <div>
            <Header title={'일기 수정하기'} leftChild={<Button onClick={goBack} text={'< 뒤로가기'}/>} rightChild={<Button type={'negative'} onClick={onClickDelete} text={'삭제하기'} />} /> 
            <Editor initData={data} onSubmit={onSubmit} />
        </div>
        )
    };
};

export default Edit;