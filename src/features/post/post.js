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
                <p>{post.subreddit_name_prefixed} &#9642; Posted {Math.round(((new Date().getTime() / 1000) - post.created_utc) / 3600)} hr.ago by {post.author}</p>
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
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="icon-action" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1h-8.829l-.171.171v-.171h-3c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12m0-2h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z"></path></svg>
                  <p>{post.num_comments}</p>
                </button>
                </div>
                <div className="footerElement">
                <svg stroke="green" fill="black" aria-hidden="true" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"></path></svg>
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