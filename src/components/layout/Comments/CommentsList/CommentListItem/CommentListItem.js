const CommentListItem = ({message}) => {
    const {name, email, content} = message;
    return <div>{name} {email} {content}</div>
}

export default CommentListItem