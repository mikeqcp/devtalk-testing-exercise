import React, { PropTypes, PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import InputRange from 'react-input-range';

import messages from './rangeSelector.messages';

const MIN_VALUE = 0;
const MAX_VALUE = 600;

export class RangeSelector extends PureComponent {
  static propTypes = {
    rangeValues: PropTypes.object,
    setRangeValues: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  changeRangeValue = (value) => {
    this.props.setRangeValues(value);
  };

  render() {
    return (
      <div className="range-selector">
        <InputRange
          maxValue={MAX_VALUE}
          minValue={MIN_VALUE}
          formatLabel={value => `${value} ${this.props.intl.messages[messages.price.id]}`}
          value={this.props.rangeValues.toJS()}
          onChange={value => this.changeRangeValue(value)}
        />
      </div>
    );
  }
}

export default injectIntl(RangeSelector);
