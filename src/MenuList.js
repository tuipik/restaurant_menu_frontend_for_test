import  React, { Component } from  'react';
import axios from 'axios';


class MenuList extends Component {

    state = {
       menu: [],
       search: ''
    };

    componentDidMount () {
        this.getMenu();
        console.log(this.state);
    }

    getMenu = (queryParams = '') => {
          (async () => {
          let config = {
              headers: {
                  'Content-Type': 'application/json',
              }
          };
          let response = await axios.get('http://127.0.0.1:8000/api/menu?' + queryParams, config);
              this.setState({menu: response.data})
           })()
    };

    ordering = (field) => {
        let queryParams = 'ordering=' + field;
        this.getMenu(queryParams);
    };

    handleChange = (event) => {
        this.setState({search: event.target.value});
    };

    sendSearch = () => {
        let queryParams = 'search=' + this.state.search;
        this.getMenu(queryParams);
    };


    render() {
        return (
            <div className="menu--list">
                <input type="text" onChange={(e) => {
                    this.handleChange(e)
                }}/>
                <button onClick={this.sendSearch}>Search</button>

                <table className="table is-striped" width="50%">
                    <thead key="thead" className="pointer">
                    <tr>
                        <th onClick={() => this.ordering('dish')}>Dish</th>
                        <th onClick={() => this.ordering('price')}>Price, USD
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.menu.map(c =>
                        <tr key={c.id}>
                            <td>{c.dish}</td>
                            <td>{c.price}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export  default  MenuList;