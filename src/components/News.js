import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: '12'

      }
    static propsTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(props){
        super(props)
        this.state = {
            news : [ ],
            loading: false,
            page: 1
        }
    }
    componentDidMount(){
        this.setState({loading: true})
        fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ada223d27e5c486585219cfc7dd5b804&page=${this.state.page}&pageSize=${this.props.pageSize}`)
        .then(res=> res.json())
        .then(data => this.setState({news: data.articles, totalResults: data.totalResults, loading: false}))
    }

    handlePrvClick = ()=>{
        this.setState({loading: true})
        console.log('prev')
        fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ada223d27e5c486585219cfc7dd5b804&page=${this.state.page -1}&pageSize=${this.props.pageSize}`)
        .then(res=> res.json())
        .then(data => this.setState({news: data.articles, totalResults: data.totalResults, page: this.state.page - 1, loading: false}))

    }
    handleNxtClick = ()=>{
        console.log('next');
        if( this.state.page + 1 > Math.ceil (this.state.totalResults / 20)){

        }else{
            this.setState({loading: true})
            fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ada223d27e5c486585219cfc7dd5b804&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
            .then(res=> res.json())
            .then(data => this.setState({news: data.articles, totalResults: data.totalResults, page: this.state.page + 1,loading: false}))
        }
    }
    render() {
        console.log(this.state.news)
        return (
            <div className="container my-3">
                <h2 className="text-center my-3">News - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading &&  this.state.news.map((newData,id) => <div  key={id} className="col-md-4">
                        <NewsItem title={newData.title? newData.title.slice(0, 40): ''} description= {newData.description ? newData.description.slice(0, 70): ''} urlToImage= {newData.urlToImage} url={newData.url} author = {newData.author} date={newData.publishedAt} source={newData.source.name}  />
                    </div>)}
                    
                </div>
                <div className="d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrvClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil (this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNxtClick}>&rarr; Next</button>
                </div>
            </div>
        )
    }
}

export default News
