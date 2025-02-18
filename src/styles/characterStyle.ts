import styled from "styled-components";

// Container >> Box >> 각종 Tag 순서

export const Setting = styled.div`
  width: 35vw;
  height: 80vh;
  min-width: 350px;
  border: 2px solid #d8ff91;
  border-radius: 5px;

  @media (max-width: 700px) {
    height: 85%;
    min-width: 350px;
    margin: 0;
  }
`;

export const CharacterContainer = styled.div`
  display: flex;
  width: 95%;
  height: 50%;
  border: 1px solid #d8ff91;
  align-items: center;
  margin: 5% 0 0 2.5%;
  border-radius: 5px;
`;

export const SelectedCharacterBox = styled.div`
  width: 35%;
  height: 55%;
  margin: 0 0 0 5%;
  border: 2px solid #d8ff91;
  font-size: small;
  text-align: center;
  border-radius: 5px;

  @media (max-width: 700px) {
    font-size: 50%;
    height: 50%;
  }
`;

export const SelectedCharacter = styled.img`
  width: 90%;
  height: 80%;
  margin: 5% 0 0 5%;
  padding: 15% 10%;
  /* border: 2px solid #d8ff91; */
  border-radius: 5px;

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
    margin: 0 2% 0 0;
    padding: 25% 10%;
  }
`;

export const CharacterImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 80%;
  margin: 5%;
`;

export const CharacterImage = styled.img`
  width: 90%;
  height: 90%;
  justify-content: center;
  text-align: center;
`;

export const NickNameContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  /* border: 2px solid #d8ff91; */
`;

export const NickNameBox = styled.p`
  width: 27%;
  height: 50%;
  font-size: 120%;
  font-weight: 100;
  text-align: center;
  margin-top: 4%;
  /* border: 2px solid #d8ff91; */

  @media (max-width: 700px) {
    font-size: 80%;
    margin-top: 6%;
  }
`;

export const NinckNameInput = styled.input`
  width: 40%;
  height: 80%;
  margin-top: 4%;
  color: white;
  border-radius: 5px;
  font-size: 80%;
  border: 2px solid #d8ff91;

  @media (max-width: 700px) {
    font-size: 70%;
  }
`;

export const NickNameMessage = styled.p`
  width: 100%;
  height: 2%;
  margin-top: 3%;
  padding-left: 27%;
  color: red;
  font-size: 50%;
  font-weight: 100;
  text-align: start;

  @media (max-width: 700px) {
    font-size: 1%;
    width: 100%;
    height: 3%;
    margin-top: 3%;
    padding-left: 27%;
  }
`;

export const NickNameAvailability = styled.button`
  width: 15%;
  height: 60%;
  border-radius: 5px;
  margin: 5% 0 0 8%;
  color: black;
  font-size: 80%;
  text-align: center;
  background-color: #d8ff91;

  @media (max-width: 700px) {
    height: 50%;
    font-size: 70%;
    margin: 6% 0 0 8%;
  }
`;

export const RegionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  margin-top: 3%;
  /* border: 2px solid #d8ff91; */

  @media (max-width: 700px) {
    margin-top: 3%;
  }
`;

export const RegionBox = styled.p`
  width: 27%;
  height: 70%;
  margin-top: 2%;
  font-size: 120%;
  font-weight: 100;
  text-align: center;
  /* border: 2px solid #d8ff91; */

  @media (max-width: 700px) {
    font-size: 80%;
    margin-top: 3%;
  }
`;
export const SelectRegion = styled.select`
  color: white;
  width: 25%;
  height: 70%;
  margin-top: 2%;
  font-weight: 100;
  text-align: center;
  border-radius: 5px;
  border: 2px solid #d8ff91;

  @media (max-width: 700px) {
    font-size: 80%;
  }
`;

export const SelectRegionOption = styled.option`
  background-color: black;
`;

export const SaveButton = styled.button`
  width: 70%;
  height: 7%;
  margin: 5% 0 0 15%;
  text-align: center;
  font-weight: 100;
  border-radius: 5px;
  border: 2px solid #d8ff91;

  @media (max-width: 700px) {
    height: 7%;
  }
`;
