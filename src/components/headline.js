import React, {Component} from "react"
import {css} from "@emotion/core"

const wrapperStyle = theme => (css`
    display: flex;
    flex-direction: column-reverse;
    * {
        margin: 0;
    }
`)

const titleStyle = theme => (css`
    text-transform: uppercase;
    @supports (-webkit-text-stroke: 1px white) {
        -webkit-text-stroke: 1px white;
        color: black;
    }
    font-size: 2rem;
    ${theme.mq.small} {
        font-size: 2.2rem;
    }
    ${theme.mq.medium} {
        font-size: 4.5rem;
    }
`)

const subtitleStyle = theme => (css`
    font-weight: 300;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: -0.2rem;
    ${theme.mq.medium} {
        font-size: 1.2rem;
        margin-bottom: -0.7rem;
    }
`)

class Headline extends Component {
    render() {
        return(
            <div css={wrapperStyle}>
                <h2 css={titleStyle}>{this.props.title}</h2>
                <h3 css={subtitleStyle}>{this.props.subtitle}</h3>
            </div>
        )
    }
}

export default Headline;