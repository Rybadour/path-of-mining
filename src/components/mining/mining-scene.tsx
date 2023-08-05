import styled from "styled-components";

import Icon from "../../shared/components/icon";
import global from "../../config/global";
import Inventory from "./inventory";
import MapGrid from "../shared/map-grid";

export default function MiningScene() {
  return <>
    <SideSection>
      <h2>Idk something?</h2>
    </SideSection>
    <MiddleSection>
      <MapGrid />
    </MiddleSection>
    <SideSection>
      <Inventory />
    </SideSection>
  </>;
}

const SideSection = styled.div`
  margin-top: 50px;
`;

const MiddleSection = styled.div`
  margin: 20px 30px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
