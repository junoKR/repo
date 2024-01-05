// 데이터 등을 새로운 페이지로 이동시킬 때 useNavigate 리액트 훅을 사용하여 손쉽게 작업 가능
// 리액트 훅의 제약사항은 페이지 구성요소인 '컴포넌트'에서만 사용 가능
// 앱 내 일반함수에서는 리액트 훅을 사용할 수 없어서 페이지 이동 기능을 이용하지 못하는 제약사항이 있음
// 그래서 유저가 리액트 훅의 기능을 직접 코딩하여 유저만의 코드 즉, 커스텀 훅 생성

// 커스텀 훅 useDiary 생성
// 직접 프로그래밍한 함수가 리액트 훅스라는 것을 나타내기 위해 앞에 use 붙임
// 고유데이터를 구분하는 id를 인풋값으로 받음
// useDiary 함수를 통해 일기 데이터를 불러오는 기능 구현
// useContext를 통해 전체 일기데이터를 불러온 후 데이터 페이지 이동을 처리

// re-direction : 사용자를 특정 주소로 보냄

// useNavigate를 통해서 입력 id와 일치하는 일기 데이터가 없으면
// home화면으로 사용자를 리다이렉트 즉, 보내는 기능 구현

import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();
    
    // useEffect를 이용해 id나 data값이 바뀔때마다 일기 데이터에서 id값과 일치하는
    // 일기를 찾아 해당 일기 데이터를 업데이트
    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if(matchDiary){
            setDiary(matchDiary);
        } else {
          // id값과 일치하는 일기 데이터가 없으면
          alert('일기 데이터가 존재하지 않습니다.')
          navigate('/', {replace: true});  
        };
    }, [id, data]);
    
    return diary;
};

export default useDiary;