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
            <p>&#128316; {comment.ups}</p>
    </li>
  ))
  }
</ul>
  )
}