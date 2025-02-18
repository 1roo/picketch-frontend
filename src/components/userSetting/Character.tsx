import { useState } from "react";
import * as CH from "../../styles/characterStyle";
import { Navigate, useNavigate } from "react-router-dom";

const CharactersName: string[] = [
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
  "원숭이",
  "닭",
  "개",
  "돼지",
];

/////
// 닉네임 중복검사
//  - 1. 공백
//  - 2. 특수문자 사용 불가
//  - 3. 글자수 제한 (3 ~ 10자)
//  - 4. 닉네임 중복 ( 일단 임시로 SaveName 배열 만들어서 확인 )
const SaveName: string[] = ["123", "qwer", "asdf", "zxcv"];
/////

export default function Character() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>();

  // 닉네임의 상태
  const [nickName, setNickName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  // useState<boolean | null>(null) → null을 초깃값으로 설정하여 처음엔 검사 결과를 표시하지 않음.

  // 지역 state
  const [region, setRegion] = useState("도봉구");

  const navigte = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    setErrorMessage("");
    setIsAvailable(null);
  };

  // 캐릭터 선택
  const handleCharacterClick = (character: string) => {
    setSelectedCharacter(character);
  };

  // 닉네임 중복 검사
  const handleCheckkDuplicate = () => {
    // 공백 검사
    if (nickName.trim() === "") {
      setErrorMessage("닉네임을 입력해주세요");
      setIsAvailable(false);

      console.log("1. 닉네임 공백입니다");
      return;
    }

    // 길이 검사
    if (nickName.length < 3 || nickName.length > 10) {
      setErrorMessage("3자 이상 10자 이하로 입력해주세요.");
      setIsAvailable(false);

      console.log("2. 닉네임 길이 오류 ", nickName.length);
      return;
    }

    // 정규식 검사
    if (!/^[a-zA-Z0-9가-힣]+$/.test(nickName)) {
      setErrorMessage("한글, 영어, 숫자만 사용 가능합니다.");
      setIsAvailable(false); // 중복 검사 초기화

      console.log("3. 닉네임 형식오류", nickName);
      return;
    }

    // 중복 검사
    if (SaveName.includes(nickName)) {
      setErrorMessage("이미 사용 중입니다.");
      setIsAvailable(false);

      console.log("4. 닉네임 중복입니다", nickName);
      return;
    }

    setErrorMessage(""); // 에러 메세지 초기화
    setIsAvailable(true);

    console.log("5. 사용 가능합니다.", nickName);
  };

  // 지역 설정
  const handleChangeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    // console.log("선택한 지역", e.target.value);
  };

  // 모든 데이터 저장 후 데이터 props로 넘기고 다른 페이지로(게임 대기화면?) 이동
  const handleNextLevel = () => {
    if (selectedCharacter && nickName && isAvailable && region) {
      navigte("/game-list-page", {
        state: { selectedCharacter, nickName, region },
      });
      console.log("캐릭터: ", selectedCharacter);
      console.log("이름: ", nickName);
      console.log("지역: ", region);
      console.log("저장 완료");
    } else {
      setErrorMessage(" 모든 정보를 설정해 주세요 ");
      console.log("저장 오류");
    }
  };

  /* 저장 후 렌더링 된 페이지에서 받기기
   const location = useLocation();
   const { selectedCharacter, nickName, region } = location.state || {}; */

  return (
    <>
      <CH.Setting>
        <CH.CharacterContainer>
          <CH.SelectedCharacterBox>
            선택 캐릭터
            {selectedCharacter && (
              <CH.SelectedCharacter
                src={`${process.env.PUBLIC_URL}/images/characters/Character${
                  CharactersName.indexOf(selectedCharacter) + 1
                }.png`}
                alt={`Selected ${selectedCharacter}`}
              />
            )}
          </CH.SelectedCharacterBox>
          <CH.CharacterImageBox>
            {CharactersName.map((character, index) => {
              return (
                <CH.CharacterImage
                  key={index}
                  src={`${process.env.PUBLIC_URL}/images/characters/Character${
                    index + 1
                  }.png`}
                  alt={`Character${index + 1}`}
                  onClick={() => handleCharacterClick(character)}
                />
              );
            })}
          </CH.CharacterImageBox>
        </CH.CharacterContainer>
        <CH.NickNameContainer>
          <CH.NickNameBox>닉네임</CH.NickNameBox>
          <CH.NinckNameInput
            type="text"
            placeholder="닉네임을 입력 해주세요"
            value={nickName}
            onChange={handleChange}
          />
          <CH.NickNameAvailability onClick={handleCheckkDuplicate}>
            중복검사
          </CH.NickNameAvailability>
        </CH.NickNameContainer>
        {/* 각 오류메세지 출력 */}
        {errorMessage && (
          <CH.NickNameMessage>{errorMessage}</CH.NickNameMessage>
        )}
        {/*중복 검사 후, 사용 가능 or 이미 사용중 메세지 출력 */}
        {isAvailable !== null && !errorMessage && (
          <CH.NickNameMessage>
            {isAvailable
              ? "사용가능한 닉네임입니다."
              : "이미 사용중인 닉네임입니다."}
          </CH.NickNameMessage>
        )}
        <CH.RegionContainer>
          <CH.RegionBox>지역</CH.RegionBox>
          <CH.SelectRegion value={region} onChange={handleChangeRegion}>
            <CH.SelectRegionOption value="도봉구">도봉구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="노원구">노원구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="강북구">강북구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="성북구">성북구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="중랑구">중랑구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="동대문구">
              동대문구
            </CH.SelectRegionOption>
            <CH.SelectRegionOption value="종로구">종로구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="은평구">은평구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="중구">중구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="광진구">광진구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="서대문구">
              서대문구
            </CH.SelectRegionOption>
            <CH.SelectRegionOption value="마포구">마포구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="용산구">용산구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="성동구">성동구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="강동구">강동구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="송파구">송파구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="강남구">강남구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="서초구">서초구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="동작구">동작구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="관악구">관악구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="금천구">금천구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="영등포구">
              영등포구
            </CH.SelectRegionOption>
            <CH.SelectRegionOption value="구로구">구로구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="양천구">양천구</CH.SelectRegionOption>
            <CH.SelectRegionOption value="강서구">강서구</CH.SelectRegionOption>
          </CH.SelectRegion>
        </CH.RegionContainer>

        <CH.SaveButton onClick={handleNextLevel}>저장</CH.SaveButton>
      </CH.Setting>
    </>
  );
}

// 유효성 검사 마무리 짓기 사용가능한 닉네임인지 확인.
// 위에 선택한 데이터들 저장해서 넘기는거꺼지 확인하고 깃 머지
