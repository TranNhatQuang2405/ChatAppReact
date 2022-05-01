import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./configs/redux/Slice/DemoSlice";
import "./App.css";
function App() {
    // @ts-ignore
    const count = useSelector((state) => state.demo.value);
    const dispatch = useDispatch();
    return (
        <div className="App">
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default App;
