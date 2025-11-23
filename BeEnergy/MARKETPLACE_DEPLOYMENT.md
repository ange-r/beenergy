# 🛍️ Guía de Deployment del Marketplace con USDC

Esta guía te ayudará a deployar el contrato de Marketplace y configurar USDC en BeEnergy.

---

## 📋 Pasos para Deploy

### 1️⃣ **Build del Contrato de Marketplace**

```bash
# Desde la raíz del proyecto
stellar contract build

# Verifica que se creó el WASM
ls target/wasm32-unknown-unknown/release/energy_marketplace.wasm
```

### 2️⃣ **Deploy en Testnet**

```bash
# Deployar el contrato de marketplace
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/energy_marketplace.wasm \
  --network testnet \
  --source-account ADMIN

# Guarda la dirección que devuelve, ejemplo:
# CEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3️⃣ **Inicializar el Contrato**

```bash
# Obtener las direcciones de los contratos necesarios
MARKETPLACE_CONTRACT="CEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
HDROP_CONTRACT="CBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"  # Tu token HDROP
USDC_CONTRACT=""  # USDC en testnet (ver abajo)
ADMIN_ADDRESS="GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# Inicializar marketplace
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  --source-account ADMIN \
  -- \
  initialize \
  --admin $ADMIN_ADDRESS \
  --hdrop_contract $HDROP_CONTRACT \
  --usdc_contract $USDC_CONTRACT
```

---

## 💰 Configurar USDC en Testnet

### **Opción A: Usar USDC Oficial de Circle (Testnet)**

Circle provee USDC en Stellar Testnet para desarrollo:

```bash
# Asset Code: USDC
# Issuer: GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5

# Agregar trustline a USDC en tu wallet
stellar asset set-trust \
  --asset USDC:GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5 \
  --network testnet \
  --source-account TU_CUENTA

# Obtener USDC de prueba (friendbot de Circle)
# Visita: https://developers.circle.com/stablecoins/docs/usdc-on-test-networks
```

### **Opción B: Crear Tu Propio Token USDC de Prueba**

Si quieres control total para testing:

```bash
# 1. Crear cuenta emisora de USDC
stellar keys generate USDC_ISSUER

# 2. Fondear la cuenta
stellar keys fund USDC_ISSUER --network testnet

# 3. Deployar contrato de token
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm \
  --network testnet \
  --source-account USDC_ISSUER

# 4. Inicializar como USDC
stellar contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  --source-account USDC_ISSUER \
  -- \
  initialize \
  --admin <USDC_ISSUER_ADDRESS> \
  --decimal 7 \
  --name "USD Coin (Test)" \
  --symbol "USDC"
```

---

## ⚙️ Actualizar Variables de Entorno

Crea `.env.local` con las direcciones deployadas:

```env
# Stellar Network
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org

# Contratos
NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT=CBXXXXX...  # Tu HDROP
NEXT_PUBLIC_ENERGY_DISTRIBUTION_CONTRACT=CCXXXXX...
NEXT_PUBLIC_MARKETPLACE_CONTRACT=CEXXXXX...  # ← Marketplace nuevo
NEXT_PUBLIC_USDC_CONTRACT=CGXXXXX...  # ← USDC

# Admin
NEXT_PUBLIC_ADMIN_ADDRESS=GBXXXXX...
```

---

## 🧪 Testing del Marketplace

### **1. Crear una Oferta**

```bash
# Ejemplo: Vender 50 kWh a 0.50 USDC/kWh
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  --source-account SELLER \
  -- \
  create_offer \
  --seller $SELLER_ADDRESS \
  --energy_amount 500000000 \  # 50 kWh con 7 decimales
  --price_per_kwh 5000000      # 0.50 USDC con 7 decimales
```

### **2. Ver Ofertas Activas**

```bash
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  -- \
  get_active_offers
```

### **3. Comprar Energía**

```bash
# Comprador debe tener USDC primero
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  --source-account BUYER \
  -- \
  buy_with_usdc \
  --buyer $BUYER_ADDRESS \
  --offer_id 0
```

---

## 🔗 Integración con Frontend

El frontend ya está configurado para usar el marketplace. Solo necesitas:

1. ✅ Actualizar `.env.local` con las direcciones
2. ✅ Restart del servidor Next.js: `npm run dev`
3. ✅ Conectar tu wallet (Freighter)
4. ✅ Agregar trustline a USDC en tu wallet
5. ✅ Ir a `/marketplace` y probar

---

## 📊 Verificar Estado del Contrato

```bash
# Ver si el marketplace está inicializado
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  -- \
  get_admin

# Ver contrato HDROP configurado
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  -- \
  get_hdrop_contract

# Ver contrato USDC configurado
stellar contract invoke \
  --id $MARKETPLACE_CONTRACT \
  --network testnet \
  -- \
  get_usdc_contract
```

---

## 🚨 Troubleshooting

### Error: "Insufficient Balance"
- Verifica que el vendedor tenga suficientes tokens HDROP
- Usa: `stellar contract invoke --id $HDROP_CONTRACT -- balance --id $SELLER_ADDRESS`

### Error: "Insufficient USDC"
- El comprador necesita USDC en su wallet
- Agrega trustline y obtén USDC de prueba

### Error: "Contract not initialized"
- Ejecuta el paso de inicialización del marketplace

### Frontend no conecta
- Verifica que `.env.local` tenga las direcciones correctas
- Restart del servidor: `npm run dev`

---

## 📚 Recursos

- [Stellar SDK Docs](https://stellar.github.io/js-stellar-sdk/)
- [Soroban Docs](https://soroban.stellar.org/docs)
- [Circle USDC en Testnet](https://developers.circle.com/stablecoins/docs/usdc-on-test-networks)
- [Stellar Expert (Explorer)](https://stellar.expert/explorer/testnet)

---

**¡Listo para vender energía con USDC! 💚⚡**
