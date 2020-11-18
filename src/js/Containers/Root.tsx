import * as React from 'react';
import InputForm from '../Components/InputForm';
import { getUser, getLabels } from '../api/api';

export default function Root(): any {
  const [formValue, setFormValue] = React.useState(null);
  const [labels, setLabels] = React.useState(null);
  React.useEffect(() => {
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
      const labelDatas = await getLabels();
      setLabels(labelDatas);
      const data = await getUser({
        code: qs?.code,
        clientId: qs?.client_id,
        clientState: qs?.state,
        labels: labelDatas,
      });
      console.log('view', data);
      setFormValue(data);
    }
    if (formValue === null) {
      getData();
    }
  }, []);
  return (
    <>
      {formValue !== null && labels !== null ?
        <InputForm formValue={formValue} labels={labels} setFormValue={setFormValue}/>
        : <div className="resume-wrapper">読み込み中....</div>
      }
    </>
  );
}