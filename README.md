#  Playwright E2E Testing - Demoblaze Store

Automatización de pruebas end-to-end sobre el sitio [Demoblaze](https://www.demoblaze.com) utilizando **Playwright**, con funcionalidades como extracción de productos, guardado en CSV,  flujo de compra y test adicional

##  Estructura del Proyecto

```
 project-root
├── pages/              # Page Objects (ProductPage, PurchasePage)
├── helpers/            # csvHelper.js 
├── tests/              # Casos de prueba
├── utils/              # Funciones comunes como manejo de archivos
├── productos.csv       # Archivo generado con productos extraídos
├── .env                # Configs y datos sensibles
├── .gitignore
├── playwright.config.js
└── README.md
```

##  Instalación

1. Cloná el repo:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instalá las dependencias:

```bash
npm install
```

---

### Navegador utilizado

Este proyecto está configurado para ejecutarse en **Microsoft Edge**, ya que el sistema operativo utilizado actualmente **no soporta Google Chrome**.  
En el archivo de configuración (`playwright.config.ts`), se especifica lo siguiente:

```ts
projects: [
  {
    name: 'Microsoft Edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
]
```

> Si estás usando otro sistema operativo podés descomentar la sección correspondiente y asegurarte de tener ese navegador instalado.

---


##  Ejecutar pruebas

###  Todas las pruebas

```bash
npx playwright test
```

###  Ejecutar test con reporte HTML

```bash
npx playwright test --reporter=html
```


##  Tests Implementados

- `Extraer productos de 2 páginas y guardar en CSV`
- `Usuario puede realizar una compra exitosa`
- `No se permite completar la compra sin ingresar datos`

>  Los tests usan Page Object  


##  Autor

**Automated by:** [Georgina Chiappa](https://uy.linkedin.com/in/georgina-chiappa)  
Automation | 2025

