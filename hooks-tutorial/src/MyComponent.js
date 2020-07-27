import React, {Component} from 'react';
/**
 * 로컬 변수를 사용할 때도 useRef를 활용할 수 있다.
 * 여기서 로컬 변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미함.
 * 클래스 컴포넌트형일 경우
 */
class MyComponent extends Component{
    id = 1
    setId = (n) =>{
        this.id = n;
    }
    printId = () => {
        console.log(this.id);
    }
    render(){
        return(
            <div>
                MyCompoent
            </div>
        );
    }
}
export default MyComponent;

/**
 * 함수형 컴포넌트일 경우
 * 이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다.
 * 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성한다.
 */
import React,{useRef} from 'react';

const RefSample = () => {
    const id = useRef(1);
    const setId = (n) => {
        id.current = n;
    }
    const printId = () => {
        console.log(id.current);
    }
    return(
        <div>
            refsample
        </div>
    );
};
export default RefSample;