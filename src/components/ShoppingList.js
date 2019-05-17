import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }
    
    handleDelete(id) {
        this.props.deleteItem(id);
    }
    
    render() {
        const { items } = this.props.item;

        const itemsList = items.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={500} classNames="fade">
                    <ListGroupItem>
                        <Button
                            className="btn"
                            color="danger"
                            size="sm"
                            onClick={ this.handleDelete.bind(this, item.id) }
                            style={{ marginRight:'5px'}}
                        >&times;</Button>
                        {item.name}
                    </ListGroupItem>
                </CSSTransition>
            )
        })
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {itemsList}
                    </TransitionGroup>
                </ListGroup>
            </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  item:state.item
});

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem:PropTypes.func.isRequired,
  item:PropTypes.object.isRequired,           
}

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);