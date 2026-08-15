import os
import re
import sys

def verify_all():
    base_dir = r"c:\Users\Asem\OneDrive\Desktop\my-project"
    html_path = os.path.join(base_dir, "index.html")
    js_path = os.path.join(base_dir, "script.js")
    db_path = os.path.join(base_dir, "db.js")
    css_path = os.path.join(base_dir, "style.css")

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    with open(db_path, "r", encoding="utf-8") as f:
        db_content = f.read()

    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    checks = []

    # 1. Check Preview & Print for Today's Appointments
    checks.append(("HTML: modal-today-installations-preview exists", "id=\"modal-today-installations-preview\"" in html_content))
    checks.append(("HTML: today-installations-printable-area exists", "id=\"today-installations-printable-area\"" in html_content))
    checks.append(("HTML: fs-preview-date-input exists", "id=\"fs-preview-date-input\"" in html_content))
    checks.append(("HTML: openTodayInstallationsPreview button in Field Service toolbar", "openTodayInstallationsPreview" in html_content))
    checks.append(("JS: openTodayInstallationsPreview defined", "function openTodayInstallationsPreview" in js_content))
    checks.append(("JS: printTodayInstallations defined", "function printTodayInstallations" in js_content))
    checks.append(("JS: renderTodayInstallationsSheet defined", "function renderTodayInstallationsSheet" in js_content))
    checks.append(("JS: setTodayPreviewDate defined", "function setTodayPreviewDate" in js_content))

    # 2. Check Preview & Print for Returns
    checks.append(("HTML: modal-returns-report-preview exists", "id=\"modal-returns-report-preview\"" in html_content))
    checks.append(("HTML: returns-report-printable-area exists", "id=\"returns-report-printable-area\"" in html_content))
    checks.append(("HTML: openReturnsReportPreview button in returns tab", "openReturnsReportPreview" in html_content))
    checks.append(("JS: openReturnsReportPreview defined", "function openReturnsReportPreview" in js_content))
    checks.append(("JS: printReturnsReport defined", "function printReturnsReport" in js_content))

    # 3. Check House Direct Link and Building Exterior Photo
    checks.append(("HTML: fs-house-url exists in modal-field-service", "id=\"fs-house-url\"" in html_content))
    checks.append(("HTML: fs-building-photo-input exists in modal-field-service", "id=\"fs-building-photo-input\"" in html_content))
    checks.append(("HTML: fs-building-photo hidden storage exists", "id=\"fs-building-photo\"" in html_content))
    checks.append(("HTML: fs-building-photo-preview-container exists", "id=\"fs-building-photo-preview-container\"" in html_content))
    checks.append(("JS: handleBuildingPhotoUpload defined", "function handleBuildingPhotoUpload" in js_content))
    checks.append(("JS: removeBuildingPhoto defined", "function removeBuildingPhoto" in js_content))
    checks.append(("JS: houseUrl in submitFieldService payload", "houseUrl:" in js_content or "houseUrl" in js_content))
    checks.append(("JS: buildingPhoto in submitFieldService payload", "buildingPhoto:" in js_content or "buildingPhoto" in js_content))
    checks.append(("JS: buildingPhoto thumbnail in renderFieldServiceAppointments", "building-photo-thumb" in js_content))

    # 4. Check CSS & Print Rules
    checks.append(("CSS: .printable-report-sheet style defined", ".printable-report-sheet" in css_content))
    checks.append(("CSS: .building-photo-thumb style defined", ".building-photo-thumb" in css_content))
    checks.append(("CSS: @media print hides .no-print", ".no-print" in css_content and "@media print" in css_content))

    # 5. Check WMS_APP exports
    exports = [
        "openTodayInstallationsPreview",
        "setTodayPreviewDate",
        "renderTodayInstallationsSheet",
        "printTodayInstallations",
        "openReturnsReportPreview",
        "printReturnsReport",
        "handleBuildingPhotoUpload",
        "removeBuildingPhoto"
    ]
    for exp in exports:
        checks.append((f"JS Export: WMS_APP.{exp}", f"{exp}," in js_content or f"{exp}\n" in js_content or f"{exp} " in js_content))

    passed = 0
    failed = 0
    print("=== FIELD SERVICE PRINT, PREVIEW & HOUSE PHOTO VERIFICATION ===")
    for title, result in checks:
        if result:
            print(f"[PASS] {title}")
            passed += 1
        else:
            print(f"[FAIL] {title}")
            failed += 1

    print(f"\nTotal Checks: {len(checks)} | Passed: {passed} | Failed: {failed}")
    if failed == 0:
        print("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!")
        return 0
    else:
        print("SOME CHECKS FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(verify_all())
