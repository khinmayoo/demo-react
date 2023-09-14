import { useEffect, useMemo, useRef } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import '../reset.css';
import '../App.css';

function App() {
    // const [name, setName] = useState('');
    const [name, setName] = useLocalStorage('name', '');
    const nameInputEl = useRef(null);
    const [todos, setTodos] = useLocalStorage('todos', []);
    // const [todos, setTodos] = useState([
    //     {
    //         id: 1,
    //         title: 'Finish React Series',
    //         isComplete: false,
    //         isEditing: false,
    //     },
    //     {
    //         id: 2,
    //         title: 'Go Grocery',
    //         isComplete: true,
    //         isEditing: false,
    //     },
    //     {
    //         id: 3,
    //         title: 'Take over world',
    //         isComplete: false,
    //         isEditing: false,
    //     },
    // ]);

    //const [idForTodo, setIdForTodo] = useState(4);
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

    function addTodo(todo) {
        setTodos([
            ...todos,
            {
                id: idForTodo,
                title: todo,
                isComplete: false,
            },
        ]);

        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
    }

    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    function completeTodo(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function markAsEditing(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isEditing = true;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                if (event.target.value.trim().length === 0) {
                    todo.isEditing = false;
                    return todo;
                }
                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function cancelEdit(event, id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isEditing = false;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function remainingCalculation() {
        // console.log('calculating remaining todos. This is slow.');
        // for (let index = 0; index < 2000000000; index++) {}
        return todos.filter(todo => !todo.isComplete).length;
    }

    const remaining = useMemo(remainingCalculation, [todos]);


    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.isComplete));
    }

    function completeAllTodos() {
        const updatedTodos = todos.map(todo => {
            todo.isComplete = true;

            return todo;
        });

        setTodos(updatedTodos);
    }

    function todosFiltered(filter) {
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
                    {name && <p className="name-label">Hello, {name}</p>}
                </div>
                <h2>Todo App</h2>
                <TodoForm addTodo={addTodo} />
                {todos.length > 0 ? (
                    <TodoList
                        todos={todos}
                        completeTodo={completeTodo}
                        markAsEditing={markAsEditing}
                        updateTodo={updateTodo}
                        cancelEdit={cancelEdit}
                        deleteTodo={deleteTodo}
                        remaining={remaining}
                        clearCompleted={clearCompleted}
                        completeAllTodos={completeAllTodos}
                        todosFiltered={todosFiltered}
                    />
                ) : (
                    <NoTodos />
                )}
            </div>
        </div>
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
