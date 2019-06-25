import scores from '../static/data.json';
import '../stylesheets/autosuggest.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Material design
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// Components
import AutoComplete from '../components/AutoComplete';

// Leaderboard page
class Leaderboard extends Component {
    // Get the data as props
    static async getInitialProps() {
        return { scores }
    }

    // Keep filter values in the state
    // Those are the initial values which everything is sorted by
    state = {
        // Filters
        level: 1,
        difficulty: 'easy',
        sortBy: 'nbOfMoves',
        order: 'asc',
        // Controls which page is selected
        page: 'leaderboard',
        // Has the state been initialized before
        initial: true,
        // The search data that is returned after the search
        searchData: {
            rank: 0,
            nbOfMoves: 0,
            time: 0,
            username: '',
        }
    }

    // Computed property for the leaderboard
    getScores = () => {
        // Get the values needed to filter the array
        const scores = this.props.scores;
        const level = this.state.level;
        const difficulty = this.state.difficulty;

        // Filter by difficulty and by level
        let result = scores.filter(player => player.difficulty === difficulty)
            .filter(player => player.level === level);

        // Sort by the number of moves before adding the rank
        result.sort((a, b) => {
            // *less number of moves is better
            if (a['nbOfMoves'] < b['nbOfMoves'])
                return -1; // Bring a before b
            if (a['nbOfMoves'] > b['nbOfMoves'])
                return 1; // Bring b before a
            // If they are equal sort them by the time
            if (a['nbOfMoves'] === b['nbOfMoves']) {
                // Sort those differently depending on if the order is ascending
                if (a['time'] < b['time'])
                    return -1;
                if (a['time'] > b['time'])
                    return 1;
            }
        })

        // Add rank after everything is filtered, needs to be done
        // before sorting or searching otherwise the rank wouldn't be correct
        result.forEach((player, index) => player.rank = index + 1);

        // Limit array of players to 100
        if (result.length > 100) result.length = 100;

        // Finally sort by the property chosen - either `nbOfMoves` or `time`
        const sortBy = this.state.sortBy;
        result.sort((a, b) => {
            // If the order set is ascending then order them ascending
            if (this.state.order === 'asc') return a[sortBy] - b[sortBy];
            // Else order descending
            return b[sortBy] - a[sortBy];
        })

        return result;
    }

    // Searches for a player and shows his highest rank
    // based on level and difficulty
    getPlayerStats = search => {
        this.setState({ initial: false })

        // Get the scores for the current level and difficulty
        let players = this.getScores();

        // Find the player
        let player = players.filter(player => player.username.toLowerCase() === search.toLowerCase());
        player = player[0]; // Since its an array of a single object

        // Check if its undefined, if it is make rank 0 ( which will display 
        // the message ) and then return
        if (!player) {
            this.setState({
                searchData: { rank: 0 }
            });
            return;
        }
        // Now set the state
        this.setState({
            searchData: {
                rank: player.rank,
                nbOfMoves: player.nbOfMoves,
                time: player.time,
                username: player.username,
                initial: false,
            }
        });
    }

    // Order handlers for the number of moves column and the time column
    nbOfMovesOrder = () => {
        this.setState(old => {
            return {
                // Change the sortBy to number of moves
                sortBy: 'nbOfMoves',
                // Check if number of moves was already active and if it is
                // change the order around. If number of moves was not already
                // selected then just change to the default order which is ascending
                order: old.sortBy === 'nbOfMoves'
                    ? (old.order === 'asc' ? 'desc' : 'asc')
                    : 'asc'
            }
        })
    }
    timeOrder = () => {
        this.setState(old => {
            return {
                // Operates the same way as the nbOfMovesOrder funtcion
                // But for the time
                sortBy: 'time',
                order: old.sortBy === 'time'
                    ? (old.order === 'asc' ? 'desc' : 'asc')
                    : 'asc'
            }
        })
    }

    // A function returning the table for the leaderboard
    leaderBoardTable = () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell align="right">Pseudo</TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={this.state.sortBy === 'nbOfMoves'}
                            direction={this.state.order}
                            onClick={this.nbOfMovesOrder}
                        >
                            Number of moves
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={this.state.sortBy === 'time'}
                            direction={this.state.order}
                            onClick={this.timeOrder}
                        >
                            Time
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { // Map through the computed scores and display a table
                    this.getScores().map((player, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{player.rank}</TableCell>
                            <TableCell align="right">{player.username}</TableCell>
                            <TableCell align="right">{player.nbOfMoves}</TableCell>
                            <TableCell align="right">{player.time}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );

    // A function returning the search page
    searchPage = () => (
        <div>
            <AutoComplete
                ref="autocomplete"
                players={this.getScores()} // Pass the players based on the current level and difficulty
                id="search"
                onKeyDown={e => {
                    // If key pressed is enter then get the player stats
                    // And pass the search term as a parameter
                    if (e.keyCode == 13)
                        this.getPlayerStats(e.target.value);
                }}
                clickTrigger={suggestion => {
                    this.getPlayerStats(suggestion)
                }}
            />
            <Paper style={{ padding: 25 }}>
                {
                    // Check if its the initial data first
                    this.state.initial
                        ? 'Type in your pseudo to show relevant player information.'
                        : // If there is user data display it
                        this.state.searchData.rank > 0
                            ? <React.Fragment>Pseudo: {this.state.searchData.username} <br />
                                Your rank is: {this.state.searchData.rank} <br />
                                Number of moves: {this.state.searchData.nbOfMoves} <br />
                                Time: {this.state.searchData.time}ms</React.Fragment>
                            : 'No player found.'
                }
            </Paper>
        </div>
    );

    // Render
    render() {
        return (
            <div>
                {/* Buttons used for switching between pages */}
                <div>
                    <Button variant="contained" onClick={() => this.setState({ page: 'leaderboard', searchData: { rank: 0 } })}>
                        Top 100
                    </Button>
                    <Button variant="contained" onClick={() => this.setState({ page: 'search', searchData: { rank: 0 } })}>
                        Search
                    </Button>
                </div>

                {/* Select for difficulty */}
                <FormControl>
                    <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
                    <Select
                        value={this.state.difficulty}
                        inputProps={{ name: 'difficulty', id: 'difficulty' }}
                        onChange={e => {
                            // Just update the state to the new difficulty value
                            this.setState({ difficulty: e.target.value })
                            // If not on leaderboard page run the query
                            this.state.page !== 'leaderboard' ? this.getPlayerStats(this.refs.autocomplete.state.value) : undefined
                        }}
                        style={{ minWidth: 100 }}
                    >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                {/* Select for level */}
                <FormControl>
                    <InputLabel htmlFor="level">Level</InputLabel>
                    <Select
                        value={this.state.level}
                        inputProps={{ name: 'level', id: 'level' }}
                        onChange={e => {
                            // Just update the state to the new levle value
                            this.setState({ level: e.target.value }, () => {
                                // If not on leaderboard page run the query
                                this.state.page !== 'leaderboard' ? this.getPlayerStats(this.refs.autocomplete.state.value) : undefined
                            })
                        }}
                        style={{ minWidth: 100 }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </Select>
                </FormControl>

                { // Return either the leaderboard or the search page
                    this.state.page === 'leaderboard'
                        ? this.leaderBoardTable()
                        : this.searchPage()
                }
            </div>
        );
    }
}

export default Leaderboard;
