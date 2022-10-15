import CommentListItem from './CommentListItem/CommentListItem'

const CommentsList = ({comments}) => {
    return <ul className="comments_list">
        {comments.map((comm, i) => <CommentListItem key={i} message={comm}/>)}
    </ul>
}

export default CommentsList