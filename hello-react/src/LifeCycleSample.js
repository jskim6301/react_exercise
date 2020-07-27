import React,{Component} from 'react';

class LifeCycleSample extends Component{
    state={
        number: 0,
        color: null,
    }
    myRef = null; //ref를 설정할 부분
    constructor(props){
        super(props);
        console.log('constructor');
    }
    static getDerivedStateFromProps(nextProps,prevState){
        console.log('getDerivedStateFromProps');
        console.log("prevState>>",prevState); // {number:0,color:null}
        console.log("nextProps>>",nextProps); // {color:"#000000"}
        if(nextProps.color !== prevState.color){ //조건에 따라 특정 값 동기화
            console.log("조건에 따라 특정 값 동기화");
            return { color:nextProps.color};
        }
        return null; // state를 변경할 필요가 없다면 null을 반환
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.number % 10 !== 4; //숫자의 마지막 자리가 4면 리렌더링하지 않는다.
    }

    componentWillUnmount(){
        console.log('componentWillUnMount');
    }

    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('getSnapshotBeforeUpdate');
        console.log('getSnapshotBeforeUpdate prevProps>>',prevProps);//{color:'#000000'}
        console.log('getSnapshotBeforeUpdate prevState>>',prevState);//{number:0,1,2,color:'#000000'}  => 이전 단계의 값
        if(prevProps.color !== this.props.color){
            return this.myRef.style.color;
        }
        return null;
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(snapshot){
            console.log('업데이트되기 직전 색상: ',snapshot);
        }
    }
    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        });
    }
    render(){
        const style = {
            color: this.props.color
        };
        return (
            <div>
                
                <h1 style={style} ref={ref=>this.myRef=ref}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>
                    더하기
                </button>
            </div>
        )
    }
}
export default LifeCycleSample;
/**
1.getDerivedStateFromProps 메서드
리액트 v16.3 이후에 새로 만든 라이프사이클 메서드입니다.
props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트될 때 호출됩니다.

2.componentDidMount 메서드
컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행. 이 안헤서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나,
이벤트 등록, setTimeout,setInterval,네트워크 요청같은 비동기 작업을 처리하면 된다.

3.shouldComponentUpdate 메서드
이것은 props 또는 state를 변경했을 때 리렌더링을 시작할지 여부를 지정하는 메서드.
이 메서드에서는 반드시 boolean값을 반화해야 한다. 컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true 값을 반환함.
이 메서드가 false 값을 반환한다면 업데이트 과정은 여기서 중지된다.
현재 props와 state는 this.props와 this.state로 접근하고, 새로 설정될 props 또는 state는 nextProps와 nextState로 접근할 수 있다.
프로젝트 성능을 최적화 할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 false 값을 반환하게 한다.

4.componentWillUnmount 메서드
이것은 컴포넌트를 DOM에서 제거할 때 실행한다. 제거작업을 여기서 한다.

5.getSnapshotBeforeUpdate 메서드
리액트 v16.3 이후에 새로 만든 라이프사이클 메서드입니다.
이 메서드는 render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출됩니다.
이 메서드에서 반환하는 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot값으로 전달받을 수 있는데, 주로 업데이트하기 직전의 값을 참고할
일이 있을 때 활용된다.

6.componentDidUpdate 메서드
이것은 리렌더링을 완료한 후 실행한다.업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다.
여기서는 prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.
또 getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있다.
 */