import * as React from "react";

export class BaseComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <main>{this.props.children}</main>;
    }
}

export default BaseComponent;
