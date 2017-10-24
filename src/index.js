import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './depth.js'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

/**
 * 更新元素渲染
 */
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

/**
 * 组合组件
 */

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

/**
 * 提取组件
 */

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

/**
 * State & 生命周期
 */

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

/**
 * 事件处理
 */

function ActionLink() {
    function handleClick(e) {
        // 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。
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

/**
 * 事件处理
 */

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        console.log('this is:', this);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('this is:', this); //你必须谨慎对待 JSX 回调函数中的 this，类的方法默认
        //是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用
        //这个函数的时候 this 的值会是 undefined。
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

/**
 * 事件处理
 */

class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }
    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <button onClick={(e) => this.handleClick(e)}>Click me</button>
        );
    }
}

ReactDOM.render(
    <LoggingButton />,
    document.getElementById('loggingButton')
);

/**
 * 使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。
 * 在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可
 * 能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类
 * 性能问题。
 */

/**
 * 条件渲染
 */

function UserGreeting(props) {
    return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}

ReactDOM.render(
    <Greeting isLoggedIn={false} />,
    document.getElementById('greeting')
);

/**
 * 元素变量
 */

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>Login</button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>Logout</button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }
    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }
    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('loginControl')
);

/**
 * 与运算符 &&
 * 
 * 之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。
 * 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
 * 
 * 值得注意的是，React 提供了一些 “falsy” 值 （即， 除了false 外，0，“”，null，undefined 和 NaN），它们依然会被渲染。
 */

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const message = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={message} />,
    document.getElementById('mailbox')
);

/**
 * 阻止组件渲染
 */

function WarningBanner(props) {
    if (!props.warn) {
        return null; // 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。
        // 例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.state = { showWarning: true };
    }
    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }
    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('page')
);

/**
 * 列表 & Keys
 */

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    // 一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串
    <li key={number.toString()}>
        {number}
    </li>
);

ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('listItems')
);

/**
 * Keys
 */

function ListItem(props) {
    // 这里不需要明确出key:
    return <li>{props.value}</li>
}
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // key应该在数组中被明确出来
        <ListItem key={number.toString()} value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

// const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('numberList')
);

/**
 * 元素的key在他的兄弟元素之间应该唯一
 */

function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        //key会作为给React的提示，但不会传递给你的组件。
        //如果您的组件中需要使用和key相同的值，请将其作为属性传递
        <div key={post.id} title={post.title}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('blog')
);

/**
 * 在jsx中嵌入map()
 */

function ListItem1(props) {
    // 这里不需要明确出key:
    return <li>{props.value}</li>
}
function NumberList1(props) {
    const numbers = props.numbers;
    // const listItems = numbers.map((number) =>
    //     // key应该在数组中被明确出来
    //     <ListItem1 key={number.toString()} value={number} />
    // );
    return (
        <ul>
            {numbers.map((number) =>
                <ListItem1 key={number.toString()} value={number} />
            )}
        </ul>
    );
}

// const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList1 numbers={numbers} />,
    document.getElementById('numberList1')
);

/**
 * 受控组件
 */

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        //当用户提交表单时，HTML的默认行为会使这个表单会跳转到一个新页面。在React中亦是如此。
        //在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。
        event.preventDefault();//你必须明确的使用 preventDefault。

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
ReactDOM.render(
    <NameForm />,
    document.getElementById('nameForm')
);

/**
 * textarea标签
 */

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Please write an essay about your favorite DOM element.' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
ReactDOM.render(
    <EssayForm />,
    document.getElementById('essayForm')
);

/**
 * select标签
 */

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite La Croix flavor:
                    {/*在React中，会在根select标签上而不是在当前的selected属性上使用value属性。*/}
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
ReactDOM.render(
    <FlavorForm />,
    document.getElementById('flavorForm')
);

/**
 * 多个输入的解决方法
 */

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        //当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input name='isGoing' type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input name='numberOfGuests' type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}
ReactDOM.render(
    <Reservation />,
    document.getElementById('reservation')
);

/**
 * 状态提升
 */
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>
    }
    return <p>水不会烧开</p>
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { temperature: '' }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        // this.setState({ temperature: event.target.value })
        this.props.onTemperatureChange(event.target.value);
    }
    render() {
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input type="text" value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { temperature: '', scale: 'c' }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature: temperature });
    }
    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature: temperature });
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            </div>
        );
    }
}
ReactDOM.render(
    <Calculator />,
    document.getElementById('calculator')
);

/**
 * 组合 vs 继承
 */
//虽然不太常见，但有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children：

function Contacts() {
    return <div className='Contacts' />;
}

function Chat() {
    return <div className='Chat' />;
}

function SplitPane(props) {
    return (
        <div className='SplitPane'>
            <div className='SplitPane-left'>
                {props.left}
            </div>
            <div className='SplitPane-right'>
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            }
        />
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
            {/* <FancyBorder> JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。
                由于 FancyBorder 在一个 <div> 内渲染了 {props.children}，所以被传递的所有
                元素都会出现在最终输出中。 */}
        </div>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color='blue'>
            <h1 className='Dialog-title'>
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

function WelcomeDialog(props) {
    return (
        <Dialog title='Welcome' message='Thank you for visiting our spacecraft!' />
    );
}

ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('welcomeDialog')
);

/**
 * 特殊实例
 */

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = { login: '' };
    }
    handleChange(event) {
        this.setState({ login: event.target.value });
    }
    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
    render() {
        return (
            <Dialog title='Mars Exploration Program' message="How should we refer to you?">
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>Sign Me Up!</button>
            </Dialog>
        );
    }
}

ReactDOM.render(
    <SignUpDialog />,
    document.getElementById('signUpDialog')
);

/**
 * React 理念
 */

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan='2'>{this.props.category}</th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{ color: 'red' }}>
                {this.props.product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }
    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }
    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }
    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder='Search...'
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterText: '', inStockOnly: false };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }
    handleFilterTextInput(filterText) {
        this.setState({ filterText: filterText });
    }
    handleInStockInput(inStockOnly) {
        this.setState({ inStockOnly: inStockOnly });
    }
    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

var PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('filterableProductTable')
);

/**
 * 它是通过 props 从父级传来的吗？如果是，他可能不是 state。
 * 它随着时间推移不变吗？如果是，它可能不是 state。
 * 你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。
 */

