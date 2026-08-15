import os
import re

def test_admin_dashboard_requirements():
    workspace = r"c:\Users\Asem\OneDrive\Desktop\my-project"
    index_html = open(os.path.join(workspace, "index.html"), "r", encoding="utf-8").read()
    db_js = open(os.path.join(workspace, "db.js"), "r", encoding="utf-8").read()
    
    checks = []

    # 1. Admin Dashboard UI Section in index.html
    checks.append(("HTML: admin-dashboard section exists with display:none", 'id="admin-dashboard"' in index_html and 'style="display: none;' in index_html))
    checks.append(("HTML: admin-dashboard-users-tbody exists", 'id="admin-dashboard-users-tbody"' in index_html))
    checks.append(("HTML: messages-section exists", 'id="messages-section"' in index_html))
    checks.append(("HTML: messages-list exists", 'id="messages-list"' in index_html))
    checks.append(("HTML: message-input exists", 'id="message-input"' in index_html))
    checks.append(("HTML: btn-send-message exists", 'id="btn-send-message"' in index_html))

    # 2. Firestore imports in db.js
    checks.append(("db.js: getDocs imported from Firestore", "getDocs" in db_js))
    checks.append(("db.js: updateDoc or setDoc imported from Firestore", "updateDoc" in db_js and "setDoc" in db_js))

    # 3. 3 Role Levels defined in db.js
    checks.append(("db.js: WMS_ROLES has owner, admin, viewer", "OWNER: 'owner'" in db_js and "ADMIN: 'admin'" in db_js and "VIEWER: 'viewer'" in db_js))

    # 4. User Registration saves to 'users' collection with default role: 'viewer'
    signup_match = re.search(r'async function handleSignUp\(.*?\)\s*\{(.*?)\n\}', db_js, re.DOTALL)
    if signup_match:
        signup_code = signup_match.group(1)
        checks.append(("db.js: handleSignUp writes to users collection", 'doc(firestoreDb, "users", user.uid)' in signup_code))
        checks.append(("db.js: handleSignUp sets default role viewer/owner", 'role: defaultRole' in signup_code))

    # 5. Role Checking on Login (fetchUserRole & onAuthStateChanged)
    checks.append(("db.js: onAuthStateChanged listener implemented", 'onAuthStateChanged(auth' in db_js))
    checks.append(("db.js: fetchUserRole checks Firestore users collection", 'doc(firestoreDb, "users", user.uid)' in db_js))

    # 6. Visibility Logic in applyRolePermissions
    perm_match = re.search(r'function applyRolePermissions\(role\)\s*\{(.*?)\n\}', db_js, re.DOTALL)
    if perm_match:
        perm_code = perm_match.group(1)
        checks.append(("db.js: applyRolePermissions shows admin-dashboard for owner only", 'adminDashboardEl.style.display = "block"' in perm_code and 'adminDashboardEl.style.display = "none"' in perm_code))
        checks.append(("db.js: applyRolePermissions hides message-input for viewer", 'messageInputEl.style.display = "none"' in perm_code))
        checks.append(("db.js: applyRolePermissions shows message-input for admin/owner", 'messageInputEl.style.display = ""' in perm_code))

    # 7. Manage Users Logic (loadAdminDashboardUsers)
    checks.append(("db.js: loadAdminDashboardUsers fetches from users collection", 'getDocs(collection(firestoreDb, "users"))' in db_js))
    checks.append(("db.js: loadAdminDashboardUsers renders email, uid, role dropdown", 'admin-dashboard-users-tbody' in db_js and 'handleAdminChangeUserRole' in db_js))

    # 8. Change Roles Logic (handleAdminChangeUserRole)
    checks.append(("db.js: handleAdminChangeUserRole updates Firestore users doc", 'doc(firestoreDb, "users", uid)' in db_js and 'role: newRole' in db_js))
    checks.append(("db.js: loadAdminDashboardUsers and handleAdminChangeUserRole globally exported", 'window.loadAdminDashboardUsers' in db_js and 'window.handleAdminChangeUserRole' in db_js))

    passed = 0
    failed = 0
    print("=" * 70)
    print("ADMIN DASHBOARD & ROLES VERIFICATION REPORT")
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
    test_admin_dashboard_requirements()
