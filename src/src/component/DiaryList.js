import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryList.css';
import Button from './Button';
import DiaryItem from './DiaryItem';

const sortOptionList = [
    {value: 'latest', name: '최신순'},
    {value: 'oldest', name: '오래된순'},
]

const DiaryList = ({data}) => {
    // useState를 호출해서 '최신순', '오래된순' 분류 기준에 따라 state 업데이트가 일어날 수 있게 리액트 훅스 state를 설정, 초기값은 '최신순'
    const [sortType, setSortType] = useState('latest');
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const compare = (a, b) => {
            // 분류 기준이 최신순이면 Number 메서드로 명시적 형변환 후 내림차순으로 날짜 객체 기준으로 정렬
            // 반대의 경우는 오름차순으로 일기 데이터를 정렬
            if(sortType === 'latest'){
               return Number(b.date) - Number(a.date); 
            } else {
                return Number(a.date) - Number(b.date);
            };
        };

        // 데이터의 형식은 JSON이므로 정렬한 데이터를 해석하여 나열해야 함
        // 그래서 JSON 데이터 해석 후 위에서 정의한 compare 함수를 사용하여
        // 데이터를 정렬하고 그 데이터를 저장
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);

    // 상태 업데이트를 초기세팅했다면 이제 상태 업데이트에 대한 이벤트 핸들러 함수 선언
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    const navigate = useNavigate();

    const onClickNew = () => {
        navigate('/new');
    }

    return <div className='DiaryList'>
        <div className='menu_wrapper'>
            <div className='left_col'>
                <select value={sortType} onChange={onChangeSortType}>
                    {sortOptionList.map((it, idx) => (
                    <option key={idx} value={it.value}>
                        {it.name}
                    </option>))}
                </select>
            </div>
            <div className='right_col'>
                <Button type={'positive'} text={'새일기쓰기'} onClick={onClickNew} />
            </div>
        </div>
        <div className='list_wrapper'>
                        {sortedData.map((it) => (<DiaryItem key={it.id} {...it} />))}
        </div>
    </div>
};

export default DiaryList;