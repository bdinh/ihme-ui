import React, { PropTypes } from 'react';
import { Animate } from 'react-move';
import {
  CommonPropTypes,
  CommonDefaultProps,
} from '../../../utils';

const AnimateShapePath = function animateShapePath(props) {
  const {
    className,
    clipPath,
    d,
    fill,
    onClick,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
    style,
    transform,
  } = props;

  return (
    <Animate
      data={{
        d,
        transform,
      }}
      flexDuration
    >
      {data => (
        <path
          className={className}
          clipPath={clipPath}
          d={data.d}
          fill={fill}
          onClick={onClick}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onMouseOver={onMouseOver}
          style={style}
          transform={data.transform}
        />
      )}
    </Animate>
  );
};

AnimateShapePath.propTypes = {
  /**
   * className applied to path.
   */
  className: CommonPropTypes.className,

  /**
   * if a clip path is applied to a container element (e.g., an `<AxisChart />`),
   * clip this path to that container by passing in the clip path URL id.
   */
  clipPath: PropTypes.string,

  d: PropTypes.string,

  fill: PropTypes.string,

  /**
   * onClick callback.
   * signature: (SyntheticEvent, data, instance) => {...}
   */
  onClick: PropTypes.func,

  /**
   * onMouseLeave callback.
   * signature: (SyntheticEvent, data, instance) => {...}
   */
  onMouseLeave: PropTypes.func,

  /**
   * onMouseMove callback.
   * signature: (SyntheticEvent, data, instance) => {...}
   */
  onMouseMove: PropTypes.func,

  /**
   * onMouseOver callback.
   * signature: (SyntheticEvent, data, instance) => {...}
   */
  onMouseOver: PropTypes.func,

  /**
   * inline styles applied to path
   */
  style: CommonPropTypes.style,

  transform: PropTypes.string,
};

AnimateShapePath.defaultProps = {
  onClick: CommonDefaultProps.noop,
  onMouseLeave: CommonDefaultProps.noop,
  onMouseMove: CommonDefaultProps.noop,
  onMouseOver: CommonDefaultProps.noop,
  style: {
    fill: 'steelblue',
    stroke: 'steelblue',
    strokeWidth: 1,
  },
};

export default AnimateShapePath;
