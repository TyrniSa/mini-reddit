import { useEffect, useState } from "react";
import axios from 'axios';



export const Comment = (props) => {

  const { permalink } = props;
  const [ comments, setComments ] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(`https://www.reddit.com${permalink}.json`)
      const data = response.data[1].data.children.map((comment) => comment.data);
      setComments(data);
    };

    getComments();
  }, [permalink]);


  return(
<ul>
  {
comments.slice(0,10).map((comment) => (
    <li key = {comment.id}>
            <p>u/{comment.author} &#9642; {Math.round(((new Date().getTime() / 1000) - comment.created_utc) / 3600)} hr.ago</p>
              <p className="commentBody">{comment.body}</p>
            <p><svg stroke="green" fill="black" aria-hidden="true" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"></path></svg>
              {comment.ups}</p>
    </li>
  ))
  }
</ul>
  )
}
