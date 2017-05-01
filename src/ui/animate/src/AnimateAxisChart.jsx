import React, { PropTypes } from 'react';
import { Animate } from 'react-move';
import { omit } from 'lodash';

import AxisChart from '../../axis-chart/src/axis-chart';

const AnimateAxisChart = function animateAxisChart(props) {
  const {
    xDomain,
    yDomain,
  } = props;
  const childProps = omit(props, ['xDomain', 'yDomain']);

  return (
    <Animate
      data={{
        xDomain,
        yDomain,
      }}
    >
      {data => {
        console.count('axischart');
        console.log(yDomain, data.yDomain);
        return (
          <AxisChart
            {...childProps}
            xDomain={data.xDomain}
            yDomain={data.yDomain}
          />
        );
      }}
    </Animate>
  );
};

AnimateAxisChart.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * [min, max] for xScale (i.e., the domain of the data)
   */
  xDomain: PropTypes.array,

  /**
   * [min, max] yScale (i.e., the range of the data)
   */
  yDomain: PropTypes.array,
};

export default AnimateAxisChart;
