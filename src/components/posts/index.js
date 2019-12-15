import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`/posts`))
            .then(res =>
                this.setState({ posts: res.data.pageOfItems })
            )
            .catch(err => console.log(err));
    }

    render() {
        const posts = this.state.posts
        return <div className="tpBlackBg">
            <h1>Posts List</h1>
            <hr />
            {posts.map(
                (post) => <div>
                    <div>{post.blog_title}</div>
                    {post.blog_tags.join(', ')}
                    <Link to={`/posts/${post.site_blog_id}`}>View</Link>
                    <Link to={`/posts/${post.site_blog_id}/edit`}>Edit</Link>
                    <hr />
                </div>

            )}
            <Link to={`/posts/new`}>Add New +</Link>
        </div>
    }
}

export default Page
