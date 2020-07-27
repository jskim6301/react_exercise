// import React,{useState} from 'react';
import React,{useReducer} from 'react';

/*
useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 
싶을 때 사용하는 Hook이다.
리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action)값을 전달받아 새로운
상태를 반환하는 함수이다.
리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 주어야 한다.

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 
두 번째 파라미터에는 해당 리듀서의 기본값을 넣어준다.
이 Hook을 사용하면 state값과 dispatch함수를 받아 오는데,
여기서 state는 현재를 가리키고 있는 상태고, dispatch는 액션을 발생시키는 함수이다.
dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가
호출되는 구조이다.

useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.


*/

function reducer(state,action){
    //action.type에 따라 다른 작업 수행
    switch(action.type){
        case 'INCREMENT':
            return {value: state.value + 1};
        case 'DECREMENT':
            return {value: state.value - 1};
        default:
            //아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}



const Counter = () => {
    const [state,dispatch] = useReducer(reducer,{value:0});

    return (
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>입니다.
            </p>
            <button onClick={() => dispatch({type:'INCREMENT'})}>+1</button>
            <button onClick={() => dispatch({type:'DECREMENT'})}>-1</button>
        </div>
    );
};

export default Counter;
// const Counter = () => {
//     const [value,setValue] = useState(0);
//     return (
//         <div>
//             <p>
//                 현재 카운터 값은 <b>{value}</b>입니다.
//             </p>
//             <button onClick={() => setValue(value+1)}>+1</button>
//             <button onClick={() => setValue(value-1)}>-1</button>
//         </div>
//     );
// }
