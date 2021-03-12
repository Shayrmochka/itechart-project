import "./App.css";
import Checkout from "./forms/checkout-forms/Checkout";
import Feedback from "./forms/Feedback";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";

function App() {
  return (
    <div>
      <SignIn />
      <SignUp />
      <Feedback />
      <Checkout />
    </div>
  );
}

export default App;
