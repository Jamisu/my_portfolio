import './CommentListItem.scss'

const CommentListItem = ({message}) => {
    const {name, email, content, createdAt} = message;
    return <li>{name} {email} {content}</li>
}

export default CommentListItem