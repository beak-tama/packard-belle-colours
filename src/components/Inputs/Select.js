import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RSelect from 'react-select';
import './_select.scss';

// copied straight from react select demos with slight changes
const menuRenderer = ({
	focusedOption,
	focusOption,
	inputValue,
	instancePrefix,
	onFocus,
	onOptionRef,
	onSelect,
	optionClassName,
	optionComponent,
	options,
	removeValue,
	selectValue,
	valueArray,
	valueKey,
}) => {
  let Option = optionComponent || (props => <div {...props}/>);

	return options.map((option, i) => {
		let isSelected = valueArray && valueArray.some(x => x[valueKey] === option[valueKey]);
		let isFocused = option === focusedOption;
		let optionClass = classNames(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled,
		});

		return (
			<Option
				className={optionClass}
				focusOption={focusOption}
				inputValue={inputValue}
				instancePrefix={instancePrefix}
				isDisabled={option.disabled}
				isFocused={isFocused}
				isSelected={isSelected}
				key={`option-${i}-${option[valueKey]}`}
				onFocus={onFocus}
				onSelect={onSelect}
				option={option}
				optionIndex={i}
				ref={ref => { onOptionRef(ref, isFocused); }}
				removeValue={removeValue}
        selectValue={selectValue}
        backgroundImage={option.icon}
			>
        <span>
          {option.label}
        </span>
			</Option>
		);
	});
};
menuRenderer.propTypes = {
	focusOption: PropTypes.func,
	focusedOption: PropTypes.object,
	inputValue: PropTypes.string,
	instancePrefix: PropTypes.string,
	onFocus: PropTypes.func,
	onOptionRef: PropTypes.func,
	onSelect: PropTypes.func,
	optionClassName: PropTypes.string,
	optionComponent: PropTypes.func,
	optionRenderer: PropTypes.func,
	options: PropTypes.array,
	removeValue: PropTypes.func,
	selectValue: PropTypes.func,
	valueArray: PropTypes.array,
	valueKey: PropTypes.string,
};

const ValueRenderer = props => (
  <div style={{ backgroundImage: props.icon ? `url('${props.icon}')` : 'none' }}>
    {props.label}
  </div>
)

class Select extends Component {
  static defaultProps = {
    placeholder: '',
    searchable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || null,
    };
  }

  onChange = e => {
    this.setState({ value: e.value });
  }

  render() {
    const { props } = this;
    return (
      <RSelect
        {...props}
        className="Select"
        placeholder={props.placeholder}
        onChange={this.onChange}
        isOpen
        isDisabled={this.props.isDisabled}
        searchable={this.props.searchable}
        menuRenderer={this.props.useIcons ? menuRenderer : undefined}
        valueRenderer={ValueRenderer}
        value={this.state.value}
      />
    );
  }
}

export default Select;