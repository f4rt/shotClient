import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import liked_icon from './liked_icon.svg';
import collection_icon from './collection_icon.svg';
import PhotoFull from './PhotoFull';
import AddToCollection from './AddToCollection';

class Photo extends Component {
	state = {
		initialUser: false,
		showBar: false,
		fullView: false,
		showCollections: false,
		flipModal: false,
		likeStatus: false,
		errorMessage: '',
	}

	componentDidUpdate() {
		const {photo, user}= this.props;
		const {initialUser} = this.state;
		if(user.token && !initialUser) {
			for (let i = 0; i < user.liked_photos.length; i++) {
				if(user.liked_photos[i] === photo._id) {
					this.setState({ likeStatus: true, initialUser: true });
				}
			}
		}
	}

	showBar = () =>
		this.setState({ showBar: true });

	hideBar = () => {
		if(!this.state.showCollections)
			this.setState({ showBar: false });
	}

	showFull = () =>
		this.setState({ fullView: true, showCollections: false });

	hideFull = () => 
		this.setState({ fullView: false, showCollections: false });

	showCollections = (e) => {
		if(this.props.user.token) {
			if(window.innerWidth - e.target.x < 320) {
				this.setState({ showCollections: true, flipModal: true });
			}
			this.setState({ showCollections: true });
		} else {
			this.setState({ errorMessage: 'Log in for add photos to the collections' });
			this.closeErrorBox();
		}
	}

	hideCollections = () => 
		this.setState({ showCollections: false });

	likePhoto = (e) => {
		const {photo, user} = this.props;
		if (user.token) {
			if (!this.state.likeStatus) {
				this.setState({ 
					likeStatus: true,
				});
				this.props.likeFunc({
					photo_id: photo._id,
					user_id: user.user_id
				});
			}
		} else {
				this.setState({ errorMessage: 'You are not logged' });
				this.closeErrorBox();
			}	
	}

	closeErrorBox = () => {
		setTimeout(() => {
			this.setState({ errorMessage: '' });
		}, 3000)
	}

	render() {
		const {showBar, showCollections, flipModal, fullView, likeStatus, errorMessage} = this.state;
		const {photo} = this.props;

		return (
			<React.Fragment>
				<div className="feed__img-container" onMouseEnter={this.showBar} onMouseLeave={this.hideBar}>
					<img src={photo.photo_url} alt={photo.title} onClick={this.showFull}/>
					{showBar &&
						<div className="bottom-bar">
							<div className="user-data">
								<div className="avatar" style={{ backgroundImage: 'url(' + photo.author_photo + ')' }}>
									{!photo.author_photo && photo.author_name[0]}
								</div>
								{photo.author_name}
							</div>
							<div className="buttons">
								<button onClick={this.likePhoto}>
									{likeStatus ? <img src={liked_icon} alt="Like it"/> : <img src={like_icon} alt="Like it"/>}
								</button>
								<button onClick={this.showCollections}>
									<img src={collection_icon} alt="Add to your collection"/>
								</button>
								{showCollections && 
									<AddToCollection 
										user={this.props.user} 
										photo_id={photo._id}
										photo_url={photo.photo_url}
										flip={flipModal}
										close={this.hideCollections}
										addToCollection={this.props.addToCollection}
										/>
								}
							</div>
						</div>
					}		
				</div>
				{fullView &&
					<PhotoFull
						user={this.props.user}
						photo={photo}
						close={this.hideFull}
						likeStatus={likeStatus}
						likePhoto={this.likePhoto}
						showCollections={showCollections}
						showCollectionsFunc={this.showCollections}
						collectionsFlip={flipModal}
						collectionsClose={this.hideCollections}
						addToCollection={this.props.addToCollection}/>
				}
				{errorMessage &&
					<div className="error-box">{errorMessage}</div>
				}
			</React.Fragment>
		);
	}
}
 
export default Photo;