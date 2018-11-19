import React, { Component } from 'react';
import like_icon from './like_icon.svg';
import liked_icon from './liked_icon.svg';
import collection_icon from './collection_icon.svg';
import Textarea from 'react-textarea-autosize';
import api from '../../api'

class PhotoFull extends Component {
	state = {
		comment: '',
		commentsArray: [],
		currentServerDate: '',
		dateDifference: {
			years: 0,
			months: 0,
			days: 0,
			hours: 0,
			mins: 0
		}
	}

	componentDidMount() {
		api.date.getDate().then(date => this.setState({ currentServerDate: date.data }));
		api.photos.getComments(this.props.photo._id).then(comments => this.setState({ commentsArray: comments.data }))
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

	render() {
		const {user, photo, likesCount, likeStatus, likePhoto} = this.props
		const {commentsArray, currentServerDate} = this.state;

		const comments = commentsArray ? 
			commentsArray.map((comment, i) => 
			<div key={i} className="comment">
				<div className="user">
					<div className="user__photo" style={{backgroundImage: 'url(' + comment.user_photo + ')'}}></div>
					<div className="user__info">
						<div className="name">{comment.username}</div>
						<div className="date">{currentServerDate}</div>
					</div>
				</div>
				<div className="comment__text">{comment.comment}</div>
			</div>
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
							<button className={likeStatus ? "like liked" : "like"} onClick={likePhoto}>
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