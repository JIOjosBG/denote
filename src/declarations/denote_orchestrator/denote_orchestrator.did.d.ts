import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Datasheet {
  'title' : string,
  'creator' : string,
  'fund' : string,
  'size' : bigint,
  'version' : string,
  'keywords' : Array<string>,
  'organization' : [] | [string],
  'comments' : string,
  'isSubset' : boolean,
}
export interface _SERVICE {
  'addStorage' : ActorMethod<[string], undefined>,
  'downloadDataset' : ActorMethod<[string, string], [] | [string]>,
  'getAllDatasheets' : ActorMethod<
    [],
    Array<{ 'db' : string, 'id' : string, 'datasheet' : Datasheet }>
  >,
  'getUserRepotation' : ActorMethod<[string], [] | [bigint]>,
  'uploadDataset' : ActorMethod<[string, Datasheet], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
