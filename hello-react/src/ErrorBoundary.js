import React,{Component} from 'react';
/**
 * 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고 자신의 this.props.children으로 전달되는 
 * 컴포넌트에서 발생하는 에러만 잡아낼 수 있다.
 */
class ErrorBoundary extends Component{
    state = {
        error:false
    };
    componentDidCatch(error,info){
        this.setState({
            error:true
        });
        console.log({error,info});
    }
    render(){
        if(this.state.error) return <div>에러가 발생했습니다!</div>;
        console.log("this.props.children>>>",this.props.children);
        return this.props.children;
    }
}
export default ErrorBoundary;