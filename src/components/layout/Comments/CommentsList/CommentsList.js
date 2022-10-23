import CommentListItem from './CommentListItem/CommentListItem'
import './CommentsList.scss'

const CommentsList = ({comments}) => {
    return <div className="comments_list" data-testid="comments_list">
        {comments.map((comm, i) => <CommentListItem key={i} message={comm}/>)}
    </div>
}

export default CommentsList