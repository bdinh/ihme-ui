import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { default as BaseSelect, propTypes as baseProps } from 'ihme-react-select';
import { assign } from 'lodash';

import { stateFromPropUpdates, propsChanged, PureComponent } from '../../../utils';
import { FLIP_MENU_UPWARDS_INLINE_STYLE, getWidestLabel } from './utils';

import style from './select.css';
import { menuWrapper } from './menu';
import Value from './value';
import multiValueRenderer from './multi-value-renderer';

export default class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = stateFromPropUpdates(Select.propUpdates, {}, props, {});
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      stateFromPropUpdates(Select.propUpdates, this.props, nextProps, {})
    );
  }

  renderSingleSelect() {
    const {
      menuContainerStyle,
      menuRenderer,
      menuStyle,
      wrapperStyle,
    } = this.state;

    return (
      <BaseSelect
        {...this.props}
        autofocus
        autosize={false}
        className={classNames(style.select, this.props.className)}
        menuContainerStyle={menuContainerStyle}
        menuRenderer={menuRenderer}
        menuStyle={menuStyle}
        placeholder={this.props.placeholder || 'Select...'}
        resetValue={this.props.resetValue || null}
        searchable
        wrapperStyle={wrapperStyle}
      />
    );
  }

  renderMultiSelect() {
    const {
      menuContainerStyle,
      menuRenderer,
      menuStyle,
      wrapperStyle,
    } = this.state;

    return (
      <BaseSelect
        {...this.props}
        autofocus
        autosize={false}
        className={classNames(style.select, this.props.className)}
        clearable
        menuContainerStyle={menuContainerStyle}
        menuRenderer={menuRenderer}
        menuStyle={menuStyle}
        multi
        placeholder={this.props.placeholder || 'Add/Remove...'}
        resetValue={this.props.resetValue || []}
        searchable
        valueComponent={Value}
        valueRenderer={multiValueRenderer}
        wrapperStyle={wrapperStyle}
      />
    );
  }

  render() {
    if (this.props.multi) {
      return this.renderMultiSelect();
    }

    return this.renderSingleSelect();
  }
}

const selectPropTypes = {
  /* drop down will flip up */
  menuUpward: PropTypes.bool,

  /* allow multiple selections */
  multi: PropTypes.bool,

  /* width applied to outermost wrapper */
  width: PropTypes.number,

  /* width added to widest label (in px) */
  widthPad: PropTypes.number,
};

Select.propTypes = assign({}, baseProps, selectPropTypes);

Select.defaultProps = {
  widthPad: 60,
};

Select.propUpdates = {
  menu(state, _, prevProps, nextProps) {
    if (!propsChanged(prevProps, nextProps, [
      'hierarchical',
      'labelKey',
      'menuContainerStyle',
      'menuStyle',
      'options',
      'widthPad',
    ])) {
      return state;
    }

    const menuWidth = getWidestLabel(
        nextProps.options,
        nextProps.labelKey,
        nextProps.hierarchical
      ) + nextProps.widthPad;

    // if menu width changes, also set menuStyle and menuContainerStyle
    // also create new HoC for menuRenderer
    return assign(
      {},
      state,
      {
        menuContainerStyle: assign(
          {},
          { width: `${menuWidth}px` },
          nextProps.menuContainerStyle,
          nextProps.menuUpward && FLIP_MENU_UPWARDS_INLINE_STYLE
        ),
        menuRenderer: menuWrapper(menuWidth),
        menuStyle: assign(
          {},
          { overflow: 'hidden', width: `${menuWidth}px` },
          nextProps.menuStyle
        ),
      }
    );
  },
  wrapperStyle(state, _, prevProps, nextProps) {
    if (!propsChanged(prevProps, nextProps, ['width', 'wrapperStyle'])) {
      return state;
    }

    return assign({}, state, {
      wrapperStyle: assign({}, { width: `${nextProps.width}px` }, nextProps.wrapperStyle),
    });
  }
};
