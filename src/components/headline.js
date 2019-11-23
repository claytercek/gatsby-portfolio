
import React, {Component} from "react"
import style from "./header.module.scss"

class headline extends Component {
    render() => (
        <div>
            <h2>{this.props.title}</h2>
            <h3>{this.props.subtitle}</h3>
        </div>
    )
}