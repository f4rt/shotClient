import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import liked_icon from './liked_icon.svg';
import collection_icon from './collection_icon.svg';
import Textarea from 'react-textarea-autosize';
import api from '../../api';
import Comment from './Comment';

class PhotoFull extends Component {
	state = {
		comment: '',
		commentsArray: [],
		currentServerDate: '',
		likesCount: 0
	}

	componentDidMount() {
		api.date.getDate().then(date => {
			let temp = new Date(date.data);
			this.setState({ currentServerDate: temp.getTime() })
		});
		api.photos.getLikesComments(this.props.photo._id).then(item => 
			this.setState({ 
				commentsArray: item.data.comments.reverse(),
				likesCount: item.data.likes
			}))
	}

	typeComment = (e) => {
		if(!!this.props.user.token) 
			this.setState({ comment: e.target.value });
	}

	addComment = () => {
		const {user, photo} = this.props;
		const {comment} = this.state
		api.photos.addComment({
			user_id: user.user_id,
			user_photo: user.photo,
			username: user.firstname + ' ' + user.surname,
			comment: comment,
			photo_id: photo._id
		})
	}

	setLike = () => {
		if(!this.props.likeStatus) {
			this.setState({ likesCount: this.state.likesCount + 1 });
			this.props.likePhoto();
		}
	}

	render() {
		const {user, photo, likeStatus} = this.props
		const {commentsArray, currentServerDate, likesCount} = this.state;

		const comments = commentsArray ? 
			commentsArray.map((comment, i) => 
				<Comment key={i} comment={comment} serverDate={currentServerDate}/>
		) : null;

		return (
			<div className="fullview-container">
				<div className="fullview">
					<div className="fullview__photo" style={{ width: photo.photo_url ? 'auto' : '75%'}}>
						<img src={photo.photo_url} alt=""/>
					</div>
					<div className="fullview__info">
						<div className="author">
							<div className="author__photo" style={{ backgroundImage: 'url(' + photo.author_photo + ')' }}></div>
							<div className="author__name">
								<div className="name">{photo.author_name}</div>
								<div className="category">in {photo.category}</div>
							</div>
						</div>
						<div className="buttons-bar">
							<button className={likeStatus ? "like liked" : "like"} onClick={this.setLike}>
								{likeStatus ? <img src={liked_icon} alt=""/> : <img src={like_icon} alt=""/>}
								{likesCount}
							</button>
							<button className="collection">
								<img src={collection_icon} alt=""/>
								Add to collection
							</button>
						</div>
						<div className="title-description">
							<p className="title">{photo.title}</p>
							<p className="description">{photo.description}</p>
						</div>
						<div className="comments">
							<div className="section-title">Comments</div>
							<div className="comments-section">
								{!!user.token && 
									<div className="user-comment">
										<div className="textarea-wrapper">
											<div className="user-photo" style={{ backgroundImage: 'url(' + user.photo +')' }}></div>
											<Textarea placeholder="Add a comment..." onChange={this.typeComment}/>
										</div>
										<button onClick={this.addComment}>Add</button>
									</div>
								}
								{comments}
							</div>
						</div>
						<div className="main-close">
							<button className="close" onClick={this.props.close}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default PhotoFull;