import React from 'react';
import ReactDOM from 'react-dom';

import AxisChart from './../../../axis-chart';
import { XAxis, YAxis } from './../../../axis';
import { scaleBand, scaleLinear } from 'd3';
import range from 'lodash/range';
// import { ResponsiveContainer } from '../../';


import { bindAll, maxBy, minBy, map, uniqBy, xor } from 'lodash';
import { dataGenerator } from '../../../../utils';
import { schemeCategory10, scaleOrdinal, max } from 'd3';


const yearField = 'year_id';
const populationField = 'population';
const locationField = 'location';

import Bars from '../../../bar/src/bar';

const padding = {
  top: 40,
  right: 50,
  left: 50,
  bottom: 40,
};

const data = dataGenerator({
  primaryKeys: [
    { name: 'location', values: ['Brazil', 'Russia', 'India', 'China', 'Mexico', 'Indonesia', 'Nigeria', 'Vietnam'] }
  ],
  valueKeys: [
    { name: populationField, range: [100, 900], uncertainty: true }
  ]
});

const locationData = [
  { location: 'Brazil', values: data.filter((datum) => { return datum.location === 'Brazil'; }) },
  { location: 'Russia', values: data.filter((datum) => { return datum.location === 'Russia'; }) },
  { location: 'India', values: data.filter((datum) => { return datum.location === 'India'; }) },
  { location: 'China', values: data.filter((datum) => { return datum.location === 'China'; }) },
  { location: 'Mexico', values: data.filter((datum) => { return datum.location === 'Mexico'; }) },
  { location: 'Indonesia', values: data.filter((datum) => { return datum.location === 'Indonesia'; }) },
  { location: 'Nigeria', values: data.filter((datum) => { return datum.location === 'Nigeria'; }) },
  { location: 'Vietnam', values: data.filter((datum) => { return datum.location === 'Vietnam'; }) }
];


const populationFieldDomain = [minBy(data, populationField)[populationField], maxBy(data, populationField)[populationField]];
const yearFieldDomain = map(uniqBy(data, yearField), (obj) => { return (obj[yearField]); });
const locationFieldDomain = map(uniqBy(locationData, locationField), (obj) => { return (obj[locationField]); });
const colorScale = scaleOrdinal(schemeCategory10);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      selectedItems: [],
    };

    bindAll(this, [
      'onClick',
      'onMouseLeave',
      'onMouseMove',
      'onMouseOver',
    ]);
  }


  onClick(event, datum) {
    console.log(`${event.type}::${datum[yearField]},${datum[populationField]}`);
    this.setState({
      selectedItems: xor(this.state.selectedItems, [datum]),
    });
  };

  onMouseLeave(event, datum) {
    console.log(`${event.type}::${datum[yearField]},${datum[populationField]}`);
    this.setState({
      focus: {},
    });
  };

  onMouseMove(event, datum) {
    console.log(`${event.type}::${datum[yearField]},${datum[populationField]}`);
  };

  onMouseOver(event, datum) {
    console.log(`${event.type}::${datum[yearField]},${datum[populationField]}`);
    this.setState({
      focus: datum,
    });
  };


  render() {

    const height = 500;
    const width = 500;

    console.log(data.filter((datum) => { return datum.location === 'India'; }));

    return(
      <div>
        <svg width={`${width}px`} height={`${height}px`}>
          <g>
            <XAxis
              autoFilterTickValues
              scale={scaleBand().domain(range(1970, 2011)).range([0, width - (padding.right + padding.left)])}
              width={width - (padding.right + padding.left)}
              height={height - (padding.bottom + padding.top)}
              orientation="bottom"
              label="Top XAxis"
            />
          </g>
        </svg>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
