import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import List from "./pages/List/List"
import Update from "./pages/Update/Update"

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <List />
        </Route>
        <Route path="/update/:recycler_id/:branch_id">
          <Update />
        </Route>
      </Switch>
    </>

  );
}

export default App;
