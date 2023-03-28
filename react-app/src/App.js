import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import SelectGrade from "./components/SelectGrade";
import GetInitialMakeup from "./components/GetInitialMakeup";
import EnterLadleWeight from "./components/EnterLadleWeight";
import MainPanel from "./components/MainPanel";

function App() {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <Container style={{marginTop: 40}}>
      {step == 1 && (
        <SelectGrade />
      )}
       {step == 2 && (
        <GetInitialMakeup />
      )}
       {step == 3 && (
        <EnterLadleWeight />
      )}
       {step == 4 && (
        <MainPanel />
      )}

      <div className="d-flex justify-content-between">
        {step > 1 && (
          <Button variant="primary" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {step < 4 ? (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Finish
          </Button>
        )}
      </div>
    </Container>
  );
}

export default App;
