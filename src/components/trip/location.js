import React from 'react'
import { Button } from 'react-bootstrap';

export const Location = (props) => (
    <Button className='custom-input' onClick={props.handleClick}>{props.location.formatted_name}</Button>
)
