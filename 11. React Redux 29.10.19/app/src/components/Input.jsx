import React from 'react';

export default function(props) {
    return <input onChange={props.onChange} value={props.value} placeholder="Type char name"></input>
}