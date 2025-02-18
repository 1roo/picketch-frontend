import * as S from "../../styles/sideBar";

export default function Rank() {
  const totalRankPercentage = 40;
  const districtRankPercentage = 20;

  return (
    <S.RankDiv>
      <p>내 랭킹</p>
      <S.RankContainer>
        <S.RankItem>
          <span>
            전체 상위 <b>40%</b>
          </span>
          <S.TriangleWrapper>
            <S.CylinderBase />
            <S.CylinderFill fillPercentage={100 - totalRankPercentage} />
          </S.TriangleWrapper>
        </S.RankItem>

        <S.RankItem>
          <span>
            구 상위 <b>20%</b>
          </span>
          <S.TriangleWrapper>
            <S.CylinderBase />
            <S.CylinderFill fillPercentage={100 - districtRankPercentage} />
          </S.TriangleWrapper>
        </S.RankItem>
      </S.RankContainer>
    </S.RankDiv>
  );
}
