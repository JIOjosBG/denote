export const idlFactory = ({ IDL }) => {
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
    'addStorage' : IDL.Func([IDL.Text], [], ['oneway']),
    'downloadDataset' : IDL.Func([IDL.Text, IDL.Text], [IDL.Opt(IDL.Text)], []),
    'getAllDatasheets' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'db' : IDL.Text,
              'id' : IDL.Text,
              'datasheet' : Datasheet,
            })
          ),
        ],
        [],
      ),
    'uploadDataset' : IDL.Func([IDL.Text, Datasheet], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
