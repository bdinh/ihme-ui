import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { scaleLinear, scaleBand } from 'd3';

import {
  castArray,
  get as getValue,
  map,
} from 'lodash';

import {
  combineStyles,
  CommonDefaultProps,
  CommonPropTypes,
  memoizeByLastCall,
  PureComponent,
} from '../../../../utils';

import styles from './style.css';
import AxisChart from './../../../axis-chart';
import { XAxis, YAxis } from './../../../axis';
import Bars from './../../../bar/src/bars';
import ResponsiveContainer from '../../../responsive-container';
import Legend from './../../../legend';

export default class BarChart extends PureComponent {
  constructor(props) {
    super(props);

    this.combineStyles = memoizeByLastCall(combineStyles);
    this.castSelectionAsArray = memoizeByLastCall((selection) => castArray(selection));
    this.state = {
      selectedItems: [],
    };
  }

  renderTitle() {
    const {
      labelObject,
      titleClassName,
      titleStyle,
    } = this.props;
    if (!labelObject.title) return null;
    return (
      <div className={classNames(styles.title, titleClassName)} style={titleStyle}>
        <h2>
          {labelObject.title}
        </h2>
      </div>
    )
  }

  renderLegend() {
    const {
      legendObject,
      legendKey,
      legendClassName,
      legendStyle,
    } = this.props;

    return (
      <div className={classNames(styles.legend, legendClassName)} style={legendStyle}>
        <div className={styles['legend-wrapper']}>
          <Legend
            items={legendObject}
            labelKey={legendKey.labelKey}
            shapeColorKey={legendKey.shapeColorKey}
            shapeTypeKey={legendKey.shapeTypeKey}
          />
        </div>
      </div>
    );
  }

  renderBarChart() {
    const {
      data,
      fill,
      dataAccessors,
      barChartStyle,
      focus,
      labelObject,
      onClick,
      onMouseOver,
      onMouseLeave,
      onMouseMove,
      scaleObject,
    } = this.props;

    return (
      <div className={classNames(styles.barchart, barChartStyle)}>
        {this.renderTitle()}
        <ResponsiveContainer>
          <AxisChart
            xDomain={scaleObject.xDomain}
            yDomain={scaleObject.yDomain}
            xScaleType={scaleObject.xScale}
            yScaleType={scaleObject.yScale}
          >
            <XAxis
              label={labelObject.xLabel ? labelObject.xLabel: 'X Axis'}
            />
            <YAxis
              label={labelObject.yLabel ? labelObject.yLabel: 'Y Axis'}
            />
            <Bars
              data={data}
              fill={fill}
              dataAccessors={dataAccessors}
              focus={focus}
              onClick={onClick}
              onMouseOver={onMouseOver}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={barChartStyle}
              selection={this.state.selectedItems}
            >
            </Bars>
          </AxisChart>
        </ResponsiveContainer>
        {this.renderLegend()}
      </div>
    );
  }

  render() {
    const {className, style} = this.props;

    return(
      <div className={classNames(styles['barchart-container'], className)} style={style}>
        {this.renderBarChart()}
      </div>
    );
  }
}

BarChart.propTypes = {




};

BarChar.defaultProps = {




};
