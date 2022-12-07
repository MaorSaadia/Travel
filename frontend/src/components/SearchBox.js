import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline="true">
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Place"
          className="mr-sm-2 ml-sm-5"
        ></FormControl>
        <Button type="submit" className="p-2">
          <i className="fas fa-search" aria-hidden="true"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
