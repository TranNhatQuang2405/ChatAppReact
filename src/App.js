import "./App.css";
import { Body, TabBar } from "./components";
import { ChatContent } from "layout/content/";

function App() {
    return (
        <Body>
            <TabBar />
            <ChatContent />
        </Body>
    );
}

export default App;