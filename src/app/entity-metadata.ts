import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  BalanceUI: { entityName: 'Inventory' },
};

const pluralNames = { Inventory: 'Inventory' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
