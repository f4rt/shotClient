import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {createCollection} from '../../actions/userActions';

class AddToCollection extends Component {
	state = {
		collectionName: '',
		showButton: false,
		user_collections: this.props.user.collections
	}

	componentDidMount() {
		document.addEventListener('click', this.clickOutside, false);
	}

	componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside, false);
	}
	
	clickOutside = (e) => {
		if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.props.close();
    }
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

	addPhotoToCollection = (e) => {
		this.props.addToCollection({
			user_id: this.props.user.user_id,
			photo_id: this.props.photo_id,
			collection_name: e.target.textContent,
			last_photo_url: this.props.photo_url
		})
	}

	render() {
		const {showButton} = this.state;
		const {user, flip}= this.props;

		const collections = user.collections.map((item, i) => 
			<div key={i} className="user-collection" onClick={this.addPhotoToCollection}>
				<div className="user-collection__last-photo" style={{backgroundImage: "url(" + item.last_photo_url + ')'}}>
				</div>
				<div className="user-collection__title">{item.collection_name}</div>
			</div>
		)

		return (
			<div className={!flip ? "to-collection" : "to-collection flip"}>
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