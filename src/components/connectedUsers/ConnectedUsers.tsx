import { Col, ListGroup } from 'react-bootstrap';
import User from './User';

const ConnectedUsers = (props: {
  connectedUsers: { id: string; userName: string }[];
}) => {
  return (
    <Col>
      <h2>Connected Users</h2>
      <ListGroup>
        {props.connectedUsers.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </ListGroup>
    </Col>
  );
};

export default ConnectedUsers;
