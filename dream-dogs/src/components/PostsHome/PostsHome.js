import React from 'react';

function PostsHome(props) {
    return (
        <main>
            <header role="banner">
                <h1>Dogs Available</h1>
            </header>
            {props.posts.map(post => {
                return (
                    <section key={post.id}>
                        <h4>{post.dog_name}</h4>
                        <p>Owner Email: {post.email}</p>
                        <p>Birthdate: {post.birthdate}</p>
                        <p>Breed: {post.breed}</p>
                        <p>Lifestyle: {post.lifestyle}</p>
                    </section>
                )
            })}
        </main>
    )
}   

export default PostsHome;