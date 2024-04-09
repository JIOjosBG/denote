import HashMap "mo:base/HashMap";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor {
  type DataSheet = {
    version: Nat;
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

  type DatasetRecord = {
    dataset: Blob;
    datasheet: DataSheet;
  };

  let datasets = HashMap.HashMap<Text, DatasetRecord>(5, Text.equal, Text.hash);

  
  public func uploadDataset(dataset : DatasetRecord) : async () {
    datasets.put(dataset.datasheet.title, dataset);
  };

  public query func getDataset(datasetId: Text) : async  ?DatasetRecord {
    return datasets.get(datasetId);
  };


  public query func getAvailableDatasetTitles(): async [DataSheet] {
    let values: Iter<DataSheet> = datasets.vals();
    let array: [DataSheet] = Iter.toArray(values) : [DataSheet];
    return array;
  };
};
