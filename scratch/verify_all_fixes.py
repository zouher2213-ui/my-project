import os
import re

def test_all_requirements():
    workspace = r"c:\Users\Asem\OneDrive\Desktop\my-project"
    index_html = open(os.path.join(workspace, "index.html"), "r", encoding="utf-8").read()
    script_js = open(os.path.join(workspace, "script.js"), "r", encoding="utf-8").read()
    db_js = open(os.path.join(workspace, "db.js"), "r", encoding="utf-8").read()
    
    checks = []

    # 1. Top return button removed from Field Service
    top_bar_match = re.search(r'id="view-field-service".*?<div class="module-actions-bar">(.*?)</div>', index_html, re.DOTALL)
    if top_bar_match:
        top_bar_content = top_bar_match.group(1)
        checks.append(("Field Service Top Bar: Return button removed", "openOrderReturnModal" not in top_bar_content))
    else:
        checks.append(("Field Service Top Bar found", False))

    # 2. Login Card: Role quick buttons removed
    login_card_match = re.search(r'id="auth-card".*?</form>', index_html, re.DOTALL)
    if login_card_match:
        login_card = login_card_match.group(0)
        checks.append(("Login Card: btn-role-porcelain removed", "btn-role-porcelain" not in login_card))
        checks.append(("Login Card: btn-role-marble removed", "btn-role-marble" not in login_card))
        checks.append(("Login Card: btn-role-field removed", "btn-role-field" not in login_card))
        checks.append(("Login Card: btn-role-tech removed", "btn-role-tech" not in login_card))
        checks.append(("Login Card: btn-owner-login retained", "btn-owner-login" in login_card))

    # 3. Owner Roles Manager Button & Modal in index.html
    checks.append(("Header: Owner roles button present", "btn-owner-roles-panel" in index_html and "openUserRolesManagerModal" in index_html))
    checks.append(("Modal: modal-user-roles-manager present", "id=\"modal-user-roles-manager\"" in index_html))
    checks.append(("Modal: role-mgr-users-tbody present", "id=\"role-mgr-users-tbody\"" in index_html))
    checks.append(("Modal: role-mgr-email input present", "id=\"role-mgr-email\"" in index_html))

    # 4. Field Service Modal updates
    fs_modal_match = re.search(r'id="modal-field-service".*?</form>', index_html, re.DOTALL)
    if fs_modal_match:
        fs_modal = fs_modal_match.group(0)
        checks.append(("Field Service Modal: Maps URL input removed", "fs-maps-url" not in fs_modal))
        checks.append(("Field Service Modal: Time slot preset select removed", "fs-time-slot-preset" not in fs_modal))
        checks.append(("Field Service Modal: Direct flexible time slot input present", "fs-time-custom-text" in fs_modal))
        checks.append(("Field Service Modal: House url present", "fs-house-url" in fs_modal))
        checks.append(("Field Service Modal: Building photo input present", "fs-building-photo-input" in fs_modal))

    # 5. Porcelain & Marble add material inputs optional (no strict required)
    add_mat_match = re.search(r'id="modal-add-material".*?</form>', index_html, re.DOTALL)
    if add_mat_match:
        add_mat = add_mat_match.group(0)
        checks.append(("Add Material: SKU not required", 'id="new-item-sku" required' not in add_mat))
        checks.append(("Add Material: Name not required", 'id="new-item-name" required' not in add_mat))
        checks.append(("Add Material: Loc not required", 'id="new-item-loc" required' not in add_mat))
        checks.append(("Add Material: Dim not required", 'id="new-item-dim" required' not in add_mat))

    # 6. Wood & Marble Permits optional inputs
    wood_permit_match = re.search(r'id="modal-wood-permit".*?</form>', index_html, re.DOTALL)
    if wood_permit_match:
        wood_permit = wood_permit_match.group(0)
        checks.append(("Wood Permit: Phone not required", 'id="wood-phone" required' not in wood_permit))
        checks.append(("Wood Permit: Date not required", 'id="wood-date" required' not in wood_permit))

    marble_permit_match = re.search(r'id="modal-marble-permit".*?</form>', index_html, re.DOTALL)
    if marble_permit_match:
        marble_permit = marble_permit_match.group(0)
        checks.append(("Marble Permit: Permit No not required", 'id="mar-permit-no" required' not in marble_permit))
        checks.append(("Marble Permit: Client not required", 'id="mar-client-name" required' not in marble_permit))

    # 7. script.js methods
    checks.append(("script.js: submitAddMaterial with auto-generated fallback SKU & name", "cat === 'porcelain' ? 'POR-' : 'MAR-'" in script_js))
    checks.append(("script.js: openEditMaterialModal implemented", "openEditMaterialModal" in script_js))
    checks.append(("script.js: submitEditMaterial implemented", "submitEditMaterial" in script_js))
    checks.append(("script.js: submitFieldService handles custom time slot", "userTimeSlot" in script_js))
    checks.append(("script.js: openTodayInstallationsPreview has smart fallback", "todayAppointments.length > 0 || targetDate" in script_js))
    checks.append(("script.js: openUserRolesManagerModal implemented", "openUserRolesManagerModal" in script_js))
    checks.append(("script.js: renderUserRolesTable implemented", "renderUserRolesTable" in script_js))
    checks.append(("script.js: submitUserRoleAssignment implemented", "submitUserRoleAssignment" in script_js))
    checks.append(("script.js: deleteUserRole implemented", "deleteUserRole" in script_js))

    # 8. db.js methods
    checks.append(("db.js: getUserRolesList present", "getUserRolesList" in db_js))
    checks.append(("db.js: setUserRole present", "setUserRole" in db_js))
    checks.append(("db.js: deleteUserRole present", "deleteUserRole" in db_js))
    checks.append(("db.js: fetchUserRole checks Owner assigned roles", "getUserRolesList" in db_js and "Found Owner Assigned Role" in db_js))
    checks.append(("db.js: addFieldService stores houseUrl & buildingPhoto", "houseUrl: data.houseUrl" in db_js and "buildingPhoto: data.buildingPhoto" in db_js))

    passed = 0
    failed = 0
    print("=" * 70)
    print("INTEGRATION VERIFICATION REPORT")
    print("=" * 70)
    for name, result in checks:
        status = "PASSED [OK]" if result else "FAILED [FAIL]"
        if result:
            passed += 1
        else:
            failed += 1
        print(f"[{status}] {name}")
    
    print("=" * 70)
    print(f"TOTAL: {len(checks)} | PASSED: {passed} | FAILED: {failed}")
    print("=" * 70)

if __name__ == "__main__":
    test_all_requirements()
