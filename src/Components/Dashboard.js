import React, { useEffect, useState } from 'react';

let lastId = 0;

const Dashboard = () => {

    const [tweets, setTweets] = useState([]);
    const [page, setPage] = useState(0);

    const resetDataBase = () => {
        fetch(`https://magiclab-twitter-interview.herokuapp.com/ketanthakkar/reset`)
        .then(response => response.json())
        .then(result => { 
            setTweets([]);
            setPage(0);
            lastId = 0;
        });
    }

    const startTimer = () => {
        setTimeout(function() {
            
            if(lastId < 10000) {
                setPage(lastId);
            } else {
                resetDataBase();
            }
        }, 2000);
    }

    const fetchTweet = (nextId) => {
        fetch(`http://magiclab-twitter-interview.herokuapp.com/ketanthakkar/api?count=X&afterId=${nextId}`)
        .then(response => response.json())
        .then(result => {
            
            if(result && result.length > 0) {
                lastId = result[0].id;
                setTweets([...result, ...tweets]);
                startTimer();
            }
            
        })
        .catch(error => {
            console.log('error ',error);
            fetchTweet(lastId);
        })
    }

    useEffect(() => {
        fetchTweet(page);    
    }, [page]);


    return (
        <section className="data-container">
            {tweets.map( tweet => (
                <div className="tweet-content" key={tweet.id}>
                    <img className="user-image" src={tweet.image} />
                    <div className="tweet-data">
                        <h3 className="user-name">{tweet.username}</h3>
                        <p className="user-name">{tweet.text}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Dashboard;