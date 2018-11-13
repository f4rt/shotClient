import React, { Component } from 'react';
import api from '../../../api'

class UploadModal extends Component {
	state = {
		photo_url: '',
		title: '',
		category: 'Uncatigorized',
		keyword_value: '',
		keywords: [],
		description: ''
	}

	addToData = (e) => 
		this.setState({ ...this.state, [e.target.name]: e.target.value });

	submitUpload = () => {
		let data = {
			author_photo: this.props.user.photo,
			author: this.props.user.firstname + ' ' + this.props.user.surname,
			photo_url: this.state.photo_url,
			title: this.state.title,
			category: this.state.category,
			keywords: this.state.keywords,
			description: this.state.description
		}

		if (data.photo_url && data.title && data.keywords) {
			api.user.upload(data);
		}	
	}

	handleChange = (e) => {
		this.setState({
			keyword_value: e.target.value
		});
	};

	handleKeyUp = (e) => {
    const key = e.keyCode;
    if (key === 13 || key === 188) {
      this.addTag();
    };
	};
	
	addTag = () => {
    const { keywords, keyword_value } = this.state;
    let tag = keyword_value.trim();

    if (!tag) {
      return;
		};

		this.setState({
      keywords: [...keywords, tag],
      keyword_value: ""
    });
	};
	
	deleteTag = (e) => {
		let arr = [...this.state.keywords];
		arr.splice(arr.indexOf(e.target.value), 1)
		this.setState({ keywords: arr });
	}

	render() {
		const {photo_url, keywords, keyword_value} = this.state;
		const tags = keywords.map((tag, i) =>
			<React.Fragment key={tag + i}>
				<li>
					{tag}
					<button value={tag} className="close" onClick={this.deleteTag}></button>
				</li>	
			</React.Fragment>
		)

		console.log(this.state)

		return (
			<div className="upload-container">
				<div className="upload">
					<div className="upload__photo" style={{ width: photo_url ? 'auto' : '75%'}}>
						<img src={photo_url} alt=""/>
						<div className={ photo_url ? "photo_url-wrapper active" : "photo_url-wrapper" }>
							<label>Photo url</label>
							<input name="photo_url" type="text" onChange={this.addToData}/>
						</div>
					</div>
					<div className="upload__info">
						<div className="title">
							<div className="section-title">Title</div>
							<textarea name="title" id="" cols="30" rows="2" onChange={this.addToData}></textarea>
						</div>
						<div className="category">
							<div className="section-title">Category</div>
							<select name="category" onChange={this.addToData}>
								<option value="Uncatigorized">Uncatigorized</option>
								<option value="Animals">Animals</option>
								<option value="Black $ White">Black $ White</option>
								<option value="Celebrities">Celebrities</option>
								<option value="Architecture">Architecture</option>
								<option value="Landscapes">Landscapes</option>
								<option value="Nature">Nature</option>
								<option value="People">People</option>
								<option value="Sport">Sport</option>
								<option value="Travel">Travel</option>
							</select>
						</div>
						<div className="keywords">
							<div className="section-title">Keywords</div>
							<input 
								name="keywords" 
								type="text" 
								value={keyword_value}
								onChange={this.handleChange}
								onKeyUp={this.handleKeyUp}/>
							<ul>{tags}</ul>
						</div>
						<div className="description">
						<div className="section-title">Description</div>
							<textarea name="description" id="" cols="30" rows="4" onChange={this.addToData}></textarea>
						</div>
						<div className="submit">
							<button onClick={this.submitUpload}>Submit</button>
						</div>
						<div className="main-close">
							<button className="close" onClick={this.props.closeModal}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default UploadModal;