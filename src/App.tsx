import { useRef, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { Container, Row } from 'react-bootstrap';
import EnterUsername from './components/EnterUsername';
import ConnectedUsers from './components/connectedUsers/ConnectedUsers';

function App() {
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(
    [] as { id: string; userName: string }[]
  );
  const socketClient = useRef<any>();

  useEffect(() => {
    socketClient.current = io('http://localhost:5000');

    if (socketClient.current) {
      socketClient.current.on('username-taken', () => {
        toast.error('Username taken');
      });

      socketClient.current.on('username-submitted-successfully', () => {
        setConnected(true);
      });

      socketClient.current.on(
        'get-connected-users',
        (connectedUsers: { id: string; userName: string }[]) => {
          console.log(connectedUsers);
          setConnectedUsers(
            connectedUsers.filter((u) => u.userName !== userName)
          );
        }
      );
    }
    return () => {};
  }, [userName]);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit('handle-connection', userName);
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
