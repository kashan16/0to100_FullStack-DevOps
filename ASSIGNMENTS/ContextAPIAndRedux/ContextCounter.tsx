const counterContext = createContext(0);

const counterProvider = ({ children }) => {
    const [ count , setCount ] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <counterContext.Provider value = {{ count , setCount , increment , decrement}}>
            {children}
        </counterContext.Provider>
    )
}

const CounterComponent = () => {
    const { count , setCount , increment , decrement} = useContext(counterContext);
    return (
        <div>
            <button onClick = {increment}>Count + 1</button>
            <button onClick = {decrement}>Count - 1</button>
            <p>Count : {count}</p>
        </div>
    )
}