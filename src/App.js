import Countries from './components/Countries'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white p-2">
        <h1>Countries list</h1>
      </header>
      <div className="container mt-5">
      <h5 className="card-title">Country Information</h5>
      <p className="card-text">
        View full list of countries, search country by alpha codes and filter by currency.
      </p>
      <Countries />
      </div>
    </div>
  );
}

export default App;
