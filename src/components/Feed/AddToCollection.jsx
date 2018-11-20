import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createCollection} from '../../actions/userActions'

class AddToCollection extends Component {
	state = {
		collectionName: '',
		showButton: false,
		user_collections: this.props.user.collections
	}

	addCollectionName = (e) =>
		this.setState({ collectionName: e.target.value });

	showButton = (e) =>
		this.setState({ showButton: true });

	createUserCollection = () =>
		this.props.createCollection({
			user_id: this.props.user.user_id, 
			collection_name: this.state.collectionName
		})

	render() {
		const {showButton} = this.state;
		const {user}= this.props;

		const collections = user.collections.map((item, i) => 
			<div key={i} className="user-collection">
				<div className="user-collection__last-photo">
					<img src={item.collection_photos[0]} alt=""/>
				</div>
				<div className="user-collection__title">{item.collection_name}</div>
			</div>
		)

		return (
			<div className="to-collection">
				<div className="to-collection__title">Add to collection</div>
				<div className="to-collection__new">
					<span>+</span>
					<input type="text" placeholder="New collection" onChange={this.addCollectionName} onClick={this.showButton}/>
					{showButton && 
						<button onClick={this.createUserCollection}>Add</button>
					}
				</div>
				<div className="to-collection__collections">{collections}</div>
			</div>
		);
	}
}
 
export default connect(null, {createCollection})(AddToCollection);