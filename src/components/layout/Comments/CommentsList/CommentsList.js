import CommentListItem from './CommentListItem/CommentListItem'

const CommentsList = ({comments}) => {
    console.log('comments', comments);
    return <>{comments.map((comm, i) => <CommentListItem key={i} message={comm}/>)}</>
}

export default CommentsList