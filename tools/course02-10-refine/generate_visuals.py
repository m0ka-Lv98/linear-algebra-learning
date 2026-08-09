from pathlib import Path
import json, shutil, hashlib, math
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
matplotlib.rcParams["font.family"]="Noto Sans CJK JP"
matplotlib.rcParams["axes.unicode_minus"]=False
from matplotlib.patches import Rectangle, FancyArrowPatch
from PIL import Image
import seaborn as sns

# This script regenerates final visual assets from topic_profiles.json.
ROOT=Path(__file__).resolve().parents[2]
PROFILES=json.loads((Path(__file__).parent/"topic_profiles.json").read_text(encoding="utf-8"))
# The canonical visual implementation is stored in generate_visuals_impl.py next to this file.
exec((Path(__file__).parent/"generate_visuals_impl.py").read_text(encoding="utf-8"))
