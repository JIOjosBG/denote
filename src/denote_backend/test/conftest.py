"""The pytest fixtures
   https://docs.pytest.org/en/latest/fixture.html
"""

# pylint: disable=missing-function-docstring, unused-import, wildcard-import, unused-wildcard-import
import pytest
from icpp.conftest_base import *  # pytest fixtures provided by icpp

# Define your pytest fixtures below
def pytest_addoption(parser):
    parser.addoption("--network", action="store", default="default name")


def pytest_generate_tests(metafunc):
    # This is called for every test. Only get/set command line arguments
    # if the argument is specified in the list of test "fixturenames".
    option_value = metafunc.config.option.network
    if 'network' in metafunc.fixturenames and option_value is not None:
        metafunc.parametrize("network", [option_value])
