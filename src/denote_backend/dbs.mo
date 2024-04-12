import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import T "../Types";

actor DB {
  type Datasheet = T.Datasheet;
  type DatasetRecord = T.DatasetRecord;

  let datarecords = HashMap.HashMap<Text, DatasetRecord>(5, Text.equal, Text.hash);

  
  public func uploadDataset(rawDataset: Text, datasheet:Datasheet) : async () {
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
