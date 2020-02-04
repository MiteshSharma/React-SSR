import * as React from "react";
import Routes from "./Routes";

export class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return <Routes />;
    }
}

export default App;
