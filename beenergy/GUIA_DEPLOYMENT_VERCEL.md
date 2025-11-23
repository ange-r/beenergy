# Guía de Deployment en Vercel y Stellar Expert

## 📦 Parte 1: Deploy en Vercel

### Paso 1: Preparar el Repositorio

1. **Asegúrate de que tu código esté en GitHub**
   ```bash
   git add .
   git commit -m "Preparar para deploy en Vercel"
   git push origin ramaAra
   ```

### Paso 2: Configurar Vercel

1. **Ve a [vercel.com](https://vercel.com)** y crea una cuenta o inicia sesión

2. **Importa tu proyecto:**
   - Click en "Add New..." → "Project"
   - Conecta tu cuenta de GitHub
   - Selecciona tu repositorio `beenergy`

3. **Configura el proyecto:**
   - **Framework Preset:** Next.js (debería detectarse automáticamente)
   - **Root Directory:** `.` (raíz del proyecto)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (automático)

### Paso 3: Configurar Variables de Entorno

En Vercel, ve a **Settings → Environment Variables** y agrega:

```
PUBLIC_STELLAR_NETWORK=TESTNET
PUBLIC_STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

**Importante:** Estas variables estarán disponibles después de deployar tus contratos.

### Paso 4: Deploy

1. Click en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ¡Tu aplicación estará live! 🎉

### Paso 5: Configurar Contratos (Post-Deploy)

Después de deployar tus contratos inteligentes en Stellar Testnet, actualiza las variables de entorno en Vercel:

```
NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT=CA...
NEXT_PUBLIC_ENERGY_DISTRIBUTION_CONTRACT=CA...
NEXT_PUBLIC_MARKETPLACE_CONTRACT=CA...
NEXT_PUBLIC_COMMUNITY_GOVERNANCE_CONTRACT=CA...
```

Vercel re-deployará automáticamente tu aplicación.

---

## 🔍 Parte 2: Monitorear en Stellar Expert

### ¿Qué es Stellar Expert?

Stellar Expert es un explorador de blockchain que te permite ver:
- Transacciones en tiempo real
- Estado de contratos
- Balances de cuentas
- Historial de operaciones

### Acceder a Stellar Expert

**Para Testnet:**
```
https://stellar.expert/explorer/testnet
```

**Para Mainnet (cuando estés listo):**
```
https://stellar.expert/explorer/public
```

### Cómo Ver tus Transacciones

#### Opción 1: Por Dirección de Cuenta

1. Ve a https://stellar.expert/explorer/testnet
2. En la barra de búsqueda, pega tu dirección pública de Stellar (comienza con `G`)
3. Verás:
   - **Balance:** XLM y otros tokens
   - **Transactions:** Historial completo de transacciones
   - **Payments:** Pagos enviados y recibidos
   - **Trades:** Intercambios realizados

#### Opción 2: Por Hash de Transacción

Cuando realices una transacción en tu app, recibirás un transaction hash. Para verlo:

1. Copia el hash (ejemplo: `3c4b5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d`)
2. Pégalo en la barra de búsqueda de Stellar Expert
3. Verás todos los detalles de la transacción

#### Opción 3: Por Contrato

1. Busca la dirección de tu contrato (comienza con `C`)
2. Verás:
   - **Contract Code:** El código WASM deployado
   - **Contract Data:** Estado actual del contrato
   - **Invocations:** Todas las llamadas al contrato
   - **Events:** Eventos emitidos por el contrato

### Integrar Stellar Expert en tu App

Puedes agregar enlaces directos a Stellar Expert desde tu aplicación:

```typescript
// En tu componente de transacciones
const stellarExpertUrl = (txHash: string) => {
  const network = process.env.PUBLIC_STELLAR_NETWORK === 'TESTNET' ? 'testnet' : 'public';
  return `https://stellar.expert/explorer/${network}/tx/${txHash}`;
};

// Usar en tu UI
<a
  href={stellarExpertUrl(transaction.hash)}
  target="_blank"
  rel="noopener noreferrer"
>
  Ver en Stellar Expert
</a>
```

### Ejemplo: Monitorear tu Marketplace

1. **Cuando alguien compra energía:**
   - La transacción aparecerá en tiempo real en Stellar Expert
   - Verás la transferencia de tokens BeEnergy
   - Verás el pago en XLM

2. **Para ver el estado del marketplace:**
   - Busca tu contrato `NEXT_PUBLIC_MARKETPLACE_CONTRACT`
   - Ve a la pestaña "Contract Data"
   - Verás todas las ofertas activas

### Tips Útiles

1. **Guardar direcciones importantes:**
   - Tu cuenta principal
   - Direcciones de contratos
   - Cuentas de prueba

2. **Usar filtros:**
   - Filtra por tipo de operación (payments, trades, etc.)
   - Filtra por rango de fechas

3. **Monitorear eventos:**
   - Los eventos de contratos te muestran qué está pasando internamente
   - Útil para debugging

---

## 🚀 Flujo Completo: De Local a Producción

### 1. Desarrollo Local
```bash
npm run dev
# Usa red LOCAL con contratos locales
```

### 2. Deploy Contratos a Testnet
```bash
# Deployar contratos
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/energy_token.wasm --network testnet
# Guardar las direcciones de contratos
```

### 3. Actualizar Variables de Entorno en Vercel
- Agregar las direcciones de contratos deployados
- Vercel re-deploya automáticamente

### 4. Probar en Vercel
- Conectar wallet (Freighter configurada en Testnet)
- Realizar transacciones
- Ver en Stellar Expert

### 5. Monitorear
- Stellar Expert para ver transacciones
- Vercel Analytics para ver usuarios
- Logs de Vercel para debugging

---

## 📊 URLs Importantes

### Vercel
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs

### Stellar
- Stellar Expert Testnet: https://stellar.expert/explorer/testnet
- Laboratory (para probar): https://laboratory.stellar.org
- Stellar Docs: https://developers.stellar.org

### Herramientas
- Freighter Wallet: https://freighter.app
- Stellar CLI Docs: https://developers.stellar.org/docs/tools/cli

---

## ❓ Solución de Problemas

### Error: "Build Failed"
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel

### Error: "Can't connect to wallet"
- Verifica que Freighter esté configurada en Testnet
- Verifica las variables de entorno en Vercel

### No veo transacciones en Stellar Expert
- Verifica que estés en el network correcto (testnet vs mainnet)
- Verifica que la dirección sea correcta
- Dale unos segundos para que se propague

---

## 🎯 Próximos Pasos

1. ✅ Deploy en Vercel
2. ✅ Configurar variables de entorno
3. ⏳ Deployar contratos en Testnet
4. ⏳ Actualizar direcciones de contratos
5. ⏳ Probar transacciones
6. ⏳ Monitorear en Stellar Expert
7. ⏳ Cuando esté listo → Mainnet

---

¿Necesitas ayuda? Revisa los logs en:
- Vercel: Dashboard → tu proyecto → Deployments → Logs
- Stellar: Stellar Expert → busca tu transacción → Details
