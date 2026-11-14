# Pruebas E2E de SauceDemo con Playwright

Proyecto de automatización web con JavaScript, Playwright y Chromium. La aplicación bajo prueba es [SauceDemo](https://www.saucedemo.com).

## Requisitos

- Node.js 18 o superior y npm.
- Acceso a internet la primera vez para descargar Playwright y Chromium.

## Instalación y ejecución

Desde esta carpeta, ejecuta:

```bash
npm install
npx playwright install chromium
npx playwright test
```

Para abrir el reporte HTML más reciente:

```bash
npx playwright show-report
```

También puedes usar `npm test`, `npm run test:headed` para ver el navegador o `npm run test:ui` para explorar las pruebas interactivamente.

## Arquitectura: Page Object Model

Cada página principal tiene una clase en `pages/`. La clase guarda los localizadores y las acciones propias de esa pantalla. Los tests de `tests/` describen los escenarios usando esas acciones, lo que evita repetir selectores y hace más sencillo mantenerlos cuando cambia la interfaz.

- `LoginPage.js`: apertura de la página, inicio de sesión y lectura de errores.
- `InventoryPage.js`: ordenamiento por precio, gestión de productos y contador del carrito.
- `CheckoutPage.js`: formulario del comprador, validaciones y confirmación de compra.

## Escenarios cubiertos

- `tests/auth.spec.js`: login correcto, credenciales inválidas y usuario bloqueado.
- `tests/e2e-purchase.spec.js`: orden ascendente por precio, selección de productos, carrito y compra confirmada.
- `tests/form-validation.spec.js`: nombre, apellido y código postal obligatorios, además del formulario vacío.

## Reportes y evidencias

El reporte HTML se genera en `playwright-report/`. La configuración guarda capturas y trazas cuando una prueba falla (`screenshot: 'only-on-failure'` y `trace: 'retain-on-failure'`). Para inspeccionar una traza:

```bash
npx playwright show-trace test-results/ruta-a-la-traza/trace.zip
```

Las credenciales de prueba son las cuentas públicas que muestra SauceDemo en su página de inicio de sesión; no uses credenciales reales.
