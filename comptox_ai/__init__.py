"""
ComptoxAI
=========
"""

import os
from pathlib import Path

from .comptox_ai import ComptoxAI
from .graph import Graph
from .ontology import ComptoxOntology
from .feature_sets import FeatureSet

from . import cypher

package_src_dir = Path(__file__).parent.parent

version_file = open(os.path.join(package_src_dir, 'VERSION'), 'r')
str_version = version_file.read().strip()

__version__ = str_version