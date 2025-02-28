import React from "react";
import * as P from "../../styles/profilePage/profileStyle";

const seoulDistricts = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];
interface RegionSelectorProps {
  selectedRegion: number; // string -> number로 수정
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onChange,
}) => {
  return (
    <P.SelectContainer>
      <h3>지역</h3>
      <P.SelectBox value={selectedRegion.toString()} onChange={onChange}>
        {/* selectedRegion을 string으로 변환 */}
        {seoulDistricts.map((district, index) => (
          <option key={district} value={index + 1}>
            {/* 지역에 대응하는 id값을 설정 */}
            {district}
          </option>
        ))}
      </P.SelectBox>
    </P.SelectContainer>
  );
};

export default RegionSelector;
