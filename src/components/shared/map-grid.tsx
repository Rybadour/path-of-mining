import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pick } from 'lodash';
import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import shallow from 'zustand/shallow';

import resourcesConfig from '../../config/resources';
import Icon from '../../shared/components/icon';
import { BUILDING_BLUE, FOOD_RED } from '../../shared/constants';
import { GearType } from '../../shared/types';
import { autoFormatNumber, formatNumber } from '../../shared/utils';
import useStore from '../../store';
import { ProgressBar } from './progress-bar';

interface MapGridProps {
}
export default function MapGrid(props: MapGridProps) {
  const grid = [
    [0, 1, 2],
    [0, 0, 0],
    [0, 1, 0]
  ]
  return <div>
    <GridRows>
      {grid.map((gridRow, y) => 
        <GridRow key={y}>
          {gridRow.map((rockId, x) => {
            const key = `${x}:${y}`;
            return <GridTile
              key={key}
              rockId={rockId}
            />
          })}
        </GridRow>
      )}
    </GridRows>
  </div>;
}

type GridTileProps = {
  rockId: number,
};
function GridTile(props: GridTileProps) {
  return <GridSpace
    isFilled={props.rockId != 0}
  >
    {props.rockId}
  </GridSpace>;
}

const TILE_SIZE = 100;
const GAP = 10;
export const GRID_SIZE = TILE_SIZE + GAP * 2;

const GridRows = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${GAP}px;
`;

const GridRow = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: ${GAP}px;
  width: 100%;
  height: ${TILE_SIZE}px;
`;

const Details = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 6px;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.9);
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  padding: 4px;
  text-align: center;
`;

interface GridSpaceProps {
  isFilled: boolean,
}
const GridSpace = styled.div<GridSpaceProps>`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 6px;

  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  background-color: #666;
  color: white;
  border-radius: 5px;
  padding: 3px;
  position: relative;

  ${props => !props.isFilled && css`
    background-color: #888;
  `}

  &:hover ${Details} {
    display: flex;
  }
`;

const CardIcon = styled.div<{isExpired: boolean, isStatic: boolean}>`
  filter: drop-shadow(1px 1px 6px black);
  ${props => props.isStatic && css`
    filter: opacity(0.75);
  `}

  ${props => props.isExpired && css`
    filter: opacity(0.5);
  `}
`;

const DisabledSlash = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(200, 0, 0, 0.75);
`;

const StatusIcon = styled.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  filter: drop-shadow(1px 1px 6px black);
`;

const AbilityStat = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 3px;
`;