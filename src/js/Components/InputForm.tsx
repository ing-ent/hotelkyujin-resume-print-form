import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import ResumeHeader from './ResumeHeader';
import ResumeFooter from './ResumeFooter';
import PageBreak from './PageBreak';
import { getUser } from '../api/api';

export default function InputForm(props) {
  const [printViewPage, setPrintViewPage] = React.useState(false)
  const [formValue, setFormValue] = React.useState({
    today: '2020/11/1',
    fullname: '',
    fullname_kana: '',
    address_kana: '',
    address: '',
    birthday: '',
    age: '',
  });
  React.useEffect(() => {
    console.log('use effect');
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
      if (data) {
        setFormValue(data);
      }
    }
    getData();
  });
  return (
    <>
      {!printViewPage ?
        <Formik
          enableReinitialize
          initialValues={formValue}
          onSubmit={async (values) => {
            console.log(values);
            setPrintViewPage(true);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <ResumeHeader>
                <p className="text-right">
                  <Field
                    name="today"
                  />
                </p>
                <h3>履歴書</h3>
              </ResumeHeader>
              <section className="resume-table">
                <table className="default">
                  <colgroup>
                    <col span={1} className="w8per" />
                    <col span={1} className="w60per" />
                    <col span={1} className="w8per" />
                    <col span={1} className="w6per" />
                    <col span={1} className="w18per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="f10 right-0 dot-bottom">
                        フリガナ
                  </td>
                      <td className="f10 left-0 dot-bottom" colSpan={2}>
                        <Field name="fullname_kana" type="text"></Field>
                      </td>
                      <td className="bottom-0 top-0" rowSpan={4}></td>
                      <td className="ph" rowSpan={4}>
                        貼り付ける場合、<br />
					１．縦36～40mm、<br />
					２．横24～30mm、<br />
					３．背景無地、<br />
					４．本人胸上のもの
                  </td>
                    </tr>

                    <tr>
                      <td className="f10 right-0 top-0">
                        氏　名
                  </td>
                      <td className="f24 left-0 top-0" colSpan={2}>
                        <Field name="fullname" type="text"></Field>
                      </td>
                    </tr>

                    <tr>
                      <td className="f16 text-center" colSpan={2}>
                        <Field name="birthday" type="text"></Field>（　<label><Field name="age" type="text"></Field>歳</label>　）
                  </td>
                      <td className="f14 text-center">
                        <Field type="radio" name="sex" value="male"></Field>男<br />
                        <Field type="radio" name="sex" value="female"></Field>女
                  </td>
                    </tr>
                    <tr>
                      <td className="f10 right-0 dot-bottom">フリガナ</td>
                      <td colSpan={2} className="left-0 dot-bottom">
                        <Field name="address_kana" type="text"></Field>
                      </td>
                    </tr>
                    <tr>
                      <td className="f10 right-0 top-0 v_top">現住所</td>
                      <td colSpan={2} className="left-0 top-0">
                        <label>〒<Field name="postcode" type="text"></Field></label><br />
                        <Field name="address" type="text"></Field><br />
                        <label>ビルマンション名<Field name="address3" type="text"></Field></label><br />
                        <label>自宅電話番号<Field name="tel" className="phone" type="text"></Field></label><br />
                        <label>携帯電話番号<Field name="mobile" className="phone" type="text"></Field></label><br />
                        <label>E-mail<Field name="email" type="text" className="e-mail"></Field></label><br />
                      </td>
                    </tr>

                    <tr>
                      <td className="f10 right-0 dot-bottom">フリガナ</td>
                      <td colSpan={2} className="left-0 dot-bottom">
                        <Field name="contact_address_kana" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td className="f10 right-0 top-0 v_top">連絡先</td>
                      <td colSpan={2} className="left-0 top-0">
                        <span className="f10"> （現住所以外に連絡を希望する場合のみ記入）</span>	<br />
                        <label>〒<Field name="contact_postcode" type="text"></Field></label><br />
                        <Field name="contact_address" type="text"></Field><br />
                        <label>ビルマンション名<Field name="contact_address3" type="text"></Field></label><br />
                        <label>自宅電話番号<Field name="contact_tel" className="phone" type="text"></Field></label><br />
                        <label>携帯電話番号<Field name="contact_mobile" className="phone" type="text"></Field></label><br />
                        <label>E-mail<Field name="contact_email" type="text" className="e-mail"></Field></label><br />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="default">
                  <colgroup>
                    <col span={1} className="w8per" />
                    <col span={1} className="w6per" />
                    <col span={1} className="w86per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="f10 text-center dot-right">年</td>
                      <td className="f10 text-center left-0">月</td>
                      <td className="f10 text-center">学歴・職歴（各別にまとめて書く）</td>
                    </tr>
                    <tr>
                      <td className="text-center dot-right">
                      </td>
                      <td className="text-center left-0">
                      </td>
                      <td className="text-center f16">
                        学　歴
                  </td>
                    </tr>
                    <tr>
                      <td className="text-center dot-right">
                        <Field name="graduation_y" type="text"></Field>
                      </td>
                      <td className="text-center left-0">
                        <Field name="graduation_m" type="text"></Field>
                      </td>
                      <td>
                        <Field name="school" type="text"></Field>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-center">その他学歴</td>
                      <td>
                        <Field name="other_acad" type="text"></Field>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="default">
                  <colgroup>
                    <col span={1} className="w100per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td><p className="f10">免許・資格</p>
                        <Field name="other_comp" as="textarea"></Field>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="default">
                  <colgroup>
                    <col span={1} className="w100per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td><p className="f10">備考　（自己ＰＲなど）</p>
                        <Field name="pr" as="textarea"></Field>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ResumeFooter />
                <PageBreak />
                <ResumeHeader>
                  <h2 className="print-cont">【プライバシーファイル】</h2>
                  <p className="text-right print-cont">
                    {formValue.fullname}
                  </p>
                </ResumeHeader>
                <table className="default">
                  <colgroup>
                    <col span={1} className="w14per" />
                    <col span={1} className="w86per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="text-center">英語</td>
                      <td>
                        <label>TOEIC：<Field type="text" name="toeic" className="num4" />点</label>
                        <label>TOEFL：<Field type="text" name="toefl" className="num4" />点</label>
                        <label>英検：<Field type="text" name="sep" className="num4" />級</label><br />
                    コミュニケーションスキル：
                    <Field type="radio" name="english" value="A" />A
	                <Field type="radio" name="english" value="B" />B
	                <Field type="radio" name="english" value="C" />C
	                <Field type="radio" name="english" value="D" />D
	                <Field type="radio" name="english" value="NG" />NG<br />
                    （A ：上級ビジネス英会話レベル　B ：中級ビジネス英会話レベル　C：ホテルなどのマニュアル英会話レベル　D：挨拶レベル）
                  </td>
                    </tr>
                    <tr>
                      <td className="text-center">その他外国語</td>
                      <td>
                        <Field name="foreign_lang" as="textarea"></Field>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="default">
                  <colgroup>
                    <col span={1} className="w14per" />
                    <col span={1} className="w86per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="text-center">PCスキル</td>
                      <td className="top-0 right-0"></td>
                    </tr>
                    <tr>
                      <td className="text-center">使用OS</td>
                      <td>
                        <label><Field type="checkbox" name="pc_os" value="1" />Windows</label>
                        <label><Field type="checkbox" name="pc_os" value="2" />MacOS</label>
                        <label><Field type="checkbox" name="pc_os" value="3" />Linux他</label>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">使用ソフト</td>
                      <td>
                        <label><Field type="checkbox" name="pc_soft" value="1" />Word</label>
                        <label><Field type="checkbox" name="pc_soft" value="2" />Excel</label>
                        <label><Field type="checkbox" name="pc_soft" value="3" />PowerPoint</label>
                        <label><Field type="checkbox" name="pc_soft" value="4" />Access</label>
                        <label><Field type="checkbox" name="pc_soft" value="5" />PhotoShop</label>
                        <label><Field type="checkbox" name="pc_soft" value="6" />Illustrator</label>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">ホテル関連</td>
                      <td>
                        <label><Field type="checkbox" name="pc_hotelsoft" value="1" />OPERA</label>
                        <label><Field type="checkbox" name="pc_hotelsoft" value="2" />NEHOPS</label>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">その他のソフト</td>
                      <td>
                        <Field name="pc_othersoft" as="textarea"></Field>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="default">
                  <colgroup>
                    <col span={1} className="w14per" />
                    <col span={1} className="w54per" />
                    <col span={1} className="w16per" />
                    <col span={1} className="w16per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="text-center" rowSpan={4}>その他</td>
                      <td className="f10" rowSpan={4}>
                        志望動機・特技・好きな学科など
                      <Field name="other_pr" as="textarea"></Field>
                      </td>
                      <td colSpan={2}><span className="f10">通勤時間</span><br />
                        <span className="f14">
                          <label><Field type="text" name="hours" className="num4" />時間</label>
                          <label><Field type="text" name="minutes" className="num4" />分</label>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="f10">扶養家族<br />
                        <label><Field type="text" name="people" className="num4" />人</label>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="f10">配偶者</span><br />
                        <label className="f12"><Field type="radio" name="haigu" value="1" />有</label>
                        <label className="f12"><Field type="radio" name="haigu" value="2" />無</label>
                      </td>
                      <td><span className="f10">配偶者の扶養義務</span><br />
                        <label className="f12"><Field type="radio" name="fuyou" value="1" />有</label>
                        <label className="f12"><Field type="radio" name="fuyou" value="2" />無</label>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="default">
                  <colgroup>
                    <col span={1} className="w100per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td><p className="f10">本人希望記入欄（特に給料・職種・勤務時間・その他についてあれば記入）</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Field name="hope" as="textarea"></Field>
                      </td>
                    </tr>
                  </tbody>
                </table>


              </section>
              <ResumeFooter />
              <PageBreak />
              <ResumeHeader>
                <h2 className="print-cont">【プライバシーファイル】</h2>
                <p className="text-right print-cont">
                  {formValue.fullname}
                </p>
                <h3>職務経歴書</h3>
              </ResumeHeader>

              <section className="resume-table">
                <table className="default">
                  <colgroup>
                    <col span={1} className="w8per" />
                    <col span={1} className="w6per" />
                    <col span={1} className="w86per" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="text-center dot-right">年</td>
                      <td className="text-center left-0">月</td>
                      <td className="top-0 right-0"></td>
                    </tr>
                    <tr>
                      <td className="text-center dot-right dot-bottom">
                        <input type="text" name="" className="num4" />
                      </td>
                      <td className="text-center left-0 dot-bottom">
                        <input type="text" name="" className="num4" />
                      </td>
                      <td className="dot-bottom">
                        <input type="text" name="" />
                      </td>
                    </tr>
                    <tr>
                      <td className="kara-made top-0 dot-right text-center">
                        <div className="kara">〜</div>
                        <div className="made">
                          <input type="text" name="" className="num4" />
                        </div>
                      </td>
                      <td className="top-0 left-0 kara-made">
                        <div className="made">
                          <input type="text" name="" className="num4" />
                        </div>
                      </td>
                      <td className="top-0">
                        <label>所属：<input type="text" name="" className="num10" /></label>
                        <label>職種：<input type="text" name="" className="num10" /></label><br />
                        <label>役職：<input type="text" name="" className="num10" /></label>
                        <label>雇用形態：<input type="text" name="" className="num10" /></label><br />
                      ＜職務内容＞<br /><textarea></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center dot-right dot-bottom">
                        <input type="text" name="" className="num4" />
                      </td>
                      <td className="text-center left-0 dot-bottom">
                        <input type="text" name="" className="num4" />
                      </td>
                      <td className="dot-bottom">
                        <input type="text" name="" />
                      </td>
                    </tr>
                    <tr>
                      <td className="kara-made top-0 dot-right text-center">
                        <div className="kara">〜</div>
                        <div className="made"><span className="style1">現在に至る</span></div>
                      </td>
                      <td className="top-0 left-0">
                      </td>
                      <td className="top-0">
                        <label>所属：<input type="text" name="" className="num10" /></label>
                        <label>職種：<input type="text" name="" className="num10" /></label><br />
                        <label>役職：<input type="text" name="" className="num10" /></label>
                        <label>雇用形態：<input type="text" name="" className="num10" /></label><br />
                      ＜職務内容＞<br /><textarea></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="resume-submit">
                <input type="submit" name="submit" value="レジュメフォーム印刷画面へ" />
              </section>
            </Form>
          )}
        </Formik>
        : <>
          <h1>印刷画面</h1>
          <button onClick={() => setPrintViewPage(false)}>戻る</button>
          </>
      }
    </>
  )
}