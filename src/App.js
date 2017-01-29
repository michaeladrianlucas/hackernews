import React, { Component }from 'react';
import './App.css';
const list = [
  {
    title: 'Everything',
    url: 'https://facebook.github.io/react/',
    author: 'Omni',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'HGTG',
    url: 'https: //github.com/reactjs/redux',
    author: 'Douglas Adams',
    points: 5,
    objectID: 1,
  },
];
/*
//ES5
function isSearched(searchTerm){
  return function(item) {
    return !searchTerm ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}*/
//ES6
const isSearched = (searchTerm) => (item) =>
    !searchTerm ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {

    const isNotId = item => item.objectID !==id;

    const updatedList = this.state.list.filter(isNotId);
      this.setState({ list: updatedList });
    /*
    function isNotId(item){
      return item.objectID !== id;
    }*/
    // refactored to arrow function
    /* or in ES6 aarrow function
    onDismiss(id){
    const isNotId = item => item.objectID !==id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
    */
  }

  render() {

    const {
      searchTerm,
      list
    } = this.state;

    return (
      <div className="page">
       <div className="interactions" >
        <Search
            value={searchTerm}
            onChange={this.onSearchChange}>
        Search</Search>

        <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
        />
     </div>
    </div>//END APP
    ); //END RETURN
  } //END RENDER
} //END CLASS APP

//refactored into functionless state component
    const Search = ({
      value,
      onChange,
      children
    }) => {
      return (
        <form>
          {children}<input
            type="text"
            value={value}
            onChange={onChange} />
        </form>
      );
    }

    const Table = ({
      list,
      pattern,
      onDismiss
    }) => {
      return(
        <div className="table">
        {
          list.filter(isSearched(pattern)).map(item =>
                <div key={item.objectID} className="table-row">
                 <span style={{width: '40%'}}>
                   <a href={item.url}>{item.title}</a>
                 </span>
                 <span style={{width: '30%'}}>{item.author}</span>
                 <span style={{width: '10%'}}>{item.num_comments}</span>
                 <span style={{width: '10%'}}>{item.points}</span>
                 <span style={{width: '10%'}}>
                   <button
                     onClick={() => onDismiss(item.objectID)}
                   className="button-inline">Dismiss</button>
                 </span>
               </div>
        )}
        </div>
      );
     }

     const Button = ({
       onClick,
       className = '',
       children
     }) => {
       return (
         <button
           onClick={onClick}
           className={className}
           type="button">
           {children}</button>
       );
     }
export default App;
/*
class Button extends Component{
  render(){
    const {
      onClick,
      className = '',
      children
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button">
        {children}</button>
    );
  }
} //END CLASS BUTTON

class Search extends Component {
  render(){

      const {
        value,
        onChange,
        children
      } = this.props;

      return(
        <form>

          {children}<input
            type="text"
            value={value}
            onChange={onChange} />

        </form>
      );
  }
} // END CLASS SEARCH
class Table extends Component {
  render(){
    const { list, pattern, onDismiss } = this.props;

    return(
      <div>
      {
        list.filter(isSearched(pattern)).map(item =>
              <div key={item.objectID}>
               <span>
                 <a href={item.url}>{item.title}</a>
               </span>
               <span>{item.author}</span>
               <span>{item.num_comments}</span>
               <span>{item.points}</span>
               <span>
                 <button
                   onClick={() =>
                   onDismiss(item.objectID) }
                 >Dismiss</button>
               </span>
             </div>
      )}
      </div>
    );
  }
} //END CLASS TABLE
*/

/*
// POSSIBLE COMPONENTS
<Search
    value={searchTerm}
    onChange={this.onSearchChange}
/>

<Table
    list={list}
    pattern={searchTerm}
    onDismiss={this.onDismiss}
/>
class Search extends Component {
  render(){

      const {
        value,
        onChange
      } = this.props;

      return(
        <form>

          <input
            type="text"
            value={searchTerm}
            placeholder="Search by Title"
            onChange={this.onSearchChange} />

        </form>
      );
  } // END RENDER
} // END CLASS SEARCH

class Table extends Component {
  render(){
    cont{
      list,
      pattern,
      onDismiss
    } = this.props;

    return(
      {
        list.filter(isSearched(pattern)).map(item =>
              <div key={item.objectID}>
               <span>
                 <a href={item.url}>{item.title}</a>
               </span>
               <span>{item.author}</span>
               <span>{item.num_comments}</span>
               <span>{item.points}</span>
               <span>
                 <button
                   onClick={() =>
                   onDismiss(item.objectID) }
                   type="button">Dismiss</button>
               </span>
             </div>
      )}
    )
  } // END RENDER
} //END CLASS TABLE
*/

/*
// first {} is where react injects data
    {
      list.map(function(item) {
            return (
              <div>
                  <li>
                    <a href={item.url} > {item.title}</a>
                  </li>
                  <li>{item.author}</li>
                  <li>{item.num_components}</li>
                  <li>{item.points}</li>
              </div>
            ); //END RETURN BLOCK
        }) //END FUNCTION
        //END LIST MAP
    }
    render() {
      return (
        <div className="App">
          {
            list.map( (item) =>
                  <div key={item.objectID}>
                   <span>
                     <a href={item.url}>{item.title}</a>
                   </span>
                   <span>{item.autor}</span>
                   <span>{item.num_comments}</span>
                   <span>{item.points}</span>
                 </div>
          ) //END FUNCTION
        }
      </div>//END APP
      ); //END RETURN
    } //END RENDER
    */
