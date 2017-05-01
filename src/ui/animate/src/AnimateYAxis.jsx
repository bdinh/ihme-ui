import React, { PropTypes } from 'react';
import { Animate } from 'react-move';
import { assign, omit } from 'lodash';

import { atLeastOneOfProp } from '../../../utils';

import { YAxis } from '../../axis';
import { AXIS_SCALE_PROP_TYPES } from '../../axis/src/axis';

const AnimateYAxis = function animateAxis(props) {
  const { scales, style } = props;
  const childProps = omit(props, 'scales');

  return (
    <Animate
      data={{
        scalesDomain: scales.y.domain(),
      }}
      flexDuration
    >
      {data => {
        scales.y.domain(data.scalesDomain);
        const newStyle = assign({}, style);

        return (
          <YAxis
            {...childProps}
            scales={scales}
            style={newStyle}
          />
        );
      }}
    </Animate>
  );
};

const Y_AXIS_SCALE_PROP_TYPES = {
  ...AXIS_SCALE_PROP_TYPES,
  scales: PropTypes.shape({
    x: PropTypes.func,
    y: PropTypes.func.isRequired,
  }).isRequired,
};

AnimateYAxis.propTypes = {
  /**
   *  scales are provided by axis-chart, only y scale is used by YAxis
   */
  scales: atLeastOneOfProp(Y_AXIS_SCALE_PROP_TYPES),
};

export default AnimateYAxis;
