import HashMap "mo:base/HashMap";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
// import Hash "mo:base/Hash";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Random "mo:base/Random";




actor {
  type Datasheet = {
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

  type DatasetRecord = {
    dataset: Blob;
    datasheet: Datasheet;
    id: Text;
  };

  let datarecords = HashMap.HashMap<Text, DatasetRecord>(5, Text.equal, Text.hash);

  
  public func uploadDataset(rawDataset: Blob, datasheet:Datasheet) : async () {
    let newDataset:DatasetRecord = {
      dataset = rawDataset;
      datasheet = datasheet;
      id = datasheet.title;
    };
    datarecords.put(newDataset.id, newDataset);
  };


  public query func getDataset(datasetId: Text) : async  ?DatasetRecord {
    return datarecords.get(datasetId);
  };

  func extract(i:DatasetRecord): {datasheet: Datasheet; id:Text}{
    return {datasheet=i.datasheet; id=i.datasheet.title};
  };
  public query func getDatasheets() : async [ {datasheet:Datasheet; id: Text;} ] {
    var allrecords = Iter.toArray(datarecords.vals());
    return  Array.map(allrecords, extract)
  }
};
