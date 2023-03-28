import { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Table, Placeholder } from 'react-bootstrap'
import axios from "axios";

const GetInitialMakeup = ({enableNextButton}) => {
  const [data, setData] = useState(null)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/api/initial-composition`);
      setData(res.data);
      setRows(Object.entries(res.data.initialComposition))
    }

    fetchData()
  }, [])

  const handleInputChange = (event) => {;
    localStorage.setItem('initialWeight', event.target.value)
    enableNextButton()
  };


  return (
    <Row>
      <Col>
        {data && rows ? <Card>
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Table hover>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>{data.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([element, composition], index) => (
                  <tr key={index}>
                    <td>{element}</td>
                    <td>{composition}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card> :
          <Card>
            <Card.Body>
              <Card.Title>Campaigns</Card.Title>
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array(8).fill().map((_e, index) => (
                    <tr key={index}>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder.Button variant="outline-warning" xs={2} />
                        </Placeholder>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>}

      </Col>
      <Col>
        <Form.Group>
          <Form.Label>Ladle weight (Kg):</Form.Label>
          <Form.Control onChange={handleInputChange} type="number" min="0" step="0.01" placeholder="Enter ladle weight" />
        </Form.Group>
      </Col>
    </Row>
  )
}

export default GetInitialMakeup