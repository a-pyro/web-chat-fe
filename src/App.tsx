import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { Container, Row } from 'react-bootstrap';
import EnterUsername from './components/EnterUsername';
import ConnectedUsers from './components/connectedUsers/ConnectedUsers';

const socketClient = io('http://localhost:5000');

function App() {
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(
    [] as { id: string; userName: string }[]
  );
  const [messages, setMessages] = useState(
    [] as { message: string; userName: string }[]
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (socketClient) {
      socketClient.on('username-taken', () => {
        toast.error('Username taken');
      });

      socketClient.on('username-submitted-successfully', () => {
        setConnected(true);
      });

      socketClient.on(
        'get-connected-users',
        (connectedUsers: { id: string; userName: string }[]) => {
          console.log(connectedUsers);
          setConnectedUsers(
            connectedUsers.filter((u) => u.userName !== userName)
          );
        }
      );

      socketClient.on(
        'receive-message',
        (message: { message: string; userName: string }) => {
          setMessages((prev) => [...prev, message]);
        }
      );
    }
  }, [userName]);

  const handleConnection = () => {
    if (socketClient) {
      socketClient.emit('handle-connection', userName);
    }
  };

  return (
    <>
      <Container fluid>
        {!connected && (
          <EnterUsername
            userName={userName}
            setUserName={setUserName}
            handleConnection={handleConnection}
          />
        )}
        <Row>
          {connected && (
            <>
              <ConnectedUsers connectedUsers={connectedUsers} />
            </>
          )}
        </Row>
      </Container>
      <ToastContainer position='bottom-right' />
    </>
  );
}

export default App;
