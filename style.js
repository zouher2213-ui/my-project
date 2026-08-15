/**
 * ============================================================================
 * AL-ENTEJ WMS - Phone Web Version Style & Mobile Interactive Controller
 * File: style.js
 * Purpose: Dedicated mobile & responsive experience engine that perfectly fits
 *          the project's luxury dark/light glassmorphic WMS design system.
 * Features:
 *   - Responsive Glassmorphism Bottom Navigation Dock with Live Count Badges
 *   - Mobile Slide-up Bottom Sheets for all 12 Modals with Drag Grab Handle
 *   - Responsive Mobile Cards & Touch-friendly Steppers (±1, ±0.5)
 *   - Context-Aware Floating Action Button (FAB) for Instant Quick Actions
 *   - Royal Gold Crown Badge highlighting for Owner (s@gmail.com)
 *   - iOS/Android Safe Area Inset Support & Haptic Touch Simulation
 *   - Seamless Tri-Lingual (AR, EN, BN) and Dark/Light Theme Reactivity
 * ============================================================================
 */

(function () {
  'use strict';

  // Inject Mobile CSS Stylesheet
  function injectMobileStyles() {
    if (document.getElementById('wms-phone-web-style')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'wms-phone-web-style';
    styleEl.textContent = `
      /* ======================================================================
         PHONE WEB VERSION RESPONSIVE STYLES (style.js)
         ====================================================================== */

      /* iOS & Android Safe Area Root Variables */
      :root {
        --mobile-nav-height: 68px;
        --mobile-safe-bottom: env(safe-area-inset-bottom, 0px);
        --mobile-safe-top: env(safe-area-inset-top, 0px);
      }

      /* Mobile Navigation Bottom Dock (Glassmorphism) */
      .wms-mobile-dock {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: calc(var(--mobile-nav-height) + var(--mobile-safe-bottom));
        padding-bottom: var(--mobile-safe-bottom);
        background: rgba(13, 21, 36, 0.88);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        z-index: 990;
        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.45);
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
      }

      [data-theme="light"] .wms-mobile-dock {
        background: rgba(255, 255, 255, 0.92);
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.08);
      }

      /* Dock Tab Buttons */
      .wms-dock-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        color: var(--text-muted);
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        background: transparent;
        border: none;
        padding: 4px 2px;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      .wms-dock-tab .dock-icon-box {
        position: relative;
        width: 32px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
        transition: transform 0.2s ease;
      }

      .wms-dock-tab .dock-label {
        font-size: 0.68rem;
        font-weight: 700;
        margin-top: 2px;
        letter-spacing: -0.02em;
        white-space: nowrap;
        transition: color 0.2s ease;
      }

      .wms-dock-badge {
        position: absolute;
        top: -2px;
        right: -6px;
        background: var(--primary);
        color: #ffffff;
        font-size: 0.6rem;
        font-weight: 800;
        min-width: 16px;
        height: 16px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        box-shadow: 0 2px 6px rgba(79, 70, 229, 0.5);
      }

      [dir="rtl"] .wms-dock-badge {
        right: auto;
        left: -6px;
      }

      .wms-dock-tab.active {
        color: var(--primary);
      }

      [data-theme="dark"] .wms-dock-tab.active {
        color: #818cf8;
      }

      .wms-dock-tab.active .dock-icon-box {
        transform: translateY(-2px) scale(1.12);
      }

      .wms-dock-tab.active .dock-label {
        font-weight: 900;
      }

      .wms-dock-tab.active::after {
        content: '';
        position: absolute;
        bottom: calc(var(--mobile-safe-bottom) + 3px);
        width: 18px;
        height: 3px;
        border-radius: 3px;
        background: var(--primary);
        box-shadow: 0 0 8px var(--primary);
      }

      /* Mobile Floating Action Button (FAB) */
      .wms-mobile-fab {
        display: none;
        position: fixed;
        bottom: calc(var(--mobile-nav-height) + var(--mobile-safe-bottom) + 16px);
        left: 20px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), #6366f1);
        color: #ffffff;
        border: none;
        box-shadow: 0 8px 24px rgba(79, 70, 229, 0.45), 0 0 0 2px rgba(255, 255, 255, 0.15);
        font-size: 1.6rem;
        cursor: pointer;
        z-index: 980;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }

      [dir="ltr"] .wms-mobile-fab {
        left: auto;
        right: 20px;
      }

      .wms-mobile-fab:active {
        transform: scale(0.92);
      }

      /* Mobile Quick Actions Bottom Sheet Menu */
      .wms-fab-menu {
        position: fixed;
        bottom: calc(var(--mobile-nav-height) + var(--mobile-safe-bottom) + 78px);
        left: 20px;
        background: var(--bg-card);
        border: var(--border-glass);
        border-radius: var(--radius-lg);
        padding: 0.6rem;
        box-shadow: var(--shadow-lg);
        z-index: 985;
        display: none;
        flex-direction: column;
        gap: 0.4rem;
        min-width: 200px;
        backdrop-filter: blur(16px);
      }

      [dir="ltr"] .wms-fab-menu {
        left: auto;
        right: 20px;
      }

      .wms-fab-menu.open {
        display: flex;
        animation: fabMenuIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes fabMenuIn {
        from { opacity: 0; transform: translateY(12px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .wms-fab-menu-btn {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.65rem 0.85rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        text-align: right;
        transition: background 0.15s ease;
      }

      [dir="ltr"] .wms-fab-menu-btn {
        text-align: left;
      }

      .wms-fab-menu-btn:active {
        background: var(--primary-light);
      }

      /* Modal Drag Handle for Mobile Bottom Sheets */
      .modal-drag-handle {
        display: none;
        width: 36px;
        height: 4px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.25);
        margin: 0 auto 12px;
      }

      [data-theme="light"] .modal-drag-handle {
        background: rgba(0, 0, 0, 0.2);
      }

      /* ======================================================================
         RESPONSIVE BREAKPOINT RULES (Screens <= 900px)
         ====================================================================== */
      @media (max-width: 900px) {
        /* Enable Mobile Dock & FAB */
        .wms-mobile-dock {
          display: flex !important;
        }

        .wms-mobile-fab {
          display: flex !important;
        }

        /* Pad Bottom of Main App Views to Prevent Navigation Overlap */
        .module-view {
          padding-bottom: calc(var(--mobile-nav-height) + var(--mobile-safe-bottom) + 32px) !important;
        }

        /* Mobile Header */
        .app-header {
          padding: 0 1rem !important;
          height: 64px !important;
        }

        .header-brand h1 {
          font-size: 1.05rem !important;
        }

        .brand-icon-sq {
          width: 34px !important;
          height: 34px !important;
          font-size: 1.1rem !important;
        }

        .header-actions {
          gap: 0.4rem !important;
        }

        .user-display-email {
          max-width: 90px !important;
          font-size: 0.72rem !important;
        }

        .user-access-tag {
          font-size: 0.65rem !important;
        }

        .lang-btn {
          padding: 0.25rem 0.5rem !important;
          font-size: 0.75rem !important;
        }

        /* HUD Cards Grid */
        .hud-grid {
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }

        .hud-hero {
          padding: 1.25rem 1rem !important;
        }

        .hud-hero h2 {
          font-size: 1.35rem !important;
        }

        /* KPI Metric Grid */
        .kpi-summary-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.6rem !important;
        }

        .kpi-card {
          padding: 0.85rem !important;
        }

        .kpi-card-val {
          font-size: 1.25rem !important;
        }

        /* Module Actions Bar */
        .module-actions-bar {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 0.65rem !important;
        }

        .actions-right, .actions-left {
          width: 100% !important;
          flex-wrap: wrap !important;
        }

        .actions-right .btn-primary,
        .actions-right .btn-secondary,
        .actions-left .btn-secondary {
          flex: 1 1 auto !important;
          justify-content: center !important;
          padding: 0.6rem 0.8rem !important;
        }

        /* Filter Controls Stack */
        .filter-controls-row {
          flex-direction: column !important;
          align-items: stretch !important;
        }

        .search-box-composite {
          min-width: 100% !important;
        }

        /* View Tabs (All / Slabs / Leftovers / Reservations) */
        .view-tabs-header {
          overflow-x: auto !important;
          white-space: nowrap !important;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px !important;
        }

        .view-tab-btn {
          padding: 0.5rem 0.85rem !important;
          font-size: 0.82rem !important;
        }

        /* Responsive Mobile Modals (Slide-up Bottom Sheet) */
        .modal-overlay {
          align-items: flex-end !important;
          padding: 0 !important;
        }

        .modal-content {
          width: 100% !important;
          max-width: 100% !important;
          max-height: 90vh !important;
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          border-top-left-radius: var(--radius-xl) !important;
          border-top-right-radius: var(--radius-xl) !important;
          padding: 1.25rem 1.25rem calc(var(--mobile-safe-bottom) + 1.25rem) !important;
          animation: slideUpSheet 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-drag-handle {
          display: block !important;
        }

        .form-row-2, .form-row-3 {
          grid-template-columns: 1fr !important;
          gap: 0.75rem !important;
        }

        /* Interactive Stepper Buttons (±1 / ±0.5) */
        .stepper-box {
          gap: 0.3rem !important;
        }

        .stepper-btn {
          min-width: 32px !important;
          height: 32px !important;
          font-size: 0.85rem !important;
          padding: 0 4px !important;
        }

        /* Table Card Responsive Optimization */
        .table-card {
          border-radius: var(--radius-md) !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch;
        }

        .wms-table th, .wms-table td {
          padding: 0.65rem 0.5rem !important;
          font-size: 0.82rem !important;
        }
      }

      /* Extra Small Screens (<= 480px) */
      @media (max-width: 480px) {
        .kpi-summary-grid {
          grid-template-columns: 1fr !important;
        }

        .user-info-text {
          display: none !important;
        }

        .user-profile-header-pill {
          padding: 0.3rem 0.4rem !important;
        }

        .auth-card.auth-hud-panel {
          padding: 1.35rem 1rem !important;
          margin: 0.5rem !important;
        }
      }
    `;

    document.head.appendChild(styleEl);
  }

  // Mobile Controller Engine (WMS_MOBILE)
  const WMS_MOBILE = {
    activeRoute: 'hud',
    isMenuOpen: false,

    init() {
      injectMobileStyles();
      this.createMobileDock();
      this.createFloatingActionButton();
      this.enhanceModalsWithHandles();
      this.attachResizeObserver();
      this.syncActiveRoute();
      this.updateDockBadges();
    },

    // Build the bottom navigation dock HTML
    createMobileDock() {
      if (document.getElementById('wms-mobile-dock')) return;

      const dock = document.createElement('nav');
      dock.id = 'wms-mobile-dock';
      dock.className = 'wms-mobile-dock';
      dock.setAttribute('aria-label', 'Mobile Navigation');

      dock.innerHTML = `
        <button class="wms-dock-tab active" data-route="hud" onclick="WMS_APP.navigate('hud')">
          <div class="dock-icon-box">🏛</div>
          <span class="dock-label" data-i18n="navHud">الرئيسية</span>
        </button>

        <button class="wms-dock-tab" data-route="porcelain" onclick="WMS_APP.navigate('porcelain')">
          <div class="dock-icon-box">
            🏺
            <span class="wms-dock-badge" id="dock-badge-porcelain">0</span>
          </div>
          <span class="dock-label" data-i18n="navPorcelain">بورسلان</span>
        </button>

        <button class="wms-dock-tab" data-route="marble" onclick="WMS_APP.navigate('marble')">
          <div class="dock-icon-box">
            💎
            <span class="wms-dock-badge" id="dock-badge-marble">0</span>
          </div>
          <span class="dock-label" data-i18n="navMarble">رخام</span>
        </button>

        <button class="wms-dock-tab" data-route="wood-delivery" onclick="WMS_APP.navigate('wood-delivery')">
          <div class="dock-icon-box">
            🪵
            <span class="wms-dock-badge" id="dock-badge-wood">0</span>
          </div>
          <span class="dock-label" data-i18n="navWood">خشب</span>
        </button>

        <button class="wms-dock-tab" data-route="marble-delivery" onclick="WMS_APP.navigate('marble-delivery')">
          <div class="dock-icon-box">
            🚚
            <span class="wms-dock-badge" id="dock-badge-marble-del">0</span>
          </div>
          <span class="dock-label" data-i18n="navMarbleDel">فسح رخام</span>
        </button>

        <button class="wms-dock-tab" data-route="field-service" onclick="WMS_APP.navigate('field-service')">
          <div class="dock-icon-box">
            🛠️
            <span class="wms-dock-badge" id="dock-badge-field-service">0</span>
          </div>
          <span class="dock-label" data-i18n="navFieldService">خدمة ميدانية</span>
        </button>
      `;

      document.body.appendChild(dock);
    },

    // Build Context-Aware Floating Action Button
    createFloatingActionButton() {
      if (document.getElementById('wms-mobile-fab')) return;

      const fab = document.createElement('button');
      fab.id = 'wms-mobile-fab';
      fab.className = 'wms-mobile-fab';
      fab.innerHTML = '⚡';
      fab.title = 'إجراءات سريعة';
      fab.onclick = (e) => {
        e.stopPropagation();
        this.toggleQuickMenu();
      };

      const menu = document.createElement('div');
      menu.id = 'wms-fab-menu';
      menu.className = 'wms-fab-menu';
      menu.innerHTML = `
        <button class="wms-fab-menu-btn" onclick="WMS_MOBILE.closeQuickMenu(); WMS_APP.openNewFieldServiceModal();">
          🛠️ <span>+ حجز موعد تركيب ميداني</span>
        </button>
        <button class="wms-fab-menu-btn" onclick="WMS_MOBILE.closeQuickMenu(); WMS_APP.openOrderReturnModal();">
          🔄 <span>+ توثيق ترجيع أوردر</span>
        </button>
        <button class="wms-fab-menu-btn" onclick="WMS_MOBILE.closeQuickMenu(); WMS_APP.openAddMaterialModal('porcelain');">
          🏺 <span>+ إضافة لوح بورسلان</span>
        </button>
        <button class="wms-fab-menu-btn" onclick="WMS_MOBILE.closeQuickMenu(); WMS_APP.openAddMaterialModal('marble');">
          💎 <span>+ إضافة لوح رخام</span>
        </button>
        <button class="wms-fab-menu-btn" onclick="WMS_MOBILE.closeQuickMenu(); WMS_APP.openAddWoodPermitModal();">
          🪵 <span>+ فسح خروج خشب</span>
        </button>
        <button class="wms-fab-menu-btn" onclick="WMS_MOBILE.closeQuickMenu(); WMS_APP.openAddMarblePermitModal();">
          🚚 <span>+ فسح خروج رخام</span>
        </button>
      `;

      document.body.appendChild(fab);
      document.body.appendChild(menu);

      // Close menu on outside tap
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#wms-mobile-fab') && !e.target.closest('#wms-fab-menu')) {
          this.closeQuickMenu();
        }
      });
    },

    toggleQuickMenu() {
      const menu = document.getElementById('wms-fab-menu');
      if (!menu) return;
      this.isMenuOpen = !this.isMenuOpen;
      menu.classList.toggle('open', this.isMenuOpen);
      const fab = document.getElementById('wms-mobile-fab');
      if (fab) fab.textContent = this.isMenuOpen ? '✕' : '⚡';
      this.triggerHaptic();
    },

    closeQuickMenu() {
      const menu = document.getElementById('wms-fab-menu');
      if (menu) menu.classList.remove('open');
      this.isMenuOpen = false;
      const fab = document.getElementById('wms-mobile-fab');
      if (fab) fab.textContent = '⚡';
    },

    // Add drag handles to all modal dialogs for bottom sheet feel
    enhanceModalsWithHandles() {
      document.querySelectorAll('.modal-overlay .modal-content').forEach(content => {
        if (!content.querySelector('.modal-drag-handle')) {
          const handle = document.createElement('div');
          handle.className = 'modal-drag-handle';
          content.insertBefore(handle, content.firstChild);
        }
      });
    },

    // Route changes notification
    onRouteChanged(route) {
      this.activeRoute = route || 'hud';
      this.syncActiveRoute();
      this.updateDockBadges();
      this.closeQuickMenu();
      this.triggerHaptic();

      // Scroll smoothly to top on mobile route change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // View rendered notification
    onViewRendered() {
      this.updateDockBadges();
      this.enhanceModalsWithHandles();
    },

    syncActiveRoute() {
      const tabs = document.querySelectorAll('.wms-dock-tab');
      tabs.forEach(tab => {
        const r = tab.getAttribute('data-route');
        const isActive = (r === this.activeRoute) || (r === 'porcelain' && this.activeRoute === 'porcelain-preview') || (r === 'marble' && this.activeRoute === 'marble-preview');
        tab.classList.toggle('active', isActive);
      });
    },

    updateRoleDock(role) {
      const normRole = (role || 'viewer').toLowerCase();
      const isProductionEngineer = (normRole === 'production_engineer' || normRole === 'owner' || normRole === 'admin');
      const isPorcelainSupervisor = (normRole === 'supervisor_porcelain');
      const isMarbleSupervisor = (normRole === 'supervisor_marble');
      const isFieldSupervisor = (normRole === 'supervisor_field');
      const isTechnician = (normRole === 'technician');
      const isViewer = (normRole === 'viewer');

      const tabs = document.querySelectorAll('.wms-dock-tab');
      tabs.forEach(tab => {
        const r = tab.getAttribute('data-route');
        if (r === 'hud') {
          tab.style.display = isProductionEngineer ? 'flex' : 'none';
        } else if (r === 'porcelain') {
          tab.style.display = (isProductionEngineer || isPorcelainSupervisor || isViewer) ? 'flex' : 'none';
        } else if (r === 'marble') {
          tab.style.display = (isProductionEngineer || isMarbleSupervisor || isViewer) ? 'flex' : 'none';
        } else if (r === 'wood-delivery' || r === 'marble-delivery') {
          tab.style.display = (isProductionEngineer || isFieldSupervisor || isViewer) ? 'flex' : 'none';
        } else if (r === 'field-service') {
          tab.style.display = (isProductionEngineer || isFieldSupervisor || isTechnician || isViewer) ? 'flex' : 'none';
        }
      });
    },

    updateDockBadges() {
      if (!window.WMS_DB) return;

      try {
        const porItems = window.WMS_DB.getItems({ category: 'porcelain' }) || [];
        const marItems = window.WMS_DB.getItems({ category: 'marble' }) || [];
        const woodOrders = window.WMS_DB.getWoodOrders() || [];
        const marOrders = window.WMS_DB.getMarbleOrders() || [];
        const fsAppointments = window.WMS_DB.getFieldServices() || [];

        const porBadge = document.getElementById('dock-badge-porcelain');
        const marBadge = document.getElementById('dock-badge-marble');
        const woodBadge = document.getElementById('dock-badge-wood');
        const marDelBadge = document.getElementById('dock-badge-marble-del');
        const fsBadge = document.getElementById('dock-badge-field-service');

        if (porBadge) porBadge.textContent = porItems.length;
        if (marBadge) marBadge.textContent = marItems.length;
        if (woodBadge) woodBadge.textContent = woodOrders.length;
        if (marDelBadge) marDelBadge.textContent = marOrders.length;
        if (fsBadge) {
          const active = fsAppointments.filter(a => a.status !== 'Completed' && a.status !== 'Returned').length;
          fsBadge.textContent = active;
        }
      } catch (e) {}
    },

    updateMobileHeader(user) {
      // Synchronize mobile header state
      const pill = document.getElementById('user-header-pill');
      if (!pill || !user) return;

      const email = user.email || user.username || '';
      const isOwner = (user.role === 'Owner' || user.isOwner || email.toLowerCase().trim() === 's@gmail.com');

      if (isOwner) {
        pill.classList.add('is-owner-role');
      } else {
        pill.classList.remove('is-owner-role');
      }
    },

    triggerHaptic() {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try { navigator.vibrate(12); } catch (e) {}
      }
    },

    attachResizeObserver() {
      window.addEventListener('resize', () => {
        this.updateDockBadges();
      }, { passive: true });
    }
  };

  // Export globally
  window.WMS_MOBILE = WMS_MOBILE;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WMS_MOBILE.init());
  } else {
    WMS_MOBILE.init();
  }
})();
