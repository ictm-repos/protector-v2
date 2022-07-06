import { Link } from "react-router-dom"
import styled from "styled-components"

const VideoCard = styled(Link)`
    box-shadow: 0 0 15px #4747476a;
    display: flex;
    width: 30%;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-decoration: none;
    color: black;
    &:last-child{
        margin-right: auto;
    }
`

const VideoThumbnail = styled.img`
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
`

const VideoTitle = styled.h3`
    padding: 10px 5px;
    background-color: white;
`
interface Props{
    video:any
}

const VideoItem = ({video}:Props) => {
    return <VideoCard to={`/my-videos/${video?.id}`}>
        <VideoThumbnail src="http://picsum.photos/400/500" />
        <VideoTitle>{video?.title}</VideoTitle>
    </VideoCard>
}

export default VideoItem