import './post.css'
import icon from '../../images/icon.jpg'
import gif from '../../images/no-results.gif'
import { getPost, selectHasError, selectIsLoading, selectPost } from './postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import ReactMarkdown from 'https://esm.sh/react-markdown@7'
import { Comment } from '../comment/comment';


export const Post = () => {

  const [display, setDisplay] = useState({ display: 'none' });
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])


  const posts = useSelector(selectPost)
  const error = useSelector(selectHasError)
  const loading = useSelector(selectIsLoading)

  const handleComment = () => {
    display.display === 'none' ? setDisplay({ display: 'block' }) : setDisplay({ display: 'none' })
  }

  if (loading) {
    return <h2>Loading posts...</h2>
  } else if (error) {
    return <h2>Something went wrong! Please try later!</h2>
  } else {
    return (
      <div>
        {
          posts.map((post) => (
            <div className="postContainer" key={post.id}>
              <div className="postCategory">
                <p>{post.subreddit_name_prefixed} &#9642; Posted by {post.author}</p>
              </div>
              <div className="postTitle">
                <h2>{post.title}</h2>
              </div>
              <div className="postMedia">
                {(post.url.includes('i.redd.it')) ? <img className='postImage' src={post.url} alt='' /> : null}
                {(post.is_video) ?
                  <video className='postVideo' preload="auto" controls>
                    <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                  </video>
                  : null}

                {(post.url.includes('v.redd.it') || post.url.includes('i.redd.it')) ? null : <div className='postText'><ReactMarkdown>{post.selftext}</ReactMarkdown></div>}
              </div>
              {(post.id === '000000') ? <img className='noResults' src={gif} alt='' /> : <div className="footerContainer">
                <div className="footerElement"><button className='button' onClick={handleComment}>
                  <p>&#128172;</p>
                  <p>{post.num_comments}</p>
                </button>
                </div>
                <div className="footerElement">
                  <p>&#128339;</p>
                  <p>Posted {Math.round(((new Date().getTime() / 1000) - post.created_utc) / 3600)} hr.ago</p>
                </div>
                <div className="footerElement">
                  <p>&#128316;</p>
                  <p>{post.ups}</p>
                </div>
                <div className="footerElement">
                  <img src={icon} alt="redditIcon" className='categoryIcon' />
                  <p><a href={`https://www.reddit.com/${post.subreddit_name_prefixed}/comments/${post.id}/${post.title}/`} target='_blank' rel="noreferrer">Go to Reddit </a></p>
                </div>
              </div>
              }
              <div style={display} className='comment'>
                <Comment permalink={post.permalink} />
              </div>
            </div>
          ))
        }
      </div>
    )
  }



}