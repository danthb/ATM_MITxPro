import './App.css';
import React from 'react';
import { MenuItem, Select, Input } from '@material-ui/core'; 

const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log(deposit);
  
  return (
    <label>
      <h3> {choice[Number(!isDeposit)]}</h3>
      <Input
        id="number-input"
        value={deposit}
        onChange={onChange}
        onClick={onChange}
        inputProps={{
          type: "number",
          width: "200",
          min: "0",
          step: "10" 

        }}></Input>
      <Input
        className="btn btn-primary"
        id="submit-input" 
        value={ isDeposit? 'Deposit': 'Withdraw' }  
        disabled={!isValid}
        /* onMouseOver={document.getElementById('number-input').onChange} */
        onMouseOver = {console.log('posible')}
        inputProps={{
          type: "submit",
          width: "200"
        }}></Input>
    </label>
  );
};


function App() {

  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('')
  const [validTransaction, setValidTransaction] = React.useState(false);


  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (deposit < 0) {
      setDeposit(0);
    } else {
      setDeposit(Number(event.target.value));
    }
    setValidTransaction(false)
    if (event.target.value <= 0) {
      return
    }
    if (atmMode === 'Cash Back' && event.target.value > totalState) {
      alert(`Your withdraw should be an amount lower than your account balance`)
      setValidTransaction(false)
    } else {
      setValidTransaction(true)
    }
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    isDeposit ? alert(`You deposit $${deposit}`) : alert(`You made a withdraw of $${deposit}`)
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value)
    if(event.target.value === "Deposit"){
      setIsDeposit(true)
    } else if (event.target.value === "Cash Back"){
      setIsDeposit(false)
    } 
  }
  return (
    <div className="App">
      <div className="App-header">
        <h2>ATM Machine</h2>
        <div className = 'container'>
        <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
            <Select
              color= 'primary'
              onChange={(e) => handleModeSelect(e)}
              inputProps={{
                name: "mode",
                id: "mode-select"
              }}>
          <MenuItem id="no-selection" value=""></MenuItem>
          <MenuItem id="deposit-selection" value="Deposit">Deposit</MenuItem>
          <MenuItem id="cashback-selection" value="Cash Back" >Cash Back</MenuItem>
        </Select>
        {
          atmMode !== '' &&
          <>
          <ATMDeposit 
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
            deposit={deposit}
            ></ATMDeposit>
          </>
        }
        </form>
          </div>
    </div>
    </div>
  );
}

export default App;
