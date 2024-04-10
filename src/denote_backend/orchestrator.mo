import Text "mo:base/Text";
import Array "mo:base/Array";
import T "../Types";



actor Orchstrator{
  type Datasheet = T.Datasheet;
  
  var storages:[Text] = [];
  
  func pullDatasheets(canisterId:Text): async [{datasheet:Datasheet; id:Text; db:Text}] {
    var canisterTOCall = actor(canisterId): actor{getDatasheets (): async [{datasheet:Datasheet; id:Text}] };
    var datasheets =  await canisterTOCall.getDatasheets();

    return Array.map(datasheets, func (i:{datasheet:Datasheet; id:Text}):{datasheet:Datasheet; id:Text; db:Text}  {
      return {datasheet = i.datasheet; id = i.id; db = canisterId}
    })
  };

  public func addStorage(id:Text):(){
    storages := Array.append(storages,[id]);
  };

  public func getAllDatasheets (): async [{datasheet: Datasheet; id:Text; db:Text}] {
    var responses: [[{datasheet:Datasheet;id:Text; db:Text}]] = [];
    for (db in storages.vals()) {
      let newData = await pullDatasheets(db);
      responses := Array.append(responses,[newData]);
    };
    var result = Array.flatten(responses);
    return result;
  };

};
