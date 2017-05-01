import React, { PropTypes } from 'react';
import { Animate } from 'react-move';
import { omit } from 'lodash';

import { Line } from '../../shape';

const AnimateLine = function animateLine(props) {
  const {
    data: lineData,
    scales,
  } = props;
  const childProps = omit(props, ['data', scales]);

  return (
    <Animate
      data={{}}
    >
      {data => {
        console.log(scales.y.domain(), data);
        return (
          <Line
            {...childProps}
            data={lineData}
            scales={scales}
          />
        );
      }}
    </Animate>
  );
};

AnimateLine.propTypes = {
  /**
   * Array of datum objects.
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * `x` and `y` scales.
   * Object with keys: `x`, and `y`.
   */
  scales: PropTypes.shape({
    x: PropTypes.func,
    y: PropTypes.func,
  }).isRequired,
};

export default AnimateLine;
