import { pick } from "lodash";
import styled from "styled-components";
import shallow from "zustand/shallow";

import Icon from "../../shared/components/icon";
import { ResourceType } from "../../shared/types";
import { autoFormatNumber, enumFromKey } from "../../shared/utils";
import useStore from "../../store";
import resourcesConfig from "../../config/resources";

export function Resources() {
  const stats = useStore(s => s.stats);
  const discoveredResources = useStore(s => s.discovery.discoveredResources);

  return <ResourcesList>
    {Object.keys(stats.resources)
      .map(res => enumFromKey(ResourceType, res)!)
      .filter(resource => resource && discoveredResources[resource])
      .map(resource =>
        <Resource
          key={resource}
          resource={resource}
          amount={stats.resources[resource]}
          perSec={stats.resourcesPerSec[resource]}
        />
      )}
  </ResourcesList>;
}

interface ResourceProps {
  resource: ResourceType;
  amount: number;
  perSec: number;
}
function Resource(props: ResourceProps) {
  return <>
    <StyledResource>
      <Icon size="md" icon={resourcesConfig[props.resource].icon} />
      <Amounts>
        <Total>{autoFormatNumber(props.amount)}</Total>
        <div className='per-sec'>{autoFormatNumber(props.perSec)}/s</div>
      </Amounts>
    </StyledResource>
  </>;
}

const ResourcesList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  grid-gap: 30px;
  color: white;
  margin-bottom: 20px;
`;

const StyledResource = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100px;
`;

const Amounts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
`;

const Total = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tooltip = styled.div`
  background-color: #222;
  border-radius: 5px;
  padding: 10px;
  color: white;
  z-index: 10;
`;

const TooltipTitle = styled.strong`
  display: flex;
  margin-bottom: 8px;

  .icon {
    margin-left: 1px;
    margin-right: 5px;
  }
`;