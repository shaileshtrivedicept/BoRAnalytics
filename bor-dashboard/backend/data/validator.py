import pandas as pd
from typing import List, Tuple

REQUIRED_FIELDS = [
    "Semester", "Program", "Studio_Code", "Studio_Title",
    "Tutor_Names", "Panelist_Names", "Panel", "RawPanelScore"
]

def validate_dataframe(df: pd.DataFrame) -> Tuple[bool, List[str]]:
    missing_fields = [field for field in REQUIRED_FIELDS if field not in df.columns]
    if missing_fields:
        return False, [f"Missing required fields: {', '.join(missing_fields)}"]
    return True, []
