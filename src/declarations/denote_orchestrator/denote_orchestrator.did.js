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
    'downloadDataset' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
      ),
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
  });
};
export const init = ({ IDL }) => { return []; };
