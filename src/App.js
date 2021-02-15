import { useState } from 'react';
import firebase from './utils/Firebase';
import 'firebase/firebase-auth';
import Auth from './pages/Auth';

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {
    if (!currentUser) {
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return !user ? <Auth /> : <UserLogged />;
}

function UserLogged() {

  const logout = () => {
    firebase.auth().signOut();
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh' }}>
      <h1>User Logged</h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default App;
