import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <NavbarComponent />
    </Container>
    
  );
}

export default App;
