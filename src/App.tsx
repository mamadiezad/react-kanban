import { KanbanBoard } from './components/KanbanBoard';

function Footer() {
  return (
    <div style={{ textAlign: 'center', padding: '24px', color: '#6b7280', fontSize: 13, borderTop: '1px solid #313244', marginTop: 40 }}>
      Built with ❤️ by <a href="https://t.me/llllxyz" style={{ color: '#7c3aed', textDecoration: 'none' }}>Mohammad</a>
    </div>
  );
}

import './App.css';

function App() {
  return (
    <>
      <KanbanBoard />
      <Footer />
    </>
  );
}
  
}

export default App;
