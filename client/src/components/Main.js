import axios from 'axios'
import { useContext, useEffect } from 'react'
import { UsersContext } from '../contexts/usersContext'
import { VideoContext } from '../contexts/videosContext'
import { VideoCard } from './VideoCard'

export const Main = () => {
    const {videos, setVideos} = useContext(VideoContext)
    const {users, setUsers} = useContext(UsersContext)

    useEffect(() => {
        const getVideos = async () => {
            const response = await axios.get('/video')
            const listOfUsers = await axios.get('/user')
            setUsers(listOfUsers.data)
            setVideos(response.data)
        }
        getVideos()
    // eslint-disable-next-line
    }, [])
    return (
        <main>
            <div className="contentWrapper">
                {videos &&
                    videos.map(video => <VideoCard key={video._id} video={video} users={users}></VideoCard>)
                }
            </div>
        </main>
    )
}