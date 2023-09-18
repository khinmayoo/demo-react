import { useEffect, useState, useRef } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import '../reset.css';
import '../App.css';
import { TodosContext } from '../context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
    // const [name, setName] = useState('');
    const [name, setName] = useLocalStorage('name', '');
    const nameInputEl = useRef(null);
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [filter, setFilter] = useState('all');
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

    function todosFiltered() {
        if (filter === 'all') {
            return todos;
        } else if (filter === 'active') {
            return todos.filter(todo => !todo.isComplete);
        } else if (filter === 'completed') {
            return todos.filter(todo => todo.isComplete);
        }
    }

    useEffect(() => {
        // console.log('use effect running');
        nameInputEl.current.focus();

        // setName(JSON.parse(localStorage.getItem('name')) ?? '');

        return function cleanup() {
            // console.log('cleaning up');
        };
    }, []);

    function handleNameInput(event) {
        setName(event.target.value);
        // localStorage.setItem('name', JSON.stringify(event.target.value));
    }

    return (
        <TodosContext.Provider
            value={{
                todos,
                setTodos,
                idForTodo,
                setIdForTodo,
                todosFiltered,
                filter,
                setFilter,
            }}
        >
            <div className="todo-app-container">
                <div className="todo-app">
                    <div className="name-container">
                        <h2>What is your name?</h2>
                        <form action="#">
                            <input
                                type="text"
                                ref={nameInputEl}
                                className="todo-input"
                                placeholder="What is your name"
                                value={name}
                                onChange={handleNameInput}
                            />
                        </form>
                        <CSSTransition
                            in={name.length > 0}
                            timeout={300}
                            classNames="slide-vertical"
                            unmountOnExit
                        >
                            <p className="name-label">Hello, {name}</p>
                        </CSSTransition>
                    </div>
                    <h2>Todo App</h2>
                    <TodoForm />
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={todos.length > 0}
                            timeout={300}
                            classNames="slide-vertical"
                            unmountOnExit
                        >
                            {todos.length > 0 ? <TodoList /> : <NoTodos />}
                        </CSSTransition>
                    </SwitchTransition>

                    {/* <CSSTransition
                    in={todos.length > 0}
                    timeout={300}
                    classNames="slide-vertical"
                    unmountOnExit
                  >
                    <TodoList />
                  </CSSTransition>
                  <CSSTransition
                    in={todos.length === 0}
                    timeout={300}
                    classNames="slide-vertical"
                    unmountOnExit
                  >
                    <NoTodos />
                  </CSSTransition> */}
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;

/////////// Start part one /////////
/*
import React from 'react';
class Item extends React.Component { render() {
    return (
        <li> {this.props.name}, ${this.props.price}
        </li> );
} }
class App extends React.Component { state = {
    items: [
        { id: 1, name: 'Apple', price: 0.99 },
        { id: 2, name: 'Orange', price: 0.89 },
    ] };

    nameRef = React.createRef();
    priceRef = React.createRef();

    add = (name , price) => {
        let id = this.state.items.length + 1;
        this.setState({ items: [
                ...this.state.items,
                { id, name: name, price: price  }
            ]
        });
    };

    render() { return (
        <div>
            <h1>Hello React</h1>
            <ul>
                {this.state.items.map(i => { return (
                    <Item
                        key={i.id}
                        name={i.name}
                        price={i.price}
                    />
                )
                })}
            </ul>
            <AddForm add={this.add} />
        </div>
    ) }
}

class AddForm extends React.Component {
    nameRef = React.createRef(); priceRef = React.createRef();
    add = () => {
        let name = this.nameRef.current.value;
        let price = this.priceRef.current.value;
        this.props.add(name, price);
    };

    render() { return (
        <div>
            <input type="text" ref={this.nameRef} /><br />
            <input type="text" ref={this.priceRef} /><br />
            <button onClick={this.add}>Add</button>
        </div> )
    }
} */
/////////// End part one /////////
/*import React from 'react';

class Toolbar extends React.Component { render() {
    return (
        <div style={{ background: 'cyan', padding: 10 }}>
            {this.props.children} </div>
    ); }
}
class App extends React.Component { render() {
    return ( <div>
        <Toolbar>
            <h1>Hello React</h1>
            <h2>Component composition</h2>
        </Toolbar>
    </div> )
} }

export default App;
*/
