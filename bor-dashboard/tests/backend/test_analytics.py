import pytest
import pandas as pd
import sys, os
sys.path.append(os.path.abspath('bor-dashboard/backend'))

from analytics.kpis import compute_kpis

def test_kpis_calculation():
    data = {
        'student_id': ['s1', 's1', 's2', 's2'],
        'panel_number': [1, 2, 1, 2],
        'score': [0.8, 0.9, 0.4, 0.5],
        'studio_id': ['st1', 'st1', 'st1', 'st1'],
        'programme': ['arch', 'arch', 'arch', 'arch']
    }
    df = pd.DataFrame(data)
    kpis = compute_kpis(df)

    assert kpis['total_students'] == 2
    assert kpis['total_studios'] == 1
    assert kpis['average_score'] == 0.65
    assert kpis['pass_rate'] == 75.0
