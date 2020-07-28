import classNames from 'classnames';

classNames('one','two'); // = 'one two'
classNames('one',{two : true}); // = 'one two'
classNames('one',{two:false}); // 'one'
classNames('one',['two','three']); // 'one two three'

const myClass = 'hello';
classNames('one',myClass,{myCondition:true}); // = 'one hello myCondition'

/**
 * 여러 가지 종류의 파라미터를 조합해 CSS클래스를 설정할 수 있기 때문에 컴포넌트에서 조건부로 클래스를
 * 설정할 때 매우 편하다. 예를 들어 props 값에 따라 다른 스타일을 주기가 쉬워진다.
 */
const MyComponent = ({highlighted,theme}) => {
    <div className={classNames('MyComponent',{highlighted},theme)} >Hello</div>
};
/**
 * highlighted 값이 true이면 highlighted 클래스가 적용되고, false이면 적용되지 않는다.
 * 추가로 theme으로 전달받는 문자열은 내용 그대로 클래스에 적용된다.
 */
const MyComponent = ({highlighted,theme}) => {
    <div className={`MyComponent ${theme} ${highlighted ? 'highlighted' : ''}`}>
        Hello
    </div>
}