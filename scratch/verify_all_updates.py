import os
import re
import sys

# Ensure UTF-8 output encoding for console
sys.stdout.reconfigure(encoding='utf-8')

def run_checks():
    base_dir = r"c:\Users\Asem\OneDrive\Desktop\my-project"
    html_path = os.path.join(base_dir, "index.html")
    db_path = os.path.join(base_dir, "db.js")
    js_path = os.path.join(base_dir, "script.js")

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    with open(db_path, "r", encoding="utf-8") as f:
        db_content = f.read()

    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    results = []

    # 1. Login / Sign Up checks
    results.append(("HTML: auth-tab-login exists", 'id="auth-tab-login"' in html_content))
    results.append(("HTML: auth-tab-signup exists", 'id="auth-tab-signup"' in html_content))
    results.append(("HTML: auth-confirm-password-group exists", 'id="auth-confirm-password-group"' in html_content))
    results.append(("HTML: btn-signup exists", 'id="btn-signup"' in html_content))
    results.append(("DB.JS: switchAuthMode function defined", "function switchAuthMode" in db_content))
    results.append(("DB.JS: handleSignUp function defined", "async function handleSignUp" in db_content))
    results.append(("DB.JS: createUserWithEmailAndPassword called", "createUserWithEmailAndPassword(auth, email, password)" in db_content))
    results.append(("DB.JS: users collection doc set on signup", 'doc(firestoreDb, "users", fbUser.uid)' in db_content or 'doc(firestoreDb, "users", user.uid)' in db_content))
    results.append(("DB.JS: auto login on signup", 'setAuthUser(authUser)' in db_content))

    # 2. Ratings removed checks
    results.append(("JS: rating badge removed from appointments", 'ratingBadge' not in js_content))
    results.append(("HTML: modal-rate-technician not present", 'id="modal-rate-technician"' not in html_content))
    results.append(("JS: ⭐ تقييم button removed from Today sheet", '⭐ تقييم' not in js_content))
    results.append(("HTML: ⭐ تقييم button removed from HTML", '⭐ تقييم' not in html_content))

    # 3. WhatsApp and Phone checks
    results.append(("JS: buildWhatsAppAppointmentUrl defined", "function buildWhatsAppAppointmentUrl" in js_content))
    results.append(("JS: sendWhatsAppAppointment defined", "function sendWhatsAppAppointment" in js_content))
    results.append(("JS: WhatsApp link in Today sheet", "wa.me/" in js_content))
    results.append(("JS: Phone clickable link tel: in Today sheet", "tel:" in js_content))
    results.append(("JS: WhatsApp button in Field Service appointments table", "💬 واتساب" in js_content or "💬 <span>واتساب</span>" in js_content))
    results.append(("JS: WhatsApp helper exposed on WMS_APP", "buildWhatsAppAppointmentUrl," in js_content and "sendWhatsAppAppointment" in js_content))
    results.append(("JS: WhatsApp helper exposed on window", "window.sendWhatsAppAppointment" in js_content and "window.buildWhatsAppAppointmentUrl" in js_content))

    # 4. Admin Dashboard & RBAC checks
    results.append(("HTML: admin-dashboard section exists", 'id="admin-dashboard"' in html_content))
    results.append(("DB.JS: WMS_ROLES defined", "const WMS_ROLES" in db_content))
    results.append(("DB.JS: applyRolePermissions defined", "function applyRolePermissions" in db_content))
    results.append(("DB.JS: loadAdminDashboardUsers defined", "async function loadAdminDashboardUsers" in db_content))
    results.append(("DB.JS: handleAdminChangeUserRole defined", "async function handleAdminChangeUserRole" in db_content))

    passed = 0
    failed = 0
    print("=" * 60)
    print("COMPREHENSIVE RBAC, LOGIN/SIGNUP, WHATSAPP & HUD VERIFICATION")
    print("=" * 60)
    for title, condition in results:
        status = "PASSED [OK]" if condition else "FAILED [X]"
        if condition:
            passed += 1
        else:
            failed += 1
        print(f"[{status}] {title}")
    
    print("-" * 60)
    print(f"TOTAL: {len(results)} | PASSED: {passed} | FAILED: {failed}")
    print("=" * 60)

if __name__ == "__main__":
    run_checks()
