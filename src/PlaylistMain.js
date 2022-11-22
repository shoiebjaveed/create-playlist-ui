import axios from "axios";
import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import classes from "./PlaylistMain.module.css";

const PlaylistMain = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [data, setData] = useState([])

    async function fetchPlaylist() {
        axios({
            method: "POST",
            url: "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1",
            headers: {
                "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
                "x-tenant-key": "DIVANOR123"
            },
            data: {
                "Index": 1,
                "ContentType": [2]
            }
        }).then((res) => setData(res.data.data.Feeds))
    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    const createPlaylistHandler = () => {
        fetch("-https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prodapi/engt/createPlayList", {
            method: "POST",
            body: JSON.stringify({
                "PlayListId": 0,
                "Post_Ids": 987,
                "Name":  title,
                "Description": description
            }),
            headers: {
                "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
                "x-tenant-key": "DIVANOR123"
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            else return res.json();
        }).then((data) => {
            //fetchData();
            fetchPlaylist()
        }).catch((err) => {
            console.error(err.message);
        });
    }

    //firebase api to just test funtionality
    // async function fetchData() {
    //     let playlistData = [];
    //     await fetch("https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/playlist.json")
    //         .then((res) => { return res.json() })
    //         .then((data) => {
    //             for (let [key, value] of Object.entries(data)) {
    //                 playlistData.push({ key, ...value })
    //             }
    //         })
    //     setData(playlistData)
    // }

    // const createPlaylistHandler = () => {
    //     fetch("https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             title:  title,
    //             description : description
    //         }),
    //     }).then((res) => {
    //         if (!res.ok) {
    //             throw new Error("Something went wrong!");
    //         }
    //         else return res.json();
    //     }).then((data) => {
    //         fetchData();
    //     }).catch((err) => {
    //         console.error(err.message);
    //     });
    // }

    return (
        <>
            <div className={classes.container}>
                <span className={classes.header}>
                    <input type="text" placeholder="Playlist Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button onClick={createPlaylistHandler}>+ Create Playlist</button>
                </span>
                <ul>
                    {data.map((playlist) => {
                        return <PlaylistCard
                            key={playlist.EngagementPostId}
                            playlist={playlist}
                        />
                    })}
                </ul>
            </div>
        </>
    )
}

export default PlaylistMain;