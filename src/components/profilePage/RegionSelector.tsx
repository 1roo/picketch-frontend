import React from "react";
import * as P from "../../styles/profilePage/profileStyle";

const seoulDistricts = [
  "도봉구",
  "노원구",
  "강북구",
  "성북구",
  "중랑구",
  "동대문구",
  "종로구",
  "은평구",
  "중구",
  "광진구",
  "서대문구",
  "마포구",
  "용산구",
  "성동구",
  "강동구",
  "송파구",
  "강남구",
  "서초구",
  "동작구",
  "관악구",
  "금천구",
  "영등포구",
  "구로구",
  "양천구",
  "강서구",
];

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onChange,
}) => {
  return (
    <P.SelectContainer>
      <h3>지역</h3>
      <P.SelectBox value={selectedRegion} onChange={onChange}>
        {seoulDistricts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </P.SelectBox>
    </P.SelectContainer>
  );
};

export default RegionSelector;

