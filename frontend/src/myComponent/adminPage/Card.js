import React from 'react'

const Card = ({ blogData, DeletePost, EditPost }) => {
    return (
        <>
            <div className="card col-md-4 m-2 p-0" style={{ width: "18rem" }}>

                <img src={`http://localhost:3001/images/${blogData.image}`} className="card-img-top"
                    alt={blogData.title}
                    style={{ height: '200px', objectFit: 'contain' }} />
                <hr />
                <div className="card-body">
                    <h5 className="card-title">{blogData.title}</h5>
                    <p className="card-text">{blogData.sDesc}</p>
                </div>
                <div className='card-footer w-100 p-2'>
                    
                    <span>Total Likes : {blogData.likes}</span>

                    <div className='d-flex justify-content-between my-2'>
                        <span className="btn btn-primary material-icons" onClick={() => EditPost(blogData.uploadId)}>
                            edit
                        </span>
                        <span className="btn btn-danger material-icons" onClick={() => DeletePost(blogData._id)}>
                            delete
                        </span>
                    </div>
                    <hr />
                    Id:-{blogData.uploadId}
                </div>
            </div>
        </>
    )
}

export default Card
