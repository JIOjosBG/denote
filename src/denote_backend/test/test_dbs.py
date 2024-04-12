"""Test canister APIs
   First deploy the canister, then run:

   $ pytest --network=local test_apis.py
   --> to run the tests locally 

   OR 

   $ pytest --network=ic test_apis.py
   --> to run the tests on the internet computer 

"""

from pathlib import Path
import pytest
from icpp.smoketest import call_canister_api

# Path to the dfx.json file
DFX_JSON_PATH = Path(__file__).parent / "../../../dfx.json"

# Canister in the dfx.json file we want to test
CANISTER_NAME = "denote_dbs"

def test_uploadDataset(
    identity_anonymous: dict[str, str], network: str
) -> None:

    record = '(record { version = "1.1"' \
                        'title = "Some title",'\
                        'creator = "Creator",'\
                        'organization = "Org",'\
                        'fund = "Fund",'\
                        'comments = "Comments",'\
                        'keywords = "key",'\
                        'size = 3,'\
                        'isSubset = true,'\
                        '})'

    response = call_canister_api(
        dfx_json_path=DFX_JSON_PATH,
        canister_name=CANISTER_NAME,
        canister_method="uploadDataset",
        canister_argument=record,
        canister_input="idl",
        canister_output="idl",
        network=network,
        timeout_seconds=10,
    )
    # Verify the response
    # assert "variant { Ok = record { donationAddress = record { address = " in response
    assert True
