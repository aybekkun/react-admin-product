import React from "react";
import { useDispatch } from "react-redux";
import { userCheck } from "./redux/auth/asyncActions";
import Routs from "./Routs";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async function () {
      await dispatch(userCheck());
    })();
  }, [dispatch]);
  return (
    <div className="App">
      <Routs />
    </div>
  );
}

export default App;
