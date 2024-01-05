// 취소하기 버튼은 누르면 메인 페이지로 한칸 돌아가야 함
// 리액트에서 뒤로가기 이벤트가 동작하려면 react-router-dom 기능 중
// useNavigate 훅을 이용

import { useNavigate } from "react-router-dom";
import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { setPageTitle } from "../util";

const Editor = ({ initData, onSubmit }) => {
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });

  // 날짜 관련 이벤트 핸들러 만들기
  // 사용자가 입력된 날짜를 변경하면 함수가 호출되어 state를 업데이트
  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  // 작성완료 버튼의 onclick 함수를 만들고자 함
  const handleSubmit = () => {
    onSubmit(state);
  };

  // useNavigate를 호출해서 함수 navigate를 생성하면 페이지 간의 이동이 간편해짐
  const navigate = useNavigate();

  const handleOnGoBack = () => {
    navigate(-1);
  };

  // 감정 이미지를 클릭하면 호출할 이벤트 함수를 생성
  // 감정 이미지 선택 센션에서 클릭한 이미지 번호를 매개변수 emotionId에 저장
  // 이 저장된 번호로 현재 state의 emotionId 값 업데이트
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);

  // editor 컴포넌트에서 useEffect를 호출하고 props로 받은 initData를 의존성 배열에 저장
  // useEffect의 콜백 함수가 실행될 때 initData 여부를 확인하여 setState로 상태를 업데이트
  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <div className="Editor_section">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
          {/* 날짜 입력창 기본값을 오늘 날짜로 하고 싶다면
                    오늘 날짜를 yyyy-mm-dd 형식으로 만드려면
                    날짜 객체를 만들고 이 객체의 함수로 형식을 바꾸면 된다 
                    -> util.js에서 getFormattedDate */}
        </div>
      </div>
      <div className="Editor_section">
        <h4>오늘의 감정</h4>
        <div className="input_wrapper emotion_list_wrapper">
          {/* map 함수를 이용해 emotionList에 저장된 5개의 이미지 객체 렌더링 
                    props의 key로 감정 이미지의 id와 프로퍼티를 전달 
                    마지막으로 현재 배열요소의 id와 state.emotionId가 동일한지 확인 작업을 통해서 
                    현재 선택된 감정 이미지 여부를 파악 */}
          {emotionList.map((it) => (
            // <img key={it.id} alt={`emotion${it.id}`} src={it.img} />
            <EmotionItem
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
              p
            />
          ))}
        </div>
      </div>
      <div className="Editor_section">
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
            placeholder="오늘의 일기"
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="Editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;
