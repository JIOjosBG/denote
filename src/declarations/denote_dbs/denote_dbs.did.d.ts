import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DatasetRecord {
  'id' : string,
  'dataset' : string,
  'datasheet' : Datasheet__1,
}
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
export interface Datasheet__1 {
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
  'getDataset' : ActorMethod<[string], [] | [DatasetRecord]>,
  'getDatasheets' : ActorMethod<
    [],
    Array<{ 'id' : string, 'datasheet' : Datasheet }>
  >,
  'uploadDataset' : ActorMethod<[string, Datasheet], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
