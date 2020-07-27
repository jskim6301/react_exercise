// import React,{useState, useEffect} from 'react';
import React,{useReducer} from 'react';
import useInputs from './useInputs';
/**
 * 여러 컴포넌트에서 비슷한 기능을 공유할 경우, 이를 자신만의 Hook으로 작성하여
 * 로직을 재사용할 수 있다.
 * 기존의 Info 컴포넌트에서 여러 개의 인풋을 관리하기 위해 useReducer로 작성했던
 * 로직을 useInputs라는 Hook으로 따로 분리
 */
const Info = () => {
    const [state,onChange] = useInputs({
        name:'',
        nickname:''
    });
    const {name,nickname} = state;
    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}/>
                <input name="nickname" value={nickname} onChange={onChange}/>
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>                
            </div>
        </div>
    );    
};

export default Info;
/**
 * useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 
 * 무엇을 넣는지에 따라 실행되는 조건이 달라진다.
 * 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면
 * useeffect에서 뒷정리(cleanup) 함수를 반환해 주어야 한다.
 */

// const Info = () => {
//     const [name,setName] = useState('');
//     const [nickname,setNickname] = useState('');

//     useEffect(() => {
//         console.log('effect');
//         console.log(name);
//         return () => {
//             console.log('cleanup');
//             console.log(name);
//         };   
//     },[name]);

//     const onChangeName = e => {
//         setName(e.target.value);
//     };

//     const onChangeNickname = e => {
//         setNickname(e.target.value);
//     }


//     return (
//         <div>
//             <div>
//                 <input value={name} onChange={onChangeName}/>
//                 <input value={nickname} onChange={onChangeNickname}/>
//             </div>
//             <div>
//                 <div>
//                     <b>이름:</b> {name}
//                 </div>
//                 <div>
//                     <b>닉네임:</b> {nickname}
//                 </div>                
//             </div>
//         </div>
//     );
// };




/*

function reducer(state,action){
    return {
        //console로 state찍어보기
        ...state,
        [action.name]: action.value
    };
}
const Info = () => {
    //state는 name과 nickname을 가리킨다.
    const [state,dispatch] = useReducer(reducer,{
        name:'',
        nickname:''
    });
    const {name,nickname} = state;
    const onChange = e => {
        dispatch(e.target);
    };

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}/>
                <input name="nickname" value={nickname} onChange={onChange}/>
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>                
            </div>
        </div>
    );
}


*/