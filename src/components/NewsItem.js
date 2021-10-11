import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, urlToImage, url, author, date, source} = this.props
        return (
            <div className="card my-3">
                <img src={urlToImage ? urlToImage :'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2021_40/3511288/211008-florida-school-mask-mn-0815.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title.length < 40 ? `${title}...`: title}</h5>
                    <span class="badge bg-danger">{source}</span>
                    <p className="card-text">{description.length < 40 ? `${description}...`: description}</p>
                    <p className="card-text"><small className="text-muted"> by {author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
        )
    }
}

export default NewsItem
