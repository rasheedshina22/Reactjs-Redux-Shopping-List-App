import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions';
import uuid from 'uuid';
import PropTypes from 'prop-types';
class ItemModal extends Component {

    state = {
        modal:false,
        name:''
    }

    toggle = () => {
        this.setState({
            modal:!this.state.modal
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const new_item = {
            id: uuid(),
            name:this.state.name
        }

        //add the new_item
        this.props.addItem(new_item);
        //close the Modal
        this.toggle();
    }

  render() {
    return (
      <div>
            <Button
                color="dark"
                style={{ marginBottom: '2rem' }}
                onClick={this.toggle}
            >Add Item</Button>
            <Modal
            isOpen={this.state.modal}
                toggle={this.toggle}
            >
                <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="add shopping item"
                                onChange={this.handleChange}
                            >
                            </Input>
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                            >Add Item</Button>
                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>
      </div>
    )
  }
}


ItemModal.propTypes = {
    addItem:PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    item:state.item
  });

export default connect(mapStateToProps, {addItem})(ItemModal);