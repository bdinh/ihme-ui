import React, { PropTypes } from 'react';
import { Animate } from 'react-move';
import {
  CommonPropTypes,
  CommonDefaultProps,
} from '../../../utils';

const AnimatePath = function animatePath(props) {
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
  } = props;

  return (
    <Animate
      data={{
        d,
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
        />
      )}
    </Animate>
  );
};

AnimatePath.propTypes = {
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
};

AnimatePath.defaultProps = {
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

export default AnimatePath;
