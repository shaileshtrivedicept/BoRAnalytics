import pandas as pd
from typing import List, Dict, Any
import os

def load_excel(filepath: str) -> pd.DataFrame:
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"File not found: {filepath}")
    return pd.read_excel(filepath)
