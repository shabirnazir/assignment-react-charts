import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import moment from "moment";
import axios from "axios";
function AddData(props) {
  const { handleClose } = props;
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (
        form[0].value?.length > 0 &&
        form[1].value?.length > 0 &&
        form[2].value?.length > 0
      ) {
        event.preventDefault();
        const data = {
          month: moment(form[0].value).format("MMMM"),
          deaths: form[1].value,
          births: form[2].value,
        };
        await axios.post("/api/data", data);
        handleClose();

        setValidated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
        <Form.Label>Date</Form.Label>
        <Form.Control required type="date" placeholder="Enter " />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="validationCustom02">
        <Form.Label>Deaths</Form.Label>
        <Form.Control required type="number" placeholder="Enter " />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="validationCustom03">
        <Form.Label>Births</Form.Label>
        <Form.Control required type="number" placeholder="Enter" />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button type="submit" variant="primary" size="lg">
          Save
        </Button>
      </div>
    </Form>
  );
}

export default AddData;
