import './App.css';
import { useState } from 'react';

import Feed from './pages/feed/Feed';
import Navigation from './components/navigation/Navigation';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="App">
      <Navigation accounts={accounts} setAccounts={setAccounts} />
      <Feed accounts={accounts} setAccounts={setAccounts} /> 
    </div>
  );
}

export default App;
