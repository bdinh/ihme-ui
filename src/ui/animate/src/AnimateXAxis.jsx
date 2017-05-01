import React, { PropTypes } from 'react';
import { Animate } from 'react-move';
import { omit } from 'lodash';

import { atLeastOneOfProp } from '../../../utils';

import { XAxis } from '../../axis';
import { AXIS_SCALE_PROP_TYPES } from '../../axis/src/axis';

const AnimateXAxis = function animateAxis(props) {
  const { scales } = props;
  const childProps = omit(props, 'scales');
  return (
    <Animate
      data={{
        scalesDomain: scales.x.domain(),
      }}
    >
      {data => {
        scales.x.domain(data.scalesDomain);
        return (
          <XAxis
            {...childProps}
            scales={scales}
          />
        );
      }}
    </Animate>
  );
};

const X_AXIS_SCALE_PROP_TYPES = {
  ...AXIS_SCALE_PROP_TYPES,
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func,
  }).isRequired,
};

AnimateXAxis.propTypes = {
  /**
   *  scales are provided by axis-chart, only x scale is used by XAxis
   */
  scales: atLeastOneOfProp(X_AXIS_SCALE_PROP_TYPES),
};

export default AnimateXAxis;
