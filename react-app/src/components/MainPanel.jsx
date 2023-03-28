import { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Table, Placeholder } from 'react-bootstrap'
import axios from "axios";

const MainPanel = () => {
  const [data, setData] = useState(null)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/api/elements-to-add`);
      setData(res.data);
      setRows(Object.entries(res.data.massesToAdd))
    }

    fetchData()
  }, [])

  return (
    <div>
      {data && rows ? <Card>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Table hover>
            <thead>
              <tr>
                <th>Element</th>
                <th>Amount to Add (Kg)</th>
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
    </div>
  )
}

export default MainPanel