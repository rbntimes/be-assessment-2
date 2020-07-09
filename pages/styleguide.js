import React from 'react';
import { H1, H2, H3, H4, H5 } from '../components/Typography';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';

function StyleGuide() {
  const ipsum =
    'Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.';
  return (
    <div>
      <H1>
        H1: <br /> <br />
        {ipsum}
      </H1>
      <H2>
        H2: <br /> <br />
        {ipsum}
      </H2>
      <H3>
        H3: <br /> <br />
        {ipsum}
      </H3>
      <H4>
        H4: <br /> <br />
        {ipsum}
      </H4>
      <H5>
        H5: <br /> <br />
        {ipsum}
      </H5>
      Button: <br />
      <br />
      <Button>Knop</Button>
      <br /> <br />
      Select <br />
      <Select type="age" name="age">
        {Array(80 - 18)
          .fill((i) => i)
          .map((_, index) => (
            <option value={index + 18}>{index + 18}</option>
          ))}
      </Select>
      <br /> <br />
      Input: <br />
      <br />
      <Input />
    </div>
  );
}

export default StyleGuide;
