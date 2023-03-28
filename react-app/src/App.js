import { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';

import SelectGrade from "./components/SelectGrade";
import GetInitialMakeup from "./components/GetInitialMakeup";
import MainPanel from "./components/MainPanel";

function App() {
  const [step, setStep] = useState(1);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false)

  const handleNext = () => {
    setStep(step + 1);
    setIsNextButtonEnabled(false)
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <Container style={{ marginTop: 40 }} >
      {step == 1 && (
        <SelectGrade enableNextButton={() => {setIsNextButtonEnabled(true)}} />
      )}
      {step == 2 && (
        <GetInitialMakeup enableNextButton={() => {setIsNextButtonEnabled(true)}}/>
      )}
      {step == 3 && (
        <MainPanel />
      )}

      <Row className="mt-4">
        {step > 1 && (
          <Col className="d-flex justify-content-start">
            <Button variant="primary" onClick={handlePrevious}>
              Previous
            </Button>
          </Col>
        )}
        {step < 3 ? (
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleNext} disabled={!isNextButtonEnabled}>
              Next
            </Button>
          </Col>
        ) : (
          <Col className="d-flex justify-content-end">
            <Button variant="primary">
              Finish
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
