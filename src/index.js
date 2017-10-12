import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function tick() {
    const element = (
        <div>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    )
}
setInterval(tick, 1000);

function Welcome(params) {
    return <h1>Hello, {params.name}</h1>
}

function App(params) {
    return (
        <div>
            <Welcome name='Sara' />
            <Welcome name='Cahal' />
            <Welcome name='Edite' />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('welcome')
);

function formatDate(date) {
    return date.toLocaleDateString();
}

function Avatar(props) {
    return (
        <img className='Avatar' src={props.user.avatarUrl} alt={props.user.name} />
    );
}

function UserInfo(props) {
    return (
        <div className='UserInfo'>
            {/* <img className='Avatar' src={props.author.avatarUrl} alt={props.author.name} /> */}
            <Avatar user={props.user} />
            <div className="UserInfo-name">{props.user.name}</div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className='Comment'>
            {/* <div className='UserInfo'> */}
            {/* <img className='Avatar' src={props.author.avatarUrl} alt={props.author.name} /> */}
            {/* <Avatar user={props.author} /> */}
            {/* <div className="UserInfo-name">{props.author.name}</div> */}
            {/* </div> */}
            <UserInfo user={props.author} />
            <div className="Comment-text">{props.text}</div>
            <div className="Comment-date">{formatDate(props.date)}</div>
        </div>
    );
}

const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'http://placekitten.com/g/64/64',
    }
};

ReactDOM.render(
    <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
    />,
    document.getElementById('comment')
);

// Clock设置一个定时器并且每秒更新UI应该是Clock的实现细节
// function Clock(props) {
//     return (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {props.date.toLocaleTimeString()}.</h2>
//         </div>
//     );
// }

// 为了实现这个需求，我们需要为Clock组件添加状态
// 状态与属性十分相似，但是状态是私有的，完全受控于当前组件。
// 使用类就允许我们使用其它特性，例如局部状态、生命周期钩子
// 为一个类添加局部状态
// 将生命周期方法添加到类中
class Clock extends React.Component {
    constructor(props) {
        // console.log('constructor');
        super(props);
        this.state = { date: new Date() }; // 为一个类添加局部状态, 添加一个类构造函数来初始化状态 this.state
    }
    // 生命周期钩子, 当组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
        // console.log('componentDidMount');
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    // 生命周期钩子, 在 componentWillUnmount（）生命周期钩子中卸载计时器
    componentWillUnmount() {
        // console.log('componentWillUnmount');
        clearInterval(this.timerID);
    }
    tick() {
        // console.log('tick');
        this.setState({
            date: new Date()
        });
    }
    render() {
        // console.log('render');
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('clock')
);

/**
 * 让我们快速回顾一下发生了什么以及调用方法的顺序：
 * 
 * 1. 当 <Clock /> 被传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。 由
 * 于 Clock 需要显示当前时间，所以使用包含当前时间的对象来初始化 this.state 。 我们稍
 * 后会更新此状态。
 * 
 * 2. React 然后调用 Clock 组件的 render() 方法。这是 React 了解屏幕上应该显示什么内容，
 * 然后 React 更新 DOM 以匹配 Clock 的渲染输出。
 * 
 * 3.当 Clock 的输出插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。 在
 * 其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick()。
 * 
 * 4.浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用
 *  setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用
 *  render() 方法来确定屏幕上应当显示什么。 这一次，render() 方法中的
 *  this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
 * 
 * 5.一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子函数，定时器也就会被清除。
 */

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    return (
        <a href="#" onClick={handleClick}>Click me</a>
    );
}

ReactDOM.render(
    <ActionLink />,
    document.getElementById('actionLink')
);

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        console.log('this is:', this);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('this is:', this); //你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。
        //如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        return (
            <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('toggle')
);