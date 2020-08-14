import React from 'react';
import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"

export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            single: [],
            open_modal: false
        };
    }

    handle_click = (e) => {
        // e.preventDefault();
        fetch(`https://reqres.in/api/users/${e.target.getAttribute('data-id')}`).then(res => res.json())
        .then(
            (result) => {

                console.log(result.data);

                this.setState({isLoaded: true,single: result.data})
            },
            (error) => {
                this.setState({
                    isLoaded: true,error
                });
            }
        )
        this.setState({ open_modal: true });
    }

    HandleClose = () => {
        this.setState({ open_modal: false })
    }

    componentDidMount() {
        fetch("https://reqres.in/api/users?page=1")
            .then(res => res.json())
            .then(
                (result) => {
                    var employeeList = result.data
                    this.setState({
                        isLoaded: true,
                        items: employeeList
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <table class="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><img src={item.avatar} alt="" /></td>
                                <td>
                                    <a href="#" onClick={this.handle_click} data-id="{item.id}">
                                        {`${item.first_name} ${item.last_name}`}
                                    </a>
                                </td>
                                <td>
                                    {`${item.email}`}
                                </td>
                            </tr>
                        ))}
                    </table>

                    <Modal show={this.state.open_modal} onHide={this.HandleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
<table className="table">
<tbody>
<tr>
<td><img className="img-thumbnail" src={this.state.single.avatar} alt={this.state.single.first_name} /></td>
<td className="text-center align-middle">
<i className="fa fa-user"></i> {this.state.single.first_name} {this.state.single.last_name}
<br />
<i className="fa fa-envelope"></i> {this.state.single.email}
</td>
</tr>
</tbody>
</table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger">
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }
}