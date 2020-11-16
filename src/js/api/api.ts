import fetchWithErrorHandling from '../Utils/FetchWithErrorHandling';
import { convertCheckBoxFormData } from '../Utils/ConvertCheckBoxData';
import { joinFullName } from '../Utils/ConvertFullNameData';
import { removeDateStringSeparator } from '../Utils/ConvertDateStringSeparator';
import { removePostalCodeSeparator } from '../Utils/ConvertPostalCodeSeparator';
import { Buffer } from 'buffer';

interface Props {
  code: string
  clientId: string
  clientState: string
}

export const getUser = async (props: Props) => {
  console.log(props);
  const { code, clientId, clientState } = props;
  // @ts-ignore
  const basicCredentials = Buffer.from(`${clientId}:${CLIENT_SECRET}`).toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${basicCredentials}`,
    // @ts-ignore
    'X-API-KEY': `Bearer ${PUBLIC_ACCESS_TOKEN}`,
  };
  try {
    const fetchAccessTokenResponse = await fetchWithErrorHandling(
      // @ts-ignore
      `${API_SERVER}/v1/authentication/user/authorize`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: code,
          client_id: clientId,
          // @ts-ignore
          client_secret: CLIENT_SECRET,
          state: clientState,
        }),
      },
    );
    const accessToken = await fetchAccessTokenResponse.json();

    // ユーザ/PR情報取得
    const userHeaders = {
      'Content-Type': 'application/json',
      'X-API-KEY': `Bearer ${accessToken.access_token}`,
    };

    // @ts-ignore
    const fetchUserResponse = await fetchWithErrorHandling(`${API_SERVER}/v1/authentication/user/token`, {
      method: 'get',
      headers: userHeaders,
    });
    const user = await fetchUserResponse.json();
    const personal = user.result.personal;
    const careers = user.result.careers;
    console.log(personal);
    // nullを''に変換する
    for (const key of Object.keys(personal)) {
      if (personal[key] === null) {
        personal[key] = '';
      }
    }
    console.log(careers);
    // これを配列からフラットに変換したい
    // nullを''に変換する
    for (const [index, career] of careers.entries()) {
      for (const key of Object.keys(career)) {
        if (careers[index][key] === null || careers[index][key] === 0) {
          careers[index][key] = '';
        } else {
          careers[index][key] = String(careers[index][key]);
        }
      }
    }
    console.log(careers);
    // フォームデータ用に整形、マージ
    const formData = {
      ...personal,
      ...convertCheckBoxFormData(personal, 'family'),
      ...convertCheckBoxFormData(personal, 'pc_os'),
      ...convertCheckBoxFormData(personal, 'pc_soft'),
      ...convertCheckBoxFormData(personal, 'pc_hotelsoft'),
      ...convertCheckBoxFormData(personal, 'hope_reason'),
      ...removeDateStringSeparator(personal.birthday, 'birthday'),
      ...removePostalCodeSeparator(personal.postcode, 'postcode'),
      ...joinFullName(personal.l_name, personal.f_name, 'fullname'),
      ...joinFullName(personal.l_kana, personal.f_kana, 'fullname_kana'),
      ...{ graduation_y: personal.graduation_date.split('-')[0] },
      ...{ graduation_m: String(Number(personal.graduation_date.split('-')[1])) },
      ...{ careers: careers },
      ...{ sex: String(personal.sex) },
      ...{ academic: String(personal.academic) },
      ...{ line: String(personal.line) },
      ...{ address1: String(personal.address1) },
      ...{ toeic: personal.toeic ? personal.toeic : '' },
      ...{ toefl: personal.toefl ? personal.toefl : '' },
      ...{ sep: personal.sep ? personal.sep : '' },
      ...{ english: personal.english ? String(personal.english) : '' },
    };
    // 不要なプロパティは削除
    delete formData.l_name;
    delete formData.f_name;
    delete formData.l_kana;
    delete formData.f_kana;
    delete formData.family1;
    delete formData.family2;
    delete formData.family3;
    delete formData.family4;
    delete formData.graduation_date;
    delete formData.pc_os1;
    delete formData.pc_os2;
    delete formData.pc_os3;
    delete formData.pc_soft1;
    delete formData.pc_soft2;
    delete formData.pc_soft3;
    delete formData.pc_soft4;
    delete formData.pc_soft5;
    delete formData.pc_soft6;
    delete formData.pc_hotelsoft1;
    delete formData.pc_hotelsoft2;
    console.log(formData);
    return formData;
    } catch (err) {
      console.log(err);
    } finally {
  };
}