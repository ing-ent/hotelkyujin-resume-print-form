import * as React from 'react';
import InputForm from '../Components/InputForm';
import { getUser, getLabels } from '../api/api';

interface Props {
  code?: string
  state?: string
  clientId?: string
}

export default function Root(props: Props): any {
  const [formValue, setFormValue] = React.useState(null);
  const [labels, setLabels] = React.useState(null);
  React.useEffect(() => {
    console.log('use effect!!!!!');
    const getData = async () => {
      let qs: any = {};
      var search = window.location.search.substr(1);
      if (search !== '') {
        search.split('&').forEach(str => {
          const arr = str.split('=');
          if (arr[0] !== '') {
            qs[arr[0]] = arr[1] !== undefined ? decodeURIComponent(arr[1]) : '';
          }
        });
      }
      const data = await getUser({
        code: qs?.code,
        clientId: qs?.client_id,
        clientState: qs?.state,
      });
      console.log('view', data);
      setFormValue(data);
    }
    const getLabelData = async () => {
      const labelDatas = await getLabels();
      setLabels(labelDatas);
    }
    if (formValue === null) {
      getData();
    }
    if (labels === null) {
      getLabelData();
    }
  }, []);
  return (
    <div className="resume-wrapper">
      <div className="resume">
        {formValue !== null && labels !== null ?
          <InputForm formValue={formValue} labels={labels} />
          : "loading.."
        }
      </div>
    </div>
  );
}