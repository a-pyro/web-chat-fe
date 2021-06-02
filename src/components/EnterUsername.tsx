import { Form, Button, Row } from 'react-bootstrap';

interface Props {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  handleConnection: () => void;
}

const EnterUsername: React.FC<Props> = ({
  userName,
  setUserName,
  handleConnection,
}) => {
  return (
    <Row className='align-items-center min-vh-100'>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleConnection();
        }}
      >
        <Form.Group>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type='text'
            placeholder='Enter name'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Row>
  );
};

export default EnterUsername;
