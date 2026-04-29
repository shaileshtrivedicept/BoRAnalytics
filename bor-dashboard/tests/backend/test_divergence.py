import pytest
import pandas as pd
import sys, os
sys.path.append(os.path.abspath('bor-dashboard/backend'))

from analytics.divergence import compute_panel_divergence

def test_divergence_calculation():
    data = {
        'student_id': ['s1', 's1', 's1', 's1'],
        'panel_number': [1, 1, 2, 2],
        'criterion': ['Q1', 'Q2', 'Q1', 'Q2'],
        'score': [0.8, 0.7, 0.4, 0.7],
        'studio_title': ['st1', 'st1', 'st1', 'st1'],
        'programme': ['p1', 'p1', 'p1', 'p1']
    }
    df = pd.DataFrame(data)
    div = compute_panel_divergence(df)

    q1_case = next(d for d in div if d['criterion'] == 'Q1')
    assert q1_case['divergence'] == pytest.approx(0.4)

    q2_case = next(d for d in div if d['criterion'] == 'Q2')
    assert q2_case['divergence'] == pytest.approx(0.0)
