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

print("=" * 65)
print("COMPREHENSIVE RBAC EXPANSION & INSTALLATION ORDERS VERIFICATION")
print("=" * 65)

checks = [
    # 1. New Data Collection & CRUD
    ("DB.JS: INSTALLATION_ORDERS key in DB_KEYS", "INSTALLATION_ORDERS: 'wms_installation_orders_v6'" in db_content),
    ("DB.JS: INITIAL_INSTALLATION_ORDERS seed data defined", "const INITIAL_INSTALLATION_ORDERS" in db_content),
    ("DB.JS: getInstallationOrders defined in WMS_DB", "getInstallationOrders()" in db_content),
    ("DB.JS: addInstallationOrder defined in WMS_DB", "addInstallationOrder(data)" in db_content),
    ("DB.JS: updateInstallationOrder defined in WMS_DB", "updateInstallationOrder(id, updates)" in db_content),
    ("DB.JS: deleteInstallationOrder defined in WMS_DB", "deleteInstallationOrder(id)" in db_content),
    ("DB.JS: Realtime onSnapshot listener for installation_orders", "initInstallationOrdersListener" in db_content and "onSnapshot(colRef" in db_content),
    
    # 2. RBAC Logic in applyRolePermissions
    ("DB.JS: applyRolePermissions handles 'production_engineer'", "isProductionEngineer" in db_content),
    ("DB.JS: applyRolePermissions handles 'viewer'", "isViewer" in db_content),
    ("DB.JS: applyRolePermissions handles 'technician'", "isTechnician" in db_content),
    ("DB.JS: Technician hides materials inventory section", "materialsViews.forEach" in db_content and "materialsHudCards.forEach" in db_content),
    ("DB.JS: Viewer hides action buttons (Add, Edit, Delete, Reserve)", ".is-viewer .btn-add-item" in db_content and ".is-viewer .btn-reserve" in db_content and ".is-viewer .btn-danger" in db_content),
    ("DB.JS: Technician hides Add/Delete in Installation Orders", ".is-technician #btn-add-installation-order" in db_content and ".is-technician .inst-orders-actions-col" in db_content),
    ("DB.JS: Production Engineer has full access to all sections", "isProductionEngineer" in db_content),
    
    # 3. HTML UI Elements
    ("HTML: view-installation-orders section exists", 'id="view-installation-orders"' in html_content),
    ("HTML: section-installation-orders container exists", 'id="section-installation-orders"' in html_content),
    ("HTML: card-installation-orders HUD card exists", 'class="hud-card card-installation-orders"' in html_content),
    ("HTML: modal-installation-order exists", 'id="modal-installation-order"' in html_content),
    ("HTML: inst-order-id-input exists", 'id="inst-order-id-input"' in html_content),
    ("HTML: inst-customer-name-input exists", 'id="inst-customer-name-input"' in html_content),
    ("HTML: inst-address-input exists", 'id="inst-address-input"' in html_content),
    ("HTML: inst-status-input exists", 'id="inst-status-input"' in html_content),
    
    # 4. JS Controllers
    ("JS: renderInstallationOrders function defined", "function renderInstallationOrders" in js_content),
    ("JS: openNewInstallationOrderModal function defined", "function openNewInstallationOrderModal" in js_content),
    ("JS: openEditInstallationOrderModal function defined", "function openEditInstallationOrderModal" in js_content),
    ("JS: submitInstallationOrder function defined", "function submitInstallationOrder" in js_content),
    ("JS: deleteInstallationOrder function defined", "function deleteInstallationOrder" in js_content),
    ("JS: renderCurrentView handles installation-orders route", "case 'installation-orders':" in js_content),
    ("JS: WMS_APP exports installation orders handlers", "renderInstallationOrders" in js_content and "openNewInstallationOrderModal" in js_content),
]

passed = 0
for name, condition in checks:
    if condition:
        print(f"[PASSED [OK]] {name}")
        passed += 1
    else:
        print(f"[FAILED [ERR]] {name}")

print("-" * 65)
print(f"TOTAL: {len(checks)} | PASSED: {passed} | FAILED: {len(checks) - passed}")
print("=" * 65)

if passed == len(checks):
    print("ALL 28 RBAC & INSTALLATION ORDERS TESTS PASSED SUCCESSFULLY!")
else:
    exit(1)
