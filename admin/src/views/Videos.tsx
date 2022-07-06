import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"
import VideoItem from "../components/VideoItem"
const VideoContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 2%;
    row-gap: 30px;
`

const Videos = () => {
    console.log("Video render")
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/api/video",
            {
                headers: {
                    'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1cmF5ZXZtYW5zdXJiZWs2NjdAZ21haWwuY29tIiwiZmlyc3RuYW1lIjoiTWFuc3VyIiwibGFzdG5hbWUiOiJKbydyYXlldiIsInBob25lIjoiKzk5ODk5NjY3MjEwNiIsImlkIjozLCJpYXQiOjE2NTcwODU2MjZ9.wGAD1nw7L5dTjBOjgb7njDITa9_K-C61A6LgkQNe2NY'
                }
            }).then(result => {
                setVideos(result.data)
                console.log(result)
            }).catch(err => {
                alert(err.message)
            })
    }, [])
    return <>
    <Link to="/my-videos/create" >Create new Video</Link>
    <VideoContainer>
            {
                videos.map((video) => {
                    return <VideoItem video={video} />
                })
        }
        </VideoContainer>
        <Outlet />
    </>
}

export default Videos