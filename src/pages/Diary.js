// App.js에서 부여한 다이나믹 컨텐츠 라우팅 주소에 대한
// 컴포넌트를 부여하고자 함
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormattedDate, setPageTitle } from "../util";
import Viewer from "../component/Viewer";
import { useEffect } from "react";

const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  useEffect(() => {
    setPageTitle("여기는 일기 썼던거 보는 곳");
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  // console.log(data);  // undefined 먼저 나오고 출력
  // 데이터가 느리게 로딩이 되면 데이터를 표시하는 헤더와 뷰어 섹션이
  // 데이터 도착 전에 렌더딩되어서는 안됨

  if (!data) {
    return <div>일기 데이터를 불러오고 있습니다.</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

    return (
      <div>
        <Header
          title={title}
          leftChild={<Button onClick={goBack} text={"< 뒤로가기"} />}
          rightChild={<Button onClick={goEdit} text={"수정하기"} />}
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};
export default Diary;
