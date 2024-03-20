import { useEffect, useState } from 'react';
import axios from 'axios';

function SingleBlog() {
  // Extracting postId from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/blogs/${postId}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

  }, [postId]);

  if (loading) {
    return <div><h1 className='text-danger mt-5 text-center'>Loading...</h1></div>;
  }

  if (error) {
    return <div><h1 className='text-danger mt-5 text-center'>Error: {error.message}</h1></div>;
  }

  return (
    <div className='container my-4'>
      <div className="bg-secondary text-white p-3">
        <h2>{data.title}  - Blog </h2>
        <hr/>
        <p>
          <span>
            POST ID : {postId}
          </span>
          <br/>
          <strong className='badge bg-danger'>
            ( Likes Count : {data.likes})
          </strong>
        </p>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          <div dangerouslySetInnerHTML={{ __html: data.fDesc }} />
        </div>
        <div className='col-md-4'>
          <img src={`http://localhost:3001/images/${data.image}`} className='img-fluid m-3' alt={data.image} />
        </div>
      </div>
      <hr/>
      <div className='row'>
        <div className='col-md-6'>
          <span className='badge bg-info'>Posted On : {data.createdAt}</span><br />
        </div>
        <div className='col-md-6 text-md-end'>
          <span className='badge bg-danger'>Last Updated on : {data.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
