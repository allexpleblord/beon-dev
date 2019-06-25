import Autosuggest from 'react-autosuggest';

class AutoSuggestion extends React.Component {

    // Removes the duplicate usernames
    getProps = () => {
        let players = this.props.players;
        let seen = [];
        
        players = players.filter(player => {
            // If player name has already been seen
            if (seen.includes(player.username))
                return false;
                
            // Else just push to the array to mark it as seen
            seen.push(player.username);
            // and return true
            return true;
        });

        console.log(players)
        return players;
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.original.filter(player =>
            player.username.toLowerCase().includes(inputValue)
        );
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion. ( Suggest usernames )
    getSuggestionValue = suggestion => suggestion.username;

    // Render the suggestions
    renderSuggestion = suggestion => (
        <div>
            {suggestion.username}
        </div>
    );

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    state = {
        value: '',
        suggestions: this.props.players,
        original: this.getProps()
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    // Call parent function
    onKeyDown = e => {
        this.props.onKeyDown(e)
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Enter your pseudo',
            value,
            id: this.props.id,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown, // Prop
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                // This is when the suggestion is clicked, which is how it works on mobile
                onSuggestionSelected={(event, suggestionObject) => this.props.clickTrigger(suggestionObject.suggestionValue)}
            />
        );
    }
}

export default AutoSuggestion;
