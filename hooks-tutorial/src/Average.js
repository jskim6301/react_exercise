import React,{useState,useMemo,useCallback,useRef} from 'react';
/**
 * useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해준다.
 * useRef를 사용하여 usrRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.
 */
const getAverage = numbers => {
    console.log('평균값 계산중');
    if(numbers.length ===0) return 0;
    const sum = numbers.reduce((a,b) => a+ b);
    return sum/numbers.length;
};
const Average = () => {
    const [list,setList] = useState([]);
    const [number,setNumber] = useState('');
    const inputEl = useRef(null);

    const onChange = useCallback(e=>{
        setNumber(e.target.value);
    },[]); //컴포넌트가 처음 렌더링될 때만 함수 생성

    const onInsert = useCallback(()=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus();
    },[number,list]);//number 혹은 list가 바뀌었을 때만 함수 생성

    const avg = useMemo(()=>getAverage(list),[list]);

    return(
        <div>
            <input value={number} onChange={onChange} ref={inputEl}/>
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    );
};

export default Average;

/*
리스트에 숫자를 추가하면 추가된 숫자들의 평균을 구해주는 함수형 컴포넌트
숫자를 등록할 떄뿐만 아니라 인풋 내용이 수정될 때도 우리가 만든 getAverage()가 호출이 된다.
인풋 내용이 바뀔 때는 평균값을 다시 계산할필요가 없음 => 렌더링마다 계산하는 것은 낭비
useMemo Hook을 사용하면 이러한 작업을 최적화할 수 있다.
렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식


const getAverage = numbers => {
    console.log('평균값 계산중');
    if(numbers.length ===0) return 0;
    const sum = numbers.reduce((a,b) => a+ b);
    return sum/numbers.length;
};

const Average = () => {
    const [list,setList] = useState([]);
    const [number,setNumber] = useState('');
    
    const onChange = e => {
        setNumber(e.target.value);
    };
    const onInsert = e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    };
    return(
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{getAverage(list)}
            </div>
        </div>
    );
};
*/


/*
//useMemo 사용
const getAverage = numbers => {
    console.log('평균값 계산중');
    if(numbers.length ===0) return 0;
    const sum = numbers.reduce((a,b) => a+ b);
    return sum/numbers.length;
};

const Average = () => {
    const [list,setList] = useState([]);
    const [number,setNumber] = useState('');
    
    const onChange = e => {
        setNumber(e.target.value);
    };
    const onInsert = e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    };

    const avg = useMemo(() => getAverage(list),[list]);

    return(
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    );
};

*/


/**
 * useMemo와 상당히 비슷한 함수이다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용한다.
 * 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.
 * useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 된다.
 * 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생서앻야 하는지 명시해야 한다.
 * onChange처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성되며,
 * onInsert처럼 배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때마다
 * 함수가 생성된다.
 * 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 한다.
 * 예를 들어 onChange의 경우 기존의 number와 list를 조회해서 nextList를 생성하기 때문에
 * 배열 안에 number와 list를 꼭 넣어 주어야 한다.
 * useCallback은 결국 useMemo로 함수를 반환하는 상황에서 더 편하게 사용할 수 있는 Hook이다.
 * 숫자,문자열,객체처럼 일반 값을 재사용하려면 useMemo를 사용하고, 함수를 재사용하려면 useCallback을 사용
 * 
 * 예시코드) - 다음 두 코드는 완전히 똑같은 코드이다.
 * useCallback(()=>{
 *  console.log('hello world!');
 * },[])
 * 
 * useMemo(()=>{
 *  const fn = () => {
 *      console.log('hello world!);
 *  };
 *  return fn;
 * },[])
 */

 /*
const getAverage = numbers => {
    console.log('평균값 계산중');
    if(numbers.length ===0) return 0;
    const sum = numbers.reduce((a,b) => a+ b);
    return sum/numbers.length;
};

const Average = () => {
    const [list,setList] = useState([]);
    const [number,setNumber] = useState('');
    
    // const onChange = e => {
    //     setNumber(e.target.value);
    // };
    const onChange = useCallback(e=>{
        setNumber(e.target.value);
    },[]);//컴포넌트가 처음 렌더링될 때만 함수 생성
    // const onInsert = e => {
    //     const nextList = list.concat(parseInt(number));
    //     setList(nextList);
    //     setNumber('');
    // };
    const onInsert = useCallback(()=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    },[number,list]);//number 혹은 list가 바뀌었을 때만 함수 생성

    const avg = useMemo(() => getAverage(list),[list]);

    return(
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    );
};
*/