# 🚀 Instrucciones de Setup - BeEnergy Frontend

## ✅ Lo que ya está hecho

He integrado completamente el frontend Next.js con el backend de Stellar. Esto es lo que se ha completado:

### 1. **Imágenes Configuradas** ✅
- ✅ Logo (`logo.png`) copiado a `/public/`
- ✅ Imagen principal (`hero-image.png`) copiada a `/public/`
- ✅ Landing page actualizada con el nuevo logo
- ✅ Header actualizado con el logo en todas las páginas

### 2. **Dependencias de Stellar Instaladas** ✅
```json
"@creit.tech/stellar-wallets-kit": "^1.9.5"
"@stellar/stellar-sdk": "^14.2.0"
"@stellar/stellar-xdr-json": "^23.0.0"
"@tanstack/react-query": "^5.90.2"
```

### 3. **Providers Creados** ✅
- ✅ `StellarWalletProvider` - Conexión real con Freighter y otras wallets de Stellar
- ✅ Integrado en `app/layout.tsx`
- ✅ Compatible con el código existente

### 4. **Hooks de Contratos** ✅

**`useEnergyToken()`**
- `getBalance()` - Obtener balance de $ENERGY tokens
- `transfer()` - Transferir tokens a otra dirección
- `burnEnergy()` - Quemar tokens al consumir energía

**`useEnergyDistribution()`**
- `getMemberInfo()` - Ver % de propiedad del usuario
- `getTotalGenerated()` - Total kWh generados por la comunidad
- `recordGeneration()` - Registrar nueva generación (solo admin)
- `recordPrivateConsumption()` - Registro privado con ZK commitment

### 5. **Configuración de Contratos** ✅
- ✅ Archivo `lib/contracts-config.ts` creado
- ✅ Variables de entorno configuradas en `.env.local`
- ✅ Listo para recibir las direcciones de los contratos

---

## 🔧 Próximos Pasos (Para Ti)

### **Paso 1: Instalar Dependencias**

Abre una terminal en el directorio del Frontend:

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Frontend
npm install
```

Esto instalará todas las dependencias de Stellar que agregué al `package.json`.

---

### **Paso 2: Desplegar los Contratos (Si aún no lo hiciste)**

Ve al backend y despliega los contratos:

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy

# Opción A: Usar el script
.\deploy-testnet.ps1

# Opción B: Usar stellar CLI manualmente
stellar contract build
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/energy_token.wasm --network testnet --source-account ADMIN
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/energy_distribution.wasm --network testnet --source-account ADMIN
```

**IMPORTANTE:** Guarda las direcciones (IDs) de los contratos que se generen. Se verán así:
```
CBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

### **Paso 3: Actualizar Variables de Entorno**

Abre el archivo `.env.local` en el Frontend y pega las direcciones de tus contratos:

```env
# Contract Addresses (Reemplaza con tus direcciones deployadas)
NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT=CB__TU_ADDRESS_AQUI__
NEXT_PUBLIC_ENERGY_DISTRIBUTION_CONTRACT=CC__TU_ADDRESS_AQUI__
NEXT_PUBLIC_COMMUNITY_GOVERNANCE_CONTRACT=CD__TU_ADDRESS_AQUI__  # Opcional por ahora

# Tu dirección de admin
NEXT_PUBLIC_ADMIN_ADDRESS=GB__TU_ADDRESS_AQUI__
```

**Dónde encontrar estas direcciones:**
- En el output del script de deploy
- En el archivo `.env` o `.env.deployed` del backend
- Ejecutando: `stellar contract id asset --asset-code HDROP --network testnet`

---

### **Paso 4: Instalar Freighter Wallet**

1. Ve a https://www.freighter.app/
2. Instala la extensión en tu navegador (Chrome/Firefox/Brave)
3. Crea una cuenta o importa una existente
4. **IMPORTANTE:** Cambia a **Testnet** en las configuraciones de Freighter
5. Obtén XLM de testnet gratuito: https://laboratory.stellar.org/#account-creator

---

### **Paso 5: Inicializar los Contratos (Solo Primera Vez)**

Después de deployar, necesitas inicializar los contratos. Puedes hacerlo desde el backend o con stellar CLI:

```bash
# Inicializar el token
stellar contract invoke \
  --id TU_TOKEN_CONTRACT_ID \
  --network testnet \
  --source-account ADMIN \
  -- \
  __constructor \
  --admin TU_ADDRESS \
  --distribution_contract TU_DISTRIBUTION_CONTRACT_ID \
  --initial_supply 0

# Inicializar distribución
stellar contract invoke \
  --id TU_DISTRIBUTION_CONTRACT_ID \
  --network testnet \
  --source-account ADMIN \
  -- \
  initialize \
  --admin TU_ADDRESS \
  --token_contract TU_TOKEN_CONTRACT_ID \
  --required_approvals 3
```

O más fácil: usa las funciones del backend que ya existen para esto.

---

### **Paso 6: Ejecutar el Frontend**

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Frontend
npm run dev
```

Abre tu navegador en http://localhost:3000

---

## 🧪 Probar la Integración

### Test 1: Conectar Wallet ✅
1. Click en "Conectar Wallet" en la landing page
2. Selecciona Freighter en el modal
3. Aprueba la conexión
4. Deberías ser redirigida al dashboard

### Test 2: Ver Balance ✅
1. En el dashboard, deberías ver tu balance de $ENERGY tokens
2. Inicialmente será 0 (normal)

### Test 3: Ver Info de Miembro (Si eres miembro)
1. Si agregaste tu dirección como miembro, verás tu % de propiedad
2. Si no, verás "No eres miembro de la comunidad"

### Test 4: Transferir Tokens (Cuando tengas balance)
1. Ve a la sección de transferencias
2. Ingresa una dirección de destino
3. Ingresa cantidad de kWh
4. Click en "Transferir"
5. Firma en Freighter
6. Espera confirmación

---

## 📝 Ejemplo de Uso Completo

### Agregar Miembros a la Comunidad

```bash
# Desde el backend
stellar contract invoke \
  --id DISTRIBUTION_CONTRACT \
  --network testnet \
  --source-account ADMIN \
  -- \
  add_members_multisig \
  --approvers '["ADDRESS1", "ADDRESS2", "ADDRESS3"]' \
  --members '["MEMBER1", "MEMBER2", "MEMBER3", "MEMBER4"]' \
  --percents '[30, 25, 25, 20]'  # Deben sumar 100
```

### Registrar Generación de Energía

```bash
stellar contract invoke \
  --id DISTRIBUTION_CONTRACT \
  --network testnet \
  --source-account ADMIN \
  -- \
  record_generation \
  --kwh_generated 1000000000  # 100 kWh (con 7 decimales)
```

Esto automáticamente distribuirá tokens a todos los miembros según su %.

---

## 🆘 Troubleshooting

### Error: "Contract not configured"
**Solución:** Verifica que hayas configurado las direcciones en `.env.local`

### Error: "Failed to connect wallet"
**Solución:**
1. Verifica que Freighter esté instalado
2. Verifica que estés en Testnet
3. Refresca la página

### Error: "Insufficient balance"
**Solución:** Necesitas XLM para pagar fees. Consigue gratis aquí:
- https://laboratory.stellar.org/#account-creator

### La página no carga
**Solución:**
1. Verifica que `npm install` haya terminado sin errores
2. Asegúrate de estar en el directorio correcto
3. Verifica que el puerto 3000 esté libre

---

## 🎨 Personalizar Más

### Cambiar Colores
Edita `app/globals.css` y busca las variables CSS:
```css
:root {
  --color-primary: #0300AB;
  --color-accent: #F2C230;
  --color-success: #059669;
}
```

### Agregar Más Páginas
Crea nuevas carpetas en `app/`:
```bash
app/
  nueva-pagina/
    page.tsx
```

---

## 📚 Documentación Extra

- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Guía completa de integración
- **[README.md](./README.md)** - Documentación del proyecto
- Backend README: `C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy\README.md`

---

## 📞 Ayuda

Si tienes problemas:
1. Revisa los logs de la consola del navegador (F12)
2. Verifica las transacciones en https://stellar.expert/explorer/testnet
3. Consulta la documentación de Soroban: https://soroban.stellar.org/
4. Revisa los ejemplos en el código

---

## ✨ ¡Listo para Hackathon!

Tu aplicación BeEnergy ya está completamente integrada con Stellar blockchain. Solo necesitas:
1. Instalar dependencias (`npm install`)
2. Deployar contratos
3. Configurar `.env.local`
4. Inicializar contratos
5. ¡Ejecutar y demostrar!

**¡Mucha suerte en el hackathon! 🌞⚡🐝**
