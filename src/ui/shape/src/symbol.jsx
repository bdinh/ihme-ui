import React, { PropTypes } from 'react';
import classNames from 'classnames';
import d3Shape from 'd3-shape';
import { includes, noop, reduce } from 'lodash';

import { eventHandleWrapper } from '../../../utils/events';

const SYMBOL_TYPES = {
  circle: d3Shape.symbolCircle,
  cross: d3Shape.symbolCross,
  diamond: d3Shape.symbolDiamond,
  line: {
    draw(context, size) {
      const width = Math.sqrt(size);
      const height = 1.5;
      return context.rect(-width / 2, -height / 2, width, height);
    }
  },
  square: d3Shape.symbolSquare,
  star: d3Shape.symbolStar,
  triangle: d3Shape.symbolTriangle,
  wye: d3Shape.symbolWye
};

/*
* <Symbol /> is a wrapper
* Public API should expose basic public API of d3Shape.symbol()
**/
export default class Symbol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.createPath(props.type, props.size),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.type !== this.props.type ||
      nextProps.size !== this.props.size
    ) {
      this.setState({
        path: this.createPath(nextProps.type, nextProps.size),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.propsChanged(this.props, nextProps, [
      'selected', 'focused', 'translateX', 'translateY', 'className'
    ]);
  }

  getStyle() {
    const { focused, focusedStyle, selected, selectedStyle, style } = this.props;
    if (selected) {
      return typeof selectedStyle === 'function' ? selectedStyle() : { ...selectedStyle };
    }
    if (focused) {
      return typeof focusedStyle === 'function' ? focusedStyle() : { ...focusedStyle };
    }
    return typeof style === 'function' ? style() : { ...style };
  }

  // Look in utils prop.js when it gets added to IHME-UI
  propsChanged(prevProps, nextProps, propsToCompare, propsToOmit) {
    return !reduce(propsToCompare || Object.keys(nextProps), (acc, prop) => {
      return acc && (includes(propsToOmit, prop) || prevProps[prop] === nextProps[prop]);
    }, true);
  }

  createPath(type, size) {
    const symbolType = SYMBOL_TYPES[type] || SYMBOL_TYPES.circle;
    return d3Shape.symbol().type(symbolType).size(size)();
  }

  render() {
    const {
      className,
      color,
      data,
      focused,
      focusedClassName,
      onClick,
      onMouseLeave,
      onMouseMove,
      onMouseOver,
      selected,
      selectedClassName,
      translateX,
      translateY
    } = this.props;
    const { path } = this.state;

    return (
      <path
        d={path}
        className={classNames(className, {
          [focusedClassName]: focused,
          [selectedClassName]: selected,
        })}
        fill={color}
        onClick={eventHandleWrapper(onClick, data, this)}
        onMouseLeave={eventHandleWrapper(onMouseLeave, data, this)}
        onMouseMove={eventHandleWrapper(onMouseMove, data, this)}
        onMouseOver={eventHandleWrapper(onMouseOver, data, this)}
        style={this.getStyle()}
        transform={`translate(${translateX}, ${translateY})`}
      />
    );
  }
}

Symbol.propTypes = {

  className: PropTypes.string,

  color: PropTypes.string,

  /* Datum for the click and hover handlers. */
  data: PropTypes.object,

  focused: PropTypes.bool,

  focusedClassName: PropTypes.string,

  focusedStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),

  itemKey: PropTypes.string,

  /* partially applied fn that takes in datum and returns fn */
  onClick: PropTypes.func,

  /* partially applied fn that takes in datum and returns fn */
  onMouseLeave: PropTypes.func,

  /* partially applied fn that takes in datum and returns fn */
  onMouseMove: PropTypes.func,

  /* partially applied fn that takes in datum and returns fn */
  onMouseOver: PropTypes.func,

  selected: PropTypes.bool,

  selectedClassName: PropTypes.string,

  selectedStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),

  /* area in square pixels */
  size: PropTypes.number,

  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),

  translateX: PropTypes.number,

  translateY: PropTypes.number,

  /* will match a SYMBOL_TYPE  */
  type: PropTypes.oneOf(Object.keys(SYMBOL_TYPES)),
};

Symbol.defaultProps = {
  color: 'steelblue',
  focused: false,
  focusedClassName: 'focused',
  focusedStyle: {
    stroke: '#777',
    strokeWidth: 1
  },
  onClick: noop,
  onMouseLeave: noop,
  onMouseMove: noop,
  onMouseOver: noop,
  selected: false,
  selectedClassName: 'selected',
  selectedStyle: {
    stroke: '#000',
    strokeWidth: 1
  },
  size: 64,
  translateX: 0,
  translateY: 0,
  type: 'circle',
  style: {}
};

export { SYMBOL_TYPES };
