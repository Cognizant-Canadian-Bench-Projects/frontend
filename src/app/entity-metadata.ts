import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { compareBalanceUI } from './models/balanceUI';

const entityMetadata: EntityMetadataMap = {
  BalanceUI: { entityName: 'Inventory' },
  Location:{}
};

const pluralNames = { Inventory: 'Inventory' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
