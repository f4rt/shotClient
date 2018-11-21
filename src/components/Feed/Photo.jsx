import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import liked_icon from './liked_icon.svg';
import collection_icon from './collection_icon.svg';
import PhotoFull from './PhotoFull';
import AddToCollection from './AddToCollection'

class Photo extends Component {
	state = {
		initialUser: false,
		showBar: false,
		fullView: false,
		showCollections: false,
		likeStatus: false,
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
		this.setState({ fullView: true });

	hideFull = () => 
		this.setState({ fullView: false });

	showCollections = () => 
		this.setState({ showCollections: true });

	hideCollections = () => 
		this.setState({ showCollections: false });

	likePhoto = () => {
		const {photo, user} = this.props;
		if (!this.state.likeStatus) {
			this.setState({ 
				likeStatus: true,
			});
			this.props.likeFunc({
				photo_id: photo._id,
				user_id: user.user_id
			});
		}
	}

	render() {
		const {showBar, showCollections, fullView, likeStatus} = this.state;
		const {photo} = this.props;

		console.log('Photo component render')

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
								<button>
									{likeStatus ? <img src={liked_icon} alt="Like it"/> : <img src={like_icon} alt="Like it"/>}
								</button>
								<button onClick={this.showCollections}>
									<img src={collection_icon} alt="Add to your collection"/>
								</button>
								{showCollections && 
									<AddToCollection user={this.props.user} photo_id={photo._id}/>
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
						likePhoto={this.likePhoto}/>
				}
			</React.Fragment>
		);
	}
}
 
export default Photo;