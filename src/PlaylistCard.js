import classes from "./PlaylistCard.module.css"

const PlaylistCard = (props) => {
    
    return (
        <>
            <li className={classes.item}>
                <div className={classes.card}>
                    <input type="checkbox" />
                    <div className={classes.title}>
                        <h5>{props.playlist.Thumbnail_Title}</h5>
                    </div>
                </div>
            </li>
        </>
    )
}

export default PlaylistCard;