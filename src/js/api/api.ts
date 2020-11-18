import fetchWithErrorHandling from '../Utils/FetchWithErrorHandling';
import { convertCheckBoxFormData } from '../Utils/ConvertCheckBoxData';
import { joinFullName } from '../Utils/ConvertFullNameData';
import { removeDateStringSeparator, addDateStringSeparator } from '../Utils/ConvertDateStringSeparator';
import { removePostalCodeSeparator } from '../Utils/ConvertPostalCodeSeparator';
import { ConvertCheckBoxOption, ConvertSelectBoxOption } from '../Utils/ConvertFormOption';
import ConvertLabel from '../Utils/ConvertLabel';
import { Buffer } from 'buffer';
import { initialFormState } from '../state/state';
import { selectLabel } from '../Utils/ViewFormLabel';
import moment from 'moment';
moment.locale('ja');

interface Props {
  code: string
  clientId: string
  clientState: string
  labels: any
}

export const getUser = async (props: Props): Promise<any> => {
  console.log(props);
  const { code, clientId, clientState, labels } = props;
  // @ts-ignore
  const basicCredentials = Buffer.from(`${clientId}:${CLIENT_SECRET}`).toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${basicCredentials}`,
    // @ts-ignore
    'X-API-KEY': `Bearer ${PUBLIC_ACCESS_TOKEN}`,
  };
  const body = JSON.stringify({
    grant_type: 'authorization_code',
    code: code,
    client_id: clientId,
    // @ts-ignore
    client_secret: CLIENT_SECRET,
    state: clientState,
  });
  try {
    const fetchAccessTokenResponse = await fetchWithErrorHandling(
      // @ts-ignore
      `${API_SERVER}/v1/authentication/user/token`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: headers,
        body: body,
      },
    );
    const accessToken = await fetchAccessTokenResponse.json();

    // ユーザ/PR情報取得
    const userHeaders = {
      'Content-Type': 'application/json',
      'X-API-KEY': `Bearer ${accessToken.access_token}`,
    };

    // @ts-ignore
    const fetchUserResponse = await fetchWithErrorHandling(`${API_SERVER}/v1/user/info/context`, {
      method: 'get',
      headers: userHeaders,
    });
    const user = await fetchUserResponse.json();
    // console.log(user);
    const personal = user.result.personal;
    const careers = user.result.careers;
    // console.log(personal);
    // nullを''に変換する
    for (const key of Object.keys(personal)) {
      if (personal[key] === null) {
        personal[key] = '';
      }
    }
    const [yyyy, mm, dd] = personal.birthday.split('-');
    const birth = moment().year(yyyy).month(mm - 1).date(dd);
    const age = moment().diff(birth, 'years');
    // フォームデータ用に整形、マージ
    const formData = {
      ...initialFormState,
      ...personal,
      age: age,
      today: moment(new Date()).format('LL'),
      ...convertCheckBoxFormData(personal, 'family'),
      ...convertCheckBoxFormData(personal, 'pc_os'),
      ...convertCheckBoxFormData(personal, 'pc_soft'),
      ...convertCheckBoxFormData(personal, 'pc_hotelsoft'),
      ...convertCheckBoxFormData(personal, 'hope_reason'),
      ...{'birthday': moment(personal.birthday).format('LL')},
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
      ...{ address: `${selectLabel('address', personal.address1, labels)}${personal.address2}${personal.address3}` },
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
    return formData;
  } catch (err) {
    return initialFormState;
  };
}

/**
 * ラベルを取得
 * @return Promise
 */
export const getLabels = async () => {
  const headers = {
    'Content-Type': 'application/json',
    // @ts-ignore
    'X-API-KEY': `Bearer ${PUBLIC_ACCESS_TOKEN}`,
  };
  try {
    // dispatch(loadingPage(true));
    // await timeout(2000);
    const response = await fetchWithErrorHandling(
      // @ts-ignore
      `${API_SERVER}/v1/dataset/labels`, {
      method: 'get',
      headers: headers,
      // credentials: 'same-origin',
    });
    const labels = await response.json();
    const labelData = {
      formOptions: {
        sex: ConvertCheckBoxOption(labels.sex, 'sex'),
        family: ConvertCheckBoxOption(labels.family, 'family'),
        address: ConvertSelectBoxOption(labels.address),
        line: ConvertSelectBoxOption(labels.line),
        academic: ConvertCheckBoxOption(labels.academic, 'academic'),
        graduationY: ConvertSelectBoxOption(labels.graduation_y),
        periodY: ConvertSelectBoxOption(labels.period_y),
        periodYEnd: ConvertSelectBoxOption(labels.period_y_end),
        month: ConvertSelectBoxOption(labels.month),
        english: ConvertCheckBoxOption(labels.english, 'english'),
        pcOs: ConvertCheckBoxOption(labels.pc_os, 'pc_os'),
        pcSoft: ConvertCheckBoxOption(labels.pc_soft, 'pc_soft'),
        pcHotelsoft: ConvertCheckBoxOption(labels.pc_hotelsoft, 'pc_hotelsoft'),
        employType: ConvertSelectBoxOption(labels.employ_type),
        serviceCategory: ConvertSelectBoxOption(labels.service_category),
        area: ConvertSelectBoxOption(labels.area),
        subarea: ConvertSelectBoxOption(labels.subarea),
        hopeAddress: ConvertSelectBoxOption(labels.address),
        workType: ConvertCheckBoxOption(labels.work_type, 'work_type'),
        hopeReason: ConvertCheckBoxOption(labels.hope_reason, 'hope_reason'),
        hopeSyugyoStartY: ConvertSelectBoxOption(labels.hope_syugyo_start_y),
        hopeSyugyoStartM: ConvertSelectBoxOption(labels.hope_syugyo_start_m),
        hopeKoyoukeitai: ConvertSelectBoxOption(labels.hope_koyoukeitai),
        hopeNensyu: ConvertSelectBoxOption(labels.hope_nensyu),
        subjob: ConvertSelectBoxOption(labels.subjob),
        scout: ConvertCheckBoxOption(labels.scout, 'scout'),
      },
      // 表示上必要なラベル
      labels: {
        employType: ConvertLabel(labels.employ_type),
        subjob: ConvertLabel(labels.subjob),
      },
      // 初期ラベル
      defaultLabels: {
        family: labels.family,
        pcOs: labels.pc_os,
        pcSoft: labels.pc_soft,
        pcHotelsoft: labels.pc_hotelsoft,
        hopeReason: labels.hope_reason,
        address: labels.address,
      },
    };
    return labelData;
    // console.log(responseJson);
  } catch (err) {
    // dispatch(loadingPage(false));
  }
}







