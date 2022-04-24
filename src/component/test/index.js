import React from 'react'
import PropTypes from 'prop-types'
import {Button as AButton} from "antd";
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default class Button extends React.Component {
    static propTypes = {
        /** Description of prop "foo". */
        foo: PropTypes.number,
        /** Description of prop "baz". */
        baz: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }
    static defaultProps = {
        foo: 36
    }

    render() {
        /* ... */
        return <AButton {...this.props}>{this.props.children}</AButton>
    }
}
