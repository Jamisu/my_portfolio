import './CommentListItem.scss'

const CommentListItem = ({message}) => {
    const {name, email, content, createdAt} = message;
    const newDate = new Date(createdAt);
    const monthLocalName = newDate.toLocaleString('default', { month: 'long' });
    const dayOfMonth = newDate.getDate()
    const fullYear =  newDate.getFullYear()
    
    return <li>
        <p>{monthLocalName+ ' ' + dayOfMonth + ', ' + fullYear}</p>
        <h3>{name + ' ' + email}</h3> 
        <p>{content}</p>
    </li>
}

export default CommentListItem