import * as React from 'react';
import InputForm from '../Components/InputForm';

interface Props {
  code?: string
  state?: string
  clientId?: string
}

export default function Root(props: Props): any {
  return (
    <div className="resume-wrapper">
      <div className="resume">
        <InputForm />
      </div>
    </div>
  );
}