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
import asyncio

# Path to the dfx.json file
DFX_JSON_PATH = Path(__file__).parent / "../../../dfx.json"

# Canister in the dfx.json file we want to test
CANISTER_NAME = "denote_dbs"

def test_uploadDataset(
    identity_anonymous: dict[str, str], network: str
) -> None:

    record = '(vec {}, record { version = "1.1" : text; ' \
                        'title = "Some title": text; '\
                        'creator = "Creator": text; '\
                        'organization = opt "Org": opt text; '\
                        'fund = "Fund": text; '\
                        'comments = "Comments": text; '\
                        'keywords = vec {"key"}; '\
                        'size = 3: nat; '\
                        'isSubset = true: bool'\
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
    assert response is ""


def test_getDataset(
    identity_anonymous: dict[str, str], network: str
) -> None:

    dataset_id = "Some title"

    record = '(vec {}, record { version = "1.1" : text; ' \
                        'title = ' + dataset_id + ': text; '\
                        'creator = "Creator": text; '\
                        'organization = opt "Org": opt text; '\
                        'fund = "Fund": text; '\
                        'comments = "Comments": text; '\
                        'keywords = vec {"key"}; '\
                        'size = 3: nat; '\
                        'isSubset = true: bool'\
                        '})'

    # We consider `uploadDataset()` as working
    call_canister_api(
        dfx_json_path=DFX_JSON_PATH,
        canister_name=CANISTER_NAME,
        canister_method="uploadDataset",
        canister_argument=record,
        canister_input="idl",
        canister_output="idl",
        network=network,
        timeout_seconds=10,
    )

    response = call_canister_api(
        dfx_json_path=DFX_JSON_PATH,
        canister_name=CANISTER_NAME,
        canister_method="getDataset",
        canister_argument=dataset_id,
        canister_input="idl",
        canister_output="idl",
        network=network,
        timeout_seconds=10,
    )

    # Verify the response
    expected_response = '(opt record { id = "Some title"; dataset = blob ""; datasheet = record { title = "Some title"; creator = "Creator"; fund = "Fund"; size = 3 : nat; version = "1.1"; keywords = vec { "key";}; organization = opt "Org"; comments = "Comments"; isSubset = true;};})' 

    assert expected_response in response

"""
@note   The `call_canister_api()` function from the `icpp-pro` 
        lib is not async, however, the getDatasheet function 
        from the canister is. Since those library's limitation, 
        we're going to make the test below in a future realization
        with a different test infrastructure.
"""
"""
def test_getDatasheets(
    identity_anonymous: dict[str, str], network: str
) -> None:

    dataset1_id = "Roses are red"
    dataset2_id = "Violets are blue"

    record1 = '(vec {}, record { version = "1.1" : text; ' \
                        'title = ' + dataset1_id + ': text; '\
                        'creator = "Creator": text; '\
                        'organization = opt "Org": opt text; '\
                        'fund = "Fund": text; '\
                        'comments = "Comments": text; '\
                        'keywords = vec {"key"}; '\
                        'size = 3: nat; '\
                        'isSubset = true: bool'\
                        '})'

    record2 = '(vec {}, record { version = "1.1" : text; ' \
                        'title = ' + dataset2_id + ': text; '\
                        'creator = "Creator": text; '\
                        'organization = opt "Org": opt text; '\
                        'fund = "Fund": text; '\
                        'comments = "Comments": text; '\
                        'keywords = vec {"key"}; '\
                        'size = 3: nat; '\
                        'isSubset = true: bool'\
                        '})'

    # We consider `uploadDataset()` as working
    call_canister_api(
        dfx_json_path=DFX_JSON_PATH,
        canister_name=CANISTER_NAME,
        canister_method="uploadDataset",
        canister_argument=record1,
        canister_input="idl",
        canister_output="idl",
        network=network,
        timeout_seconds=10,
    )

    call_canister_api(
        dfx_json_path=DFX_JSON_PATH,
        canister_name=CANISTER_NAME,
        canister_method="uploadDataset",
        canister_argument=record2,
        canister_input="idl",
        canister_output="idl",
        network=network,
        timeout_seconds=10,
    )

    response = call_canister_api(
        dfx_json_path=DFX_JSON_PATH,
        canister_name=CANISTER_NAME,
        canister_method="getDatasheets",
        canister_argument="()",
        canister_input="idl",
        canister_output="idl",
        network=network,
        timeout_seconds=10,
        )

    # Verify the response
    # assert expected_response in response
    print(response)
    assert dataset1_id in response
"""
