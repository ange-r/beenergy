(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/beenergy/frontend/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data para demo de BeEnergy
__turbopack_context__.s([
    "generateIdenticon",
    ()=>generateIdenticon,
    "mockConsumption",
    ()=>mockConsumption,
    "mockOffers",
    ()=>mockOffers,
    "mockStock",
    ()=>mockStock,
    "mockTransactions",
    ()=>mockTransactions,
    "mockUser",
    ()=>mockUser
]);
const mockUser = {
    address: "G4K2VXNJ5WQRTHGFDSAPLMNBVCXZAQWERTYUIOP9X9B1",
    shortAddress: "G4K2...X9B1",
    balance: 1234,
    balanceUSD: 520,
    stockKwh: 87.5,
    consumptionThisMonth: 142.3
};
const mockConsumption = [
    {
        day: "Lun",
        kwh: 18
    },
    {
        day: "Mar",
        kwh: 22
    },
    {
        day: "Mié",
        kwh: 20
    },
    {
        day: "Jue",
        kwh: 25
    },
    {
        day: "Vie",
        kwh: 19
    },
    {
        day: "Sáb",
        kwh: 15
    },
    {
        day: "Dom",
        kwh: 23
    }
];
const mockStock = [
    {
        day: "Lun",
        kwh: 82
    },
    {
        day: "Mar",
        kwh: 84
    },
    {
        day: "Mié",
        kwh: 86
    },
    {
        day: "Jue",
        kwh: 85
    },
    {
        day: "Vie",
        kwh: 87
    },
    {
        day: "Sáb",
        kwh: 88
    },
    {
        day: "Dom",
        kwh: 87.5
    }
];
const mockTransactions = [
    {
        id: 1,
        type: "compra",
        description: "Compra de energía",
        amount: "+25 kWh",
        time: "Hace 2h",
        icon: "success"
    },
    {
        id: 2,
        type: "venta",
        description: "Venta al mercado",
        amount: "-10 kWh",
        time: "Hace 5h",
        icon: "send"
    },
    {
        id: 3,
        type: "consumo",
        description: "Consumo doméstico",
        amount: "-8 kWh",
        time: "Hace 1d",
        icon: "zap"
    }
];
const mockOffers = [
    {
        id: 1,
        seller: "G7Y3KML4RTH8PLQW5XN9ZV2F6J1K4L2",
        sellerShort: "G7Y3...K4L2",
        amount: 50,
        pricePerKwh: 0.5,
        total: 25
    },
    {
        id: 2,
        seller: "F2M8PQW3NRT6YKL9XHV1ZJ4C5B7A8D9",
        sellerShort: "F2M8...A8D9",
        amount: 30,
        pricePerKwh: 0.48,
        total: 14.4
    },
    {
        id: 3,
        seller: "H4K9LXC2VBN7TQW6PMZ3RF1J8Y5M4N3",
        sellerShort: "H4K9...M4N3",
        amount: 75,
        pricePerKwh: 0.52,
        total: 39
    },
    {
        id: 4,
        seller: "P6R1WQX4JKL9NVB2THY8MZC5F3G7D2K",
        sellerShort: "P6R1...D2K",
        amount: 40,
        pricePerKwh: 0.49,
        total: 19.6
    },
    {
        id: 5,
        seller: "M3N7YFG9QWX2PKL6RHV4JZC1TB8D5N9",
        sellerShort: "M3N7...D5N9",
        amount: 60,
        pricePerKwh: 0.51,
        total: 30.6
    },
    {
        id: 6,
        seller: "L8T4VXN2HKW9JPQ5RMY6FCZ3GB1D7K4",
        sellerShort: "L8T4...D7K4",
        amount: 45,
        pricePerKwh: 0.47,
        total: 21.15
    }
];
function generateIdenticon(address) {
    // Genera un color basado en el hash del address
    let hash = 0;
    for(let i = 0; i < address.length; i++){
        hash = address.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 55%)`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/beenergy/frontend/lib/wallet-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletProvider",
    ()=>WalletProvider,
    "useWallet",
    ()=>useWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/lib/mock-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const WalletContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function WalletProvider({ children }) {
    _s();
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shortAddress, setShortAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userProfile, setUserProfileState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFreighterInstalled, setIsFreighterInstalled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            // Check if Freighter is installed
            const checkFreighter = {
                "WalletProvider.useEffect.checkFreighter": async ()=>{
                    const installed = ("TURBOPACK compile-time value", "object") !== "undefined" && "freighter" in window;
                    setIsFreighterInstalled(installed);
                }
            }["WalletProvider.useEffect.checkFreighter"];
            checkFreighter();
            const savedProfile = localStorage.getItem("userProfile");
            const savedAddress = localStorage.getItem("walletAddress");
            if (savedProfile && savedAddress) {
                try {
                    setUserProfileState(JSON.parse(savedProfile));
                    setAddress(savedAddress);
                    setShortAddress(`${savedAddress.slice(0, 6)}...${savedAddress.slice(-4)}`);
                    setIsConnected(true);
                } catch (e) {
                    console.error("Error loading saved state:", e);
                    localStorage.removeItem("userProfile");
                    localStorage.removeItem("walletAddress");
                }
            }
        }
    }["WalletProvider.useEffect"], []);
    const connectWallet = async ()=>{
        try {
            // Simular verificación de Freighter
            if (Math.random() < 0.1) {
                // 10% chance de error para demostrar manejo
                throw new Error("No se pudo conectar con Freighter. Por favor, asegúrate de tener la extensión instalada.");
            }
            // Simular tiempo de conexión
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            setAddress(__TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUser"].address);
            setShortAddress(__TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUser"].shortAddress);
            setIsConnected(true);
            localStorage.setItem("walletAddress", __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUser"].address);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            // Re-throw the error so the modal can catch it
            throw error;
        }
    };
    const disconnectWallet = ()=>{
        setAddress(null);
        setShortAddress(null);
        setIsConnected(false);
        setUserProfileState(null);
        localStorage.removeItem("userProfile");
        localStorage.removeItem("walletAddress");
    };
    const setUserProfile = (profile)=>{
        setUserProfileState(profile);
        localStorage.setItem("userProfile", JSON.stringify(profile));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletContext.Provider, {
        value: {
            isConnected,
            address,
            shortAddress,
            userProfile,
            connectWallet,
            disconnectWallet,
            setUserProfile,
            isFreighterInstalled
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/beenergy/frontend/lib/wallet-context.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(WalletProvider, "UsJe0Hb761UhSTdKKbRhZF/Awlg=");
_c = WalletProvider;
function useWallet() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
_s1(useWallet, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "WalletProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/beenergy/frontend/lib/theme-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const savedTheme = localStorage.getItem("beenergy-theme");
            if (savedTheme) {
                setTheme(savedTheme);
                document.documentElement.classList.toggle("dark", savedTheme === "dark");
            } else {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const initialTheme = prefersDark ? "dark" : "light";
                setTheme(initialTheme);
                document.documentElement.classList.toggle("dark", prefersDark);
            }
        }
    }["ThemeProvider.useEffect"], []);
    const toggleTheme = ()=>{
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("beenergy-theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/beenergy/frontend/lib/theme-context.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, this);
}
_s(ThemeProvider, "lm84LOZxHN0YC4jzvAwAP/18Sno=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/beenergy/frontend/lib/i18n-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useI18n",
    ()=>useI18n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/beenergy/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const translations = {
    es: {
        // Landing Page
        "landing.title": "BeEnergy",
        "landing.subtitle": "Energía limpia, más económica y totalmente transparente. Genera, usa y comparte energía en tu comunidad: sin burocracia, sin complicaciones, sin depender del sistema tradicional.",
        "landing.start": "Únete",
        "landing.connectWallet": "Conectar Wallet",
        "landing.feature.generate.title": "Genera",
        "landing.feature.generate.description": "Únete a instalaciones solares compartidas con tu comunidad. Tu comunidad produce su propia energía y cada hogar recibe automáticamente su parte.s",
        "landing.feature.trade.title": "Comercializa",
        "landing.feature.trade.description": "Si te sobra energía, la vendes. Si necesitas más, la compras. Un mercado directo entre vecinos: sin intermediarios, precios justos.",
        "landing.feature.manage.title": "Gestiona",
        "landing.feature.manage.description": "Si te sobra energía, la vendes. Si necesitas más, la compras. Un mercado directo entre vecinos: sin intermediarios, precios justos.",
        "landing.footer.docs": "Documentación",
        "landing.footer.powered": "Powered by Stellar",
        // Dashboard
        "dashboard.welcome": "Bienvenido,",
        "dashboard.balance": "Balance",
        "dashboard.availableKwh": "kWh Disponibles",
        "dashboard.consumption": "Consumo Noviembre",
        "dashboard.last7days": "Últimos 7 días",
        "dashboard.quickActions": "Acciones Rápidas",
        "dashboard.buyEnergy": "Comprar Energía",
        "dashboard.sellEnergy": "Vender Energía",
        "dashboard.viewHistory": "Ver Historial",
        "dashboard.recentActivity": "Actividad Reciente",
        "dashboard.recentTransactions": "Últimas transacciones",
        "dashboard.viewAll": "Ver todo",
        "dashboard.swap": "Swap → HDROP",
        // Marketplace
        "marketplace.title": "Marketplace Comunitario",
        "marketplace.availableKwh": "kWh disponibles:",
        "marketplace.createOffer": "Crear Oferta",
        "marketplace.buy": "Comprar",
        "marketplace.createModal.title": "Crear Nueva Oferta",
        "marketplace.createModal.description": "Vende tu energía excedente al marketplace",
        "marketplace.createModal.amount": "Cantidad de kWh",
        "marketplace.createModal.available": "Disponible:",
        "marketplace.createModal.price": "Precio por kWh (XLM)",
        "marketplace.createModal.totalReceive": "Total a recibir",
        "marketplace.createModal.cancel": "Cancelar",
        "marketplace.createModal.publish": "Publicar Oferta",
        "marketplace.buyModal.title": "Confirmar Compra",
        "marketplace.buyModal.description": "Revisa los detalles de tu transacción",
        "marketplace.buyModal.seller": "Vendedor:",
        "marketplace.buyModal.quantity": "Cantidad:",
        "marketplace.buyModal.unitPrice": "Precio unitario:",
        "marketplace.buyModal.totalPay": "Total a pagar",
        "marketplace.buyModal.confirm": "Confirmar Compra",
        // Wallet Confirmation Modal
        "wallet.title": "Conectar Wallet",
        "wallet.subtitle": "Autorización requerida",
        "wallet.permissions": "Permisos solicitados:",
        "wallet.permission1": "Ver tu dirección pública de Stellar",
        "wallet.permission2": "Consultar tu balance de tokens BeEnergy",
        "wallet.permission3": "Solicitar firma para transacciones",
        "wallet.security.title": "Tu seguridad es nuestra prioridad",
        "wallet.security.description": "BeEnergy nunca te pedirá tu clave privada ni podrá realizar transacciones sin tu confirmación explícita.",
        "wallet.error.title": "Error de conexión",
        "wallet.error.message": "No se pudo conectar a la wallet",
        "wallet.cancel": "Cancelar",
        "wallet.authorize": "Autorizar",
        "wallet.connecting": "Conectando...",
        // Profile Setup Modal
        "profile.title": "Configura tu Perfil",
        "profile.subtitle": "Personaliza tu experiencia",
        "profile.avatar": "Foto de Perfil",
        "profile.uploadPhoto": "Subir Foto",
        "profile.remove": "Quitar",
        "profile.optional": "Opcional - puedes añadirla más tarde",
        "profile.name": "Nombre",
        "profile.namePlaceholder": "¿Cómo te gustaría que te llamemos?",
        "profile.continue": "Continuar",
        "profile.pageTitle": "Mi Perfil",
        "profile.pageDescription": "Gestiona tu información personal",
        "profile.personalInfo": "Información Personal",
        "profile.walletAddress": "Dirección de Wallet",
        "profile.saveChanges": "Guardar Cambios",
        "profile.saving": "Guardando...",
        // Success Modal
        "success.title": "¡Transacción Exitosa!",
        "success.purchase": "Has comprado",
        "success.sale": "Has vendido",
        "success.transaction": "Tu transacción se ha procesado correctamente en la red Stellar",
        "success.close": "Cerrar",
        // Sidebar
        "sidebar.dashboard": "Dashboard",
        "sidebar.marketplace": "Marketplace",
        "sidebar.activity": "Actividad Reciente",
        "sidebar.consumption": "Historial de Consumo",
        "sidebar.settings": "Configuración",
        "sidebar.disconnect": "Desconectar",
        // Activity Page
        "activity.description": "Historial de transacciones de compra y venta",
        "activity.purchases": "Compras Recientes",
        "activity.purchasesDescription": "Últimos 2 meses",
        "activity.sales": "Ventas Recientes",
        "activity.salesDescription": "Últimos 2 meses",
        "activity.lastTwoMonths": "Visualiza tus transacciones de los últimos 2 meses",
        "activity.noPurchases": "No hay compras registradas en los últimos 2 meses",
        "activity.noSales": "No hay ventas registradas en los últimos 2 meses",
        "activity.selectMonth": "Seleccionar mes",
        "activity.selectYear": "Seleccionar año",
        "activity.allMonths": "Todos los meses",
        "activity.allYears": "Todos los años",
        "activity.january": "Enero",
        "activity.february": "Febrero",
        "activity.march": "Marzo",
        "activity.april": "Abril",
        "activity.may": "Mayo",
        "activity.june": "Junio",
        "activity.july": "Julio",
        "activity.august": "Agosto",
        "activity.september": "Septiembre",
        "activity.october": "Octubre",
        "activity.november": "Noviembre",
        "activity.december": "Diciembre",
        "activity.noTransactions": "No hay transacciones registradas",
        // Consumption Page
        "consumption.description": "Historial de consumo energético desde el inicio",
        "consumption.total": "consumidos",
        // Common
        "common.back": "Volver"
    },
    en: {
        // Landing Page
        "landing.title": "Tokenized Green Energy",
        "landing.subtitle": "Clean energy, cheaper and fully transparent. Generate, use, and share energy within your community — no bureaucracy, no complications, no dependence on the traditional system.",
        "landing.start": "Get Started",
        "landing.connectWallet": "Connect Wallet",
        "landing.feature.generate.title": "Generate",
        "landing.feature.generate.description": "Join shared solar installations with your community.Your community produces its own energy, and each home automatically receives its share.",
        "landing.feature.trade.title": "Trade",
        "landing.feature.trade.description": "If you have extra energy, you sell. If you need more, you buy. A direct marketplace between neighbors — no middlemen, fair prices.",
        "landing.feature.manage.title": "Manage",
        "landing.feature.manage.description": "If you have extra energy, you sell. If you need more, you buy. A direct marketplace between neighbors — no middlemen, fair prices.",
        "landing.footer.docs": "Documentation",
        "landing.footer.powered": "Powered by Stellar",
        // Dashboard
        "dashboard.welcome": "Welcome,",
        "dashboard.balance": "Balance",
        "dashboard.availableKwh": "Available kWh",
        "dashboard.consumption": "November Consumption",
        "dashboard.last7days": "Last 7 days",
        "dashboard.quickActions": "Quick Actions",
        "dashboard.buyEnergy": "Buy Energy",
        "dashboard.sellEnergy": "Sell Energy",
        "dashboard.viewHistory": "View History",
        "dashboard.recentActivity": "Recent Activity",
        "dashboard.recentTransactions": "Recent transactions",
        "dashboard.viewAll": "View all",
        "dashboard.swap": "Swap → HDROP",
        // Marketplace
        "marketplace.title": "Community Marketplace",
        "marketplace.availableKwh": "Available kWh:",
        "marketplace.createOffer": "Create Offer",
        "marketplace.buy": "Buy",
        "marketplace.createModal.title": "Create New Offer",
        "marketplace.createModal.description": "Sell your excess energy to the marketplace",
        "marketplace.createModal.amount": "kWh Amount",
        "marketplace.createModal.available": "Available:",
        "marketplace.createModal.price": "Price per kWh (XLM)",
        "marketplace.createModal.totalReceive": "Total to receive",
        "marketplace.createModal.cancel": "Cancel",
        "marketplace.createModal.publish": "Publish Offer",
        "marketplace.buyModal.title": "Confirm Purchase",
        "marketplace.buyModal.description": "Review your transaction details",
        "marketplace.buyModal.seller": "Seller:",
        "marketplace.buyModal.quantity": "Quantity:",
        "marketplace.buyModal.unitPrice": "Unit price:",
        "marketplace.buyModal.totalPay": "Total to pay",
        "marketplace.buyModal.confirm": "Confirm Purchase",
        // Wallet Confirmation Modal
        "wallet.title": "Connect Wallet",
        "wallet.subtitle": "Authorization required",
        "wallet.permissions": "Requested permissions:",
        "wallet.permission1": "View your Stellar public address",
        "wallet.permission2": "Check your BeEnergy token balance",
        "wallet.permission3": "Request signature for transactions",
        "wallet.security.title": "Your security is our priority",
        "wallet.security.description": "BeEnergy will never ask for your private key or make transactions without your explicit confirmation.",
        "wallet.error.title": "Connection error",
        "wallet.error.message": "Could not connect to wallet",
        "wallet.cancel": "Cancel",
        "wallet.authorize": "Authorize",
        "wallet.connecting": "Connecting...",
        // Profile Setup Modal
        "profile.title": "Setup Your Profile",
        "profile.subtitle": "Personalize your experience",
        "profile.avatar": "Profile Picture",
        "profile.uploadPhoto": "Upload Photo",
        "profile.remove": "Remove",
        "profile.optional": "Optional - you can add it later",
        "profile.name": "Name",
        "profile.namePlaceholder": "What would you like to be called?",
        "profile.continue": "Continue",
        "profile.pageTitle": "My Profile",
        "profile.pageDescription": "Manage your personal information",
        "profile.personalInfo": "Personal Information",
        "profile.walletAddress": "Wallet Address",
        "profile.saveChanges": "Save Changes",
        "profile.saving": "Saving...",
        // Success Modal
        "success.title": "Transaction Successful!",
        "success.purchase": "You have purchased",
        "success.sale": "You have sold",
        "success.transaction": "Your transaction has been successfully processed on the Stellar network",
        "success.close": "Close",
        // Sidebar
        "sidebar.dashboard": "Dashboard",
        "sidebar.marketplace": "Marketplace",
        "sidebar.activity": "Recent Activity",
        "sidebar.consumption": "Consumption History",
        "sidebar.settings": "Settings",
        "sidebar.disconnect": "Disconnect",
        // Activity Page
        "activity.description": "Transaction history of purchases and sales",
        "activity.purchases": "Recent Purchases",
        "activity.purchasesDescription": "Last 2 months",
        "activity.sales": "Recent Sales",
        "activity.salesDescription": "Last 2 months",
        "activity.lastTwoMonths": "View your transactions from the last 2 months",
        "activity.noPurchases": "No purchases recorded in the last 2 months",
        "activity.noSales": "No sales recorded in the last 2 months",
        "activity.selectMonth": "Select month",
        "activity.selectYear": "Select year",
        "activity.allMonths": "All months",
        "activity.allYears": "All years",
        "activity.january": "January",
        "activity.february": "February",
        "activity.march": "March",
        "activity.april": "April",
        "activity.may": "May",
        "activity.june": "June",
        "activity.july": "July",
        "activity.august": "August",
        "activity.september": "September",
        "activity.october": "October",
        "activity.november": "November",
        "activity.december": "December",
        "activity.noTransactions": "No transactions recorded",
        // Consumption Page
        "consumption.description": "Energy consumption history from the beginning",
        "consumption.total": "consumed",
        // Common
        "common.back": "Back"
    }
};
function I18nProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("es");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            const savedLang = localStorage.getItem("language");
            if (savedLang && (savedLang === "es" || savedLang === "en")) {
                setLanguageState(savedLang);
            }
        }
    }["I18nProvider.useEffect"], []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };
    const t = (key)=>{
        return translations[language][key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/beenergy/frontend/lib/i18n-context.tsx",
        lineNumber: 303,
        columnNumber: 10
    }, this);
}
_s(I18nProvider, "kySwjjRWfaPH8NuUv4uZYMYn37c=");
_c = I18nProvider;
function useI18n() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$beenergy$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
}
_s1(useI18n, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=beenergy_frontend_lib_b373f221._.js.map