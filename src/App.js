import './App.css';
import Form from './components/form'


function App() {
  return (
    <div className="App">

      <div className="top-panel">
        <div className="top-panel-text">
          ADMIN.BIKE-BOOKING.COM
        </div>
      </div>

      <Form/>

      <footer className="bottom-panel">
        <div className="bottom-panel-text">
          <span>DEVELOPER: </span> OLEH KALYNOVSKYI
        </div>
      </footer>

    </div>
  );
}

export default App;
