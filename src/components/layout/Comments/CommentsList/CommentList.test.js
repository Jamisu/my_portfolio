import { render, screen } from '@testing-library/react';
import CommentsList from './CommentsList'
import CommentListItem from './CommentListItem/CommentListItem'

test('renders Comments', async() => {
    const comments = [{"name":"name 1","email":"email 1","content":"content 1","createdAt":"2022-07-17T17:26:59.673Z","id":"1"},
    {"name":"name 2","email":"email 2","content":"content 2","createdAt":"2022-07-17T18:31:58.784Z","id":"2"},
    {"name":"name 3","email":"email 3","content":"content 3","createdAt":"2022-07-17T14:26:40.667Z","id":"3"}]

    render(<CommentsList comments={comments}/>);
    const comList = screen.getByTestId("comments_list")
    expect(comList).toBeInTheDocument();
});