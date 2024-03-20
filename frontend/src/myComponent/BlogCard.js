import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BlogCard = ({ blogData, cardClicked }) => {
    const [like, setLike] = useState({ count: blogData.likes, icon: "favorite_border" });
    const [NewUserId, setNewUserId] = useState("");
    const isLogin = localStorage.getItem("BlogPostUser");
    
    useEffect(() => {
        if (isLogin) {
            const user = JSON.parse(isLogin);
            setNewUserId(user._id);
        }
    }, [isLogin]);

    const LikeBtn = async (id) => {
        try {
            const newLikes = like.icon === "favorite_border" ? like.count + 1 : like.count - 1;
            const response = await axios.put(`http://localhost:3001/api/likeUpdate/${id}/${NewUserId}`, { likes: newLikes });
            setLike(prevLike => ({
                count: response.data.updatedBlog.likes,
                icon: prevLike.icon === "favorite_border" ? "favorite" : "favorite_border"
            }));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (NewUserId) {
            axios.post(`http://localhost:3001/api/likeUpdate`, { UserId: NewUserId, uploadId: blogData.uploadId })
                .then(response => {
                    setLike({ count: blogData.likes, icon: response.data.isLiked ? "favorite" : "favorite_border" });
                })
                .catch(error => {
                    console.error('Error fetching likes data:', error.response.data);
                });
        }
    }, [NewUserId, blogData.uploadId, blogData.likes]);

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="row">
                    <div className="col-2 d-flex justify-content-center align-items-center" style={{ cursor: 'pointer' }} onClick={() => cardClicked(blogData)}>
                        <img src={`http://localhost:3001/images/${blogData.image}`} style={{ width: '100%' }} alt="Blog" />
                    </div>
                    <div className="col-7" style={{ cursor: 'pointer' }} onClick={() => cardClicked(blogData)}>
                        <h5 className="card-title">{blogData.title}</h5>
                        <p className='text-truncate'> {blogData.sDesc}</p>
                        <span><small>Posted On : {blogData.createdAt}</small></span>
                    </div>
                    <div className="col-3 d-flex justify-content-center flex-column align-items-center " style={{ borderLeft: '2px solid black' }}>
                        {
                            isLogin ? (
                                <>
                                    <span className="material-icons text-danger fs-3" style={{ cursor: 'pointer' }} onClick={() => LikeBtn(blogData._id)}>
                                        {like.icon}
                                    </span>
                                    <small>{like.count}</small>
                                </>
                            ) : (
                                <>
                                    <small>Like Count :{like.count}</small>
                                </>

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
