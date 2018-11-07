import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
import Fields from './Fields';

// TODO: Style li's generated by autosuggest
// TODO: Check after redux-form that the validation works

const languages = [
  {
    title: '1970s',
    languages: [
      {
        name: 'C',
        year: 1972,
      },
    ],
  },
  {
    title: '1980s',
    languages: [
      {
        name: 'C++',
        year: 1983,
      },
      {
        name: 'Perl',
        year: 1987,
      },
    ],
  },
  {
    title: '1990s',
    languages: [
      {
        name: 'Haskell',
        year: 1990,
      },
      {
        name: 'Python',
        year: 1991,
      },
      {
        name: 'Java',
        year: 1995,
      },
      {
        name: 'Javascript',
        year: 1995,
      },
      {
        name: 'PHP',
        year: 1995,
      },
      {
        name: 'Ruby',
        year: 1995,
      },
    ],
  },
  {
    title: '2000s',
    languages: [
      {
        name: 'C#',
        year: 2000,
      },
      {
        name: 'Scala',
        year: 2003,
      },
      {
        name: 'Clojure',
        year: 2007,
      },
      {
        name: 'Go',
        year: 2009,
      },
    ],
  },
  {
    title: '2010s',
    languages: [
      {
        name: 'Elm',
        year: 2012,
      },
    ],
  },
];

export default class CategoryAutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: languages,
    };
  }

  onChange = (event, { newValue }) => {
    const { input } = this.props;
    this.setState({
      value: newValue,
    }, () => {
      input.onChange(newValue);
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return languages;
    }

    const regex = new RegExp(`^${escapedValue}`, 'i');

    return languages
      .map(section => ({
        title: section.title,
        languages: section.languages.filter(language => regex.test(language.name)),
      }))
      .filter(section => section.languages.length > 0);
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  getSectionSuggestions(section) {
    return section.languages;
  }

  renderInputComponent = (inputProps) => {
    const { touched, error } = this.props;
    return (
      <div>
        <input type="text" {...inputProps} className={`form-control ${touched && error ? 'is-invalid' : ''}`} />
      </div>
    );
  };

  handleSuggestionSelected = (event, { suggestionValue, method }) => {
    const { input } = this.props;
    input.onChange(suggestionValue);
    if (method === 'enter') {
      event.preventDefault();
    }
  };

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  renderSectionTitle(section) {
    return (
      <strong>{section.title}</strong>
    );
  }

  render() {
    const { label } = _.find(Fields, { label: 'Category' });
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange,
    };
    const { touched, error } = this.props;

    return (
      <div className="form-group">
        <label>{label}</label>
        <Autosuggest
          multiSection
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderSectionTitle={this.renderSectionTitle}
          getSectionSuggestions={this.getSectionSuggestions}
          renderInputComponent={this.renderInputComponent}
          onSuggestionSelected={this.handleSuggestionSelected}
          alwaysRenderSuggestions
          inputProps={inputProps}
        />
        <div className="invalid-feedback">{touched ? error : ''}</div>
      </div>
    );
  }
}
