import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * 深入 JSX
 */

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}

ReactDOM.render(
    <BlueDatePicker />,
    document.getElementById('blueDatePicker')
);

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}

ReactDOM.render(
    <ListOfTenThings />,
    document.getElementById('listOfTenThings')
);

//之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。
//因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
//值得注意的是，React 提供了一些 “falsy” 值 （即， 除了false 外，0，“”，null，undefined 和 NaN），它们依然会被渲染。

/**
 * 使用 PropTypes 进行类型检查
 */

class Greeting2 extends React.Component {
    render() {
        // This must be exactly one element or it will warn.
        const children = this.props.children;
        return (
            <div>
                {children}
            </div>
        );
    }
}

Greeting2.propTypes = {
    children: PropTypes.element.isRequired
};

ReactDOM.render(
    <Greeting2 />,
    document.getElementById('greeting2')
);

/**
 * Refs & DOM
 */

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
    }
    focus() {
        this.textInput.focus();
    }
    render() {
        return (
            <div>
                <input
                    type='text'
                    ref={(input) => { this.textInput = input; }}
                />
                <input
                    type='button'
                    value='Focus the text input'
                    onClick={this.focus}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <CustomTextInput />,
    document.getElementById('customTextInput')
);

class NameForm2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.input.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.input = input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <NameForm2 />,
    document.getElementById('nameForm2')
);