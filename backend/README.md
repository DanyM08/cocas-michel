# Backend

Aquí va el servidor (usuarios, citas, productos). Está vacío a propósito: la tecnología la elige quien lo construya.

- Lo que el frontend espera de él está en [`../docs/API.md`](../docs/API.md).
- El frontend se conecta cambiando `USAR_MOCK` y `BASE_URL` en [`../js/api.js`](../js/api.js).

Cosas que no se pueden olvidar:

1. **Nunca subir secretos** (contraseñas de base de datos, llaves) a git. Usar variables de entorno y un archivo `.env` que esté en `.gitignore`.
2. **GitHub Pages solo sirve archivos estáticos**: el backend no puede vivir ahí. Necesitará su propio hosting.
3. Cuando el backend exista, el sitio y el servidor deben usar **HTTPS**.
