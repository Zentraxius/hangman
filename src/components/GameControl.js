import React from "react";
import Button from 'react-bootstrap/Button';

class GameControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterGameList: [],
      selectedGame: null,
      editing: false
    };
  }
  
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleChangingSelectedGame = (id) => {
    const selectedGame = this.state.masterGameList.filter(bottle => bottle.id === id)[0];
    this.setState({selectedGame: selectedGame});
  }

  handleClick = () => {
    if (this.state.selectedGame != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedGame: null,
        editing: false
        });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewGameToList = (newGame) => {
    const newMasterGameList = this.state.masterGameList.concat(newGame);
    this.setState({
      masterGameList: newMasterGameList,
      formVisibleOnPage: false
    });
  }

  handleDeletingGame = (id) => {
    const newMasterGameList = this.state.masterGameList.filter(bottle => bottle.id !==id);
    this.setState({
      masterGameList: newMasterGameList,
      selectedGame: null
    });
  }

  handleEditingGameInList = (bottleToEdit) => {
    const editedMasterGameList = this.state.masterGameList
      .filter(bottle => bottle.id !== this.state.selectedGame.id)
      .concat(bottleToEdit);
    this.setState({
      masterGameList: editedMasterGameList,
      editing: false,
      selectedGame: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = 
      <EditGameForm
      bottle = {this.state.selectedGame}
      onEditGame = {this.handleEditingGameInList} />
      buttonText = "Return to Game List";
    } else if (this.state.selectedGame != null) {
      currentlyVisibleState = <GameDetail 
      bottle = {this.state.selectedGame} 
        onClickingSell = {this.handleSellingShot}
        onClickingDelete = {this.handleDeletingGame} 
        onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to Game List";
    } else if (this.state.formVisibleOnPage) {
        currentlyVisibleState = <NewGameForm onNewGameCreation={this.handleAddingNewGameToList} />
        buttonText = "Return to Game List";
    } else {
        currentlyVisibleState = 
          <GameList 
            bottleList={this.state.masterGameList} 
            onGameSelection={this.handleChangingSelectedGame} />
        buttonText = "Add Game"
    }
    return (
      <div style={{ 
        textAlign: 'center',
        padding: '20px',
        }}>
      <React.Fragment>
          {currentlyVisibleState}
          <Button variant="primary" onClick={this.handleClick}>{buttonText}</Button>
        </React.Fragment>
      </div>
    );
  }
}

export default GameControl;