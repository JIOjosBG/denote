export const idlFactory = ({ IDL }) => {
  const Datasheet__1 = IDL.Record({
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'fund' : IDL.Text,
    'size' : IDL.Nat,
    'version' : IDL.Text,
    'keywords' : IDL.Vec(IDL.Text),
    'organization' : IDL.Opt(IDL.Text),
    'comments' : IDL.Text,
    'isSubset' : IDL.Bool,
  });
  const DatasetRecord = IDL.Record({
    'id' : IDL.Text,
    'dataset' : IDL.Vec(IDL.Nat8),
    'datasheet' : Datasheet__1,
  });
  const Datasheet = IDL.Record({
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'fund' : IDL.Text,
    'size' : IDL.Nat,
    'version' : IDL.Text,
    'keywords' : IDL.Vec(IDL.Text),
    'organization' : IDL.Opt(IDL.Text),
    'comments' : IDL.Text,
    'isSubset' : IDL.Bool,
  });
  return IDL.Service({
    'getDataset' : IDL.Func([IDL.Text], [IDL.Opt(DatasetRecord)], ['query']),
    'getDatasheets' : IDL.Func(
        [],
        [IDL.Vec(IDL.Record({ 'id' : IDL.Text, 'datasheet' : Datasheet }))],
        ['query'],
      ),
    'uploadDataset' : IDL.Func([IDL.Vec(IDL.Nat8), Datasheet], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
