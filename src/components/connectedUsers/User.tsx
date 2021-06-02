import { ListGroup } from 'react-bootstrap';

const User = (props: { user: { id: string; userName: string } }) => {
  return <ListGroup.Item>{props.user.userName}</ListGroup.Item>;
};

export default User;
