import * as React from 'react';
import { selectLabel, checkboxLabel } from '../Utils/ViewFormLabel';
import PageBreak from './PageBreak';
import ResumeFooter from './ResumeFooter';

export default function PrintPage(props) {
  console.log('print', props.formValue);
  const { formValue } = props;
  const careers = formValue.careers || [];
  return (
    <>
      <div className="resume-confirm">
        <div className="resume">

            <section className="resume-header">
              <p className="text-right">
              {formValue.today}</p>
              <h3>履歴書</h3>
            </section>

            <section className="resume-table">
              <table className="default">
                <colgroup>
                  <col span={1} className="w8per"/>
                  <col span={1} className="w60per"/>
                  <col span={1} className="w8per"/>
                  <col span={1} className="w6per"/>
                  <col span={1} className="w18per"/>
                </colgroup>
                <tr>
                  <td className="f10 right-0 dot-bottom print_kana">
                    フリガナ
                  </td>
                  <td className="left-0 dot-bottom print_kana" colSpan={2}>
                    {formValue.fullname_kana}
                  </td>
                  <td className="bottom-0 top-0" rowSpan={5}></td>
                  <td className="ph f10" rowSpan={5}>
					貼り付ける場合、<br />
					１．縦36～40mm、<br />
					２．横24～30mm、<br />
					３．背景無地、<br />
					４．本人胸上のもの
                  </td>
                </tr>
                <tr>
                	<td className="f24 right-0 bottom-0">&nbsp;</td>
                	<td className="left-0 right-0 bottom-0"></td>
                	<td className="left-0 bottom-0"></td>
                </tr>

                <tr>
                  <td className="f10 right-0 top-0 bottom-0">
                    氏　名
                  </td>
                  <td className="f24 left-0 top-0 bottom-0" colSpan={2}>
                    {formValue.fullname}
                  </td>
                </tr>

                <tr>
                	<td className="f24 right-0 top-0">&nbsp;</td>
                	<td className="left-0 right-0 top-0"></td>
                	<td className="left-0 top-0"></td>
                </tr>

                <tr>
                  <td className="f16 text-center" colSpan={2} rowSpan={2}>
                  {formValue.birthday}（　{formValue.age}歳　）
                  </td>
                  <td className="f14 text-center" rowSpan={2}>
                    {formValue.sex === '1' && '男'}
                    {formValue.sex === '2' && '女'}
                  </td>
                </tr>
                <tr>
                	<td className="right-0 bottom-0 left-0 top-0"></td>
                	<td className="right-0 bottom-0 left-0 top-0"></td>
                </tr>
                <tr>
                  <td className="f10 right-0 dot-bottom print_kana">フリガナ</td>
                  <td colSpan={2} className="left-0 dot-bottom print_kana">
                      {formValue.address_kana}
                  </td>
                  <td className="f10 dot-bottom print_kana" colSpan={2}>連絡先</td>
                </tr>
                <tr>
                  <td className="f10 right-0 top-0 v_top">現住所</td>
                  <td colSpan={2} className="left-0 top-0">
                  〒{formValue.postcode}<br />
                  { formValue.address}<br />
                      {formValue.address3}
                  </td>
                  <td colSpan={2} className="top-0">
                  自宅:{formValue.tel}<br />
                      携帯:{formValue.mobile}<br />
                      E-mail:{formValue.email}
                  </td>
                </tr>

                <tr>
                  <td className="f10 right-0 dot-bottom print_kana">フリガナ</td>
                  <td colSpan={2} className="left-0 dot-bottom print_kana">
                  {formValue.contact_address_kana}
                  </td>
                  <td className="f10 dot-bottom print_kana" colSpan={2}>連絡先</td>
                </tr>
                <tr>
                  <td className="f10 right-0 top-0 v_top">連絡先</td>
                  <td colSpan={2} className="left-0 top-0">
                  	<span className="f10"> （現住所以外に連絡を希望する場合のみ記入）</span>	<br />
                      〒{formValue.contact_postcode}<br />
                  {formValue.contact_address}<br />
                  {formValue.contact_address3}
                  </td>
                  <td colSpan={2} className="top-0">
                  自宅:{formValue.contact_tel}<br />
                      携帯:{formValue.contact_mobile}<br />
                      E-mail:{formValue.contact_email}
                  </td>
                </tr>
              </table>

             <table className="default">
                <colgroup>
                  <col span={1} className="w8per"/>
                  <col span={1} className="w6per"/>
                  <col span={1} className="w86per"/>
                </colgroup>
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
                  <td className="text-center f14">
                  学　歴
                  </td>
                </tr>
                <tr>
                  <td className="text-center dot-right">
                  {formValue.graduation_y}
                  </td>
                  <td className="text-center left-0">
                  {formValue.graduation_m}
                  </td>
                <td>
                  {formValue.school}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="text-center"></td>
                  <td><span className="f10">その他学歴</span><br />
                  {formValue.other_acad}
                  </td>
                </tr>
                <tr>
                  <td className="text-center dot-right">
                  </td>
                  <td className="text-center left-0">
                  </td>
                  <td className="text-center f14">
                  職　歴
                  </td>
              </tr>
              {careers.map((v, i) => {
                return  (
                  <tr key={i}>
                    <td className="text-center dot-right">
                      {formValue[`start_period_y_${i}`]}</td>
                    <td className="text-center left-0">
                      {formValue[`start_period_m_${i}`]}</td>
                    <td>
                      {formValue[`company_${i}`]}
                    </td>
                  </tr>
                )
              })}
              </table>
            <ResumeFooter />
            <PageBreak />
             <table className="default">
                <colgroup>
                  <col span={1} className="w100per" />
                </colgroup>
                <tr>
                  <td><p className="f10">免許・資格</p>
                  {formValue.other_comp}
                  </td>
                </tr>
              </table>

             <table className="default">
                <colgroup>
                  <col span={1} className="w100per" />
                </colgroup>
                <tr>
                  <td><p className="f10">備考　（自己ＰＲなど）</p>
                  {formValue.pr}
                  </td>
                </tr>
              </table>
             <table className="default">
                <colgroup>
                  <col span={1} className="w100per" />
                </colgroup>
                <tr>
                  <td><p className="f10">語学スキル・ＰＣ（使用可能ソフト）等</p>
                TOEIC {formValue.toeic} 点 TOEFL {formValue.toefl} 点 英語検定(STEP) {formValue.sep} 級<br />
                英会話によるコミュニケーションスキル： {`${selectLabel('english', formValue.english, props.labels)}`}<br />
                  {formValue.foreign_lang}<br />
                  {`${checkboxLabel('pcOs', formValue.pc_os, props.labels)}`}<br />
                  {`${checkboxLabel('pcSoft', formValue.pc_soft, props.labels)}`}<br />
                  {`${checkboxLabel('pcHotelsoft', formValue.pc_hotelsoft, props.labels)}`}<br />
                  {formValue.pc_othersoft}
                  </td>
                </tr>
              </table>

             <table className="default">
                <colgroup>
                  <col span={1} className="w68per" />
                  <col span={1} className="w16per" />
                  <col span={1} className="w16per" />
                </colgroup>
                <tr>
                <td className="v_top" rowSpan={4}>
                  	<span className="f10">志望動機・特技・好きな学科など</span><br />
                特にありません。
                  {formValue.other_pr}
                  </td>
                  <td colSpan={2} className="text-center"><div className="f10 text-left">通勤時間</div>
                  {formValue.hours}時間 {formValue.minutes}分
                  </td>
                </tr>
                <tr>
                	<td colSpan={2} className="text-center"><div className="f10 text-left">扶養家族</div>
            {formValue.people}人
                	</td>
                </tr>
                <tr>
                	<td className="text-center"><div className="f10 text-left">配偶者</div>
                  {formValue.haigu === "1" ? "有" : "無"}
	                </td>
                	<td className="text-center"><div className="f10 text-left">配偶者の扶養義務</div>
                  {formValue.fuyou === "1" ? "有" : "無"}
                 	</td>
                </tr>
              </table>

             <table className="default">
                <colgroup>
                  <col span={1} className="w100per" />
                </colgroup>
                <tr>
                  <td><span className="f10">本人希望記入欄（特に給料・職種・勤務時間・その他についてあれば記入）</span><br />
		                {formValue.hope}
                  </td>
                </tr>
              </table>

            </section>
            <ResumeFooter />
            <PageBreak />

            <section className="resume-header">
              <p className="text-right">
              {formValue.today}</p>
              <h3>職務経歴書</h3>
            </section>

            <section className="resume-table">
             <table className="default">
                <colgroup>
                  <col span={1} className="w8per"/>
                  <col span={1} className="w6per"/>
                  <col span={1} className="w86per"/>
                </colgroup>
                <tr>
                  <td className="text-center dot-right">年</td>
                  <td className="text-center left-0">月</td>
                  <td className="top-0 right-0"></td>
                </tr>

              {formValue.careers.map((v, i) => {
                return (
                  <React.Fragment key={i}>
                <tr>
                  <td className="text-center dot-right dot-bottom">
                        {formValue[`start_period_y_${i}`]}
                  </td>
                  <td className="text-center left-0 dot-bottom">
                        {formValue[`start_period_m_${i}`]}
                  </td>
                  <td className="dot-bottom">
                        {formValue[`company_name_${i}`]}
                  </td>
                </tr>
                <tr>
                  <td className="kara-made top-0 dot-right text-center">
                    <div className="kara">〜</div>
                    <div className="made">
                          {formValue[`end_period_y_${i}`]}
                  </div>
                  </td>
                  <td className="top-0 left-0 kara-made text-center">
                    <div className="made">
                          {formValue[`end_period_m_${i}`]}
	              	</div>
                  </td>
                  <td className="top-0">
                        所属：{formValue[`bumon_${i}`]}
                      職種：{formValue[`syokusyu_${i}`]}<br />
                      役職：{formValue[`yakusyoku_${i}`]}
                      雇用形態：{formValue[`employ_type_${i}`]}<br />
                      ＜職務内容＞{formValue[`comment_${i}`]}<br />
	                  </td>
                    </tr>
                  </React.Fragment>
                )
                })}
              </table>
            </section>
            <ResumeFooter />
          </div>
        </div>
    </>
  )
}