import dbsCannister "canister:denote_dbs_backend";
import Text "mo:base/Text";



actor {
  public func call (): async Text {
    let d = await dbsCannister.getDatasheets();
    let res: Text = d[0].id;
    return res;
  } 
};
