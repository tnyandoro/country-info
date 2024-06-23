import Countries from './components/Countries'
import Search from './components/Search'

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white p-2">
        <h1>Countries list</h1>
      </header>
      <div className="container mt-3">
        <h5>Country Information</h5>
        <p>
          View full list of countries, search country by alpha codes and filter by currency.
        </p>
        
        <Search />
        <Countries />
      </div>
    </div>
  );
}

export default App;
