module Types {
  public type Datasheet = {
    version: Text;
    title: Text;
    // Motivation
    creator: Text;
    organization: ?Text;
    fund: Text;
    comments: Text;
    // Composition
    keywords: [Text];
    size: Nat;
    isSubset: Bool;
  };


  public type DatasetRecord = {
    dataset: Blob;
    datasheet: Datasheet;
    id: Text;
  };
};
