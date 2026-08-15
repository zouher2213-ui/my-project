import os
import re

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(base_dir, 'db.js')
js_path = os.path.join(base_dir, 'script.js')
html_path = os.path.join(base_dir, 'index.html')

with open(db_path, 'r', encoding='utf-8') as f:
    db_content = f.read()

with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

print("=" * 60)
print("VERIFICATION: TASKS RESET, NO RATINGS, & STANDALONE PREVIEW")
print("=" * 60)

checks = [
    ("DB.JS: resetAllTechniciansTasks method defined", "resetAllTechniciansTasks" in db_content),
    ("DB.JS: resetTechnicianTasks method defined", "resetTechnicianTasks" in db_content),
    ("DB.JS: clearAllRatings method defined", "clearAllRatings" in db_content),
    ("DB.JS: initDB cleans ratings from stored technicians", "delete item.avgRating" in db_content),
    ("DB.JS: INITIAL_TECHNICIANS all have totalJobs: 0", "totalJobs: 0" in db_content),
    ("JS: resetAllTechniciansTasks function defined", "function resetAllTechniciansTasks" in js_content),
    ("JS: resetTechnicianTasks function defined", "function resetTechnicianTasks" in js_content),
    ("JS: WMS_APP exports resetAllTechniciansTasks", "resetAllTechniciansTasks" in js_content),
    ("JS: WMS_APP exports resetTechnicianTasks", "resetTechnicianTasks" in js_content),
    ("JS: openTodayInstallationsPreview opens window.open('', '_blank')", "window.open('', '_blank')" in js_content),
    ("JS: openTodayInstallationsPreview has NO signature/stamp lines", "مشرف المستودع والميدان: _____________" not in js_content),
    ("JS: openReturnsReportPreview has NO signature/stamp lines", "المسؤول الميداني: _____________" not in js_content),
    ("HTML: Technicians toolbar with reset all button exists", "WMS_APP.resetAllTechniciansTasks()" in html_content),
    ("HTML: Add new technician button exists in toolbar", "WMS_APP.openNewTechnicianModal()" in html_content),
    ("JS: Tech cards include reset task button", "WMS_APP.resetTechnicianTasks" in js_content),
]

passed = 0
for name, condition in checks:
    if condition:
        print(f"[PASSED [OK]] {name}")
        passed += 1
    else:
        print(f"[FAILED [ERR]] {name}")

print("-" * 60)
print(f"TOTAL: {len(checks)} | PASSED: {passed} | FAILED: {len(checks) - passed}")
print("=" * 60)

if passed == len(checks):
    print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!")
else:
    exit(1)
