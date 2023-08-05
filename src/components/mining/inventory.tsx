import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { pick } from 'lodash';
import shallow from 'zustand/shallow';

import Icon from '../../shared/components/icon';
import { Gear, GearType, ModifierValueType, ResourceType, SpecificModifier } from '../../shared/types';
import { enumFromKey, formatNumber } from '../../shared/utils';
import useStore from '../../store';
import { SectionBlurb, SectionHeader } from '../shared/common-styles';
import resourcesConfig from '../../config/resources';

import './market-list.scss';
import modifiers from '../../config/modifiers';

export interface InventoryProps {
}

export default function Inventory(props: InventoryProps) {
  const inventory = useStore(s => s.inventory);
  const [closedCategories, setClosedCategories] = useState<Partial<Record<GearType, boolean>>>({})

  const onToggleCategory = useCallback((cardType: GearType) => {
    const newClosedCategories = { ...closedCategories };
    newClosedCategories[cardType] = !newClosedCategories[cardType];
    setClosedCategories(newClosedCategories);
  }, [closedCategories]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  return <div className="market">
    <SectionHeader>Inventory</SectionHeader>
    <div className="category-list">
    {Object.keys(GearType)
      .map(g => enumFromKey(GearType, g))
      .map(gearType => ({
        gearType,
        gearList: Object.values(inventory.gear).filter(gear => gear.type == gearType)
      }))
      .filter(({gearList}) => gearList.length > 0)
      .map(({gearType, gearList}) =>
        <Category
          key={gearType}
          gearType={gearType!}
          gearList={gearList}
          isOpen={closedCategories[gearType!] ?? false}
          onToggleCategory={onToggleCategory}
        />
      )
    }
    </div>
  </div>;
}

type CategoryProps = {
  gearType: GearType,
  gearList: Gear[],
  isOpen: boolean,
  onToggleCategory: (gearType: GearType) => void
};
function Category(props: CategoryProps) {
  const toggleCategory = useCallback(() => {
    props.onToggleCategory(props.gearType);
  }, [props.onToggleCategory, props.gearType]);

  return <div className="category">
    <div className="header" onClick={toggleCategory}>
      {props.isOpen ?
        <FontAwesomeIcon icon="chevron-up" /> :
        <FontAwesomeIcon icon="chevron-down" />
      }
      <span className="label">{props.gearType}</span>
    </div>
    <div className={classNames("market-list", {hidden: props.isOpen})}>
      {props.gearList.map(gear =>
        <GearInInventory key={gear.id} gear={gear} />
      )}
    </div>
  </div>
}

function GearInInventory(props: {gear: Gear}) {
  return <div className="gear-container" key={props.gear.id}>
    <div
      className={classNames("gear")}
    >
      <div className="title">
        <Icon size="sm" icon={props.gear.icon} />
        <span className="name">{props.gear.name}</span>
      </div>

      <div className="description">
        <ModifierStat mod={props.gear.implicitModifier} />
      </div>
    </div>
  </div>;
}

function ModifierStat(props: {mod: SpecificModifier}) {
  const config = modifiers[props.mod.mod];
  const suffix = config.valueType === ModifierValueType.Percent ? '%' : '';
  return <div>
    {config.gearStatText.replace('{{value}}', props.mod.value + suffix)}
  </div>;
}