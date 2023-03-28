import { useState } from 'react';
import { Form, FormControl, Button, Table, Card, Row, Col } from 'react-bootstrap';
import axios from "axios";

const SelectGrade = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [rows, setRows] = useState(null)

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/steel?name=${searchTerm}`);
      setSearchResult(res.data);
      setRows(Object.entries(res.data.chemicalComposition))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form>
      <Row>
        <Col>
          <FormControl
            type="text"
            placeholder="Enter steel grade"
            className="mr-sm-2"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>

      {searchResult && (
        <div className="mt-2">
          <Card>
            <Card.Body>
              <Card.Title>{searchResult.name}</Card.Title>
              <Table hover>
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>{searchResult.name}</th>
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
          </Card>
        </div>
      )}
    </Form>
  )
}

export default SelectGrade